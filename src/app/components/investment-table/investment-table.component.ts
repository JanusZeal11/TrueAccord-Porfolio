import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PlanAllocation } from '../../types/plan-allocation.type';
import { UpdatePlanArgsType } from '../../types/update-plan-args.type';
import { LockPlanArgsType } from '../../types/lock-plan-args.type';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-investment-table',
  templateUrl: './investment-table.component.html',
  styleUrls: ['./investment-table.component.css']
})
export class InvestmentTableComponent implements OnInit {
  @Input() planAllocations$!: Observable<PlanAllocation[]>;
  @Output() lockPlan = new EventEmitter<LockPlanArgsType>();
  @Output() removePlan = new EventEmitter<string>();
  @Output() updatePlan = new EventEmitter<UpdatePlanArgsType>();
  @ViewChild(MatTable, { static: false }) table!: MatTable<PlanAllocation>;

  planAllocations: PlanAllocation[] = [];
  dataSource: MatTableDataSource<PlanAllocation> = new MatTableDataSource<PlanAllocation>(this.planAllocations);

  displayColumns = ['delete', 'name', 'slider', 'allocation'];

  constructor() {
  }

  ngOnInit(): void {
    this.planAllocations$.subscribe((plans) => {
      this.planAllocations = plans;
      this.dataSource = new MatTableDataSource<PlanAllocation>(plans);
      if (this.table) {
        this.table.renderRows();
      }
    })
  }

  sumAllocations(): number {
    if (this.planAllocations) {
      return this.planAllocations.reduce((acc, curr) => acc + curr.allocation, 0);
    } else {
      return 0;
    }
  }

  calculateMax(): number {
    return 100 - this.planAllocations.reduce((acc, curr) => acc + (curr.locked ? curr.allocation : 0), 0)
  }

  updatePlanSlider(id: string, event: any): void {
    const max = this.calculateMax();
    if (event.value > max) {
      event.source.value = max;
    }
    this.updatePlan.emit({id: id, value: event.value})
  }

  updatePlanValue(id: string, event: any): void {
    this.updatePlan.emit({id: id, value: parseInt(event.target.value)})
  }
}
