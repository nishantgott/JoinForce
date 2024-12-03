import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../../services/vacancy.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Application, ApplicationService } from '../../services/application.service';
import { DocumentVerification, DocumentVerificationService } from '../../services/document-verification.service';

@Component({
  selector: 'app-vacancy',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, CommonModule],
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css']
})
export class VacancyComponent implements OnInit {
  vacancy: any; // Variable to hold the vacancy data
  userId: number = 0;
  vacancyId: number = 0;

  constructor(
    private vacancyService: VacancyService,
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private documentVerificationService: DocumentVerificationService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getVacancyDetails(+id); // Passing +id to ensure vacancyId is a number
    }
  }

  onSubmit(): void {
    // Fetch the vacancyId from the route parameter
    const vacancyId = this.route.snapshot.paramMap.get('id');
    this.vacancyId = +vacancyId!; // Convert to number using unary plus operator

    // Check if the window and localStorage are available
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.userId = user.userId;
      }
    }

    console.log('User ID:', this.userId);
    console.log('Vacancy ID:', this.vacancyId);

    if (this.userId && this.vacancyId) {
      // Step 1: Check if the application already exists
      this.applicationService.checkApplicationExists(this.userId, this.vacancyId).subscribe(
        (applicationExists) => {
          if (applicationExists) {
            // If the application exists, show a message or handle accordingly
            console.log('Application already exists for this user and vacancy.');
            alert('You have already applied for this vacancy.');
            return; // Exit without creating another application
          }

          // Step 2: Create the application object
          const application: Application = {
            applicationId: 0, // Backend should auto-generate this
            userId: this.userId,
            vacancyId: this.vacancyId,
            applicationStatus: 'Submitted',
            submissionDate: new Date(),
            documentsSubmitted: true,
          };

          // Step 3: Create the application
          this.applicationService.createApplication(application).subscribe(
            (createdApplication) => {
              console.log('Application Created:', createdApplication);

              // Step 4: Create Document Verification for the created application
              const documentVerification: DocumentVerification = {
                verificationId: 0,  // Backend should auto-generate this
                applicationId: createdApplication.applicationId,  // Use the created application's ID
                documentType: 'Identity Proof',
                verificationStatus: 'Pending',
                remarks: '',
              };

              this.documentVerificationService.createVerification(documentVerification).subscribe(
                (createdDocumentVerification) => {
                  console.log('Document Verification Created:', createdDocumentVerification);
                  // Handle success (maybe show a success message)
                },
                (error) => {
                  console.error('Error creating document verification:', error);
                  // Handle error
                }
              );
            },
            (error) => {
              console.error('Error creating application:', error);
              // Handle error
            }
          );
        },
        (error) => {
          console.error('Error checking application existence:', error);
          // Handle error
        }
      );
    } else {
      console.warn('User ID or Vacancy ID is missing');
    }
  }

  getVacancyDetails(id: number): void {
    this.vacancyService.getVacancyById(id).subscribe(
      (data) => {
        this.vacancy = data;
        console.log('Vacancy Details:', this.vacancy);
      },
      (error) => {
        console.error('Error fetching vacancy details', error);
      }
    );
  }
}
