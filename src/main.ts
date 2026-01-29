import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { StockListComponent } from './app/stocks/stock-list/stock-list.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'stocks', component: StockListComponent },
      { path: '', redirectTo: '/stocks', pathMatch: 'full' },
    ]),
  ],
}).catch(err => console.error(err));
