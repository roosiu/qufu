import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(
    private searchService: SearchService,
    private authService: AuthService,
    private router: Router
  ) {}
  logged = false;
  name: any;
  ngOnInit(): void {
    this.authService.GetLogged().subscribe((bol: boolean) => {
      this.logged = bol;
      this.name = localStorage.getItem('name');
    });
  }

  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    this.authService.SetIsLogged(false);
    this.router.navigate(['']);
  }
}
