import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ILangFacade } from '@core/facades/lang.facade';
import { IAuthService } from '@core/services/auth.service';
import { BCAction, BCState } from '@core/states';
import { FormUtils } from '@core/utils';
import { Select, Store } from '@ngxs/store';
import { GenericValidators } from '@shared/validators/generic-validators';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { BcVersions } from 'src/app/api/models';
import { BrowseBCAction } from '../states/browse-bc.action';
import { BrowseBCState, BrowseBCStateModel } from '../states/browse-bc.state';

@Component({
  selector: 'app-bc',
  templateUrl: './bc.component.html',
  styleUrls: ['./bc.component.scss'],
})
export class BCComponent implements OnInit, OnDestroy {
  @Select(BrowseBCState.state)
  public state$: Observable<BrowseBCStateModel>;

  @Select(BrowseBCState.versionsDialogOpend)
  public dialogOpened$: Observable<boolean>;

  @Select(BCState.loading)
  public loading$: Observable<boolean>;

  @Select(BCState.blocking)
  blocking$: Observable<boolean>;

  public versions$: Observable<BcVersions[]>;

  selectedVersion: BcVersions;
  get loggedinUserId() {
    return this.auth.getClaim('orgId');
  }
  public showVersionForm = false;
  form: FormGroup;
  private destroy$ = new Subject();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private auth: IAuthService,
    private langFacade: ILangFacade,
    private formBuilder: FormBuilder
  ) {
    this.versions$ = this.store
      .select(BCState.versions)
      .pipe(filter((p) => !!p));

    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const version = params['_version'];
        if (version) {
          this.setValueGlobally(version);
        }
      });
  }
  ngOnInit() {
    this.store.dispatch(new BCAction.LoadPage({ page: 0, size: 30 }));
    this.createForm();
  }
  createForm() {
    this.form = this.formBuilder.group({
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      nameEn: [null, [Validators.required, GenericValidators.english]],
    });
  }
  toggleDialog() {
    return this.store.dispatch(new BrowseBCAction.ToggleDialog());
  }
  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const businessCon = {
      ...this.form.getRawValue(),
    };
    businessCon.orgStructure = {
      id: this.loggedinUserId,
    };
    businessCon.isActive = true;
    this.store
      .dispatch(new BrowseBCAction.CreateBusinessContinuity(businessCon))
      .pipe(
        switchMap(() => this.store.select(BCState.selectedVersion)),
        takeUntil(this.destroy$),
        take(1),
        tap((bc) => {
          this.selectedVersion = bc;
          this.form.reset();
          this.showVersionForm = false;
          this.setValueGlobally(bc.id);
        })
      )
      .subscribe();
  }
  setValueGlobally(value: number) {
    this.store.dispatch(
      new BrowseBCAction.GetVersion({
        versionId: value,
      })
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
