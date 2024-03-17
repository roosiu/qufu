import { style, transition, animate } from '@angular/animations';

export const fadeAnimationIn = transition(':enter', [
  style({ opacity: 0 }),
  animate('0.3s', style({ opacity: 1 })),
]);

export const fadeAnimationOut = transition(':leave', [
  animate('0.3s', style({ opacity: 0 })),
]);
