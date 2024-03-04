import { Component, OnInit } from '@angular/core';
import { MatModule } from '../mat/mat.module';
import { SearchService } from '../services/search.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { DeleteService } from '../services/delete.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatModule, CommonModule, RouterLink, StarRatingComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  constructor(
    private searchService: SearchService,
    private router: Router,
    private authService: AuthService,
    public sanitizer: DomSanitizer,
    private deleteService: DeleteService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  token: any;
  profile: any;
  favorite: any;
  id_to_delete: number = 0;
  imgLocation = this.searchService.imgLocation;

  /**
   * A function that takes a URL and returns a safe style.
   *
   * @param {string} url - the URL to be sanitized
   * @return {SafeStyle} the sanitized style for the URL
   */
  safeImageUrl(url: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url}.jpg)`);
  }
  errorMessage: string = '';
  /**
   * Deletes a comment by ID.
   *
   * @param {number} id_to_delete - the ID of the comment to delete
   * @return {void}
   */
  deleteComment(id_to_delete: number): void {
    const name = this.authService.GetName() || '';
    const token = this.authService.GetToken() || ''; // Assuming empty string as fallback
    let elementId = 'comment_' + id_to_delete;
    let elementToRemove = document.getElementById(elementId);
    console.log(elementId);

    this.deleteService.delete(token, name, id_to_delete, 'ratings').subscribe({
      next: (response) => {
        if (response.success) {
          if (elementToRemove) {
            elementToRemove.remove();
          }
          const dialogRef = this.dialog.open(DialogComponent, {
            data: {
              title: 'Poszło!',
              body: 'Wpis został Usunięty.',
              button: 'Zamknij',
              icon: 'success',
            },
          });
          // dialogRef.afterClosed().subscribe(() => window.location.reload());
        } else {
          // Dodawanie nieudane - wyświetl komunikat błędu
          this.errorMessage = response.message;
          this._snackBar.open('Błąd:' + response.message, 'Ok', {
            duration: 3000,
          });
        }
      },
      error: (err) => {
        // Obsługa błędów po stronie klienta
        console.error('Błąd :', err);
      },
    });
  }
  ngOnInit(): void {
    this.token = this.authService.GetToken();

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
                this.favorite = this.profile[0].favorite.split(',');
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
}
