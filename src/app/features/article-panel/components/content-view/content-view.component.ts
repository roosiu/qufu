import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SafeHTMLPipe } from '../../../../core/pipe/safe-html.pipe';

@Component({
  selector: 'app-content-view',
  standalone: true,
  imports: [SafeHTMLPipe],
  templateUrl: './content-view.component.html',
  styleUrl: './content-view.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ContentViewComponent {
  @Input() content: any;
}
