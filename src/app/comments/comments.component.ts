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
    private postService: PostService
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

  addComment() {
    console.log('dodano');
  }

  ngOnInit(): void {
    this.authService.GetLogged().subscribe((bol: boolean) => {
      this.logged = bol;
      this.name = localStorage.getItem('name');
    });

    if (this.id) {
      this.searchService
        .getJsonData('?commentsByRecipeId=' + this.id)
        .subscribe((data) => {
          this.comments = data;
        });
    }
  }
}
