import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferslistComponent } from './offerslist.component';

describe('OfferslistComponent', () => {
  let component: OfferslistComponent;
  let fixture: ComponentFixture<OfferslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
