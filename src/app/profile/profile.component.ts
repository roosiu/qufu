import { Component, OnInit } from '@angular/core';
import { MatModule } from '../mat/mat.module';
import { SearchService } from '../services/search.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatModule, CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  constructor(
    private searchService: SearchService,
    private router: Router,
    private authService: AuthService,
    public sanitizer: DomSanitizer
  ) {}
  token: any;
  profile: any;

  imgLocation = this.searchService.imgLocation;
  safeImageUrl(url: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url}.jpg)`);
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.searchService
        .getJsonData('?token=' + this.token)
        .subscribe((data) => {
          if (data.length > 0) {
            this.profile = data;
            this.searchService
              .getJsonData('?comments=' + this.profile[0].id)
              .subscribe((data) => {
                this.profile[0].comments = data;
              });
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            this.token = 0;
            this.profile = '';
            this.router.navigate(['']);
            this.authService.SetIsLogged(false);
          }
        });
    } else {
      this.router.navigate(['']);
      this.authService.SetIsLogged(false);
    }
  }
  panelOpenState = false;
}