import { Component } from '@angular/core';
import { PlatformAccessService } from '../../services/platform-access.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-platform-access',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './platform-access.component.html',
  styleUrl: './platform-access.component.css'
})
export class PlatformAccessComponent {
  platformAccesses: any[] = []; // Replace with a proper model if defined

  constructor(private platformAccessService: PlatformAccessService) { }

  ngOnInit(): void {
    this.getPlatformAccesses();
  }

  getPlatformAccesses(): void {
    this.platformAccessService.getPlatformAccesses().subscribe({
      next: (data) => {
        console.log('Platform Access Data:', data);
        // Sort data in descending order of `lastAccessDate`
        this.platformAccesses = data.sort((a: any, b: any) => {
          return new Date(b.lastAccessDate).getTime() - new Date(a.lastAccessDate).getTime();
        });
      },
      error: (err) => {
        console.error('Error fetching platform access data:', err);
      },
    });
  }
}
