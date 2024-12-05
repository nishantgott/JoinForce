import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../components/header-admin/header-admin.component';
import { HeaderCandidateComponent } from '../components/header-candidate/header-candidate.component';
import { HeaderRecruiterComponent } from '../components/header-recruiter/header-recruiter.component';
import { HeaderMedicalOfficerComponent } from '../components/header-medical-officer/header-medical-officer.component';
import { HeaderExaminerComponent } from '../components/header-examiner/header-examiner.component';
import { HeaderLoggedOutComponent } from '../components/header-logged-out/header-logged-out.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HeaderAdminComponent, HeaderCandidateComponent, HeaderRecruiterComponent, HeaderMedicalOfficerComponent, HeaderExaminerComponent, HeaderLoggedOutComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
        console.log(this.user);
      }
    }
  }
}
