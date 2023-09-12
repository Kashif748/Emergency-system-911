import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";
import {IAuthService} from "@core/services/auth.service";
import {Select, Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {BrowseOtherAction} from "../../states/browse-other.action";
import {GenericValidators} from "@shared/validators/generic-validators";
import {Dialog} from "primeng/dialog";
import {OtherState} from "@core/states/bc-resources/other/other.state";
import {OtherAction} from "@core/states/bc-resources/other/other.action";
import {FormUtils} from "@core/utils/form.utils";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";

@Component({
  selector: 'app-other-dialog',
  templateUrl: './other-dialog.component.html',
  styleUrls: ['./other-dialog.component.scss']
})
export class OtherDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;
  @ViewChild(Dialog) dialog: Dialog;
  form: FormGroup;
  _otherId: number;

  @Select(OtherState.blocking)
  blocking$: Observable<boolean>;
  public get asDialog() {
    return this.route.component !== OtherDialogComponent;
  }
  private defaultFormValue: { [key: string]: any } = {};
  get editMode() {
    return this._otherId !== undefined && this._otherId !== null;
  }
  get viewOnly() {
    return (
      this.route.snapshot.queryParams['_mode'] === 'viewonly'
    );
  }
  destroy$ = new Subject();
  @Input()
  set otherId(v: number) {
    this._otherId = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.store
      .dispatch(new OtherAction.GetOther({ id: v }))
      .pipe(
        switchMap(() => this.store.select(OtherState.other)),
        takeUntil(this.destroy$),
        take(1),
        filter((t) => !!t),
        tap((other) => {
          this.form.patchValue({
            ...other,
          });
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
        this.otherId = id;
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

  buildForm() {
    this.form = this.formBuilder.group({
      detailsEn: [null, [Validators.required, GenericValidators.english]],
      detailsAr: [null, [Validators.required, GenericValidators.arabic]],
      requiredCount: [null, [Validators.required, Validators.min(0)]],
      isActive: [true]
    });
    this.defaultFormValue = {
      ...this.defaultFormValue,
    };

  }
  close() {
    if (this.asDialog) {
      this.store.dispatch(new BrowseOtherAction.ToggleDialog({}));
    } else {
      this.router.navigate(this.redirect, { relativeTo: this.route });
    }
  }
  clear() {
    this.store.dispatch(new OtherAction.GetOther({}));
    this.form.reset();
    this.form.patchValue(this.defaultFormValue);
    this.cdr.detectChanges();
  }
  openDialog(id?: number) {
    this.store.dispatch(new BrowseOtherAction.ToggleDialog({ otherId: id }));
  }
  get redirect() {
    return [this.route.snapshot.queryParams['_redirect'] ?? '..'];
  }
  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }
    const other = {
      ...this.form.getRawValue(),
    };
    const resource = this.store.selectSnapshot(ResourceAnalysisState.resourceAnalysis);
    other.resource = {
      id: resource.id
    };
    other.id = this._otherId;
    if (this.editMode) {
      this.store.dispatch(new BrowseOtherAction.UpdateOther(other));

    } else {
      this.store.dispatch(new BrowseOtherAction.CreateOther(other));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
