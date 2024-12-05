import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationReviewListCompletedComponent } from './application-review-list-completed.component';

describe('ApplicationReviewListCompletedComponent', () => {
  let component: ApplicationReviewListCompletedComponent;
  let fixture: ComponentFixture<ApplicationReviewListCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationReviewListCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationReviewListCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
