import { Plan } from './plan.type';

export type PlanAllocation = {
  id: string;
  plan: Plan;
  allocation: number;
  lockedAllocation: number;
  locked: boolean;
}
