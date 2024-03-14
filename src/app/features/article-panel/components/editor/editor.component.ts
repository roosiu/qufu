import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule, Editor, Toolbar, toHTML } from 'ngx-editor';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [NgxEditorModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit, OnDestroy {
  constructor() {
    this.editor = new Editor();
  }
  @Input() html: any = '';
  @Output() newHTML: any = new EventEmitter<any>();
  editor: Editor;

  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ];

  onChange() {
    if (this.html) {
      this.newHTML.emit(toHTML(this.html));
    }
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
