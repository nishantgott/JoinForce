import { TestBed } from '@angular/core/testing';

import { ExamResultService } from './exam-result.service';

describe('ExamResultService', () => {
  let service: ExamResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
