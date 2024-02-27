import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatModule } from '../mat/mat.module';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule, MatModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRatingComponent {
  constructor() {
    this.rating = 0; // or any default value
  }
  @Input() rating: number;
  get stars() {
    return Array(Math.floor(this.rating)).fill(0);
  }
  get emptyStars() {
    let totalStars = 6;
    if (this.rating % 1 !== 0) {
      totalStars = 5;
    }
    const filledStars = Math.min(Math.floor(this.rating), totalStars);
    const emptyStarsCount = Math.max(totalStars - filledStars, 0);
    return Array(emptyStarsCount).fill(0);
  }
}
