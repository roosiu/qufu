import { style, transition, animate } from '@angular/animations';

export const slideIn = transition(':enter', [
  style({ transform: 'translateX(100%)' }),
  animate('300ms ease-in', style({ transform: 'translateX(0)' })),
]);
export const slideOut = transition(':leave', [
  animate('300ms ease-out', style({ transform: 'translateX(100%)' })),
]);
