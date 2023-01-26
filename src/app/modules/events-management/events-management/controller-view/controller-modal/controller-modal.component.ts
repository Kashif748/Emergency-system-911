import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import * as _ from 'lodash';
import { EventsManagementService } from '../../../events-management.service';
import { CommonService } from '@core/services/common.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-controller-modal',
  templateUrl: './controller-modal.component.html',
  styleUrls: ['./controller-modal.component.scss'],
})
export class ControllerModalComponent implements OnInit {
  // Variables
  colors = ['primary', 'success', 'danger', 'warning', 'dark', 'info'];
  lang = 'en';
  id: string;
  isAddMode: boolean;
  formGroup: FormGroup;
  controllerName = '';
  orgsSpinner = true;
  assets: any[] = [];
  mainCategories$: Observable<any[]>;
  organizations: any[] = [];
  filterOrgsList: any = [];
  localRisks: [] = [];
  model: any;

  constructor(
    private formBuilder: FormBuilder,
    private eventsManagementService: EventsManagementService,
    private translationService: TranslationService,
    public dialogRef: MatDialogRef<ControllerModalComponent>,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit(): Promise<void> {
    this.controllerName = this.data['controllerName'];
    if (this.data['type'] == 'edit') {
      this.id = this.data['id'];
      this.model = this.data?.model;
    }

    this.eventsManagementService.getAssetsCategory().subscribe((val) => {
      this.mainCategories$ = val.result;
    });

    this.eventsManagementService.getLocalRisks().subscribe((val) => {
      this.localRisks = val.result;
    });

    this.isAddMode = !this.id;
    this.lang = this.translationService.getSelectedLanguage();
    this.createForm();

    if (this.controllerName == 'priorities' && this.isAddMode) {
      const currentOrg = this.commonService.getCommonData()?.currentOrgDetails;

      this.filterOrgsList = await this.eventsManagementService
        .getOrgs(currentOrg?.id)
        .pipe(map((data) => data.result))
        .toPromise();
      this.getorgs(this.filterOrgsList);
    }

    this.eventsManagementService.getResourseGroup().subscribe((data) => {
      this.assets = data.result.content;
    });
  }

  async createForm() {
    const controls = {};
    switch (this.controllerName) {
      case 'hospitals':
        controls['plotNumber'] = [null, Validators.required];
        break;
      case 'incidentCategories':
        controls['serialNumber'] = [null, Validators.required];
        controls['orgStructure'] = {
          id: this.commonService.getCommonData()?.currentOrgDetails?.id,
        };
        controls['parent'] = this.data['parentId']
          ? { id: this.data['parentId'] }
          : null;
        break;
      case 'priorities':
        controls['color'] = [null];
        break;
      case 'assetsCategory':
        controls['assetsMainCategory'] = [{}, Validators.required];
        break;
      default:
        break;
    }
    this.formGroup = this.formBuilder.group({
      nameAr: [null, [Validators.required]],
      nameEn: [null, Validators.required],
      isActive: [false, [Validators.required]],
      id: this.id,
      orgId: [null],
      localRisks: [
        this.model && this.model['localRisks']
          ? this.model?.localRisks.map((v) => {
              return { id: v?.id };
            })
          : null,
      ],
      assetsMainCategory: [
        this.model && this.model['assetsMainCategory']
          ? { id: this.model['assetsMainCategory']?.id }
          : null,
      ],
      ...controls,
    });

    if (!this.isAddMode) {
      const report = this.eventsManagementService.getById(
        parseInt(this.id),
        this.data['controllerName']
      );

      if (this.controllerName == 'priorities') {
        const currentOrg =
          this.commonService.getCommonData()?.currentOrgDetails;

        this.filterOrgsList = await this.eventsManagementService
          .getOrgs(currentOrg?.id)
          .pipe(map((data) => data.result))
          .toPromise();

        this.getorgs(this.filterOrgsList);
        report.orgId = _.find(this.filterOrgsList, ['id', report?.orgId?.id]);
      }
      if (Object.keys(report).find((k) => k === 'nameEN')) {
        report.nameAr = report['nameAR'];
        report.nameEn = report['nameEN'];
      }
      this.formGroup.patchValue({ ...report });
    }
  }

  private createGroup() {
    switch (this.controllerName) {
      case 'assetsGroup':
        this.eventsManagementService
          .createAssetsGroup(this.formGroup.value)
          .subscribe((data) => {
            this.dialogRef.close();
          });
        break;
      case 'assetsCategory':
        this.eventsManagementService
          .createAssetsCategory(this.formGroup?.value)
          .subscribe((data) => {
            this.dialogRef.close();
          });
        break;
      default:
        if (this.controllerName != 'priorities') {
          delete this.formGroup?.value?.orgId;
        } else {
          this.formGroup.value.orgId = this.formGroup?.value?.orgId?.id;
          delete this.formGroup?.value?.order;
        }
        this.eventsManagementService
          .createReportingVia(
            {
              ...this.formGroup.value,
              nameAR: this.formGroup.value.nameAr,
              nameEN: this.formGroup.value.nameEn,
            },
            this.data['controllerName']
          )
          .then((ok) => {
            this.dialogRef.close();
          });
        break;
    }
  }

  private updateGroup() {
    switch (this.controllerName) {
      case 'assetsGroup':
        this.eventsManagementService
          .updateAssetsGroup(this.formGroup.value)
          .subscribe((data) => {
            this.dialogRef.close();
          });
        break;
      case 'assetsCategory':
        this.eventsManagementService
          .updateAssetsCategory(this.formGroup?.value)
          .subscribe((data) => {
            this.dialogRef.close();
          });
        break;
      default:
        if (this.controllerName != 'priorities') {
          delete this.formGroup?.value?.orgId;
        } else {
          this.formGroup.value.orgId = this.formGroup?.value?.orgId?.id;
          delete this.formGroup?.value?.order;
        }
        this.eventsManagementService
          .updateReportVia(
            {
              ...this.formGroup.value,
              nameAR: this.formGroup.value.nameAr,
              nameEN: this.formGroup.value.nameEn,
            },
            this.data['controllerName']
          )
          .then((ok) => {
            this.dialogRef.close();
          });
        break;
    }
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.createGroup();
    } else {
      this.updateGroup();
    }
  }

  applyFilter(value) {
    const filterValue = value;
    if (typeof value == 'string' && filterValue.replace(/\s/g, '').length) {
      this.filterOrgsList = this.organizations.filter((item) => {
        let key = item.nameEn + ' - ' + item.nameAr;
        if (key && key.toLowerCase().includes(filterValue.toLowerCase())) {
          return item;
        }
      });
    } else {
      this.filterOrgsList = this.organizations;
    }
    this.orgsSpinner = false;
  }

  getorgs(data) {
    this.organizations = data;
    this.orgsSpinner = false;
    this.formGroup.get('orgId').enable();
    // set first value
    if (this.isAddMode) {
      this.formGroup.get('orgId').patchValue(data[0]);
    }

    this.formGroup.get('orgId').valueChanges.subscribe((data) => {
      this.orgsSpinner = true;
      this.applyFilter(data);
    });
  }

  displayFn(subject) {
    return subject ? subject.nameEn + ' - ' + subject.nameAr : undefined;
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  compareWith(o1, o2) {
    return o1.id === o2.id;
  }

  compareWithLocalRisk(o1, o2) {
    return o1 === o2.id;
  }

  getFormControl(name: string) {
    const formControl = this.formGroup && this.formGroup.get(name);
    return formControl ? formControl.value : false;
  }
}
