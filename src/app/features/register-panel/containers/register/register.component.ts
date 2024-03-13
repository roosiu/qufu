import { Component, OnInit } from '@angular/core';
import { MatModule } from '../../../../core/modules/mat.module';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../../../shared-components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  email: any = new FormControl('', [Validators.required, Validators.email]);
  password: any = new FormControl('', [Validators.required]);
  name: any = new FormControl('', [Validators.required]);
  errorMessage: string = '';
  isLogged = this.authService.GetIsLoggedFromToken();

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    if (this.isLogged) {
      this.router.navigate(['/profile']);
    }
  }
  register() {
    this.authService
      .register(this.email.value, this.password.value, this.name.value)
      .subscribe({
        next: (response) => {
          if (response.success) {
            const dialogRef = this.dialog.open(DialogComponent, {
              data: {
                title: 'Gratulacje!',
                body: 'Konto zostało utworzone. Możesz się teraz zalogować',
                button: 'Zamknij',
                icon: 'success',
              },
            });
            dialogRef
              .afterClosed()
              .subscribe(() => this.router.navigate(['/login']));
          } else {
            // Rejestrowanie nieudane - wyświetl komunikat błędu

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
