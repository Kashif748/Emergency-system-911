import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription, BehaviorSubject } from "rxjs";
import { SuggestionStatus } from "src/app/core/api/models/suggestion-models";
import { SuggestionStatusService } from "@core/api/services/suggestion-status.service";
import { AlertsService } from "src/app/_metronic/core/services/alerts.service";
import { TranslationService } from "../../i18n/translation.service";

class State {
  dataSource: MatTableDataSource<SuggestionStatus> = new MatTableDataSource<SuggestionStatus>();
}

@Component({
  selector: "app-status-dialog",
  templateUrl: "./status-dialog.component.html",
  styleUrls: ["./status-dialog.component.scss"],
})
export class StatusDialogComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["id", "nameEN", "nameAR", "actions"];

  private subscriptions: Subscription[] = [];

  private state: State = new State();

  private store = new BehaviorSubject<State>(this.state);

  public vm$ = this.store.asObservable();

  private updateState(state: State) {
    this.store.next({ ...(this.state = state) });
  }

  dir = "ltr";
  lang: string;
  isEditForm = false;
  formGroup: FormGroup;
  currentStatusId;
  constructor(
    private suggStatusService: SuggestionStatusService,
    private alertService: AlertsService,
    private translationService: TranslationService,
    private formBuilder: FormBuilder
  ) {}

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  edit(id) {
    this.currentStatusId = id;
    let sub = this.suggStatusService.getById(id).subscribe((response) => {
      this.formGroup.patchValue(response.result);
    });
    this.isEditForm = true;
    this.subscriptions = [...this.subscriptions, sub];
  }

  cancel() {
    this.isEditForm = false;
  }
  ngOnInit() {
    this.dir = this.translationService.dir;
    this.lang = this.translationService.getSelectedLanguage();
    this.formGroup = this.formBuilder.group({
      nameAR: [null, [Validators.required]],
      nameEN: [null, [Validators.required]],
    });

    this.loadData();
  }

  loadData() {
    let sub = this.suggStatusService.getAll().subscribe(
      (ok) => {
        if (ok) {
          this.state.dataSource.data = ok.result ?? [];
          // this.state.dataSource.paginator.length = ok.result.totalElements;

          this.updateState(this.state);
        }
      },
      (ex) => {
        this.alertService.openFailureSnackBar();
      }
    );
    this.subscriptions = [...this.subscriptions, sub];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  async submit() {
    try {
      if (!this.isEditForm) {
        const data = {
          ...this.formGroup.value,
        };
        await this.suggStatusService.create(data).toPromise<any>();
      } else {
        const data = {
          ...this.formGroup.value,
          id: this.currentStatusId,
        };
        await this.suggStatusService.update(data).toPromise<any>();
      }
      this.alertService.openSuccessSnackBar();
      this.formGroup.reset();
      this.formGroup.markAsUntouched();
      this.loadData();
    } catch (err) {
      this.alertService.openFailureSnackBar();
    }
  }
}
