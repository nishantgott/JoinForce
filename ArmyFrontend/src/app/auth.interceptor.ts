import { HttpRequest, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/login.service'; // Assuming your AuthService is properly defined
import { Observable } from 'rxjs';

// The functional interceptor
export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: import('@angular/common/http').HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  // const authService = inject(AuthService); // Using inject to get an instance of AuthService
  // const token = authService.getToken();
  let token: string | null = 'sdfkhsdf';
  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('jwtToken');
  }

  // console.log(token);

  // Logging for debugging purposes
  console.log('Interceptor triggered for request:', request.url);
  // console.log('Using token:', token); // Ensure the token is retrieved

  // Clone the request and add the Authorization header
  const authReq = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Continue the request with the modified headers
  return next(authReq);
};
