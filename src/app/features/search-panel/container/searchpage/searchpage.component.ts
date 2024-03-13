import { Component, OnInit } from '@angular/core';
import { SearchbarComponent } from '../../../shared-components/searchbar/searchbar.component';
import { SearchService } from '../../../../core/services/search.service';
import { CardComponent } from '../../../shared-components/card/card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchpage',
  standalone: true,
  imports: [SearchbarComponent, CardComponent, CommonModule],
  templateUrl: './searchpage.component.html',
  styleUrl: './searchpage.component.css',
})
export class SearchpageComponent implements OnInit {
  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute
  ) {}
  searched: string = '';

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const inputText: any = params.get('inputText');
      this.searchService.setSearchString(inputText);
      this.searched = inputText;
    });
  }
}
