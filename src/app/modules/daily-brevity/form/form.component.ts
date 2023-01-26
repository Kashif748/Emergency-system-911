import { ActivatedRoute, Router } from "@angular/router";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";

import { DailyReportService } from "@core/api/services/daily-report.service";
import { DmsService } from "@core/api/services/dms.service";

import { from, Observable, Subscription } from "rxjs";

import { AlertsService } from "src/app/_metronic/core/services/alerts.service";

import { AngularFileUploaderComponent } from "angular-file-uploader";

import { environment } from "src/environments/environment";
import { DailySummary } from "src/app/core/api/models/daily-summary.models";
import { UrlHelperService } from "src/app/core/services/url-helper.service";

import { TranslationService } from "./../../i18n/translation.service";
import { CityService } from "./../../../_metronic/core/services/city.service";
import { NewsService } from "../../news/news.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit, OnDestroy, AfterViewChecked {
  form: FormGroup;
  id;
  lang = "en";

  Report: DailySummary;

  attachments: any[];

  appearance = "outline";

  private currentUser: any;

  private subscriptions: Subscription[] = [];

  afuConfig = {};
  @ViewChild("citySecurityForm") private citySecurityForm: ElementRef;
  @ViewChild("reportNewsForm") private reportNewsForm: ElementRef;
  @ViewChild("reportOptForm") private reportOptForm: ElementRef;

  @ViewChild("fileUploader")
  private fileUploader: AngularFileUploaderComponent;

  cities$: Observable<any>;
  constructor(
    private fb: FormBuilder,
    private translationService: TranslationService,
    private route: ActivatedRoute,
    private cityService: CityService,
    private dailyReportSerivce: DailyReportService,
    private alertService: AlertsService,
    private router: Router,
    private urlHelper: UrlHelperService,
    private dmsService: DmsService,
    private newsService: NewsService,
    private ref: ChangeDetectorRef
  ) {}

  ngAfterViewChecked(): void {}

  download(att) {
    this.urlHelper.download(att);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  optTypes = [];
  reportStatuses = [];
  newsTypes = [];

  news$: Observable<any>;
  openAll = false;

  ngOnInit(): void {
    let commonData = JSON.parse(localStorage.getItem("commonData"));
    this.currentUser = commonData["currentUserDetails"];

    this.optTypes = commonData["dailySumariesReportOptType"];
    this.reportStatuses = commonData["dailySummaryReportStatus"];
    this.newsTypes = commonData["newsTypes"];
    this.news$ = from(this.newsService.getContent());

    this.lang = this.translationService.getSelectedLanguage();
    this.cities$ = this.cityService.cities();
    this.createForm();
    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      let sub = this.dailyReportSerivce
        .getById(this.id)
        .subscribe((response: any) => {
          this.Report = response.result as DailySummary;
          this.removeCitySecurity(0);
          this.removeReportNews(0);
          this.removeReportOpt(0);
          if (this.Report?.status?.id == 2) {
            this.appearance = "fill";
          }
          this.Report.dailySumariesReportCitySecurity.forEach((r) => {
            this.addCitySecurity(
              r.description,
              (r as any).city.id,
              this.Report?.status?.id == 2
            );
          });

          this.Report.dailySummariesReportNews.forEach((r) => {

            this.addReportNews(
              r.description,
              (r as any).news?.id ? (r as any).news.id : null,
              (r as any).newtype.id,
              this.Report?.status?.id == 2
            );
          });

          this.Report.dailySumariesReportOpt.forEach((r) => {
            this.addReportOpt(
              r.description,
              (r as any).dailySumariesReportOptType.id,
              this.Report?.status?.id == 2
            );
          });
        });
      this.subscriptions = [...this.subscriptions, sub];

      sub = this.dailyReportSerivce
        .getAttachments(this.id)
        .subscribe((response) => {
          this.attachments = [...response.result];
        });
      this.subscriptions = [...this.subscriptions, sub];
    }
    // file uploader config
    this.afuConfig = {
      multiple: true,
      formatsAllowed: ".jpg,.png,.pdf,.docx, .txt,.gif,.jpeg",
      maxSize: "2",
      uploadAPI: {
        url: `${environment.apiUrl}/dms/upload`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        params: { recordId: this.id, tagId: 23 },
        responseType: "json",
      },
      theme: "dragNDrop",
      hideProgressBar: true,
      hideResetBtn: true,
      hideSelectBtn: false,
      fileNameIndex: false,
      replaceTexts: {
        selectFileBtn: this.translationService.get("SHARED.SELECT_FILES"),
        resetBtn: this.translationService.get("SHARED.RESET"),
        uploadBtn: this.translationService.get("SHARED.UPLOAD"),
        dragNDropBox: this.translationService.get("SHARED.DRAG_N_DROP"),
        attachPinBtn: this.translationService.get("SHARED.ATTACH_FILES"),
        afterUploadMsg_success: this.translationService.get(
          "SHARED.SUCCESS_UPLOAD"
        ),
        afterUploadMsg_error: this.translationService.get(
          "SHARED.FAILD_UPLOAD"
        ),
        sizeLimit: this.translationService.get("SHARED.SIZE_LIMIT"),
      },
    };
  }

  createForm() {
    this.form = this.fb.group({
      dailySumariesReportCitySecurity: this.fb.array([
        this.fb.group({
          description: ["", [Validators.required]],
          city: this.fb.group({ id: [null, [Validators.required]] }),
        }),
      ]),
      dailySummariesReportNews: this.fb.array([
        this.fb.group({
          description: ["", [Validators.required]],
          news: this.fb.group({ id: null }),
          newtype: this.fb.group({ id: [null, [Validators.required]] }),
        }),
      ]),
      dailySumariesReportOpt: this.fb.array([
        this.fb.group({
          description: ["", [Validators.required]],
          dailySumariesReportOptType: this.fb.group({
            id: [null, [Validators.required]],
          }),
        }),
      ]),
    });
  }

  get dailySumariesReportCitySecurity(): FormArray {
    return this.form.get("dailySumariesReportCitySecurity") as FormArray;
  }

  get dailySummariesReportNews(): FormArray {
    return this.form.get("dailySummariesReportNews") as FormArray;
  }

  get dailySumariesReportOpt(): FormArray {
    return this.form.get("dailySumariesReportOpt") as FormArray;
  }

  addCitySecurity(description = null, cityId = null, disabled = false) {
    this.dailySumariesReportCitySecurity.push(
      this.fb.group({
        description: [
          { value: description, disabled: disabled },
          [Validators.required],
        ],
        city: this.fb.group({
          id: [{ value: cityId, disabled: disabled }, [Validators.required]],
        }),
      })
    );
  }

  removeCitySecurity(index) {
    this.dailySumariesReportCitySecurity.removeAt(index);
  }

  addReportNews(
    description = "",
    newsId = 154,
    newtypeId = null,
    disabled = false
  ) {
    this.dailySummariesReportNews.push(
      this.fb.group({
        description: [
          { value: description, disabled: disabled },
          [Validators.required],
        ],
        news: this.fb.group({ id: [newsId] }),
        newtype: this.fb.group({
          id: [{ value: newtypeId, disabled: disabled }, [Validators.required]],
        }),
      })
    );
  }

  removeReportNews(index) {
    this.dailySummariesReportNews.removeAt(index);
  }

  addReportOpt(description = "", opttypeId = null, disabled = false) {
    this.dailySumariesReportOpt.push(
      this.fb.group({
        description: [
          { value: description, disabled: disabled },
          [Validators.required],
        ],
        dailySumariesReportOptType: this.fb.group({
          id: [{ value: opttypeId, disabled: disabled }, [Validators.required]],
        }),
      })
    );
  }

  removeReportOpt(index) {
    this.dailySumariesReportOpt.removeAt(index);
  }

  async onSubmit() {
    let formValue = this.form.value;

    formValue.dailySummariesReportNews.forEach((element) => {

      if (element.news.id == null) {
        delete element.news;
      }
    });

    try {
      let result;
      if (!this.id) {
        result = (
          await this.dailyReportSerivce
            .create({
              ...this.form.value,
              status: { id: 1 },
              createdBy: { id: this.currentUser.id },
              createdOn: new Date().toISOString(),
            })
            .toPromise<any>()
        ).result;
        this.id = result.id;
        this.ref.detectChanges();
        await this.uploadFiles();
        this.router.navigate(["daily-management/list/edit/" + this.id]);
        this.alertService.openSuccessSnackBar();
      } else {
        result = await this.dailyReportSerivce
          .update({
            ...this.Report,
            ...this.form.value,
          })
          .toPromise<any>();
        this.ref.detectChanges();
        await this.uploadFiles();
        this.router.navigate(["daily-management/list"]);
        this.alertService.openSuccessSnackBar();
      }
    } catch (err) {
      this.alertService.openFailureSnackBar();
    }
  }

  archive() {
    let sub = this.dailyReportSerivce.archive(this.id).subscribe(
      (response) => {
        this.alertService.openSuccessSnackBar();
        this.router.navigate(["daily-management/list"]);
      },
      (err) => {
        this.alertService.openFailureSnackBar();
      }
    );
    this.subscriptions = [...this.subscriptions, sub];
  }

  review() {
    let sub = this.dailyReportSerivce.review(this.id).subscribe(
      (response) => {
        const newBlob = new Blob([response], { type: "application/pdf" });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }
        const downloadURL = URL.createObjectURL(newBlob);
        window.open(downloadURL);
      },
      (err) => {
        this.alertService.openFailureSnackBar();
      }
    );
    this.subscriptions = [...this.subscriptions, sub];
  }

  attUploaded(event) {
    this.alertService.openSuccessSnackBar();
  }

  async uploadFiles() {
    try {
      await this.dmsService
        .uploadFiles(this.fileUploader.allowedFiles, this.id, 23)
        .toPromise();
    } catch {
      this.alertService.openFailureSnackBar();
    }
  }
}
