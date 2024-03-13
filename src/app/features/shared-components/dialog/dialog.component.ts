import { Component, Inject } from '@angular/core';
import { MatModule } from '../../../core/modules/mat.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatModule, CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  /**
   * Custom dialog component with info and close button
   * @date 2024-03-03
   * @param { * } parm1
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; body: string; button: string; icon: string }
  ) {}
}
