import { Routes } from '@angular/router';
import { HerosectionComponent } from './herosection/herosection.component';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { RecipepageComponent } from './recipepage/recipepage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './services/loginguard.service';
import { ProfileComponent } from './profile/profile.component';
import { TimerComponent } from './timer/timer.component';
import { RegisterComponent } from './register/register.component';

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
