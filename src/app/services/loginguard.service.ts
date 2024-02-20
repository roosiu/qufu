import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    // Odczytaj token z localStorage
    const token = localStorage.getItem('token');

    // Sprawdź, czy token istnieje
    const loggedIn = !!token;

    if (!loggedIn) {
      // Jeśli użytkownik nie jest zalogowany, przekieruj go do strony logowania
      //   alert(
      //     'Nie jesteś zalogowany i zostaniesz przekierowany do strony logowania'
      //   );
      this.router.navigate(['/login']);
    }

    return loggedIn;
  }
}
