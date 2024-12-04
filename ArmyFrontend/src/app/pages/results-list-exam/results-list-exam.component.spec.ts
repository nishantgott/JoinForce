import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsListExamComponent } from './results-list-exam.component';

describe('ResultsListExamComponent', () => {
  let component: ResultsListExamComponent;
  let fixture: ComponentFixture<ResultsListExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsListExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsListExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
