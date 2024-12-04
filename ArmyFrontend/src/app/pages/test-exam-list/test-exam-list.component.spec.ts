import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExamListComponent } from './test-exam-list.component';

describe('TestExamListComponent', () => {
  let component: TestExamListComponent;
  let fixture: ComponentFixture<TestExamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestExamListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestExamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
