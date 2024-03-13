import { Component } from '@angular/core';
import { EditorComponent } from '../../components/editor/editor.component';
import { MatModule } from '../../../../core/modules/mat.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-article-edit',
  standalone: true,
  imports: [EditorComponent, MatModule, CommonModule, FormsModule],
  templateUrl: './article-edit.component.html',
  styleUrl: './article-edit.component.css',
  providers: [provideNativeDateAdapter()],
})
export class ArticleEditComponent {
  title = '';
  author = '';
  date = '';
  content = '<b>test</b>';
}
