import { Component } from '@angular/core';
import { SearchbarComponent } from '../../../shared-components/searchbar/searchbar.component';
import { SearchService } from '../../../../core/services/search.service';
import { TabsectionComponent } from '../tabsection/tabsection.component';

@Component({
  selector: 'app-herosection',
  standalone: true,
  imports: [SearchbarComponent, TabsectionComponent],
  templateUrl: './herosection.component.html',
  styleUrl: './herosection.component.css',
})
export class HerosectionComponent {
  constructor(private searchService: SearchService) {}
  question: string = this.searchService.question;
}
