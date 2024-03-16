import { Component, OnInit } from '@angular/core';
import { EditorComponent } from '../../components/editor/editor.component';
import { MatModule } from '../../../../core/modules/mat.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { SafeHTMLPipe } from '../../../../core/pipe/safe-html.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../../../core/services/search.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { ShowFilesComponent } from '../../../shared-components/show-files/show-files.component';
import { PostService } from '../../../../core/services/post.service';
import { AuthService } from '../../../../core/services/auth.service';
import { DialogComponent } from '../../../shared-components/dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-article-edit',
  standalone: true,
  imports: [
    EditorComponent,
    MatModule,
    CommonModule,
    FormsModule,
    SafeHTMLPipe,
    ShowFilesComponent,
    DialogComponent,
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
    private searchService: SearchService,
    private router: Router,
    private postService: PostService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  article: any = [];
  title = '';
  author = '';
  date = new Date();
  content: string = '';
  newcontent: any;
  id: string = '';
  tags = '';
  img = '';
  errorMessage: string = '';
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
              this.title = this.article.title;
              this.author = this.article.author;
              this.date = new Date(this.article.publication_date);
              this.content = this.article.content;
              this.tags = this.article.tags;
              this.img = this.article.image_path;
            }
          });
      } else if (this.id == 'new') {
        this.id = '';
      } else {
        this.router.navigate(['/pagenotfound']);
      }
    });
  }

  onChangeContent(newItem: string | SafeHTMLPipe) {
    this.newcontent = newItem;
  }
  onChangeFile(newItem: string) {
    this.img = newItem;
  }

  addOnBlur = true;
  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add
    if (value) {
      this.tags += ' #' + value;
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    if (tag) {
      const index = this.tags.indexOf(tag);
      if (index > 0) {
        this.tags = this.tags
          .slice(0, index - 1)
          .concat(this.tags.slice(index + tag.length));
      } else if (index === 0) {
        this.tags = this.tags
          .slice(0, index)
          .concat(this.tags.slice(index + 1 + tag.length));
      }
    }
  }

  save() {
    const token = this.authService.GetToken() || '';
    const name = this.authService.GetName() || '';
    this.postService
      .postUpdateArticle(
        this.id,
        token,
        name,
        this.title,
        this.author,
        this.date,
        this.newcontent || this.content,
        this.tags,
        this.img
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            const dialogRef = this.dialog.open(DialogComponent, {
              data: {
                title: 'Gratulacje!',
                body: 'Artykuł został zapisany.',
                button: 'Zamknij',
                icon: 'success',
              },
            });
            dialogRef.afterClosed().subscribe(() => window.location.reload());
          } else {
            // Dodawanie nieudane - wyświetl komunikat błędu
            this.errorMessage = response.message;
            this._snackBar.open('Błąd:' + response.message, 'Ok', {
              duration: 3000,
            });
          }
        },
        error: (err) => {
          // Obsługa błędów po stronie klienta
          console.error('Błąd :', err);
        },
      });
  }
}
