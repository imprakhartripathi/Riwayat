import { TestBed } from '@angular/core/testing';

import { VendorJsonService } from './vendor-json.service';

describe('VendorJsonService', () => {
  let service: VendorJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
