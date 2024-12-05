import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCandidateComponent } from './header-candidate.component';

describe('HeaderCandidateComponent', () => {
  let component: HeaderCandidateComponent;
  let fixture: ComponentFixture<HeaderCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCandidateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
