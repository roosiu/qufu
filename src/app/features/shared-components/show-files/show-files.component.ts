import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatModule } from '../../../core/modules/mat.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-files',
  standalone: true,
  imports: [MatModule, CommonModule, FormsModule],
  templateUrl: './show-files.component.html',
  styleUrl: './show-files.component.css',
})
export class ShowFilesComponent {
  @Input() files!: any;
  @Input() choseFile: boolean = false;
  @Input() location!: string;
  @Input() choseLocation: boolean = false;
  @Input() title: string = '';
  @Output() filesEvent = new EventEmitter();
  onSubmit() {
    const inputElement = document.querySelector(
      '#input'
    ) as HTMLInputElement | null;
    if (inputElement) {
      this.files = inputElement.value;
      this.filesEvent.emit(this.files);
    }
    if (this.choseLocation) {
      const locationElement = document.querySelector(
        '#location'
      ) as HTMLInputElement | null;
      if (locationElement) {
        this.location = locationElement.value;
      }
    }
  }
}
