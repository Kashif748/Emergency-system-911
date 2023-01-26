import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-correspondence-attachments',
  templateUrl: './correspondence-attachments.component.html',
  styleUrls: ['./correspondence-attachments.component.scss'],
})
export class CorrespondenceAttachmentsComponent {
  // UI
  @Input() attachments: any[] = [];
  @ViewChild('input') input: ElementRef;
  @Output() outputFilesSelected: EventEmitter<any> = new EventEmitter();

  // Variables.
  files: any[] = [];

  uploadFiles() {
    if (this.files.length >= 4) {
      return;
    }
    this.input.nativeElement.click();
  }

  filesSelected(files: FileList) {
    for (let index = 0; index < files.length && index < 4; index++) {
      const file = files[index];
      const size = file.size;
      if (size <= 20971520) {
        if (!this.files.find((f) => f.name == file.name && f.lastModified == file.lastModified)) {
          this.attachments.push({ fileName: file.name });
          this.files.push(file);
        }
      } else {
        this.files.push('invalid');
      }
    }
    this.outputFilesSelected.emit(this.files);
  }

  removeFile(index: number) {
    this.attachments.splice(index, 1);
    this.files.splice(index, 1);
    this.outputFilesSelected.emit(this.files);
  }
}
