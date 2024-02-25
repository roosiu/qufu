import { Component, Input, OnInit } from '@angular/core';
import { MatModule } from '../mat/mat.module';
import { SearchService } from '../services/search.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [MatModule, CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  @Input() id: any;
  comments: any;
  constructor(private searchService: SearchService) {}
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
    if (this.id) {
      this.searchService
        .getJsonData('?commentsByRecipeId=' + this.id)
        .subscribe((data) => {
          this.comments = data;
        });
    }
  }
}
