import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLoggedOutComponent } from './header-logged-out.component';

describe('HeaderLoggedOutComponent', () => {
  let component: HeaderLoggedOutComponent;
  let fixture: ComponentFixture<HeaderLoggedOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLoggedOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderLoggedOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
