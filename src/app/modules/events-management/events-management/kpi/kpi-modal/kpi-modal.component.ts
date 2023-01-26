import { CommonService } from '../../../../../core/services/common.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, map } from 'rxjs/operators';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { IStorageService } from 'src/app/core/services/storage.service';
import * as _ from 'lodash';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { GroupService } from '@core/api/services/group.service';
import { EventsManagementService } from '../../../events-management.service';
import { from, Observable } from 'rxjs';
@Component({
  selector: 'app-kpi-modal',
  templateUrl: './kpi-modal.component.html',
  styleUrls: ['./kpi-modal.component.scss'],
})
export class KpiModalComponent implements OnInit {
  lang = 'en';
  id: string;
  isAddMode: boolean;
  formGroup: FormGroup;
  private currentOrg;
  catId: any;
  orgId: any;
  categories = [];
  subCategories = [];
  groups: any[] = [];
  priorities: any[] = [];
  centers: any[] = [];
  organizations: any[] = [];
  filterOrgsList: any = [];
  selectedId: any;
  orgn: any = 'primary';
  selectedValue: string;
  configId: any;
  commonData: any;
  orgsSpinner = true;
  isChecked: Boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private _service: EventsManagementService,
    private translationService: TranslationService,
    private groupService: GroupService,
    public dialogRef: MatDialogRef<KpiModalComponent>,
    private storageService: IStorageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.commonData = this.storageService.getItem('commonData');
    this.currentOrg = this.commonData?.currentOrgDetails;
    this.orgId = this.currentOrg?.id;
  }
  ngOnInit() {
    if (this.data['type'] == 'edit') {
      this.id = this.data['id'];
    }
    this.isAddMode = !this.id;
    this.lang = this.translationService.getSelectedLanguage();

    this.categories = this.getParentsCategories();

    this._service.getPriorities().subscribe(
      (data) => {
        if (data) {
          this.priorities = data.result.content;
        }
      },
      () => {}
    );
    this._service.getCenters().subscribe(
      (data) => {
        if (data) {
          this.centers = data.result;
        }
      },
      () => {}
    );
    this.changGroups(this.orgId);
    this.createForm();

    this.filterOrgsList = this._service
      .getOrgs(this.currentOrg?.id)
      .pipe(map((data) => data.result))
      .toPromise();
    this.getorgs(this.filterOrgsList);
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      nameAr: [null, [Validators.required]],
      nameEn: [null, Validators.required],
      descriptionAr: [null, [Validators.required]],
      descriptionEn: [null, Validators.required],
      isActive: [true, [Validators.required]],
      //orgStructure: { id: this.currentOrg?.id },
      orgStructure: [null],
      incidentParentCategory: [null],
      incidentCategory: [null, Validators.required],
      priority: [null, Validators.required],
      group: [null],
      period: [
        null,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ],
      ],
      centerName: [null],
      id: this.id,
    });
    // if (this.isAddMode) {
    //   this.getFilterData();
    // }
    if (!this.isAddMode) {
      let item = this._service.getById(parseInt(this.id), 'kpi');


      item.incidentCategory = item?.incidentCategory?.id;

      item.incidentParentCategory = this.getCategory(
        item.incidentCategory,
        false
      )?.id;

      if (item.incidentParentCategory && item.incidentParentCategory != null) {
        this.catId = item.incidentParentCategory;
        this.onChangeSub(this.catId);
      }
      item.priority = item?.priority?.id;
      this.formGroup.patchValue(item);
    }
  }

  getCategory(id, isSubCategory: boolean) {

    let categories: any[] = this.commonData['incidentCategories'];
    if (categories.length <= 0 || !id) return;

    const subCategory = categories.find((item) => item.id == id);

    if (isSubCategory) return subCategory;

    const category = categories.find(
      (item) => subCategory?.parent?.id == item.id
    );

    return category;
  }

  getParentsCategories() {
    let categories: any[] = this.commonData['incidentCategories'];
    if (categories.length <= 0) return [];

    return categories.filter((item) => item.parent == null);
  }

  applyFilter(value) {
    const filterValue = value;
    if (typeof value == 'string' && filterValue.replace(/\s/g, '').length) {
      this.filterOrgsList = this.organizations.filter((item) => {
        let key = item.nameEn + ' - ' + item.nameAr;
        if (key && key.toLowerCase().includes(filterValue.toLowerCase()))
          return item;
      });
    } else {
      this.filterOrgsList = this.organizations;
    }
    this.orgsSpinner = false;
  }
  private createItem(newItem) {
    // newItem["orgStructure"] = { id: newItem["orgStructure"].id };
    // delete newItem["id"];

    this._service.createKpi(newItem).then((data) => {
      let kpis = this.commonData['kpi'] as any[];

      kpis.push(data);
      this.storageService.setItem('commonData', this.commonData);
      this.dialogRef.close({ reload: true });
    });
  }
  private updateItem(newItem) {
    //   newItem["orgStructure"] = { id: newItem["orgStructure"].id };

    // newItem.configId = this.configId;
    this._service.updateKpi(newItem, this.configId).then(() => {
      this.dialogRef.close({ reload: true });
    });
  }
  async getFilterData() {}
  onSubmit() {
    let newItem = this.formGroup.value;
    // if (this.formGroup.invalid) {
    //   return;
    // }
    if (this.isAddMode) {
      this.createItem(newItem);
    } else {
      this.updateItem(newItem);
    }
  }
  getorgs(data) {
    this.organizations = data;
    // this.filterOrgsList =  this.organizations;
    this.orgsSpinner = false;
    this.formGroup.get('orgStructure').enable();
    this.formGroup.get('orgStructure').valueChanges.subscribe((data) => {
      this.orgsSpinner = true;
      this.applyFilter(data);
    });
  }
  onSelect(event) {
    event?.id ? (this.orgId = event?.id) : (this.orgId = this.orgId);
    this.changGroups(event?.id);
  }
  getGroup(event) {
    event?.id ? (this.orgId = event?.id) : (this.orgId = this.orgId);
    this.changGroups(event?.id);
  }
  changGroups(id) {
    this.groupService.getNonGlobalGroupsByOrgId(id).subscribe(
      (data) => {
        if (data) {
          this.groups = data.result?.content;
        }
      },
      () => {}
    );
  }
  public onChangeSub(event): void {
    this.catId = event?.source ? event.source.value : event;
    let categories: any[] = this.commonData['incidentCategories'];
    if (categories.length <= 0) return;

    this.subCategories = categories.filter(
      (item) => item?.parent?.id == this.catId
    );
  }
  getParent(id) {
    let commonData = this.storageService.getItem('commonData');
    const category = _.find(commonData.incidentCategories, ['id', id]);
    if (!_.isEmpty(category?.parent)) {
      return category?.parent?.id;
    } else {
      return null;
    }
  }
  getPeriod(id) {
    const kpi = _.find(this.commonData.kpi, ['id', id]);
    if (kpi?.period) {
      return kpi?.period;
    } else {
      return '';
    }
  }
  onChange(evnt) {
    this.isChecked = evnt.checked;
  }
  displayFn(subject) {
    return subject ? subject.nameEn + ' - ' + subject.nameAr : undefined;
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };
}
