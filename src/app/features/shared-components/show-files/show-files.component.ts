import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatModule } from '../../../core/modules/mat.module';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetFilesUrls } from '../../../core/enums/urls';
import { MatDialog } from '@angular/material/dialog';
import { ChangeFileModalComponent } from './components/change-file-modal/change-file-modal.component';
@Component({
  selector: 'app-show-files',
  standalone: true,
  imports: [MatModule, CommonModule, FormsModule, ChangeFileModalComponent, NgOptimizedImage],
  templateUrl: './show-files.component.html',
  styleUrl: './show-files.component.css',
})
export class ShowFilesComponent {
  constructor(public dialog: MatDialog) {}
  mainLocation = GetFilesUrls.MAIN_FILES_URL;
  @Input() files!: any;
  @Input() location!: string;
  @Input() title: string = '';
  @Input() type: string = 'images';
  @Output() filesEvent = new EventEmitter();
  changeFile() {
    const dialogRef = this.dialog.open(ChangeFileModalComponent, {
      data: {
        location: this.location,
        type: this.type,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result == 'clear') {
          this.files = '';
          this.filesEvent.emit('');
        } else {
          this.files = result;
          this.filesEvent.emit(result);
        }
      }
    });
  }
}
