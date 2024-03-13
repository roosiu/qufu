import { Routes } from '@angular/router';
import { HerosectionComponent } from './features/start-panel/containers/herosection/herosection.component';
import { SearchpageComponent } from './features/search-panel/container/searchpage/searchpage.component';
import { RecipepageComponent } from './features/recipe-panel/containers/recipepage/recipepage.component';
import { PagenotfoundComponent } from './core/components/pagenotfound/pagenotfound.component';
import { LoginComponent } from './features/login-panel/containers/login/login.component';
import { LoginGuard } from './core/guards/loginguard.guard';
import { ProfileComponent } from './features/profile-panel/containers/profile/profile.component';
import { TimerComponent } from './features/recipe-panel/components/timer/timer.component';
import { RegisterComponent } from './features/register-panel/containers/register/register.component';
import { ArticleShowComponent } from './features/article-panel/containers/article-show/article-show.component';
import { ArticleEditComponent } from './features/article-panel/containers/article-edit/article-edit.component';

export const routes: Routes = [
  { path: '', component: HerosectionComponent },
  {
    path: 'search/:inputText',
    component: SearchpageComponent,
  },
  { path: 'id/:inputText', component: RecipepageComponent },
  { path: 'article/:inputText', component: ArticleShowComponent },
  { path: 'article/edit/:inputText', component: ArticleEditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] },
  { path: '**', component: PagenotfoundComponent },
];
