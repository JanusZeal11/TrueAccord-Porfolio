import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentTableComponent } from './investment-table.component';
import { MaterialModule } from '../../material.module';
import { of } from 'rxjs';

describe('InvestmentTableComponent', () => {
  let component: InvestmentTableComponent;
  let fixture: ComponentFixture<InvestmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentTableComponent ],
      imports: [ MaterialModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentTableComponent);
    component = fixture.componentInstance;
    component.planAllocations$ = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
