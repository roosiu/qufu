import { Component, OnInit } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { SearchService } from '../services/search.service';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchpage',
  standalone: true,
  imports: [SearchbarComponent, CardComponent, CommonModule],
  templateUrl: './searchpage.component.html',
  styleUrl: './searchpage.component.css'
})
export class SearchpageComponent implements OnInit{
  constructor(private searchService: SearchService) {
  }
  searched : string = '';

  ngOnInit(): void {
    this.searchService.getSearchString().subscribe(text => {
      this.searched = text;
  });
  }
}
