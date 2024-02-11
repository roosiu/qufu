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
  ngOnInit(): void {
    this.searchService.getrecipeClick().subscribe((text) => {
      this.id = text;
      this.recipe = this.searchService.recipes[this.id - 1];
    });
  }
}
