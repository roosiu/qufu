import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExtraService {
  constructor() {}
  scrollToTop() {
    window.scrollTo({
      top: 0,
    });
  }
}
