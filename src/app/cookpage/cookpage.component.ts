import { Component, Input, OnInit } from '@angular/core';
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
  cookStep: any = '';
  imgLocation = this.searchService.imgLocation;
  @Input() recipe: any;
  ngOnInit(): void {
    this.searchService.getcookStep().subscribe((text) => {
      this.cookStep = text;
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
