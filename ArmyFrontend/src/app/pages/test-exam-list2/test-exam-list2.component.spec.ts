import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExamList2Component } from './test-exam-list2.component';

describe('TestExamList2Component', () => {
  let component: TestExamList2Component;
  let fixture: ComponentFixture<TestExamList2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestExamList2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestExamList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
