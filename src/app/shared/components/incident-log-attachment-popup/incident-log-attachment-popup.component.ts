import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { TranslateService } from '@ngx-translate/core';
import {
  STEP_STATE,
  NgWizardConfig,
  THEME,
  StepChangedArgs,
  StepValidationArgs,
  NgWizardService,
} from 'ng-wizard';
import { of } from 'rxjs';
import { LogFileBottomSheetComponent } from 'src/app/modules/incidents/log-file-bottom-sheet/log-file-bottom-sheet.component';

@Component({
  selector: 'app-incident-log-attachment-popup',
  templateUrl: './incident-log-attachment-popup.component.html',
  styleUrls: ['./incident-log-attachment-popup.component.scss'],
})
export class IncidentLogAttachmentPopupComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('worklogs') worklogs: MatSelectionList;
  @ViewChild('files') files: MatSelectionList;
  selectedWorkLogs: any[] = [];
  selectedFiles: any[] = [];
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden,
  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
    toolbarSettings: {
      toolbarExtraButtons: [
        {
          text: this.translateService.instant('ACTIONS.CONFIRM'),
          class: 'btn btn-info',
          event: () => {
            this.confirm();
          },
        },
      ],
    },
    anchorSettings: {
      anchorClickable: false,
      markDoneStep: true,
      removeDoneStepOnNavigateBack: true,
      enableAnchorOnDoneStep: true,
    },
    lang: {
      next: this.translateService.instant('ACTIONS.NEXT'),
      previous: this.translateService.instant('ACTIONS.PREVIOUS'),
    },
  };
  constructor(
    public dialogRef: MatDialogRef<IncidentLogAttachmentPopupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { worklogs: any[]; files: any[] },
    private ngWizardService: NgWizardService,
    private bottomSheet: MatBottomSheet,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.worklogs.selectionChange.subscribe((change) => {
      this.selectedWorkLogs = this.worklogs.selectedOptions.selected.map(
        (v) => v.value
      );
    });

    this.files.selectionChange.subscribe((change) => {
      this.selectedFiles = this.files.selectedOptions.selected.map(
        (v) => v.value
      );
    });
    this.config = {
      ...this.config,
      lang: {
        next: this.translateService.instant('ACTIONS.NEXT'),
        previous: this.translateService.instant('ACTIONS.PREVIOUS'),
      },
    };
  }

  confirm() {
    this.dialogRef.close({
      selectedFiles: this.selectedFiles,
      selectedWorkLogs: this.selectedWorkLogs,
      doAction: true,
    });
  }

  cancel() {
    this.dialogRef.close({ doAction: false });
  }

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }
  isValidTypeBoolean: boolean = true;

  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }

  openBottomSheet(logId): void {
    this.bottomSheet.open(LogFileBottomSheetComponent, {
      data: { id: logId, type: 'incident' },
    });
  }

  checkWorkLogModel(logId) {
    !this.selectedWorkLogs.includes(logId)
      ? this.selectedWorkLogs.push(logId)
      : (this.selectedWorkLogs = this.selectedWorkLogs.filter(
          (id) => id !== logId
        ));
  }

  checkFileModel(fileUuid) {
    !this.selectedFiles.includes(fileUuid)
      ? this.selectedFiles.push(fileUuid)
      : (this.selectedFiles = this.selectedFiles.filter(
          (id) => id !== fileUuid
        ));
  }
}
