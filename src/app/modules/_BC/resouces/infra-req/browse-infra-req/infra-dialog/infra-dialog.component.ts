import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";
import {IAuthService} from "@core/services/auth.service";
import {Select, Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {BrowseInfraAction} from "../../states/browse-infra.action";
import {GenericValidators} from "@shared/validators/generic-validators";
import {Dialog} from "primeng/dialog";
import {VenderState} from "@core/states/bc-setup/venders/vender.state";
import {InfraState} from "@core/states/bc-resources/infra-req/infra.state";
import {InfraAction} from "@core/states/bc-resources/infra-req/infra.action";

@Component({
  selector: 'app-infra-dialog',
  templateUrl: './infra-dialog.component.html',
  styleUrls: ['./infra-dialog.component.scss']
})
export class InfraDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;

  @ViewChild(Dialog) dialog: Dialog;
  @Select(InfraState.blocking)
  blocking$: Observable<boolean>;

  public get asDialog() {
    return this.route.component !== InfraDialogComponent;
  }
  private defaultFormValue: { [key: string]: any } = {};

  form: FormGroup;
  _infraId: number;

  get editMode() {
    return this._infraId !== undefined && this._infraId !== null;
  }
  get viewOnly() {
    return (
      this.route.snapshot.queryParams['_mode'] === 'viewonly'
    );
  }

  destroy$ = new Subject();

  @Input()
  set infraId(v: number) {
    this._infraId = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.store
      .dispatch(new InfraAction.GetInfra({ id: v }))
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
        this.infraId = id;
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
      detailEn: [null, [Validators.required, GenericValidators.english]],
      detailAr: [null, [Validators.required, GenericValidators.arabic]],
      config: [null, [Validators.required]],
      count: [null, [Validators.required]],
      avail_count: [null, [Validators.required]],
      purchased: [null, [Validators.required]],
    });
    this.defaultFormValue = {
      ...this.defaultFormValue,
    };
  }

  close() {
    if (this.asDialog) {
      this.store.dispatch(new BrowseInfraAction.ToggleDialog({}));
    } else {
      this.router.navigate(this.redirect, { relativeTo: this.route });
    }
  }

  clear() {
    this.store.dispatch(new InfraAction.GetInfra({}));
    this.form.reset();
    this.form.patchValue(this.defaultFormValue);
    this.cdr.detectChanges();
  }

  get redirect() {
    return [this.route.snapshot.queryParams['_redirect'] ?? '..'];
  }

  openDialog(id?: number) {
    this.store.dispatch(new BrowseInfraAction.ToggleDialog({ infraId: id }));
  }
  submit() {
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
