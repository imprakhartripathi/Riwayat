import { TestBed } from '@angular/core/testing';

import { PlannerJsonService } from './planner-json.service';

describe('PlannerJsonService', () => {
  let service: PlannerJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlannerJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
