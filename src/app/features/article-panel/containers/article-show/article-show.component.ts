import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../../../core/services/search.service';
import { ShareButtonComponent } from '../../../shared-components/share-button/share-button.component';
import { ContentViewComponent } from '../../components/content-view/content-view.component';
import { MatModule } from '../../../../core/modules/mat.module';
import { CommonModule } from '@angular/common';
import { trigger } from '@angular/animations';
import { fadeAnimationIn } from '../../../../core/animations/fade';
import { BackButtonComponent } from '../../../shared-components/back-button/back-button.component';
import { GetFilesUrls } from '../../../../core/enums/urls';
import { ExtraService } from '../../../../core/services/extra.service';
@Component({
  selector: 'app-article-show',
  standalone: true,
  imports: [
    ShareButtonComponent,
    ContentViewComponent,
    MatModule,
    CommonModule,
    BackButtonComponent,
  ],
  animations: [trigger('fade', [fadeAnimationIn])],
  templateUrl: './article-show.component.html',
  styleUrl: './article-show.component.css',
})
export class ArticleShowComponent implements OnInit, AfterViewInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private router: Router,
    private extraService: ExtraService
  ) {}
  ngAfterViewInit(): void {
    this.extraService.scrollToTop();
  }
  id: any;
  article: any;
  assetsLocation = GetFilesUrls.MAIN_FILES_URL;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const inputText: any = params.get('inputText');
      this.id = inputText;
      if (!Number.isNaN(Number(this.id))) {
        this.searchService
          .getJsonData('?article=' + this.id)
          .subscribe((data) => {
            if (data.length == 0) {
              this.router.navigate(['/pagenotfound']);
            } else {
              this.article = data;
            }
          });
      } else {
        this.router.navigate(['/pagenotfound']);
      }
    });
  }
}
