import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-searchpage',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,SearchbarComponent],
  templateUrl: './searchpage.component.html',
  styleUrl: './searchpage.component.css'
})
export class SearchpageComponent {

}
