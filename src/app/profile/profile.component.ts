import { Component } from '@angular/core';
import { MatModule } from '../mat/mat.module';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  panelOpenState = false;
}
