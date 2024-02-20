import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLogged = this.authService.GetIsLoggedFromToken();
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    if (this.isLogged) {
      this.router.navigate(['/profile']);
    } else {
    }
  }
  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          localStorage.setItem('name', response.username);
          localStorage.setItem('token', response.token);
          this.authService.SetIsLogged(true);
          this.router.navigate(['']);
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
}
