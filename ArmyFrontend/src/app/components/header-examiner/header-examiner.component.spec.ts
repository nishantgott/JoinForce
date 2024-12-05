import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderExaminerComponent } from './header-examiner.component';

describe('HeaderExaminerComponent', () => {
  let component: HeaderExaminerComponent;
  let fixture: ComponentFixture<HeaderExaminerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderExaminerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderExaminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
