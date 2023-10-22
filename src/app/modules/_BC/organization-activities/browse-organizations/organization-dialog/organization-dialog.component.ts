import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  auditTime,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Dialog } from 'primeng/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { PrivilegesService } from '@core/services/privileges.service';
import { TranslateObjPipe } from '@shared/sh-pipes/translate-obj.pipe';
import { TreeNode } from 'primeng/api';
import { FormUtils } from '@core/utils/form.utils';
import { TabView } from 'primeng/tabview';
import { OrgActivityAction } from '@core/states/org-activities/orgActivity.action';
import { OrgActivityState } from '@core/states/org-activities/orgActivity.state';
import { BrowseOrganizationAction } from '../../states/browse-organization.action';
import { ActivityFrquencyState } from '@core/states/bc/activity-frquency/activity-frquency.state';
import { BcActivityFrequencies } from '../../../../../api/models/bc-activity-frequencies';
import { BcOrgHierarchy } from '../../../../../api/models/bc-org-hierarchy';
import { GenericValidators } from '@shared/validators/generic-validators';
import { OrgDetailAction } from '@core/states';
import { OrgDetailState } from '@core/states/bc/org-details/org-detail.state';

@Component({
  selector: 'app-organization-dialog',
  templateUrl: './organization-dialog.component.html',
  styleUrls: ['./organization-dialog.component.scss'],
})
export class OrganizationDialogComponent implements OnInit, OnDestroy {
  @ViewChild(Dialog) dialog: Dialog;
  @ViewChild(TabView) tabv: TabView;
  private auditLoadOrgPage$ = new Subject<string>();
  opened$: Observable<boolean>;
  @Input()
  activeTab: number = 0;

  @Input()
  orgHir;

  justifyOptions = [
    { icon: 'pi pi-user', nameAr: 'خارجي', nameEn: 'External', isActive: true },
    {
      icon: 'pi pi-tablet',
      nameAr: 'داخلي',
      nameEn: 'Internal',
      isActive: false,
    },
  ];
  @Select(ActivityFrquencyState.page)
  activityFre$: Observable<BcActivityFrequencies[]>;

  @Select(OrgDetailState.loading)
  public loadingOrgHir$: Observable<boolean>;
  @Select(OrgActivityState.blocking)
  blocking$: Observable<boolean>;

  public get asDialog() {
    return this.route.component !== OrganizationDialogComponent;
  }

  @Input()
  orgsTree: TreeNode[];
  viewOnly$: Observable<boolean>;

  form: FormGroup;
  private defaultFormValue: { [key: string]: any } = {};

  destroy$ = new Subject();

  _orgActivityId: number;

  get editMode() {
    return this._orgActivityId !== undefined && this._orgActivityId !== null;
  }

  get viewOnly() {
    return this.route.snapshot.queryParams['_mode'] === 'viewonly';
  }
  @Input()
  set orgActivityId(v: number) {
    this._orgActivityId = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.store
      .dispatch(new OrgActivityAction.GetOrgActivities({ id: v }))
      .pipe(
        switchMap(() => this.store.select(OrgActivityState.orgActivity)),
        takeUntil(this.destroy$),
        take(1),
        filter((t) => !!t),
        tap((orgActivity) => {
          this.form.patchValue({
            ...orgActivity,
          });
          this.patchValues(orgActivity);
          this.defaultFormValue = orgActivity;
        })
      )
      .subscribe();
  }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private translateObj: TranslateObjPipe,
    private privileges: PrivilegesService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.orgActivityId = id;
      });

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
          } catch {}
        }
      })
    );
  }

  patchValues(value) {
    if (value?.internal) {
      this.form.patchValue({
        internal: this.justifyOptions[1],
      });
    } else {
      this.form.patchValue({
        internal: this.justifyOptions[0],
      });
    }
    const node = {
      children: [],
      data: value.orgHierarchy.id,
      labelAr: value.orgHierarchy.nameAr,
      labelEn: value.orgHierarchy.nameEn,
    };
    this.form.patchValue({
      dept: node,
    });
  }

  ngOnInit() {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
    this.buildForm();
    this.auditLoadOrgPage$
      .pipe(takeUntil(this.destroy$), auditTime(2000))
      .subscribe((search: string) => {
        this.store.dispatch(
          new OrgDetailAction.GetOrgHierarchySearch({
            page: 0,
            size: 100,
            name: search,
          })
        );
      });
  }

  nodeExpand(node: TreeNode) {
    if (node.children.length === 0) {
      this.store.dispatch(
        new OrgDetailAction.GetOrgHierarchySearch({
          page: 0,
          size: 100,
          parentId: parseInt(node?.key),
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildForm() {
    this.activeTab = 0;
    this.form = this.formBuilder.group({
      dept: [null, [Validators.required]],
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      nameEn: [null, [Validators.required, GenericValidators.english]],
      description: [null, [Validators.required]],
      activityFrequence: [null, [Validators.required]],
      externalReference: [null],
      internal: [null, [Validators.required]],
    });
  }

  async submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const orgActivities = {
      ...this.form.getRawValue(),
    };

    const orgHie = {
      id: orgActivities.dept.key
        ? orgActivities.dept.key
        : orgActivities.dept.data,
    };

    const orgActivity = {
      activityFrequence: orgActivities.activityFrequence,
      description: orgActivities.description,
      externalReference: orgActivities.externalReference,
      internal: orgActivities.internal.isActive ? false : true,
      nameAr: orgActivities.nameAr,
      nameEn: orgActivities.nameEn,
      orgHierarchy: orgHie as BcOrgHierarchy,
      id: this._orgActivityId,
    };

    if (this.editMode) {
      this.store.dispatch(
        new BrowseOrganizationAction.UpdateOrganization(orgActivity)
      );
    } else {
      this.store.dispatch(
        new BrowseOrganizationAction.CreateOrganization(orgActivity)
      );
    }
  }

  clear() {
    this.store.dispatch(new OrgActivityAction.GetOrgActivities({}));
    this.form.reset();
    this.form.patchValue({
      ...this.defaultFormValue,
    });
    this.patchValues(this.defaultFormValue);
    this.cdr.detectChanges();
  }

  filterOrgHir(event) {
    this.auditLoadOrgPage$.next(event.filter);
  }

  close() {
    if (this.asDialog) {
      this.store.dispatch(new BrowseOrganizationAction.ToggleDialog({}));
    } else {
      this.router.navigate(this.redirect, { relativeTo: this.route });
    }
  }

  get redirect() {
    return [this.route.snapshot.queryParams['_redirect'] ?? '..'];
  }

  selectNode(node) {
    console.log(node);
  }
}
