import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CookpageComponent } from '../cookpage/cookpage.component';

@Component({
  selector: 'app-recipepage',
  standalone: true,
  imports: [CommonModule, CookpageComponent],
  templateUrl: './recipepage.component.html',
  styleUrl: './recipepage.component.css',
})
export class RecipepageComponent implements OnInit {
  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  id: any = '';
  steps: any;
  recipe: any = [];
  cookStep: any = '';
  imgLocation = this.searchService.imgLocation;
  ngOnInit(): void {
    this.searchService.getcookStep().subscribe((text) => {
      this.cookStep = text;
    });
    this.activatedRoute.paramMap.subscribe((params) => {
      const inputText: any = params.get('inputText');
      this.id = inputText;

      if (this.id) {
        this.searchService.getJsonData('?id=' + this.id).subscribe((data) => {
          this.recipe = data;

          this.searchService
            .getJsonData('?ingredients=' + this.id)
            .subscribe((data) => {
              this.recipe.ingredients = data;
            });
          this.searchService
            .getJsonData('?steps=' + this.id)
            .subscribe((data) => {
              this.recipe.steps = data;
            });
          this.searchService
            .getJsonData('?ratings=' + this.id)
            .subscribe((data) => {
              this.recipe.rating = data[0].average_rating;
            });
        });
      }
    });
  }

  /// oceny
  getStarsArray(rating: number): number[] {
    const fullStarsCount = 6 - Math.floor(rating / 2);
    return Array(fullStarsCount).fill(0);
  }

  getEmptyStarsArray(rating: number): number[] {
    const emptyStarsCount = Math.floor(rating / 2);
    return Array(emptyStarsCount).fill(0);
  }

  ///
  getClickedStart() {
    this.searchService.setcookStep(1);
  }
  getClickedClose() {
    this.searchService.getSearchString().subscribe((text) => {
      if (text) {
        this.router.navigate(['/search', text]);
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }
}
