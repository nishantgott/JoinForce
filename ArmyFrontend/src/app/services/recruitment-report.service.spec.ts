import { TestBed } from '@angular/core/testing';

import { RecruitmentReportService } from './recruitment-report.service';

describe('RecruitmentReportService', () => {
  let service: RecruitmentReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruitmentReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
