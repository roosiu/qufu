import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHTML',
  standalone: true,
})
export class SafeHTMLPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  /**
   * A custom pipe to sanitize HTML.
   *
   * @param {string} html - parameter with html code
   * @returns {SafeHtml} - safe HTML code
   */
  transform(html: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
}
