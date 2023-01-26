import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

import { Observable, from } from "rxjs";

import { AlertsService } from "src/app/_metronic/core/services/alerts.service";

import { NewsService } from "../news.service";
import { Inew } from "../models/new.interface";
import { New } from "../models/new.model";
import { TranslationService } from "../../i18n/translation.service";
import { OrganizationsService } from "../../organization/organizations.service";
import { Directionality } from "@angular/cdk/bidi";
import { IStorageService } from "@core/services/storage.service";
@Component({
  selector: "app-new-form",
  templateUrl: "./new-form.component.html",
  styleUrls: ["./new-form.component.scss"],
})
export class NewFormComponent implements OnInit {
  id: number;
  newObj: New;
  lang: string;
  display: boolean;
  isAddMode: boolean;
  formGroup: FormGroup;

  orgs$: Observable<any>;
  newsTypes: any[];

  constructor(
    private router: Router,
    private _alerts: AlertsService,
    private _news: NewsService,
    private _orgs: OrganizationsService,
    private route: ActivatedRoute,
    private _translation: TranslationService,
    private storageService: IStorageService,
    private location: Location,
    public direction: Directionality
  ) {}

  backClicked() {
    this.location.back();
  }
  ngOnInit(): void {
    this.lang = (this._translation.getSelectedLanguage() || "en").toLowerCase();
    this.route.paramMap.subscribe((params) => {
      const id = +params.get("id");
      if (!id) {
        this.isAddMode = true;
      } else {
        this.id = id;
      }
      this.createForm();
    });
    const commonData = this.storageService.getItem('commonData');
    const currentOrgId = commonData?.currentOrgDetails?.id;
    this.orgs$ = from(this._orgs.getOrgs(currentOrgId));
    this.newsTypes =commonData?.newsTypes;
  }

  createForm() {
    this.formGroup = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required]),
      newsOrgs: new FormControl([], [Validators.required]),
      expireDate: new FormControl(null, [Validators.required]),
      isActive: new FormControl(false),
      type: new FormControl(null),
    });

    if (!this.isAddMode) {
      this.patchValues();
    } else {
      this.display = true;
    }
  }

  patchValues() {
    this._news.getNew(this.id).then((res: New) => {
      this.newObj = res;
      this.formGroup.patchValue({ ...this.newObj });
      this.display = true;
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    const dataToSend = this.prepareToSend();

    if (this.isAddMode) {
      this.create(dataToSend);
    } else {
      this.update(dataToSend);
    }
  }

  public currentDate = new Date();

  create(data: Inew) {
    this._news
      .add({ ...data, isActive: true })
      .then((res) => {
        this._alerts.openSuccessSnackBar();
        this.router.navigate(["../"], { relativeTo: this.route });
      })
      .catch((error) => {
        this._alerts.openFailureSnackBarWithMsg(
          this.lang == "en"
            ? error?.error?.error?.message_En
            : error?.error?.error?.message_Ar
        );
      });
  }

  update(data: Inew) {
    this._news
      .update(this.id, data)
      .then((res) => {
        this._alerts.openSuccessSnackBar();
        this.router.navigate(["../"], { relativeTo: this.route });
      })
      .catch((err) => {
        this._alerts.openFailureSnackBar();
      });
  }

  prepareToSend() {
    let dataToSend = this.formGroup.value;
    // dataToSend['expireDate'] = dataToSend['expireDate'].toLocaleDateString();
    dataToSend["newsOrgs"] = dataToSend["newsOrgs"].map((org) => {
      return {
        id: 0,
        orgId: {
          id: org,
        },
      };
    });

    dataToSend["id"] = this.id || 0;

    dataToSend["type"] = {
      id: dataToSend["type"],
    };

    return dataToSend;
  }
}
