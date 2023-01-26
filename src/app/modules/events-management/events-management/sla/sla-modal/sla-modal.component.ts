import { AlertsService } from "./../../../../../_metronic/core/services/alerts.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CommonService } from "../../../../../core/services/common.service";
import { MatDialogRef } from "@angular/material/dialog";
import { GroupService } from "@core/api/services/group.service";
import { TranslationService } from "src/app/modules/i18n/translation.service";
import { EventsManagementService } from "./../../../events-management.service";
import { FormArray, FormBuilder } from "@angular/forms";
import { FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, Inject } from "@angular/core";
import * as _ from "lodash";
import { map } from "rxjs/operators";

@Component({
  selector: "app-sla-modal",
  templateUrl: "./sla-modal.component.html",
  styleUrls: ["./sla-modal.component.scss"],
})
export class SlaModalComponent implements OnInit {
  lang = "en";
  id: string;
  isAddMode: boolean;
  formGroup: FormGroup;
  private currentOrg;

  catId: any;
  orgId: any;
  categories: any = [];
  subCategories: any = [];
  groups: any[] = [];
  priorities: any[] = [];
  kpis: any[] = [];
  centers: any[] = [];

  organizations: any[] = [];
  filterOrgsList: any = [];
  selectedId: any;
  orgn: any = "primary";
  selectedValue: string;
  configId: any;
  commonData: any;

  orgsSpinner = true;
  isChecked: Boolean = true;
  siblingValidate: Boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private _service: EventsManagementService,
    private translationService: TranslationService,
    private groupService: GroupService,
    public dialogRef: MatDialogRef<SlaModalComponent>,
    private commonService: CommonService,
    private alertService: AlertsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    let commonData = this.commonService.getCommonData();
    this.currentOrg = commonData?.currentOrgDetails;
    this.priorities = commonData?.priorities;
    this.kpis = commonData?.kpi;
    this.orgId = this.currentOrg?.id;
  }

  async ngOnInit(): Promise<void> {
    if (this.data["type"] == "edit") {
      this.id = this.data["id"];
    }
    this.isAddMode = !this.id;
    this.lang = this.translationService.getSelectedLanguage();

    this._service.getCenters().subscribe(
      (data) => {
        if (data) {
          this.centers = data.result;
        }
      },
      (error) => {}
    );

    this.changGroups(this.orgId);

    this.createForm();

    this.loadPriorities();

    this.commonData = JSON.parse(localStorage.getItem("commonData"));
    const currentOrg = this.commonData["currentOrgDetails"];

    this.filterOrgsList = await this._service
      .getOrgs(currentOrg?.id)
      .pipe(map((data) => data.result))
      .toPromise();

    this.getorgs(this.filterOrgsList);
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      contractNo: [null, [Validators.required]],
      contractExpiryDate: [null, Validators.required],
      isActive: [true, [Validators.required]],
      orgStructure: [null, Validators.required],
      group: [null, Validators.required],
      centerName: [null],
      priority: new FormArray([]),
      id: this.id,
    });

    if (!this.isAddMode) {
      let item = this._service.getSlaById(parseInt(this.id));
      let item_Details = this._service.getSLAByIdwithConfig(parseInt(this.id));

      item_Details.then(async (slaInfo: any) => {
        let aFormArray: FormArray = <FormArray>this.formGroup.get("priority");

        for (let c of aFormArray.controls) {
          slaInfo.forEach((element, index) => {
            if (c["controls"].priority.value == element.priority.id) {
              c["controls"].time.patchValue(element.time);
              c["controls"].kpis.patchValue(element.kpi.id);
              c["controls"].id.patchValue(element.id);
            }
          });
        }

        this.filterOrgsList = await this._service
          .getOrgs(this.currentOrg?.id)
          .pipe(map((data) => data.result))
          .toPromise();

        const org = _.find(this.filterOrgsList, ["id", item.contractor?.id]);
        item.orgStructure = org;

        // item.group = item.contractor;
        this.formGroup.patchValue(item);

        this.formGroup.patchValue({ group: item.group.id });

        this.getorgs(this.filterOrgsList);
      });
    }
  }

  createPriorityfields(prt): FormGroup {
    return this.formBuilder.group({
      priority: [prt],
      time: [0, [Validators.min(0), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      kpis: "",
      id: null,
    });
  }

  setPriorityfields(prt): FormGroup {
    return this.formBuilder.group({
      priority: [prt.priority.id],
      time: [prt.time],
      kpis: [prt.kpi.id],
      id: [prt.id],
    });
  }

  applyFilter(value) {
    const filterValue = value;
    if (typeof value == "string" && filterValue.replace(/\s/g, "").length) {
      this.filterOrgsList = this.organizations.filter((item) => {
        let key = item.nameEn + " - " + item.nameAr;
        if (key && key.toLowerCase().includes(filterValue.toLowerCase()))
          return item;
      });
    } else {
      this.filterOrgsList = this.organizations;
    }
    this.orgsSpinner = false;
  }

  private createItem(newItem) {
    newItem.contractExpiryDate = new Date(newItem.contractExpiryDate);

    this._service.createSLA(newItem).then((ok) => {
      this.dialogRef.close();
    });
  }

  private updateItem(newItem) {
    this._service.updateSLA(newItem).then((ok) => {
      this.dialogRef.close();
    });
  }

  async getFilterData() {}

  validateForm(formValues) {
    this.siblingValidate = true;

    let list = formValues.priority.filter(
      (pr) => pr.time != "" || pr.kpis != ""
    );

    if (list && !list.length) {
      return this.alertService.openFailureSnackBarWithMsg(
        this.translationService.get("EVENTSMODULES.No_PRIORITY_ERR")
      );
    } else {
      list.forEach((element) => {
        if (element.time == "" && element.kpis != "") {
          this.siblingValidate = false;
          return this.alertService.openFailureSnackBarWithMsg(
            this.translationService.get("EVENTSMODULES.TIME_ERR")
          );
        } else if (element.time != "" && element.kpis == "") {
          this.siblingValidate = false;
          return this.alertService.openFailureSnackBarWithMsg(
            this.translationService.get("EVENTSMODULES.KPI_ERR")
          );
        }
      });

      return list;
    }
  }

  onSubmit() {
    let newItem = this.formGroup.value;

    let priorityList = this.validateForm(newItem);

    newItem.priority = priorityList;

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    if (!priorityList || !this.siblingValidate) {
      return;
    }

    if (this.isAddMode) {
      // this.createItem(new Sla(newItem));
      this.createItem(newItem);
    } else {
      this.updateItem(newItem);
    }
  }

  getorgs(data) {
    this.organizations = data;
    // this.filterOrgsList =  this.organizations;
    this.orgsSpinner = false;
    this.formGroup.get("orgStructure").enable();
    this.formGroup.get("orgStructure").valueChanges.subscribe((data) => {
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
      (error) => {}
    );
  }

  loadPriorities() {
    this.priorities.forEach((element) => {
      (<FormArray>this.formGroup.get("priority")).push(
        this.createPriorityfields(element.id)
      );
    });
  }

  onChange(evnt) {
    this.isChecked = evnt.checked;
  }

  displayFn(subject) {
    return subject ? subject.nameEn + " - " + subject.nameAr : undefined;
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };
}
