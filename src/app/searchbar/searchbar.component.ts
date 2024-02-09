import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  constructor(private searchService: SearchService){}
  searchString = this.searchService.searchString;

  logkonsoli = (value: string) => {
    console.log(value);
  }

}
