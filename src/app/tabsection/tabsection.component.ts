import { Component } from '@angular/core';
import { MatModule } from '../mat/mat.module';

@Component({
  selector: 'app-tabsection',
  standalone: true,
  imports: [MatModule],
  templateUrl: './tabsection.component.html',
  styleUrl: './tabsection.component.css',
})
export class TabsectionComponent {}
