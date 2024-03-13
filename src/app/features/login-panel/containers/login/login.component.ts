import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatModule } from '../../../../core/modules/mat.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, MatModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: any = new FormControl('', [Validators.required, Validators.email]);
  password: any = new FormControl('', [Validators.required]);
  errorMessage: string = '';
  isLogged = this.authService.GetIsLoggedFromToken();
  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    if (this.isLogged) {
      this.router.navigate(['/profile']);
    } else {
    }
  }
  login() {
    this.authService.login(this.email.value, this.password.value).subscribe({
      next: (response) => {
        if (response.success) {
          localStorage.setItem('name', response.username);
          localStorage.setItem('token', response.token);
          this.authService.SetIsLogged(true);
          this.router.navigate(['']);
          this._snackBar.open('Zalogowano', '', {
            duration: 3000,
            panelClass: 'custom-snackbar',
          });
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
