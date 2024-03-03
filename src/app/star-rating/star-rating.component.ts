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
  /**
   * Star rating component
   * @date 2024-03-03
   */
  constructor() {
    this.rating = 0; // or any default value
  }
  @Input() rating: number;
  /**
   * Generate number of stars
   * @date 2024-03-03
   */
  get stars() {
    return Array(Math.floor(this.rating)).fill(0);
  }
  /**
   * Filling empty stars to six and checking if number of star %!==0
   * @date 2024-03-03
   */
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
