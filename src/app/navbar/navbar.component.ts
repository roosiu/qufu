import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { MatModule } from '../mat/mat.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, MatModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(
    private searchService: SearchService,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
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
    this._snackBar.open('Wylogowano', 'OK', {
      duration: 3000,
    });
  }
}
