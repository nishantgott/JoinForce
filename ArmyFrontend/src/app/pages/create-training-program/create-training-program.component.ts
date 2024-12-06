import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VacancyService } from '../../services/vacancy.service';
import { CommonModule } from '@angular/common';
import { TrainingProgramService } from '../../services/training-program.service';

@Component({
  selector: 'app-create-training-program',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './create-training-program.component.html',
  styleUrl: './create-training-program.component.css'
})
export class CreateTrainingProgramComponent {
  user: any;
  vacancies: any[] = [];
  trainingProgram: any = {
    programId: 0,
    vacancyId: 0,
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    trainer: '',
    content: '',
    trainingType: '',
  }

  constructor(private vacancyService: VacancyService, private trainingProgramService: TrainingProgramService) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }
    this.fetchVacancies();
  }

  fetchVacancies(): void {
    this.vacancyService.getAllVacancies().subscribe(
      (data: any[]) => {
        this.vacancies = data;
        this.vacancies = this.vacancies.filter(v => v.postedBy === this.user.userId);
        console.log(this.vacancies);
      },
      (error) => {
        console.error('Error fetching vacancies:', error);
      }
    );
  }

  onSubmit(trainingForm: any): void {
    console.log(this.trainingProgram);
    this.trainingProgramService.createProgram(this.trainingProgram).subscribe(
      (data) => {
        console.log('Training Program Created:', data);
        alert(`Training Program(ID:${data.programId}) Created Successfully!`);
        trainingForm.resetForm();
      },
      (error) => {
        console.error('Error creating training program:', error);
      }
    );
  }


}
