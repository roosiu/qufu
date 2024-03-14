import { Component, OnInit, inject } from '@angular/core';
import { EditorComponent } from '../../components/editor/editor.component';
import { MatModule } from '../../../../core/modules/mat.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { SafeHTMLPipe } from '../../../../core/pipe/safe-html.pipe';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../../../core/services/search.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
@Component({
  selector: 'app-article-edit',
  standalone: true,
  imports: [
    EditorComponent,
    MatModule,
    CommonModule,
    FormsModule,
    SafeHTMLPipe,
  ],
  templateUrl: './article-edit.component.html',
  styleUrl: './article-edit.component.css',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class ArticleEditComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService
  ) {}
  article: any = [];
  title = '';
  author = '';
  date = new Date();
  content: any;
  newcontent: any;
  id: number = 0;
  tags = '';
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const inputText: any = params.get('inputText');
      this.id = inputText;
      if (this.id) {
        this.searchService
          .getJsonData('?article=' + this.id)
          .subscribe((data) => {
            this.article = data;
            this.title = this.article.title;
            this.author = this.article.author;
            this.date = new Date(this.article.publication_date);
            this.content = this.article.content;
            this.tags = this.article.tags;
          });
      } else {
        this.article = null;
      }
    });
  }

  onChangeContent(newItem: string | SafeHTMLPipe) {
    this.newcontent = newItem;
    console.log(this.newcontent);
  }

  announcer = inject(LiveAnnouncer);
  addOnBlur = true;
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.tags += ' #' + value;
    }
    // Clear the input value
    event.chipInput!.clear();
  }
  // to repair //
  remove(tag: string): void {
    if (tag) {
      const index = this.tags.indexOf(tag);
      if (index !== -1) {
        this.tags = this.tags
          .slice(0, index)
          .concat(this.tags.slice(index + 1));

        this.announcer.announce(`Removed ${tag}`);
      }
    }
  }
}
