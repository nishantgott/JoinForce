import { TestBed } from '@angular/core/testing';

import { TestScheduleService } from './test-schedule.service';

describe('TestScheduleService', () => {
  let service: TestScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
