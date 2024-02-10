import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HerosectionComponent } from './herosection/herosection.component';
import { FooterComponent } from './footer/footer.component';
import { SearchService } from './services/search.service';
import { SearchpageComponent } from './searchpage/searchpage.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, HerosectionComponent,FooterComponent, SearchpageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [SearchService]
})
export class AppComponent implements OnInit{
  title = 'qufu';
  constructor(private searchService: SearchService) {
  }
   lastText : string = '';

  ngOnInit(): void {
    this.searchService.getSearchString().subscribe(text => {
      this.lastText = text;
    });
  }


}
