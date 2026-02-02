import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockQuote } from '../models/stock.models';
import { StockCardComponent } from './stock-card.component';

describe('StockCardComponent', () => {
  let component: StockCardComponent;
  let fixture: ComponentFixture<StockCardComponent>;

  const mockQuote: StockQuote = {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 150.0,
    dayHigh: 152.0,
    dayLow: 148.0,
    week52High: 180.0,
    week52Low: 120.0,
    lastUpdated: new Date().toISOString(),
    enabled: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StockCardComponent);
    component = fixture.componentInstance;
    component.quote = mockQuote;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggle event', () => {
    jest.spyOn(component.toggle, 'emit');
    component.onToggle();
    expect(component.toggle.emit).toHaveBeenCalled();
  });
});
