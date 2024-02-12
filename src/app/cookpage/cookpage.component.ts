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
  ngOnInit(): void {
    this.searchService.getrecipeClick().subscribe((text) => {
      this.id = text;
      this.recipe = this.searchService.recipes[this.id - 1];
    });
    this.searchService.getcookStep().subscribe((text) => {
      this.cookStep = text;
    });
  }
  getClickedStep(step: number) {
    this.searchService.setcookStep(this.cookStep + step);
  }
  getClickedClose() {
    this.searchService.setcookStep(0);
    this.searchService.setrecipeClick(0);
  }
}
