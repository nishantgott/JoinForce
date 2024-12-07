import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { VacancyService } from "../../services/vacancy.service";
import { Application, ApplicationService } from "../../services/application.service";
import { DocumentVerification, DocumentVerificationService } from "../../services/document-verification.service";
import { UserNotification, UserNotificationsService } from "../../services/user-notifications.service";
import { CommonModule, CurrencyPipe, DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-vacancy',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, CommonModule, RouterModule, FormsModule],
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css']
})

export class VacancyComponent implements OnInit {
  wowId: number = 0;
  vacancy: any; // Vacancy data
  userId: number = 0;
  vacancyId: number = 0;
  showDocumentModal: boolean = false; // Controls modal visibility
  documentDetails: any = {
    document1: null,
    document1Type: '',
    document2: null,
    document2Type: '',
    document3: null,
    document3Type: '',
  };
  documentVerification: DocumentVerification = {
    verificationId: 0,  // Backend should auto-generate this
    applicationId: 0,  // Use the created application's ID
    documentType: 'Identity Proof',
    verificationStatus: 'Pending',
    remarks: '',
    document1: '',
    document1Type: '',
    document2: '',
    document2Type: '',
    document3: '',
    document3Type: '',
  };
  notification: UserNotification = {
    notificationId: 0,
    userId: 1,
    message: 'Welcome to JoinForce!',
    dateSent: new Date(),
    notificationType: 'INFO',
    readStatus: false
  };
  notification2: UserNotification = {
    notificationId: 0,
    userId: 1,
    message: 'Welcome to JoinForce!',
    dateSent: new Date(),
    notificationType: 'INFO',
    readStatus: false
  };
  createAndSendNotification(): void {
    if (this.notification.message.trim() !== '') {
      this.userNotificationsService.addUserNotifications(this.notification.userId, this.notification).subscribe(
        (response) => {
          console.log('Notification Created:', response);
        },
        (error) => {
          console.error('Error creating notification:', error);
        }
      );
    } else {
      console.log('Please enter a notification message');
    }
  }
  createAndSendNotification2(): void {
    if (this.notification2.message.trim() !== '') {
      this.userNotificationsService.addUserNotifications(this.notification2.userId, this.notification2).subscribe(
        (response) => {
          console.log('Notification Created:', response);
        },
        (error) => {
          console.error('Error creating notification:', error);
        }
      );
    } else {
      console.log('Please enter a notification message');
    }
  }

  constructor(
    private vacancyService: VacancyService,
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private documentVerificationService: DocumentVerificationService,
    private userNotificationsService: UserNotificationsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.wowId = +id!;
    if (id) {
      this.getVacancyDetails(+id); // Ensure vacancyId is a number
    }
  }

  // Open the modal
  openDocumentModal(): void {
    this.showDocumentModal = true;
  }

  // Close the modal
  closeDocumentModal(): void {
    this.showDocumentModal = false;
  }

  // Handle file input changes
  onFileChange(event: Event, documentField: string): void {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (file) {
      this.documentDetails[documentField] = file;
    }
  }

  // Submit document details and proceed with application submission
  submitDocumentDetails(): void {
    // Close modal
    this.closeDocumentModal();

    // Proceed with application submission
    this.onSubmit();

  }

  // Validate document details
  validateDocumentDetails(): boolean {
    return (
      this.documentDetails.document1 &&
      this.documentDetails.document1Type &&
      this.documentDetails.document2 &&
      this.documentDetails.document2Type &&
      this.documentDetails.document3 &&
      this.documentDetails.document3Type
    );
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
    if (!this.userId) {
      alert('Please login in as a candidate to apply for this vacancy');
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

              // Send notification to candidate
              this.notification.message = `You have successfully applied for ${this.vacancy.title}. Your application ID is ${createdApplication.applicationId}, has been sent for document review.`;
              this.notification.userId = createdApplication.userId;
              this.createAndSendNotification();

              //Send notification to recruiter
              this.notification2.message = `Candidate has applied for ${this.vacancy.title}. Their application ID is ${createdApplication.applicationId}`;
              this.notification2.userId = this.vacancy.postedBy;
              this.createAndSendNotification2();

              // Step 4: Create Document Verification for the created application

              this.documentVerification.applicationId = createdApplication.applicationId;

              this.documentVerificationService.createVerification(this.documentVerification).subscribe(
                (createdDocumentVerification) => {
                  console.log('Document Verification Created:', createdDocumentVerification);
                  // Handle success (maybe show a success message)
                  this.router.navigate(['/application-list']);
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
      },
      (error) => {
        console.error('Error fetching vacancy details', error);
      }
    );
  }
}
