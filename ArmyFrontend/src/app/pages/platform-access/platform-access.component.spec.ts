import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformAccessComponent } from './platform-access.component';

describe('PlatformAccessComponent', () => {
  let component: PlatformAccessComponent;
  let fixture: ComponentFixture<PlatformAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformAccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatformAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
