import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";
import {LazyLoadEvent} from "primeng/api";
import {PageRequestModel} from "@core/models/page-request.model";
import {BcLocationTypes} from "../../../../../api/models/bc-location-types";
import {Store} from "@ngxs/store";
import {IAuthService} from "@core/services/auth.service";
import {ILangFacade} from "@core/facades/lang.facade";
import {ActivatedRoute} from "@angular/router";
import {switchMap, take, takeUntil, tap} from "rxjs/operators";
import {RtoAction, RtoState} from "@core/states";
import {OrgDetailAction} from "@core/states/bc/org-details/org-detail.action";
import {Subject} from "rxjs";
import {OrgDetailState} from "@core/states/bc/org-details/org-detail.state";
import {BrowseRtoAction} from "../../../rto/states/browse-rto.action";
import {FormUtils} from "@core/utils/form.utils";
import {BrowseOrgDetailAction} from "../../states/browse-orgDetail.action";

@Component({
  selector: 'app-content-org-detail',
  templateUrl: './content-org-detail.component.html',
  styleUrls: ['./content-org-detail.component.scss']
})
export class ContentOrgDetailComponent implements OnInit {
  form: FormGroup;
/*  @Input()
  loading: boolean;
  @Input()
  page: BcLocationTypes[];*/
/*  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;*/

  get loggedinUserId() {
    return this.auth.getClaim('orgId');
  }

  @Output()
  onPageChange = new EventEmitter();
  destroy$ = new Subject();
  @Input()
  set rtoId(v: number) {
    // this._rtoId = v;
    this.createForm();
    /*if (v === undefined || v === null) {
      return;
    }*/
    this.store
      .dispatch(new OrgDetailAction.GetOrgDetail({ id: this.loggedinUserId }))
      .pipe(
        switchMap(() => this.store.select(OrgDetailState.org)),
        takeUntil(this.destroy$),
        take(1),
        tap((org) => {
          this.form.patchValue({
            ...org,
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
    private auth: IAuthService
  ) {
    this.rtoId = null;
  }

  ngOnInit(): void {
/*    this.onPageChange.emit({
      id: this.loggedinUserId
    });*/
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      nameAr: [null, [GenericValidators.arabic, Validators.required]],
      nameEn: [null, [GenericValidators.english, Validators.required]],
      description: [null],
      employeeNumbers: [null],
      operationNumbers: [null],
      id: 0,
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

    const updateOrg = {
      ...this.form.getRawValue(),
    };

    // rto.versionId = 1;
    // rto.isActive = true;
    // this.store.dispatch(new BrowseRtoAction.CreateRto(rto));
    //updateOrg.code = 'adm';
    //updateOrg.type = 'org'
    this.store.dispatch(new BrowseOrgDetailAction.UpdateOrgDetail(updateOrg));

  }
}
