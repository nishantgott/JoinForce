import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMedicalOfficerComponent } from './header-medical-officer.component';

describe('HeaderMedicalOfficerComponent', () => {
  let component: HeaderMedicalOfficerComponent;
  let fixture: ComponentFixture<HeaderMedicalOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMedicalOfficerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderMedicalOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
