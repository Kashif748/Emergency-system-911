import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericValidators } from '@shared/validators/generic-validators';
import { Select, Store } from '@ngxs/store';
import { IAuthService } from '@core/services/auth.service';
import { ILangFacade } from '@core/facades/lang.facade';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { OrgDetailAction } from '@core/states/bc/org-details/org-detail.action';
import { Observable, Subject } from 'rxjs';
import { OrgDetailState } from '@core/states/bc/org-details/org-detail.state';
import { FormUtils } from '@core/utils/form.utils';
import { BrowseOrgDetailAction } from '../states/browse-orgDetail.action';

@Component({
  selector: 'app-browse-org-detail',
  templateUrl: './browse-org-detail.component.html',
  styleUrls: ['./browse-org-detail.component.scss'],
})
export class BrowseOrgDetailComponent implements OnInit, OnDestroy {
  @Select(OrgDetailState.loading)
  public loading$: Observable<boolean>;

  @Select(OrgDetailState.blocking)
  public blocking$: Observable<boolean>;

  form: FormGroup;
  get loggedinUserId() {
    return this.auth.getClaim('orgId');
  }

  destroy$ = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private lang: ILangFacade,
    private store: Store,
    private auth: IAuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.store
      .dispatch(new OrgDetailAction.GetOrgDetail({ id: this.loggedinUserId }))
      .pipe(
        switchMap(() => this.store.select(OrgDetailState.org)),
        takeUntil(this.destroy$),
        take(1),
        tap((org) => {
          this.form.patchValue({
            orgId: org.id,
            ...org,
          });
        })
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createForm() {
    this.form = this.formBuilder.group({
      nameAr: [null],
      nameEn: [null],
      description: [null],
      employeeNumbers: [null],
      operationNumbers: [null],
      nationalCompliance: [null],
      orgId: 0,
    });
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    this.store.dispatch(
      new BrowseOrgDetailAction.UpdateOrgDetail(this.form.value)
    );
  }
}
