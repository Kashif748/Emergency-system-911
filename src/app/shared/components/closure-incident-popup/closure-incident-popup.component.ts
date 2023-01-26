import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { PropTranslatorPipe } from '@shared/pipes/prop-translator.pipe';
import { INTERIM_STATUS } from 'src/app/modules/incidents/new-incidents-view/const';

enum ClosureFormFields {
  STATUS = 'status',
  FINAL_STATEMENT = 'finalStatement',
}
@Component({
  selector: 'app-closure-incident-popup',
  templateUrl: './closure-incident-popup.component.html',
  styleUrls: ['./closure-incident-popup.component.scss'],
})
export class ClosureIncidentPopupComponent implements OnInit {
  closeIncidentForm = new FormGroup({});
  closureFormFields = ClosureFormFields;
  dropdownConfig = {};
  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    public dialogRef: MatDialogRef<ClosureIncidentPopupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { incidentStatus: any[] }
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.dropdownConfig = {
      placeholder: this.translateService.instant('INCIDENTS.INCIDENT_STATUS'),
      displayKey:
        this.translateService.currentLang === 'en' ? 'nameEn' : 'nameAr',
    };
  }

  buildForm() {
    this.closeIncidentForm = this.fb.group({
      [ClosureFormFields.STATUS]: [null, Validators.required],
      [ClosureFormFields.FINAL_STATEMENT]: [null, Validators.required],
    });
  }

  closeDialog() {
    this.dialogRef.close(this.closeIncidentForm.value);
  }

  cancelDialog() {
    this.dialogRef.close(null);
  }
}
