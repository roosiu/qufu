import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { MatModule } from '../mat/mat.module';
import { SearchService } from '../services/search.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { PostService } from '../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-comments',
  standalone: true,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
  imports: [
    MatModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    StarRatingComponent,
  ],
})
export class CommentsComponent implements OnInit {
  @Input() id: any;
  comments: any; /// komentarze pobrane
  commentForm: FormGroup;
  newComment: FormControl; // nowy komentarz
  starRate: FormControl; // ocena do nowego komentarza
  logged = false; // status zalogowania
  name: any; // nazwa użytkownika

  constructor(
    private searchService: SearchService,
    private fb: FormBuilder,
    private authService: AuthService,
    private elementRef: ElementRef,
    private postService: PostService,
    private _snackBar: MatSnackBar,
    private location: Location,
    public dialog: MatDialog,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.newComment = new FormControl('', [Validators.maxLength(450)]);
    this.starRate = new FormControl('', [Validators.required]);
    this.commentForm = new FormGroup({
      newComment: this.newComment,
      starRate: this.starRate,
    });
  }

  getStar(number: number) {
    const starRateControl = this.commentForm.get('starRate');
    if (starRateControl) {
      starRateControl.setValue(number);
    } // przypisywanie wartości zmiennej
    setTimeout(() => {
      const classToClear = [
        ...this.elementRef.nativeElement.querySelectorAll('.new-stars'),
      ];
      classToClear.forEach((element) => {
        element.innerHTML = 'star_outline';
      });

      for (let i = 1; i < number + 1; i++) {
        const id = 'start' + i;
        const element = this.elementRef.nativeElement.querySelector('#' + id);
        if (element) {
          element.innerHTML = 'star';
        } else {
          console.error('Element with id ' + id + ' not found.');
        }
      }
    }, 0); // Ensuring it runs after the elements are rendered
  }

  errorMessage: string = '';
  addComment() {
    const token = this.authService.GetToken() || ''; // Assuming empty string as fallback

    this.postService
      .post(
        token,
        this.name,
        this.id,
        this.starRate.value,
        this.newComment.value
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            const dialogRef = this.dialog.open(DialogComponent, {
              data: {
                title: 'Gratulacje!',
                body: 'Wpis został dodany.',
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

  ngOnInit(): void {
    this.authService.GetLogged().subscribe((bol: boolean) => {
      this.logged = bol;
      this.name = localStorage.getItem('name');
    });

    if (this.id) {
      this.searchService
        .getJsonData('?commentsCount=' + this.id)
        .subscribe((data) => {
          this.commentscount = data[0].total_count;
        });
      this.searchService
        .getJsonData(
          '?commentsByRecipeId=' +
            this.id +
            '&from=' +
            this.currentPage +
            '&quantity=' +
            this.pageSize
        )
        .subscribe((data) => {
          this.comments = data;
        });
    }
  }

  public commentscount: any;
  public pageSize: number = 10;
  public currentPage: number = 0;
  public from: number = 0;
  getPaginatorData(event: PageEvent) {
    if (event.pageIndex == 0) {
      this.from = event.pageIndex;
      this.pageSize = event.pageSize;
    } else {
      this.from = event.pageIndex * event.pageSize;
      this.pageSize = event.pageSize;
    }
    this.searchService
      .getJsonData(
        '?commentsByRecipeId=' +
          this.id +
          '&from=' +
          this.from +
          '&quantity=' +
          this.pageSize
      )
      .subscribe((data) => {
        this.comments = data;
      });
  }
}
