import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { TranslationService } from '../../../i18n/translation.service';
import { AlertsService } from '../../../../_metronic/core/services/alerts.service';
import { IncidentsService } from '../../../../_metronic/core/services/incidents.service';
import { BaseComponent } from '@shared/components/base.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-responsible-orgs',
  templateUrl: './responsible-orgs.component.html',
  styleUrls: ['./responsible-orgs.component.scss'],
})
export class ResponsibleOrgsComponent extends BaseComponent implements OnInit {
  lang = 'en';
  id: string;
  incidentId: string;
  formGroup: FormGroup;
  organizations: any[] = [];
  filterOrgsList = [];
  orgn: any = 'primary';
  orgsSpinner = true;

  constructor(
    private formBuilder: FormBuilder,
    private incidentsService: IncidentsService,
    public matDialog: MatDialog,
    private translationService: TranslationService,
    private alertService: AlertsService,
    public dialogRef: MatDialogRef<ResponsibleOrgsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.data['type'] == 'edit') {
      this.id = this.data['id'];
      this.incidentId = this.data['incidentId'];
    }
    this.lang = this.translationService.getSelectedLanguage();

    this.createForm();

    this.incidentsService
      .getOrgs(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data) {
            this.organizations = data.result;
            this.filterOrgsList = this.organizations;
            this.orgsSpinner = false;
            this.formGroup.get('org').enable();
            this.formGroup
              .get('org')
              .valueChanges.pipe(takeUntil(this.destroy$))
              .subscribe((data) => {
                this.orgsSpinner = true;
                this.applyFilter(data);
              });
          }
        },
        (error) => {
          const errMsg =
            this.lang == 'en'
              ? error?.error?.error?.message_En
              : error?.error?.error?.message_Ar;
          this.alertService.openFailureSnackBarWithMsg(errMsg);
          this.orgsSpinner = false;
        }
      );
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      org: [null],
      id: 0,
    });
  }

  private updateItem(newItem) {
    this.incidentsService
      .updateResponsible(newItem, this.incidentId, this.orgn)
      .then((ok) => {
        this.dialogRef.close();
      });
  }

  onSubmit() {
    const newItem = this.formGroup.value;
    if (this.formGroup.invalid) {
      return;
    }
    this.updateItem(newItem);
  }

  applyFilter(value) {
    const filterValue = value;
    if (typeof value == 'string' && filterValue.replace(/\s/g, '').length) {
      this.filterOrgsList = this.organizations.filter((item) => {
        const key = item.nameEn + ' - ' + item.nameAr;
        if (key && key.toLowerCase().includes(filterValue.toLowerCase())) {
          return item;
        }
      });
    } else {
      this.filterOrgsList = this.organizations;
    }
    this.orgsSpinner = false;
  }

  displayFn(subject) {
    return subject ? subject.nameEn + ' - ' + subject.nameAr : undefined;
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };
}
