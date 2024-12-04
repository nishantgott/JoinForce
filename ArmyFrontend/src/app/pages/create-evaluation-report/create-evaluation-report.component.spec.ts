import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEvaluationReportComponent } from './create-evaluation-report.component';

describe('CreateEvaluationReportComponent', () => {
  let component: CreateEvaluationReportComponent;
  let fixture: ComponentFixture<CreateEvaluationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEvaluationReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEvaluationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
