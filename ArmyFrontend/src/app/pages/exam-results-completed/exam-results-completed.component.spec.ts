import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamResultsCompletedComponent } from './exam-results-completed.component';

describe('ExamResultsCompletedComponent', () => {
  let component: ExamResultsCompletedComponent;
  let fixture: ComponentFixture<ExamResultsCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamResultsCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamResultsCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
