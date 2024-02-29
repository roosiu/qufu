import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltip,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatPaginatorModule,
  ],
  exports: [
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltip,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatPaginatorModule,
  ],
})
export class MatModule {
  constructor(private paginator: MatPaginatorIntl) {
    paginator.itemsPerPageLabel = 'Ilość wpisów na stronie';
    paginator.nextPageLabel = 'Następna strona';
    paginator.lastPageLabel = 'Poprzednia strona';
    paginator.getRangeLabel = this.getCustomRangeLabel.bind(this);
  }

  getCustomRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return `0 z ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} z ${length}`;
  }
}
