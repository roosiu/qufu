import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { HerosectionComponent } from './features/start-panel/containers/herosection/herosection.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { SearchService } from './core/services/search.service';
import { SearchpageComponent } from './features/search-panel/container/searchpage/searchpage.component';
import { RecipepageComponent } from './features/recipe-panel/containers/recipepage/recipepage.component';
import { CookpageComponent } from './features/recipe-panel/components/cookpage/cookpage.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './core/components/spinner/spinner.component';
import { AuthService } from './core/services/auth.service';
import { PostService } from './core/services/post.service';
import { DeleteService } from './core/services/delete.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [SearchService, AuthService, PostService, DeleteService],
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
