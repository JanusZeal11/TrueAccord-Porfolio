import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioAllocationComponent } from './portfolio-allocation.component';
import { MaterialModule } from '../../material.module';
import { InvestmentTableComponent } from '../investment-table/investment-table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from '../../services/notification.service';
import { PlanAllocationService } from '../../services/plan-allocation.service';

describe('PortfolioAllocationComponent', () => {
  let component: PortfolioAllocationComponent;
  let fixture: ComponentFixture<PortfolioAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioAllocationComponent, InvestmentTableComponent ],
      imports: [
        MaterialModule,
        NoopAnimationsModule
      ],
      providers: [
        NotificationService,
        PlanAllocationService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
