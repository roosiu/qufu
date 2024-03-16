import { Component } from '@angular/core';
import { MatModule } from '../../../../core/modules/mat.module';
import { CardComponent } from '../../../shared-components/card/card.component';
import { ArticlesListComponent } from '../../components/articles-list/articles-list.component';

@Component({
  selector: 'app-tabsection',
  standalone: true,
  imports: [MatModule, CardComponent, ArticlesListComponent],
  templateUrl: './tabsection.component.html',
  styleUrl: './tabsection.component.css',
})
export class TabsectionComponent {
  showOption: string = 'new';
}
