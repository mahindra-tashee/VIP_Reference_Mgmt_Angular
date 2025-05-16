import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EditorComponent } from '@tinymce/tinymce-angular';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-reply-editor',
  standalone: false,
  templateUrl: './reply-editor.component.html',
  styleUrl: './reply-editor.component.css'
})
export class ReplyEditorComponent {
  editorContent: string = "";
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount'
  };

  constructor(private dialogRef: MatDialogRef<ReplyEditorComponent>) { }

  confirmUpload(): void {
    const content = document.createElement('div');
    content.innerHTML = this.editorContent;
    document.body.appendChild(content);

    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.html(content, {
      callback: (doc) => {
        const blob = doc.output('blob');
        const file = new File([blob], 'generated.pdf', { type: 'application/pdf' });

        this.dialogRef.close({
          selectFile: file
        });

        document.body.removeChild(content);
      },
      x: 10,
      y: 10
    });
  }
}
