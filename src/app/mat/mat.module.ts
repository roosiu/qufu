import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

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
  ],
})
export class MatModule {}
