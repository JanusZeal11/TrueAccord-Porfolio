import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PortfolioAllocationComponent } from './components/portfolio-allocation/portfolio-allocation.component';
import { InvestmentTableComponent } from './components/investment-table/investment-table.component';
import { MaterialModule } from './material.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent, PortfolioAllocationComponent, InvestmentTableComponent ],
      imports: [ MaterialModule ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
