import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onSubmit() {
    // Call authentication service to log in
    console.log(this.email, this.password);
  }
}
