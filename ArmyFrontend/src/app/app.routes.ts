import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { VacancyComponent } from './pages/vacancy/vacancy.component';
import { CreateVacancyComponent } from './pages/create-vacancy/create-vacancy.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { VacancylistComponent } from './pages/vacancylist/vacancylist.component';
import { ApplicationlistComponent } from './pages/applicationlist/applicationlist.component';
import { OfferslistComponent } from './pages/offerslist/offerslist.component';
import { ApplicationReviewComponent } from './pages/application-review/application-review.component';
import { ExamResultsChangeComponent } from './pages/exam-results-change/exam-results-change.component';
import { ExamResultsCompletedComponent } from './pages/exam-results-completed/exam-results-completed.component';
import { CandidateProfileComponent } from './pages/candidate-profile/candidate-profile.component';
import { CandidateCardComponent } from './candidate-card/candidate-card.component';
import { CandidateProfileListComponent } from './pages/candidate-profile-list/candidate-profile-list.component';
import { TestExamListComponent } from './pages/test-exam-list/test-exam-list.component';
import { TestExamList2Component } from './pages/test-exam-list2/test-exam-list2.component';
import { CreateEvaluationReportComponent } from './pages/create-evaluation-report/create-evaluation-report.component';
import { EvaluationReportListComponent } from './pages/evaluation-report-list/evaluation-report-list.component';
import { ResultsListComponent } from './pages/results-list/results-list.component';
import { ResultsListExamComponent } from './pages/results-list-exam/results-list-exam.component';
import { ApplicationReviewListComponent } from './pages/application-review-list/application-review-list.component';
import { ApplicationReviewListCompletedComponent } from './pages/application-review-list-completed/application-review-list-completed.component';
import { SearchComponent } from './pages/search/search.component';
import { TrainingProgramListComponent } from './pages/training-program-list/training-program-list.component';
import { CreateTrainingProgramComponent } from './pages/create-training-program/create-training-program.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { RecruiterVacancyListComponent } from './recruiter-vacancy-list/recruiter-vacancy-list.component';
import { ReportComponent } from './pages/report/report.component';
import { HomeComponent } from './pages/home/home.component';
import { RoleGuard } from './role.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FaqComponent } from './pages/faq/faq.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'vacancy/:id', component: VacancyComponent },
    { path: 'create_vacancy', component: CreateVacancyComponent, canActivate: [RoleGuard], data: { roles: ['Admin', 'Recruiter'] } },
    { path: 'notifications', component: NotificationsComponent, canActivate: [RoleGuard], data: { roles: ['Admin', 'Recruiter', 'MedicalOfficer', 'Examiner', 'Candidate'] } },
    { path: 'vacancy-list', component: VacancylistComponent },
    { path: 'application-list', component: ApplicationlistComponent, canActivate: [RoleGuard], data: { roles: ['Candidate'] } },
    { path: 'offer-list', component: OfferslistComponent, canActivate: [RoleGuard], data: { roles: ['Candidate'] } },
    { path: 'application-review/:id', component: ApplicationReviewComponent, canActivate: [RoleGuard], data: { roles: ['Recruiter', 'Admin'] } },
    { path: 'exam-results-change', component: ExamResultsChangeComponent, canActivate: [RoleGuard], data: { roles: ['Examiner', 'Admin'] } },
    { path: 'exam-results-completed', component: ExamResultsCompletedComponent, canActivate: [RoleGuard], data: { roles: ['Examiner', 'Admin'] } },
    { path: 'candidate-profile/:id', component: CandidateProfileComponent },
    { path: 'candidate-profile-list', component: CandidateProfileListComponent, canActivate: [RoleGuard], data: { roles: ['Admin', 'Recruiter', 'MedicalOfficer', 'Examiner'] } },
    { path: 'test-exam-list', component: TestExamListComponent, canActivate: [RoleGuard], data: { roles: ['Candidate'] } },
    { path: 'test-exam-list2', component: TestExamList2Component, canActivate: [RoleGuard], data: { roles: ['Candidate'] } },
    { path: 'create-evaluation-report', component: CreateEvaluationReportComponent, canActivate: [RoleGuard], data: { roles: ['Admin', 'MedicalOfficer'] } },
    { path: 'evaluation-report-list', component: EvaluationReportListComponent, canActivate: [RoleGuard], data: { roles: ['Admin', 'MedicalOfficer'] } },
    { path: 'results-list', component: ResultsListComponent, canActivate: [RoleGuard], data: { roles: ['Candidate'] } },
    { path: 'results-list-exam', component: ResultsListExamComponent, canActivate: [RoleGuard], data: { roles: ['Candidate'] } },
    { path: 'application-review-list', component: ApplicationReviewListComponent, canActivate: [RoleGuard], data: { roles: ['Admin', 'Recruiter'] } },
    { path: 'application-review-list-completed', component: ApplicationReviewListCompletedComponent, canActivate: [RoleGuard], data: { roles: ['Admin', 'Recruiter'] } },
    { path: 'search', component: SearchComponent },
    { path: 'search/:query', component: SearchComponent },
    { path: 'training-program-list', component: TrainingProgramListComponent, canActivate: [RoleGuard], data: { roles: ['Candidate'] } },
    { path: 'create-training-program', component: CreateTrainingProgramComponent, canActivate: [RoleGuard], data: { roles: ['Admin', 'Recruiter'] } },
    { path: 'analytics/:id', component: AnalyticsComponent, canActivate: [RoleGuard], data: { roles: ['Admin', 'Recruiter'] } },
    { path: 'my-vacancies', component: RecruiterVacancyListComponent, canActivate: [RoleGuard], data: { roles: ['Admin', 'Recruiter'] } },
    { path: 'report/:id', component: ReportComponent, canActivate: [RoleGuard], data: { roles: ['Admin', 'Recruiter'] } },
    { path: 'vacancy/:vacancyId/faq', component: FaqComponent },
    { path: '**', component: NotFoundComponent },
];
