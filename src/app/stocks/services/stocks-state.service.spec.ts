import { TestBed } from '@angular/core/testing';
import { StocksStateService } from './stocks-state.service';

describe('StocksStateService', () => {
  let service: StocksStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StocksStateService],
    });
    service = TestBed.inject(StocksStateService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with 4 stocks enabled by default', done => {
    service.stocks$.subscribe(stocks => {
      expect(stocks.length).toBe(4);
      expect(stocks.every(s => s.enabled)).toBe(true);
      done();
    });
  });

  it('should toggle stock enabled state', done => {
    service.toggleStock('AAPL');
    service.stocks$.subscribe(stocks => {
      const aapl = stocks.find(s => s.symbol === 'AAPL');
      expect(aapl?.enabled).toBe(false);
      done();
    });
  });

  it('should not allow more than 4 enabled stocks', () => {
    service.toggleStock('AAPL');
    const result = service.toggleStock('AAPL');
    expect(result).toBe(true);
  });

  it('should return enabled symbols', () => {
    const symbols = service.getEnabledSymbols();
    expect(symbols.length).toBe(4);
  });
});
