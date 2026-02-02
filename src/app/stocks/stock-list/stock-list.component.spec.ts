import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { StockQuote } from '../models/stock.models';
import { StocksService } from '../services/stocks.service';
import { StockListComponent } from './stock-list.component';

describe('StockListComponent', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;
  let mockStocksService: jest.Mocked<StocksService>;

  beforeEach(async () => {
    mockStocksService = {
      initialise: jest.fn(),
      getStocks: jest.fn().mockReturnValue(of([])),
      toggleStock: jest.fn(),
    } as unknown as jest.Mocked<StocksService>;

    await TestBed.configureTestingModule({
      imports: [StockListComponent],
      providers: [{ provide: StocksService, useValue: mockStocksService }],
    }).compileComponents();

    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", ()=> {
      it('should initialise stocks service on init', () => {
        component.ngOnInit();
        expect(mockStocksService.initialise).toHaveBeenCalled();
      });
  })


  it('should track by symbol', () => {
    const quote = {
      symbol: 'AAPL',
      name: 'Apple',
      currentPrice: 150,
      dayHigh: 152,
      dayLow: 148,
      week52High: 180,
      week52Low: 120,
      lastUpdated: '',
      enabled: true,
    } as StockQuote;
    expect(component.trackBySymbol(0, quote)).toBe('AAPL');
  });
});
