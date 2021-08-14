import { PlanAllocation } from './plan-allocation.type';
import { PlanSample1, PlanSample2, PlanSample3, PlanSample4, PlanSample5 } from './plan.sample';

export const PlanAllocationSample: PlanAllocation = {
  id: '',
  plan: PlanSample1,
  allocation: 20,
  lockedAllocation: 0,
  locked: false
}
