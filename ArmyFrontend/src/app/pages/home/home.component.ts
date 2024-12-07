import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  currentSlide: number = 0;
  searchTerm: string = '';

  slides = [
    {
      image: 'https://live.staticflickr.com/7457/16357051607_9c194d534e_b.jpg',
      title: 'Welcome to JoinForce',
      description: 'Join the force, serve your country, and build a strong future.',
    },
    {
      image: 'https://wallpapers.com/images/featured/army-fmyvbfpcbu03f4vq.jpg',
      title: 'Discover Opportunities',
      description: 'Explore various roles to make a difference.',
    },
    {
      image: 'https://media.gettyimages.com/id/1149090568/video/army-soldiers-marching-on-military-parade.jpg?s=640x640&k=20&c=dWIsdUazMfh3UTGGP24WYkaxq7FCZ73eJYa6SofukpQ=',
      title: 'Be Part of the Legacy',
      description: 'Work with dedication and pride.',
    },
  ];

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  onSearch(): void {
    console.log(`Searching for: ${this.searchTerm}`);
  }
}
