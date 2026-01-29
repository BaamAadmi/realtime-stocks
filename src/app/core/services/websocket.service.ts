import { EMPTY, Subject, timer } from 'rxjs';
import { catchError, delayWhen, retryWhen, tap } from 'rxjs/operators';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

import { Injectable } from '@angular/core';
import { WSMessage } from '../models/stock.models';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private ws$?: WebSocketSubject<WSMessage>;
  private messagesSubject = new Subject<WSMessage>();
  private reconnectAttempts = 0;
  private readonly maxReconnectDelay = 10000;

  messages$ = this.messagesSubject.asObservable();

  connect(url: string): void {
    if (this.ws$) return;

    this.ws$ = webSocket<WSMessage>({
      url,
      openObserver: {
        next: () => {
          this.reconnectAttempts = 0;
        }
      }
    });

    this.ws$.pipe(
      retryWhen(errors => errors.pipe(
        tap(() => {
          this.reconnectAttempts++;
          const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts - 1), this.maxReconnectDelay);
          console.log(`Reconnecting in ${delay}ms...`);
        }),
        delayWhen(() => timer(Math.min(1000 * Math.pow(2, this.reconnectAttempts - 1), this.maxReconnectDelay)))
      )),
      catchError(() => EMPTY)
    ).subscribe(msg => this.messagesSubject.next(msg));
  }

  send(message: WSMessage): void {
    this.ws$?.next(message);
  }

  disconnect(): void {
    this.ws$?.complete();
    this.ws$ = undefined;
  }
}
