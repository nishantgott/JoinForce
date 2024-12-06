import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrainingProgramComponent } from './create-training-program.component';

describe('CreateTrainingProgramComponent', () => {
  let component: CreateTrainingProgramComponent;
  let fixture: ComponentFixture<CreateTrainingProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTrainingProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTrainingProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
