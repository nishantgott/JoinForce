import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../../services/vacancy.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-vacancy',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, CommonModule],
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.css'
})
export class VacancyComponent implements OnInit {
  vacancy: any; // Variable to hold the vacancy data

  constructor(
    private vacancyService: VacancyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getVacancyDetails(+id);
    }
  }

  getVacancyDetails(id: number): void {
    this.vacancyService.getVacancyById(id).subscribe(
      (data) => {
        this.vacancy = data;
        console.log('tihs is')
        console.log(this.vacancy);
      },
      (error) => {
        console.error('Error fetching vacancy details', error);
      }
    );
  }
}
