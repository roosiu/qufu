import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatModule } from '../mat/mat.module';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink, MatModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  searched = '';
  recipes = this.searchService.recipes;

  imgLocation = this.searchService.imgLocation;
  filteredRecipes: any[];
  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute
  ) {
    this.filteredRecipes = this.recipes;
  }
  @Input() showOption: any;
  ngOnInit(): void {
    this.searchService.setcookStep(0);
    this.activatedRoute.paramMap.subscribe((params) => {
      const inputText: any = params.get('inputText');

      this.searchService.setSearchString(inputText);

      this.searchService.getSearchString().subscribe((text) => {
        this.searched = text;
      });
      this.searchService.getJsonData('').subscribe((data) => {
        this.recipes = data;

        if (this.showOption === 'new') {
          this.filteredRecipes = this.recipes;
        } else {
          this.filteredRecipes = this.recipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(this.searched.toLowerCase())
          );
        }
      });
    });
  }
  public recipecount: any;
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
    // this.searchService
    //   .getJsonData(
    //     '?commentsByRecipeId=' +
    //       this.id +
    //       '&from=' +
    //       this.from +
    //       '&quantity=' +
    //       this.pageSize
    //   )
    //   .subscribe((data) => {
    //     this.comments = data;
    //   });
  }
}
