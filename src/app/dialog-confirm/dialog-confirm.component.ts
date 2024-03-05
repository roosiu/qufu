import { Component, Inject } from '@angular/core';
import { MatModule } from '../mat/mat.module';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  standalone: true,
  imports: [MatModule, CommonModule],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.css',
})
export class DialogConfirmComponent {
  /**
   * Custom dialog component with confirm and close button
   * @param {string} title - title of the dialog
   * @param {string} body - body of the dialog
   * @param {string} confirm - text of the confirm button
   * @param {string} cancel - text of the cancel button
   * @param {string} icon - icon of the dialog
   *
   */
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      body: string;
      confirm: string;
      cancel: string;
      icon: string;
    }
  ) {}

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
