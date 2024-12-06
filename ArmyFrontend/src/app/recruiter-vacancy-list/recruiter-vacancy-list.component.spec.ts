import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterVacancyListComponent } from './recruiter-vacancy-list.component';

describe('RecruiterVacancyListComponent', () => {
  let component: RecruiterVacancyListComponent;
  let fixture: ComponentFixture<RecruiterVacancyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterVacancyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterVacancyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
