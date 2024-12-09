import { TestBed } from '@angular/core/testing';

import { PlatformAccessService } from './platform-access.service';

describe('PlatformAccessService', () => {
  let service: PlatformAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatformAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
