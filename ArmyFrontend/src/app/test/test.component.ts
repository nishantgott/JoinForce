import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-test',
  standalone: true,
  template: `<h1>Testing HttpClient</h1>`,
})
export class TestComponent implements OnInit {
  response = '';
  constructor(private http: HttpClient) {
    console.log('HttpClient is injected successfully!');
  }

  ngOnInit(): void {
    console.log('Component is initialized successfully!');
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(
      (data) => {
        this.response = JSON.stringify(data);
        console.log('Data received:', data);
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }
}
