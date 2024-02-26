import { Component, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [MatModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  @Input() id: any;
  comments: any;
  commentForm: FormGroup;
  newComment: FormControl;
  logged = false;
  name: any;
  constructor(
    private searchService: SearchService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.newComment = new FormControl('', [Validators.maxLength(450)]);
    this.commentForm = new FormGroup({
      newComment: this.newComment,
    });
  }

  /// oceny
  getStarsArray(rating: number): number[] {
    const fullStarsCount = Math.floor(rating);
    return Array(fullStarsCount).fill(0);
  }

  getEmptyStarsArray(rating: number): number[] {
    const emptyStarsCount = 6 - Math.floor(rating);
    return Array(emptyStarsCount).fill(0);
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
