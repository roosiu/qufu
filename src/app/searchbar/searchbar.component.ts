import { Component} from '@angular/core';
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
  inputText: string = '';

  constructor(private searchService: SearchService){}
  sendText() {
    this.searchService.setSearchString(this.inputText);
    this.inputText = '';
  }

}
