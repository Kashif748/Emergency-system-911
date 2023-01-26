import { NgModule } from '@angular/core';
import { PhotoEditorComponent } from './photo-editor.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PhotoEditorComponent],
  imports: [CommonModule, TranslateModule],
  exports: [PhotoEditorComponent],
})
export class PhotoEditorModule {}
