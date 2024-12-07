import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/login.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    // Get user from the localStorage if available
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(user);
    if (!user || !user.role) {
      this.router.navigate(['/login']);  // or any route you consider for unauthorized users
      return false;
    }

    // Get the required roles for this route
    const requiredRoles = route.data['roles'] as string[];

    // Check if the user has one of the required roles
    if (requiredRoles.some(role => user.role == role)) {
      return true;
    } else {
      // Redirect to some error or fallback page
      this.router.navigate(['/**']);
      return false;
    }
  }
}
