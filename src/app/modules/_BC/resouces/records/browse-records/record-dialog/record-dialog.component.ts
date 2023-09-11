import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ILangFacade} from "@core/facades/lang.facade";
import {IAuthService} from "@core/services/auth.service";
import {Select, Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {filter, map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {BrowseRecordAction} from "../../states/browse-records.action";
import {Dialog} from "primeng/dialog";
import {RecordsState} from "@core/states/bc-resources/records/records.state";
import {RecordsAction} from "@core/states/bc-resources/records/records.action";
import {FormUtils} from "@core/utils/form.utils";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";

@Component({
  selector: 'app-record-dialog',
  templateUrl: './record-dialog.component.html',
  styleUrls: ['./record-dialog.component.scss']
})
export class RecordDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;
  public recordType = [{id: 1, nameAr: 'ورقي', nameEn: 'Hard'}, {id: 2, nameAr: 'إلكتروني', nameEn: 'Soft'}];
  public criticalityType = [{id: 1, nameEn: "Critical", nameAr: "مهم"}, {id: 2, nameEn: "Non-Critical", nameAr: "غير مهم"}];
  @ViewChild(Dialog) dialog: Dialog;

  @Select(RecordsState.blocking)
  blocking$: Observable<boolean>;

  form: FormGroup;
  _recordId: number;

  public get asDialog() {
    return this.route.component !== RecordDialogComponent;
  }
  private defaultFormValue: { [key: string]: any } = {};
  get editMode() {
    return this._recordId !== undefined && this._recordId !== null;
  }

  get viewOnly() {
    return (
      this.route.snapshot.queryParams['_mode'] === 'viewonly'
    );
  }
  destroy$ = new Subject();
  @Input()
  set remoteId(v: number) {
    this._recordId = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.store
      .dispatch(new RecordsAction.GetRecords({ id: v }))
      .pipe(
        switchMap(() => this.store.select(RecordsState.records)),
        takeUntil(this.destroy$),
        take(1),
        filter((t) => !!t),
        tap((record) => {
          this.form.patchValue({
            ...record,
          });
          this.patchValues(record);
        })
      )
      .subscribe();
  }
  constructor(
    private formBuilder: FormBuilder,
    private lang: ILangFacade,
    private store: Store,
    private route: ActivatedRoute,
    private auth: IAuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.remoteId = id;
      })
    this.viewOnly$ = this.route.queryParams.pipe(
      map((params) => params['_mode'] === 'viewonly'),
      tap((v) => {
        if (this.form) {
          try {
            if (v) {
              this.form.disable();
            } else {
              this.form.enable();
            }
          } catch {
          }
        }
      })
    );
  }

  ngOnInit(): void {
    this.buildForm()
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
  }

  patchValues(record) {
    if (record.isCritical) {
      this.form.patchValue({
        isCritical: this.criticalityType[0]
      });
    } else {
      this.form.patchValue({
        isCritical: this.criticalityType[1]
      });
    }
    if (record.recordType == 1) {
      this.form.patchValue({
        recordType: this.recordType[0]
      });
    } else {
      this.form.patchValue({
        recordType: this.recordType[1]
      });
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      recordName: [null, [Validators.required]],
      recordType: [null, [Validators.required]],
      isCritical: [null, [Validators.required]],
      recordCustodian: [null, [Validators.required]],
      location: [null, [Validators.required]],
      alternateSource: [null, [Validators.required]],
    });
    this.defaultFormValue = {
      ...this.defaultFormValue,
    };
  }

  close() {
    if (this.asDialog) {
      this.store.dispatch(new BrowseRecordAction.ToggleDialog({}));
    } else {
      this.router.navigate(this.redirect, { relativeTo: this.route });
    }
  }

  clear() {
    this.store.dispatch(new RecordsAction.GetRecords({}));
    this.form.reset();
    this.form.patchValue(this.defaultFormValue);
    this.cdr.detectChanges();
  }

  get redirect() {
    return [this.route.snapshot.queryParams['_redirect'] ?? '..'];
  }

  openDialog(id?: number) {
    this.store.dispatch(new BrowseRecordAction.ToggleDialog({ recordId: id }));
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }
    const record = {
      ...this.form.getRawValue(),
    };
    const resource = this.store.selectSnapshot(ResourceAnalysisState.resourceAnalysis);
    record.resource = {
      id: resource.id
    };
    record.isCritical = record.isCritical.id === 1 ? true : false;
    record.recordType = record.recordType.id === 1 ? true : false;
    record.isActive = true;
    record.id = 0;

    record.id = this._recordId;
    if (this.editMode) {
      this.store.dispatch(new BrowseRecordAction.UpdateRecord(record));

    } else {
      this.store.dispatch(new BrowseRecordAction.CreateRecord(record));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
