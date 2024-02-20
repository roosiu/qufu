import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = 'poczta@poczta.pl';
  password: string = 'haslo123';
  errorMessage: string = '';
  constructor(private authService: AuthService) {}
  login() {
    console.log(this.email);
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          localStorage.setItem('token', response.token);
          console.log('Logowanie udane');
        } else {
          // Logowanie nieudane - wyświetl komunikat błędu
          this.errorMessage = response.message;
        }
      },
      error: (err) => {
        // Obsługa błędów po stronie klienta
        console.error('Błąd logowania:', err);
      },
    });
  }

  onSubmit() {
    this.login();
    // Call authentication service to log in
  }
}
