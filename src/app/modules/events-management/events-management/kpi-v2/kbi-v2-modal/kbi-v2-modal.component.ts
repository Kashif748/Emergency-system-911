import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GroupService} from '@core/api/services/group.service';
import {map} from 'rxjs/operators';
import {TranslationService} from 'src/app/modules/i18n/translation.service';
import {EventsManagementService} from '../../../events-management.service';
import {KpiModalComponent} from '../../kpi/kpi-modal/kpi-modal.component';
import {KpiV2Service} from '@core/api/services/kpi-v2.service';
import {AppCommonDataService} from '@core/services/app-common-data.service';

@Component({
  selector: 'app-kbi-v2-modal',
  templateUrl: './kbi-v2-modal.component.html',
  styleUrls: ['./kbi-v2-modal.component.scss'],
})
export class KbiV2ModalComponent implements OnInit {
  // Variables
  lang = 'en';
  id: string;
  formGroup: FormGroup;
  private currentOrg;
  orgId: any;
  categories = [];
  subCategories = [];
  groups: any[] = [];
  centers: any[] = [];
  organizations: any[] = [];
  filterOrgsList: any = [];
  selectedId: any;
  orgn: any = 'primary';
  selectedValue: string;
  configId: any;
  commonData: any;
  orgsSpinner = true;
  isChecked = true;
  priorities: any[] = [];
  currentItem = null;
  modalType: 'new' | 'edit' | 'version' = 'new';

  constructor(
    private formBuilder: FormBuilder,
    private managementService: EventsManagementService,
    private kpiV2Service: KpiV2Service,
    private cd: ChangeDetectorRef,
    private translationService: TranslationService,
    private groupService: GroupService,
    public dialogRef: MatDialogRef<KpiModalComponent>,
    private appCommonDataService: AppCommonDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.commonData = this.appCommonDataService.getCommonData();
    this.currentOrg = this.commonData?.currentOrgDetails;
    this.priorities = this.commonData?.priorities;
    this.orgId = this.currentOrg?.id;
    this.lang = this.translationService.getSelectedLanguage();
  }

  ngOnInit() {
    this.modalType = this.data['type'];
    if (this.modalType != 'new') {
      this.id = this.data['id'];
    }

    this.managementService.getCenters().subscribe(
      (data) => {
        if (data) {
          this.centers = data.result;
        }
      },
      () => {
      }
    );
    this.changGroups(this.orgId);
    this.createForm();
    this.loadPriorities();
    this.filterOrgsList = this.managementService
      .getOrgs(this.currentOrg?.id)
      .pipe(map((data) => data.result))
      .toPromise();
    this.loadParentCategories();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      nameAr: [null, [Validators.required]],
      nameEn: [null, Validators.required],
      descriptionAr: null,
      descriptionEn: null,
      isActive: [true, [Validators.required]],
      incidentParentCategory: [
        {
          value: null,
          disabled: this.modalType == 'edit' || this.modalType == 'version',
        },
      ],
      incidentCategory: [
        {
          value: null,
          disabled: this.modalType == 'edit' || this.modalType == 'version',
        },
      ],
      kpiPriorities: new FormArray([]),
      id: this.id,
    });

    if (this.modalType == 'edit' || this.modalType == 'version') {
      const temp = this.kpiV2Service.getKpiById(this.id);
      this.currentItem = Object.assign({}, temp);
      this.currentItem.incidentCategory = this.currentItem?.incidentCategory?.id;
      this.currentItem.incidentParentCategory = this.currentItem?.parentIncidentCategory?.id;
      if (this.currentItem.incidentParentCategory) {
        this.loadCategoryChild(this.currentItem.incidentParentCategory);
      }
      this.formGroup.patchValue(this.currentItem);
    }

    this.formGroup.get('incidentParentCategory').valueChanges.subscribe((id) => {
      this.loadCategoryChild(id);
    });

    this.cd.detectChanges();
  }

  loadPriorities() {
    this.priorities.forEach((element, index) => {
      (this.formGroup.get('kpiPriorities') as FormArray).push(
        this.createPriorityFields(element.id, index)
      );
    });
  }

  createPriorityFields(priorityId: number, index: number): FormGroup {
    let kpi = null;
    if (this.modalType == 'edit' || this.modalType == 'version') {
      kpi = this.currentItem.kpiPriorities[index];
    }
    return this.formBuilder.group({
      priority: [{value: priorityId, disabled: true}],
      period: [
        {
          value: kpi?.period ?? null,
          disabled: this.modalType == 'edit',
        },
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ],
      ],
      id: null
    });
  }

  getCategory(id: number) {
    return this.categories.find((c) => c.id == id);
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

  private createItem(newItem) {
    this.kpiV2Service.createKpi(newItem).then((data) => {
      this.dialogRef.close({reload: true});
    });
  }

  private updateItem(newItem) {
    this.kpiV2Service.updateKpi(newItem).then(() => {
      this.dialogRef.close({reload: true});
    });
  }

  onSubmit() {
    const formValue = this.formGroup.getRawValue();
    const kpiPriorities = formValue.kpiPriorities;
    delete formValue.kpiPriorities;
    const newItem = {kpi: formValue, kpiPriorities};
    if (this.formGroup.invalid) {
      return;
    }

    if (this.modalType == 'new') {
      this.createItem(newItem);
    } else if (this.modalType == 'edit') {
      this.updateItem(newItem);
    } else {
      this.createNewVersion(newItem);
    }
  }

  createNewVersion(item) {
    console.log(this.currentItem);
    item['kpi']['referenceKpi'] = {
      id: this.id,
    };

    this.kpiV2Service.createKpi(item).then((data) => {
      this.dialogRef.close({reload: true});
    });
  }

  isRequired(formControl) {
    const controller = this.formGroup.get(formControl);
    if (controller?.validator) {
      const validator = controller.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    return false;
  }

  onSelect(event) {
    if (event?.id) {
      this.orgId = event?.id;
    }
    this.changGroups(event?.id);
  }

  getGroup(event) {
    if (event?.id) {
      this.orgId = event?.id;
    }
    this.changGroups(event?.id);
  }

  changGroups(id) {
    this.groupService.getNonGlobalGroupsByOrgId(id).subscribe(
      (data) => {
        if (data) {
          this.groups = data.result?.content;
        }
      },
      () => {
      }
    );
  }

  onChange(evnt) {
    this.isChecked = evnt.checked;
  }

  displayFn(subject) {
    return subject ? subject.nameEn + ' - ' + subject.nameAr : undefined;
  }

  handleError(controlName: string, errorName: string) {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  private loadCategoryChild(id: any) {
    this.subCategories = [];
    this.managementService.getIncidentSubCategories(id).subscribe((res) => {
      this.subCategories = res['result'];
    });
  }

  private loadParentCategories() {
    this.managementService.getIncidentsCategories('parents').then((cats) => {
      this.categories = cats;
    });
  }
}
