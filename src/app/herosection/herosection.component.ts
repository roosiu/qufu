import { Component } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-herosection',
  standalone: true,
  imports: [SearchbarComponent, FooterComponent, NavbarComponent],
  templateUrl: './herosection.component.html',
  styleUrl: './herosection.component.css'
})
export class HerosectionComponent {
  question : string = 'Na co masz dzisiaj ochotę?';
}
