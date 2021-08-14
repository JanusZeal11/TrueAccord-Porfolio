import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlanAllocation } from '../types/plan-allocation.type';
import { NotificationService } from './notification.service';
import { NotificationStatus } from '../types/notification.type';
import { Plan } from '../types/plan.type';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class PlanAllocationService {
  planAllocation: PlanAllocation[] = [];
  planAllocationSubject = new BehaviorSubject<PlanAllocation[]>([]);

  constructor(private notificationService: NotificationService) { }

  // Initialize Allocations from data source
  public Init(allocations: PlanAllocation[]): void {
    this.planAllocation = allocations;
    this.planAllocationSubject.next(this.planAllocation);
  }

  // Get AllocationObservable
  public Select(): Observable<PlanAllocation[]> {
    return this.planAllocationSubject.asObservable();
  }

  // Get Allocations
  public Get(): PlanAllocation[] {
    return this.planAllocation;
  }

  // Lock Plan (lock plan allocation to specific value)
  public Lock(id: string, lock: boolean = true): void {
    try {
      let planAllocation = this.GetPlanAllocation(id);
      planAllocation.lockedAllocation = lock ? planAllocation.allocation : 0;
      planAllocation.locked = lock;
    } catch(err) {
      this.notificationService.Add({ message: err.message, status: NotificationStatus.Error});
    }
  }

  // Add Plan
  public Add(plan: Plan): void {
    try {
      let defaultAllocation = 0;

      // Check for plan allocation list with all locked plans and calculate un-locked value to set as unlocked default
      if (this.planAllocation.filter((x) => x.locked).length === this.planAllocation.length) {
        defaultAllocation = 1 - this.planAllocation.reduce((acc, curr) => acc + curr.lockedAllocation, 0);
      }

      // Give all allocation to first added plan
      if (this.planAllocation.length === 0) {
        defaultAllocation = 1;
      }

      this.planAllocation.push({ id: uuidv4(), plan: plan, allocation: defaultAllocation, lockedAllocation: 0, locked: false})
      this.planAllocationSubject.next(this.planAllocation);
      this.notificationService.Add({ message: `${plan.name} was added to Plan Allocation List`, status: NotificationStatus.Message});
    } catch(err) {
      this.notificationService.Add({ message: err.message, status: NotificationStatus.Error});
    }
  }

  // Remove Plan
  public Remove(id: string): void {
    try {
      const index = this.planAllocation.findIndex(x => x.id === id);
      const removedPlanAllocation = this.GetPlanAllocation(id);

      this.planAllocation.splice(index, 1);

      if (this.planAllocation.length !== 0) {
        this.RedistributeAllocation(this.planAllocation.filter((x) => !x.locked), removedPlanAllocation.allocation);
      }
      this.planAllocationSubject.next(this.planAllocation);
      this.notificationService.Add({ message: `${removedPlanAllocation.plan.name} was removed from Plan Allocation List`, status: NotificationStatus.Message});
    } catch(err) {
      this.notificationService.Add({ message: err.message, status: NotificationStatus.Error});
    }
  }

  // Set Plan Allocation (set value of given plan to number, adjusting other plans down evenly to compensate for increase)
  // NOTE: Return warning if plan value is greater than available value
  // NOTE: Prevent negative percentages
  public SetPlanAllocation(id: string, value: number): void {
    try {
      const processPlanAllocation = this.GetPlanAllocation(id);
      const planDiff = value - processPlanAllocation.allocation;
      console.log('planDiff', value, processPlanAllocation.allocation, planDiff);
      processPlanAllocation.allocation = value;
      const unlockedPlans = this.planAllocation.filter((x) => !x.locked && x.id !== id);

      if (processPlanAllocation.locked) {
        throw new Error('Plan Allocation is locked, please unlock and try again');
      }

      // prevent setting allocations to over 100%
      if (this.planAllocation.reduce((acc, curr) => {
        if (curr.id === id) {
          return acc + value;
        } else if (curr.locked) {
          return acc + curr.allocation;
        } else {
          return acc;
        }
      }, 0) > 100) {
        // Revert modified allocation to maximum available
        this.SetPlanToFullValue(processPlanAllocation);
        unlockedPlans.forEach((x) => x.allocation = 0);
        this.notificationService.Add({ message: `Plan Allocation will set value to over 100%`, status: NotificationStatus.Warning});
      } else if (unlockedPlans.length > 0) {
        // Distribute remaining allocations between available plans
        this.RedistributeAllocation(unlockedPlans, -planDiff);
      } else {
        // Revert modified allocation to maximum available
        this.SetPlanToFullValue(processPlanAllocation);
        this.notificationService.Add({ message: `No available Plans to allocate remainder to.`, status: NotificationStatus.Warning});
      }
    } catch(err) {
      this.notificationService.Add({ message: err.message, status: NotificationStatus.Error});
    }

    this.planAllocationSubject.next(this.planAllocation);
  }

  // Wraps getting plan allocations from list and throws error if plan is not in the list.
  private GetPlanAllocation(id: string): PlanAllocation {
    let planAllocation = this.planAllocation.find((x) => x.id === id);
    if (planAllocation) {
      return planAllocation
    } else {
      throw new Error('Plan Allocation is not a member of the Plan Allocation List');
    }
  }

  // Handle redistributing updates to plan allocations across plans
  private RedistributeAllocation(plans: PlanAllocation[], diff: number): void {
    while (Math.abs(diff) > 0) {
      if (diff > 0) {
        // Get add to next open plan
        diff = this.AddToPlan(plans[0], diff);
      } else {
        // Remove allocation from next open plan that can be reduced
        const tempPlan = plans.filter((x) => x.allocation > 0)[0];
        diff = this.SubtractFromPlan(tempPlan, diff);
      }
    }
  }

  private SetPlanToFullValue(processPlanAllocation: PlanAllocation): void {
    const lockedAllocations = this.planAllocation.reduce((acc, curr) => acc + (curr.locked ? curr.allocation : 0),0);
    processPlanAllocation.allocation = 100 - lockedAllocations;
  }

  private AddToPlan(plan: PlanAllocation, add: number): number {
    plan.allocation += add;
    return 0;
  }

  // Note: sub will be negative.
  private SubtractFromPlan(plan: PlanAllocation, sub: number): number {
    if (plan.allocation > Math.abs(sub)) {
      plan.allocation += sub;
      return 0;
    } else {
      sub += plan.allocation;
      plan.allocation = 0;
      return sub;
    }
  }
}
