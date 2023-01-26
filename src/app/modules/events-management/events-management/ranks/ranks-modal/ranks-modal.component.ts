import { CommonService } from "../../../../../core/services/common.service";
import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { map } from "rxjs/operators";
import { TranslationService } from "src/app/modules/i18n/translation.service";
import { IStorageService } from "src/app/core/services/storage.service";
import * as _ from "lodash";
import { AlertsService } from "src/app/_metronic/core/services/alerts.service";
import { GroupService } from "@core/api/services/group.service";
import { EventsManagementService } from "../../../events-management.service";

@Component({
  selector: 'app-ranks-modal',
  templateUrl: './ranks-modal.component.html',
  styleUrls: ['./ranks-modal.component.scss']
})
export class RanksModalComponent implements OnInit {
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
  centers: any[] = [];
  organizations: any[] = [];
  filterOrgsList: any = [];
  selectedId: any;
  orgn: any = "primary";
  selectedValue: string;
  configId: any;
  commonData: any;
  orgsSpinner = true;
  isChecked : Boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private _service: EventsManagementService,
    private translationService: TranslationService,
    private groupService: GroupService,
    private alertService: AlertsService,
    public dialogRef: MatDialogRef<RanksModalComponent>,
    private storageService: IStorageService,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    let commonData = this.storageService.getItem("commonData");
    this.currentOrg = commonData?.currentOrgDetails;
    this.orgId = this.currentOrg?.id;
    // this.createForm();
    this.commonService.loadCommonData().subscribe((commonData) => {
      if (!_.isEmpty(commonData.result)) {
        this.storageService.setState("commonData", commonData.result);
      }
    });
  }
   ngOnInit(){
    if (this.data["type"] == "edit") {
      this.id = this.data["id"];
    }
    this.isAddMode = !this.id;
    this.lang = this.translationService.getSelectedLanguage();

    this.createForm();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      nameAr: [null, [Validators.required]],
      nameEn: [null, Validators.required],
      isActive: [true, [Validators.required]],
      id: this.id,
    });

    if (!this.isAddMode)
    {
      let rank = this._service.getRankById(parseInt(this.id));
      this.formGroup.patchValue(rank);
    }

  }

  private createItem(newItem) {
    if(_.isNull(newItem.id)){
      delete newItem.id;
    }
    this._service.createRank(newItem).then((ok) => {
      this.dialogRef.close();
    });
  }
  private updateItem(newItem) {
    this._service.updateRank(newItem, this.id).then((ok) => {
      this.dialogRef.close();
    });
  }
  onSubmit() {
    let newItem = this.formGroup.value;

    if (this.isAddMode) {
      this.createItem(newItem);
    } else {
      this.updateItem(newItem);
    }
  }

  onChange(evnt){
    this.isChecked = evnt.checked
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };
}
