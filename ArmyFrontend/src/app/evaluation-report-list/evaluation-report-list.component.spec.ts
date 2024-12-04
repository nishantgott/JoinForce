import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationReportListComponent } from './evaluation-report-list.component';

describe('EvaluationReportListComponent', () => {
  let component: EvaluationReportListComponent;
  let fixture: ComponentFixture<EvaluationReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationReportListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
