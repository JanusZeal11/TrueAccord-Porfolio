import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PlanAllocationService } from '../../services/plan-allocation.service';
import { Observable, Subscription } from 'rxjs';
import { PlanAllocation } from '../../types/plan-allocation.type';
import { UpdatePlanArgsType } from '../../types/update-plan-args.type';
import { PlanAllocationSample } from '../../types/plan-allocation.sample';
import { PlanSample1, PlanSample2, PlanSample3, PlanSample4, PlanSample5 } from '../../types/plan.sample';
import { LockPlanArgsType } from '../../types/lock-plan-args.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../types/notification.type';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-portfolio-allocation',
  templateUrl: './portfolio-allocation.component.html',
  styleUrls: ['./portfolio-allocation.component.css']
})
export class PortfolioAllocationComponent implements OnInit {

  PlanAllocationSampleList = [
    {...PlanAllocationSample, id: 'planAllocationId1', plan: PlanSample1, allocation: 20},
    {...PlanAllocationSample, id: 'planAllocationId2', plan: PlanSample2, allocation: 20},
    {...PlanAllocationSample, id: 'planAllocationId3', plan: PlanSample3, allocation: 20},
    {...PlanAllocationSample, id: 'planAllocationId4', plan: PlanSample4, allocation: 20},
    {...PlanAllocationSample, id: 'planAllocationId5', plan: PlanSample5, allocation: 20}
  ];
  notification$: Subscription = new Subscription();

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService,
    private planAllocationService: PlanAllocationService
  ) {
  }

  ngOnInit(): void {
    this.planAllocationService.Init(this.PlanAllocationSampleList)
    this.notification$ = this.notificationService.Read()
      .subscribe((note) => {
        this.openSnackBar(note);
      });
  }

  getPlanAllocationObservable(): Observable<PlanAllocation[]> {
    return this.planAllocationService.Select();
  }

  openSnackBar(note: Notification) {
    if (note.message) {
      this.snackBar.open(note.message, 'X', {
        duration: 1000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  addPlan(): void {
    this.planAllocationService.Add({
      id: 'addedPlan',
      name: 'Added Plan',
    });
  }

  lockPlan(args: LockPlanArgsType): void {
    this.planAllocationService.Lock(args.id, args.locked);
  }

  removePlan(id: string): void {
    this.planAllocationService.Remove(id);
  }

  updatePlan(args: UpdatePlanArgsType): void {
    this.planAllocationService.SetPlanAllocation(args.id, args.value);
  }
}
