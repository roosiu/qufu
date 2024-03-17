import { Component } from '@angular/core';
import { SearchService } from '../../../../core/services/search.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatModule } from '../../../../core/modules/mat.module';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatModule],
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
