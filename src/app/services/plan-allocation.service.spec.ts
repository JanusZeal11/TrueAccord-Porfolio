import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PlanAllocationService } from './plan-allocation.service';
import { NotificationStatus } from '../types/notification.type';
import { NotificationService } from './notification.service';
import { of } from 'rxjs';
import {
  PlanSample1,
  PlanSample2,
  PlanSample3,
  PlanSample4,
  PlanSample5,
  PlanSample_Added
} from '../types/plan.sample';
import {
  PlanAllocationSample,
} from '../types/plan-allocation.sample';
import { PlanAllocation } from '../types/plan-allocation.type';

describe('PlanAllocationService', () => {
  let service: PlanAllocationService;
  let notificationService: NotificationService;

  let PlanAllocationSample1: PlanAllocation;
  let PlanAllocationSample2: PlanAllocation;
  let PlanAllocationSample3: PlanAllocation;
  let PlanAllocationSample4: PlanAllocation;
  let PlanAllocationSample5: PlanAllocation;
  let PlanAllocationSampleList: PlanAllocation[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NotificationStatus,
          useValue: {
            Add: jest.fn(),
            Read: jest.fn()
          }
        }
      ]
    });
    service = TestBed.inject(PlanAllocationService);
    notificationService = TestBed.inject(NotificationService);
    service.planAllocation = [];
    service.planAllocationSubject.next([]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Init', () => {
    beforeEach(() => {
      PlanAllocationSample1 = { ...PlanAllocationSample, id: 'planAllocationId1', plan: PlanSample1 };
      PlanAllocationSample2 = { ...PlanAllocationSample, id: 'planAllocationId2', plan: PlanSample2 };
      PlanAllocationSample3 = { ...PlanAllocationSample, id: 'planAllocationId3', plan: PlanSample3 };
      PlanAllocationSample4 = { ...PlanAllocationSample, id: 'planAllocationId4', plan: PlanSample4 };
      PlanAllocationSample5 = { ...PlanAllocationSample, id: 'planAllocationId5', plan: PlanSample5 };
      PlanAllocationSampleList = [
        PlanAllocationSample1,
        PlanAllocationSample2,
        PlanAllocationSample3,
        PlanAllocationSample4,
        PlanAllocationSample5
      ];
    });

    it('should init planAllocationList', () => {
      service.Init(PlanAllocationSampleList);

      expect(service.planAllocation).toEqual(PlanAllocationSampleList);
      expect(service.planAllocationSubject.getValue()).toEqual(PlanAllocationSampleList);
    });
  });

  describe('Get', () => {
    beforeEach(() => {
      PlanAllocationSample1 = { ...PlanAllocationSample, id: 'planAllocationId1', plan: PlanSample1 };
      PlanAllocationSample2 = { ...PlanAllocationSample, id: 'planAllocationId2', plan: PlanSample2 };
      PlanAllocationSample3 = { ...PlanAllocationSample, id: 'planAllocationId3', plan: PlanSample3 };
      PlanAllocationSample4 = { ...PlanAllocationSample, id: 'planAllocationId4', plan: PlanSample4 };
      PlanAllocationSample5 = { ...PlanAllocationSample, id: 'planAllocationId5', plan: PlanSample5 };
      PlanAllocationSampleList = [
        PlanAllocationSample1,
        PlanAllocationSample2,
        PlanAllocationSample3,
        PlanAllocationSample4,
        PlanAllocationSample5
      ];
    });

    it('should get planAllocationList from service', () => {
      service.Init(PlanAllocationSampleList);

      expect(service.Get()).toEqual(PlanAllocationSampleList);
    });
  });

  describe('Select', () => {
    beforeEach(() => {
      PlanAllocationSample1 = { ...PlanAllocationSample, id: 'planAllocationId1', plan: PlanSample1 };
      PlanAllocationSample2 = { ...PlanAllocationSample, id: 'planAllocationId2', plan: PlanSample2 };
      PlanAllocationSample3 = { ...PlanAllocationSample, id: 'planAllocationId3', plan: PlanSample3 };
      PlanAllocationSample4 = { ...PlanAllocationSample, id: 'planAllocationId4', plan: PlanSample4 };
      PlanAllocationSample5 = { ...PlanAllocationSample, id: 'planAllocationId5', plan: PlanSample5 };
      PlanAllocationSampleList = [
        PlanAllocationSample1,
        PlanAllocationSample2,
        PlanAllocationSample3,
        PlanAllocationSample4,
        PlanAllocationSample5
      ];
    });

    it('should get observable of planAllocationList from service', fakeAsync(() => {
      service.Init(PlanAllocationSampleList);

      const observer = service.Select();

      expect(observer).toBeTruthy();
      expect(typeof(observer)).toEqual((typeof(of())));

      observer.subscribe((result) => {
        expect(result).toEqual(PlanAllocationSampleList);
      });

      tick();
    }));
  });

  describe('Lock', () => {
    beforeEach(() => {
      PlanAllocationSample1 = { ...PlanAllocationSample, id: 'planAllocationId1', plan: PlanSample1 };
      PlanAllocationSample2 = { ...PlanAllocationSample, id: 'planAllocationId2', plan: PlanSample2 };
      PlanAllocationSample3 = { ...PlanAllocationSample, id: 'planAllocationId3', plan: PlanSample3 };
      PlanAllocationSample4 = { ...PlanAllocationSample, id: 'planAllocationId4', plan: PlanSample4 };
      PlanAllocationSample5 = { ...PlanAllocationSample, id: 'planAllocationId5', plan: PlanSample5 };
      PlanAllocationSampleList = [
        PlanAllocationSample1,
        PlanAllocationSample2,
        PlanAllocationSample3,
        PlanAllocationSample4,
        PlanAllocationSample5
      ];
    });

    it('should throw error notification of element is not in planAllocationList', () => {
      const spy = jest.spyOn(notificationService, 'Add');

      service.Init(PlanAllocationSampleList);

      service.Lock('fakeId');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({ message: 'Plan Allocation is not a member of the Plan Allocation List', status: NotificationStatus.Error });
    });

    it('should lock selected plan allocation', () => {
      service.Init(PlanAllocationSampleList);

      service.Lock(PlanAllocationSample3.id);

      expect(service.planAllocation.find((x) => x.id === PlanAllocationSample3.id)).toBeTruthy();
      expect(service.planAllocation.find((x) => x.id === PlanAllocationSample3.id)).toEqual({
        ...PlanAllocationSample3,
        lockedAllocation: PlanAllocationSample3.allocation,
        locked: true
      });

      expect(service.planAllocationSubject.getValue()[2]).toEqual({
        ...PlanAllocationSample3,
        lockedAllocation: PlanAllocationSample3.allocation,
        locked: true
      });
    });
  });

  describe('Add', () => {
    beforeEach(() => {
      PlanAllocationSample1 = { ...PlanAllocationSample, id: 'planAllocationId1', plan: PlanSample1 };
      PlanAllocationSample2 = { ...PlanAllocationSample, id: 'planAllocationId2', plan: PlanSample2 };
      PlanAllocationSample3 = { ...PlanAllocationSample, id: 'planAllocationId3', plan: PlanSample3 };
      PlanAllocationSample4 = { ...PlanAllocationSample, id: 'planAllocationId4', plan: PlanSample4 };
      PlanAllocationSample5 = { ...PlanAllocationSample, id: 'planAllocationId5', plan: PlanSample5 };
      PlanAllocationSampleList = [
        PlanAllocationSample1,
        PlanAllocationSample2,
        PlanAllocationSample3,
        PlanAllocationSample4,
        PlanAllocationSample5
      ];
    });

    it('should add new plan to planAllocationList', () => {
      service.Init(PlanAllocationSampleList);

      service.Add(PlanSample_Added);

      expect(service.planAllocation.length).toEqual(6);
      expect(service.planAllocation[5].plan).toEqual(PlanSample_Added);
      expect(service.planAllocation[5].allocation).toEqual(0);
      expect(service.planAllocation[5].lockedAllocation).toEqual(0);
      expect(service.planAllocation[5].locked).toEqual(false);

      expect(service.planAllocationSubject.getValue().length  ).toEqual(6);
    });
  });

  describe('Remove', () => {
    beforeEach(() => {
      PlanAllocationSample1 = { ...PlanAllocationSample, id: 'planAllocationId1', plan: PlanSample1 };
      PlanAllocationSample2 = { ...PlanAllocationSample, id: 'planAllocationId2', plan: PlanSample2 };
      PlanAllocationSample3 = { ...PlanAllocationSample, id: 'planAllocationId3', plan: PlanSample3 };
      PlanAllocationSample4 = { ...PlanAllocationSample, id: 'planAllocationId4', plan: PlanSample4 };
      PlanAllocationSample5 = { ...PlanAllocationSample, id: 'planAllocationId5', plan: PlanSample5 };
      PlanAllocationSampleList = [
        PlanAllocationSample1,
        PlanAllocationSample2,
        PlanAllocationSample3,
        PlanAllocationSample4,
        PlanAllocationSample5
      ];
    });

    it('should throw error notification of element is not in planAllocationList', () => {
      const spy = jest.spyOn(notificationService, 'Add');

      service.Init(PlanAllocationSampleList);

      service.Remove('fakeId');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({ message: 'Plan Allocation is not a member of the Plan Allocation List', status: NotificationStatus.Error });
    });

    it('should remove given plan and update unlocked plans with updated values', () => {
      service.Init(PlanAllocationSampleList);

      service.Remove(PlanAllocationSample3.id);

      expect(service.planAllocation.length).toEqual(4)

      expect(service.planAllocation.filter((x) => !x.locked).map((x) => x.allocation)).toEqual([40, 20, 20, 20]);

      expect(service.planAllocationSubject.getValue().length).toEqual(4);
    });

    it('should remove given plan and not update increase locked plans values', () => {
      service.Init(PlanAllocationSampleList);

      // Lock 2 plans for testing
      service.Lock(PlanAllocationSample1.id)
      service.Lock(PlanAllocationSample2.id)

      service.Remove(PlanAllocationSample3.id);

      expect(service.planAllocation.length).toEqual(4)

      expect(service.planAllocation.filter((x) => x.locked).map((x) => x.allocation)).toEqual([20,20]);
      expect(service.planAllocation.filter((x) => !x.locked).map((x) => x.allocation)).toEqual([40,20]);

      expect(service.planAllocationSubject.getValue().length).toEqual(4);
    });
  });

  describe('SetPlanAllocation', () => {
    beforeEach(() => {
      PlanAllocationSample1 = { ...PlanAllocationSample, id: 'planAllocationId1', plan: PlanSample1 };
      PlanAllocationSample2 = { ...PlanAllocationSample, id: 'planAllocationId2', plan: PlanSample2 };
      PlanAllocationSample3 = { ...PlanAllocationSample, id: 'planAllocationId3', plan: PlanSample3 };
      PlanAllocationSample4 = { ...PlanAllocationSample, id: 'planAllocationId4', plan: PlanSample4 };
      PlanAllocationSample5 = { ...PlanAllocationSample, id: 'planAllocationId5', plan: PlanSample5 };
      PlanAllocationSampleList = [
        PlanAllocationSample1,
        PlanAllocationSample2,
        PlanAllocationSample3,
        PlanAllocationSample4,
        PlanAllocationSample5
      ];
    });

    it('should throw error notification of element is not in planAllocationList', () => {
      const spy = jest.spyOn(notificationService, 'Add');

      service.Init(PlanAllocationSampleList);

      service.SetPlanAllocation('fakeId', 75);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({ message: 'Plan Allocation is not a member of the Plan Allocation List', status: NotificationStatus.Error });
    });

    it('should throw error if result would make allocations greater than 100%', () => {
      const spy = jest.spyOn(notificationService, 'Add');

      service.Init(PlanAllocationSampleList);

      service.SetPlanAllocation(PlanAllocationSample3.id, 175);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({ message: 'Plan Allocation will set value to over 100%', status: NotificationStatus.Warning });
    });

    it('should update all unlocked plans and not update locked plans, maintaining 100', () => {
      service.Init(PlanAllocationSampleList);

      service.SetPlanAllocation(PlanAllocationSample3.id, 30);

      expect(service.planAllocation.find((x) => x.id === PlanAllocationSample3.id)?.allocation).toEqual(30);

      expect(service.planAllocation.map((x) => x.allocation)).toEqual([10,20,30,20,20]);
      expect(service.planAllocation.reduce((acc, curr) => acc + curr.allocation, 0)).toEqual(100);
    });
  });
});
