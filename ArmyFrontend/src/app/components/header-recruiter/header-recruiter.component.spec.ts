import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRecruiterComponent } from './header-recruiter.component';

describe('HeaderRecruiterComponent', () => {
  let component: HeaderRecruiterComponent;
  let fixture: ComponentFixture<HeaderRecruiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderRecruiterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
