import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { VacancyComponent } from './pages/vacancy/vacancy.component';
import { CreateVacancyComponent } from './pages/create-vacancy/create-vacancy.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'vacancy/:id', component: VacancyComponent },
    { path: 'create_vacancy', component: CreateVacancyComponent },
    { path: 'notifications', component: NotificationsComponent },
];
