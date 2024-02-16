import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HerosectionComponent } from './herosection/herosection.component';
import { FooterComponent } from './footer/footer.component';
import { SearchService } from './services/search.service';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { RecipepageComponent } from './recipepage/recipepage.component';
import { CookpageComponent } from './cookpage/cookpage.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [SearchService],
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    HerosectionComponent,
    FooterComponent,
    SearchpageComponent,
    RecipepageComponent,
    CookpageComponent,
    HttpClientModule,
    SpinnerComponent,
  ],
})
export class AppComponent {
  title = 'qufu';
  constructor() {}
}
