import { Component } from '@angular/core';
import { SearchService } from '../../../../core/services/search.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './articles-list.component.html',
  styleUrl: './articles-list.component.css',
})
export class ArticlesListComponent {
  articles: Array<any> = [];
  constructor(private searchService: SearchService) {
    this.searchService
      .getJsonData('?allarticles=10')
      .subscribe((data: Array<any>) => {
        this.articles = data;
      });
  }
}
