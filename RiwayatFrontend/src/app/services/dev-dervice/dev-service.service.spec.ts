import { TestBed } from '@angular/core/testing';

import { DevServiceService } from './dev-service.service';

describe('DevServiceService', () => {
  let service: DevServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
