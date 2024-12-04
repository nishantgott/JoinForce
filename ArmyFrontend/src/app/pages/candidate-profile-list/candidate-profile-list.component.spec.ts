import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateProfileListComponent } from './candidate-profile-list.component';

describe('CandidateProfileListComponent', () => {
  let component: CandidateProfileListComponent;
  let fixture: ComponentFixture<CandidateProfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateProfileListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
