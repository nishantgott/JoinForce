import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  standalone: true,
  template: `<h1>Testing HttpClient</h1>`,
})
export class TestComponent {
  constructor(private http: HttpClient) {
    console.log('HttpClient is injected successfully!');
  }
}
