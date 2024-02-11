import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  filteredRecipes: any[];
  constructor(private searchService: SearchService) {
    this.filteredRecipes = this.recipes;
  }

  ngOnInit(): void {
    this.searchService.getSearchString().subscribe((text) => {
      this.searched = text;

      if (this.searched.trim() === '') {
        this.filteredRecipes = this.recipes;
      } else {
        this.filteredRecipes = this.recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(this.searched.toLowerCase())
        );
      }
    });
  }

  getClicked(id: number) {
    this.searchService.setrecipeClick(id);
  }
}
