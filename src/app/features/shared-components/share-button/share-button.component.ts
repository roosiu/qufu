import { Component, Input, OnInit } from '@angular/core';
import { MatModule } from '../../../core/modules/mat.module';

@Component({
  selector: 'app-share-button',
  standalone: true,
  imports: [MatModule],
  templateUrl: './share-button.component.html',
  styleUrl: './share-button.component.css',
})
export class ShareButtonComponent implements OnInit {
  ngOnInit(): void {
    if (!this.url) {
      this.url = window.location.href;
    }
  }
  @Input() type?: string;
  @Input() url?: string;

  fbShare(url: string) {
    window.open(
      'https://www.facebook.com/sharer/sharer.php?u=' + url,
      'facebook-share-dialog',
      'width=626,height=436'
    );
  }
  twitterShare(url: string) {
    window.open('https://twitter.com/intent/tweet?url=' + url);
  }
}
