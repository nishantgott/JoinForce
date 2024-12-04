import { TestBed } from '@angular/core/testing';

import { EvaluationReportService } from './evaluation-report.service';

describe('EvaluationReportService', () => {
  let service: EvaluationReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
