import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { CandidateCardComponent } from "../../candidate-card/candidate-card.component";

@Component({
  selector: 'app-candidate-profile-list',
  standalone: true,
  imports: [CommonModule, CandidateCardComponent],
  templateUrl: './candidate-profile-list.component.html',
  styleUrl: './candidate-profile-list.component.css'
})
export class CandidateProfileListComponent {
  users: any[] = [];
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
        console.log(users);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
