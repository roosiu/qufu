import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatModule } from '../mat/mat.module';
@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [FormsModule, RouterModule, MatModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent {
  inputText: any = '';

  constructor() {}
}
