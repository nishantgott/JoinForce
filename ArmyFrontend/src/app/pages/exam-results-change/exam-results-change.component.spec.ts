import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamResultsChangeComponent } from './exam-results-change.component';

describe('ExamResultsChangeComponent', () => {
  let component: ExamResultsChangeComponent;
  let fixture: ComponentFixture<ExamResultsChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamResultsChangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamResultsChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
