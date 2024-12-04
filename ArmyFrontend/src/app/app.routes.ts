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

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'vacancy/:id', component: VacancyComponent },
    { path: 'create_vacancy', component: CreateVacancyComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'vacancy-list', component: VacancylistComponent },
    { path: 'application-list', component: ApplicationlistComponent },
    { path: 'offer-list', component: OfferslistComponent },
    { path: 'application-review/:id', component: ApplicationReviewComponent },
    { path: 'exam-results-change', component: ExamResultsChangeComponent },
    { path: 'exam-results-completed', component: ExamResultsCompletedComponent },
    { path: 'candidate-profile/:id', component: CandidateProfileComponent },
    { path: 'candidate-profile-list', component: CandidateProfileListComponent },
];
