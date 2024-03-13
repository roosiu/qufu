import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatModule } from '../../modules/mat.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, MatModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  /**
   * Constructor for initializing search service, authentication service, router, and snack bar.
   *
   * @param {SearchService} searchService - the search service to be initialized
   * @param {AuthService} authService - the authentication service to be initialized
   * @param {Router} router - the router to be initialized
   * @param {MatSnackBar} _snackBar - the snack bar to be initialized
   */
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
      this.name = this.authService.GetName();
    });
  }

  /**
   * Logout function remove all login data and show snackbar info
   * @returns void
   *
   */
  logout() {
    this.authService.RemoveToken();
    this.authService.SetIsLogged(false);
    this.router.navigate(['']);
    this._snackBar.open('Wylogowano', '', {
      duration: 3000,
      panelClass: 'custom-snackbar',
    });
  }
}
