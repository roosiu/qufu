import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatModule } from '../../../core/modules/mat.module';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    MatModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent {
  constructor() {}
  inputText = new FormControl('', [Validators.minLength(3)]);
}
