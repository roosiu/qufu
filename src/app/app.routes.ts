import { Routes } from '@angular/router';
import { HerosectionComponent } from './pages/herosection/herosection.component';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { RecipepageComponent } from './recipepage/recipepage.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './services/loginguard.service';
import { ProfileComponent } from './profile/profile.component';
import { TimerComponent } from './timer/timer.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', component: HerosectionComponent },
  {
    path: 'search/:inputText',
    component: SearchpageComponent,
  },
  { path: 'id/:inputText', component: RecipepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] },
  { path: '**', component: PagenotfoundComponent },
];
