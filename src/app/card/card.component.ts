import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
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

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const inputText: any = params.get('inputText');
      this.searchService.setSearchString(inputText);

      this.searchService.getSearchString().subscribe((text) => {
        this.searched = text;
      });
      this.searchService.getJsonData('').subscribe((data) => {
        this.recipes = data;

        if (this.searched.trim() === '') {
          this.filteredRecipes = this.recipes;
        } else {
          this.filteredRecipes = this.recipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(this.searched.toLowerCase())
          );
        }
      });
    });
  }
}
