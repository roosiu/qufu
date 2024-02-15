import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookpage.component.html',
  styleUrl: './cookpage.component.css',
})
export class CookpageComponent implements OnInit {
  constructor(private searchService: SearchService) {}
  id: any = '';
  recipe: any = [];
  cookStep: any = '';
  imgLocation = this.searchService.imgLocation;
  ngOnInit(): void {
    this.searchService.getrecipeClick().subscribe((text) => {
      this.id = text;
      this.recipe = this.searchService.recipes[this.id - 1];
    });
    this.searchService.getcookStep().subscribe((text) => {
      this.cookStep = text;
    });
    this.searchService.getJsonData('?steps=' + this.id).subscribe((data) => {
      this.recipe.steps = data;
    });
  }
  getClickedStep(step: number) {
    this.searchService.setcookStep(this.cookStep + step);
  }
  getClickedClose() {
    this.searchService.setcookStep(0);
    this.searchService.setrecipeClick(this.recipe.id);
  }
}
