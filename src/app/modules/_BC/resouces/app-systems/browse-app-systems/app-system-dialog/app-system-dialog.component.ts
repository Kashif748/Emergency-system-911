import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";
import {IAuthService} from "@core/services/auth.service";
import {Select, Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {BrowseAppSystemAction} from "../../states/browse-app-system.action";
import {Dialog} from "primeng/dialog";
import {VenderState} from "@core/states/bc-setup/venders/vender.state";
import {FormUtils} from "@core/utils/form.utils";
import {AppSystemAction} from "@core/states/bc-resources/app-system/app-system.action";
import {AppSystemState} from "@core/states/bc-resources/app-system/app-system.state";
import {RecordsAction} from "@core/states/bc-resources/records/records.action";

@Component({
  selector: 'app-app-system-dialog',
  templateUrl: './app-system-dialog.component.html',
  styleUrls: ['./app-system-dialog.component.scss']
})
export class AppSystemDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;
  @ViewChild(Dialog) dialog: Dialog;

  @Select(AppSystemState.blocking)
  blocking$: Observable<boolean>;
  form: FormGroup;
  _appSystemId: number;

  get editMode() {
    return this._appSystemId !== undefined && this._appSystemId !== null;
  }
  public get asDialog() {
    return this.route.component !== AppSystemDialogComponent;
  }
  private defaultFormValue: { [key: string]: any } = {};


  get viewOnly() {
    return (
      this.route.snapshot.queryParams['_mode'] === 'viewonly'
    );
  }
  destroy$ = new Subject();

  @Input()
  set appSystemId(v: number) {
    this._appSystemId = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.store
      .dispatch(new AppSystemAction.GetAppSystem({ id: v }))
      .pipe(
        switchMap(() => this.store.select(VenderState.vender)),
        takeUntil(this.destroy$),
        take(1),
        filter((t) => !!t),
        tap((record) => {
          this.form.patchValue({
            ...record,
          });
          // this.patchValues(record);
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
        this.appSystemId = id;
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
      softApp: [null, [Validators.required]],
      purpose: [null, [Validators.required]],
      users: [null, [Validators.required]],
      license: [null, [Validators.required]],
      license_Type: [null, [Validators.required]],
      day1: [null, [Validators.required]],
      hour8: [null, [Validators.required]],
      hour24: [null, [Validators.required]],
      week1: [null, [Validators.required]],
      week2: [null, [Validators.required]],
    });
    this.defaultFormValue = {
      ...this.defaultFormValue,
    };
  }

  close() {
    if (this.asDialog) {
      this.store.dispatch(new BrowseAppSystemAction.ToggleDialog({}));
    } else {
      this.router.navigate(this.redirect, { relativeTo: this.route });
    }
  }
  get redirect() {
    return [this.route.snapshot.queryParams['_redirect'] ?? '..'];
  }
  openDialog(id?: number) {
    this.store.dispatch(new BrowseAppSystemAction.ToggleDialog({ appSystemId: id }));
  }
  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }
  }

  clear() {
    this.store.dispatch(new AppSystemAction.GetAppSystem({}));
    this.form.reset();
    this.form.patchValue(this.defaultFormValue);
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
