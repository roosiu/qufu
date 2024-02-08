import { Routes } from '@angular/router';
import { HerosectionComponent } from './herosection/herosection.component';
import { SearchpageComponent } from './searchpage/searchpage.component';

export const routes: Routes = [
    { path: 'home', component: HerosectionComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: 'search', component: SearchpageComponent}  //
    
];
