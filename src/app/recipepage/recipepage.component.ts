import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CookpageComponent } from '../cookpage/cookpage.component';
import { CommentsComponent } from '../comments/comments.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { MatModule } from '../mat/mat.module';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipepage',
  standalone: true,
  imports: [
    CommonModule,
    CookpageComponent,
    CommentsComponent,
    StarRatingComponent,
    MatModule,
    RouterModule,
  ],
  templateUrl: './recipepage.component.html',
  styleUrl: './recipepage.component.css',
})
export class RecipepageComponent implements OnInit {
  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  id: any = '';
  steps: any;
  recipe: any = [];
  cookStep: any = '';
  imgLocation = this.searchService.imgLocation;
  isFavorite: boolean = false;
  favoriteRecipe: string[] = [];
  isLogged: boolean = this.authService.GetIsLoggedFromToken();
  ngOnInit(): void {
    /**
     * Check if recipe is favorite
     * @param {any} favorite - favorite recipes
     * @param {any} id - id of the recipe
     * @returns {boolean} isFavorite - true if the recipe is favorite, false otherwise
     */
    if (this.isLogged) {
      this.authService
        .GetFavorite()
        .then((favorite) => {
          if (favorite.length == 0) {
            this.isFavorite = false;
          } else {
            this.favoriteRecipe = favorite;
            if (favorite.includes(this.id)) {
              this.isFavorite = true;
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    this.searchService.getcookStep().subscribe((text) => {
      this.cookStep = text;
    });
    this.activatedRoute.paramMap.subscribe((params) => {
      const inputText: any = params.get('inputText');
      this.id = inputText;

      if (this.id) {
        this.searchService.getJsonData('?id=' + this.id).subscribe((data) => {
          this.recipe = data;

          this.searchService
            .getJsonData('?ingredients=' + this.id)
            .subscribe((data) => {
              this.recipe.ingredients = data;
            });
          this.searchService
            .getJsonData('?steps=' + this.id)
            .subscribe((data) => {
              this.recipe.steps = data;
            });
          this.searchService
            .getJsonData('?ratings=' + this.id)
            .subscribe((data) => {
              this.recipe.rating = data[0].average_rating;
            });
        });
      }
    });
  }

  ///
  getClickedStart() {
    this.searchService.setcookStep(1);
  }
  getClickedClose() {
    this.searchService.getSearchString().subscribe((text) => {
      if (text) {
        this.router.navigate(['/search', text]);
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }
  deleteFavorite() {
    this.authService
      .UpdateProfile(
        'favorite',
        this.favoriteRecipe.filter((item) => item !== this.id).join(','),
        this.authService.GetToken()!,
        this.authService.GetName()!
      )
      .subscribe((response) => {
        if (response.success) {
          this.favoriteRecipe = this.favoriteRecipe.filter(
            (item) => item !== this.id
          );
          this.isFavorite = false;
          this._snackBar.open('Przepis został usunięty z ulubionych.', '', {
            duration: 3000,
            panelClass: 'custom-snackbar',
          });
        } else {
          this._snackBar.open('Błąd:' + response.message, '');
        }
      });
  }
  addFavorite() {
    let allFavorite: string;
    if (this.favoriteRecipe.toString() != '') {
      allFavorite = this.favoriteRecipe.concat(this.id).toString();
    } else {
      allFavorite = this.id.toString();
    }

    this.authService
      .UpdateProfile(
        'favorite',
        allFavorite,
        this.authService.GetToken()!,
        this.authService.GetName()!
      )
      .subscribe((response) => {
        if (response.success) {
          this.favoriteRecipe = this.favoriteRecipe.concat(this.id);
          this.isFavorite = true;
          this._snackBar.open('Przepis został dodany do ulubionych.', '', {
            duration: 3000,
            panelClass: 'custom-snackbar',
          });
        } else {
          this._snackBar.open('Błąd: ' + response.message, '', {
            duration: 3000,
            panelClass: 'custom-snackbar',
          });
        }
      });
  }
}
