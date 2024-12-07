import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SignupComponent } from './pages/signup/signup.component';
import { CandidateCardComponent } from "./candidate-card/candidate-card.component";
import { CommonModule } from '@angular/common';
import { HeaderCandidateComponent } from "./components/header-candidate/header-candidate.component";
import { HeaderRecruiterComponent } from "./components/header-recruiter/header-recruiter.component";
import { HeaderMedicalOfficerComponent } from "./components/header-medical-officer/header-medical-officer.component";
import { HeaderExaminerComponent } from "./components/header-examiner/header-examiner.component";
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { HeaderLoggedOutComponent } from './components/header-logged-out/header-logged-out.component';
import { TestComponent } from "./test/test.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SignupComponent, CandidateCardComponent, CommonModule, HeaderCandidateComponent, HeaderRecruiterComponent, HeaderMedicalOfficerComponent, HeaderExaminerComponent, HeaderAdminComponent, HeaderLoggedOutComponent, TestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ArmyFrontend';
}
