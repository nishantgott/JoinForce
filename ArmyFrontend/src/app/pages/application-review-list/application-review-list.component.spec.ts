import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationReviewListComponent } from './application-review-list.component';

describe('ApplicationReviewListComponent', () => {
  let component: ApplicationReviewListComponent;
  let fixture: ComponentFixture<ApplicationReviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationReviewListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
