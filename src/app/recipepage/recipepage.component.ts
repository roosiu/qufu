import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipepage.component.html',
  styleUrl: './recipepage.component.css',
})
export class RecipepageComponent implements OnInit {
  constructor(private searchService: SearchService) {}
  id: any = '';
  recipe: any = [];
  cookStep: any = '';
  imgLocation = this.searchService.imgLocation;
  ngOnInit(): void {
    this.searchService.getrecipeClick().subscribe((text) => {
      this.id = text;
      this.recipe = this.searchService.recipes[this.id - 1];
      if (this.id) {
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
      }
    });
  }
  getClickedStart() {
    this.searchService.setcookStep(1);
  }
  getClickedClose() {
    this.searchService.setcookStep(0);
    this.searchService.setrecipeClick(0);
  }
}
