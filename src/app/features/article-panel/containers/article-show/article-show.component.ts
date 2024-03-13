import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../../../core/services/search.service';
import { ShareButtonComponent } from '../../../shared-components/share-button/share-button.component';
import { ContentViewComponent } from '../../components/content-view/content-view.component';

@Component({
  selector: 'app-article-show',
  standalone: true,
  imports: [ShareButtonComponent, ContentViewComponent],
  templateUrl: './article-show.component.html',
  styleUrl: './article-show.component.css',
})
export class ArticleShowComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService
  ) {}
  id: any;
  article: any;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const inputText: any = params.get('inputText');
      this.id = inputText;
      if (this.id) {
        this.searchService
          .getJsonData('?article=' + this.id)
          .subscribe((data) => {
            this.article = data;
          });
      } else {
        this.article = null;
      }
    });
  }
}
