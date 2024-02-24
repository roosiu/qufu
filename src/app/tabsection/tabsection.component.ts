import { Component } from '@angular/core';
import { MatModule } from '../mat/mat.module';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-tabsection',
  standalone: true,
  imports: [MatModule, CardComponent],
  templateUrl: './tabsection.component.html',
  styleUrl: './tabsection.component.css',
})
export class TabsectionComponent {
  showOption: string = 'new';
}
