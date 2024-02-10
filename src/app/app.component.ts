import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HerosectionComponent } from './herosection/herosection.component';
import { FooterComponent } from './footer/footer.component';
import { SearchService } from './services/search.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, HerosectionComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [SearchService]
})
export class AppComponent {
  title = 'qufu';
  constructor(private searchService: SearchService) {
  }

string = this.searchService.getSearchString(); //// do poprawki jutro

}
