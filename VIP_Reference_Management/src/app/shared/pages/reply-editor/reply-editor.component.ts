import { Component } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-reply-editor',
  standalone: false,
  templateUrl: './reply-editor.component.html',
  styleUrl: './reply-editor.component.css'
})
export class ReplyEditorComponent {
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount'
  };
}
