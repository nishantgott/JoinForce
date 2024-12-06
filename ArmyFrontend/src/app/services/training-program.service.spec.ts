import { TestBed } from '@angular/core/testing';

import { TrainingProgramService } from './training-program.service';

describe('TrainingProgramService', () => {
  let service: TrainingProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
