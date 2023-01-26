import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { TranslationService } from '../../../i18n/translation.service';
import { COLUMNS } from '../incidents-statistics.types';

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.scss'],
})
export class ExportDialogComponent implements OnInit {
  @ViewChild('exportDialog') private exportDialog: TemplateRef<any>;
  @Output() exportReport = new EventEmitter<any>();
  columns = COLUMNS;
  display: boolean = false;
  dialogRef;
  lang = 'en';

  constructor(
    public dialog: MatDialog,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
  }

  openDialog() {
    this.dialogRef = this.dialog.open(this.exportDialog, {
      maxHeight: '600px',
      maxWidth: '700px',
      panelClass: 'export-modal',
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  export(selectedColumns: MatListOption[], isPDF): void {
    const options = selectedColumns.map((item) => item.value);
    this.exportReport.emit({ selectedColumns: options, isPDF: isPDF });
    this.closeDialog();
  }
  selectAllStatus(list: MatSelectionList, selectAll: MatCheckboxChange) {
    if (selectAll.checked) {
      list.selectAll();
    } else {
      list.deselectAll();
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
