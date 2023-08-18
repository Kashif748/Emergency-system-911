import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { BrowseActivityDependenciesAction } from '../states/browse-dependencies.action';
import { auditTime, filter, map, takeUntil, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {
  OrgActivityAction,
  OrgActivityState,
  OrgDetailAction,
  OrgDetailState,
  VenderAction,
  VenderState,
} from '@core/states';
import { TreeNode } from 'primeng/api';
import { BcActivities, BcOrgHierarchy } from 'src/app/api/models';
import { TranslateObjPipe } from '@shared/sh-pipes/translate-obj.pipe';
import { FormUtils } from '@core/utils';
import {
  ActivityDependenciesState,
  DEPENDENCIES_TYPES,
} from '@core/states/activity-analysis/dependencies/dependencies.state';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';
import { BcOrgHierarchyProjection } from 'src/app/api/models/bc-org-hierarchy-projection';
import { TreeHelper } from '@core/helpers/tree.helper';

@Component({
  selector: 'app-dependencies-dialog',
  templateUrl: './dependencies-dialog.component.html',
  styleUrls: ['./dependencies-dialog.component.scss'],
})
export class DependenciesDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;
  dependType: DEPENDENCIES_TYPES;
  DEPENDENCIES_TYPES = DEPENDENCIES_TYPES;

  @Select(VenderState.page)
  vendors$: Observable<BcActivities[]>;

  @Select(OrgActivityState.page)
  activies$: Observable<BcActivities[]>;

  public blocking$: Observable<boolean>;

  public orgHir: TreeNode[] = [];

  @Select(OrgDetailState.loading)
  public loading$: Observable<boolean>;
  private auditLoadOrgPage$ = new Subject<string>();

  form: FormGroup;
  destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private treeHelper: TreeHelper,
    private route: ActivatedRoute,
    private translateObj: TranslateObjPipe,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.store.dispatch([
      new OrgDetailAction.GetOrgHierarchySearch({ page: 0, size: 100 }),
    ]);

    this.opened$ = this.route.queryParams.pipe(
      takeUntil(this.destroy$),
      tap((params) => {
        this.form.reset();
        this.dependType = params['_dependType'];
        switch (this.dependType) {
          case DEPENDENCIES_TYPES.DEPENDENCY_EXTERNAL:
            this.store.dispatch(
              new VenderAction.LoadPage({ page: 0, size: 100 })
            );
            this.form.get('partner').setValidators(Validators.required);
            break;
          case DEPENDENCIES_TYPES.DEPENDENCY_INTERNAL:
            this.form
              .get('relatedActivityId')
              .setValidators(Validators.required);
            this.form.get('orgHierarchy').setValidators(Validators.required);
            break;
          case DEPENDENCIES_TYPES.DEPENDENCY_ORG:
            this.form.get('activityName').setValidators(Validators.required);
            this.form.get('orgHierarchy').setValidators(Validators.required);
            break;

          default:
            break;
        }

        this.form.updateValueAndValidity();
      }),
      map((params) => params['_dialog'] === 'opened')
    );

    this.blocking$ = this.store.select(ActivityDependenciesState.blocking).pipe(
      takeUntil(this.destroy$),
      filter((p) => !!p),
      map((data) => data[this.dependType])
    );

    this.store
      .select(OrgDetailState.orgHirSearch)
      .pipe(
        takeUntil(this.destroy$),
        filter((p) => !!p),
        map((data) => this.setTree(data))
      )
      .subscribe();

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

  public setTree(_searchResponses: BcOrgHierarchyProjection[]) {
    if (_searchResponses.length == 0) {
      if (this.orgHir.length == 0) {
        this.orgHir = [];
      }
      return;
    }
    const branch = this.treeHelper.orgHir2TreeNode(_searchResponses);
    if (branch?.length > 0) {
      branch.forEach(
        (item) => (item.label = this.translateObj.transform(item.data))
      );
    }

    const parentId = _searchResponses[0].parentId;
    const parentNode = this.treeHelper.findOrgHirById(this.orgHir, parentId);
    // console.log(parentId ,parentNode);

    if (parentNode && parentId) {
      parentNode.children = [...branch, ...parentNode.children];
    } else {
      this.orgHir = branch;
    }
  }
  toggleDialog(id?: number) {
    this.store.dispatch(
      new BrowseActivityDependenciesAction.ToggleDialog({ id })
    );
  }
  buildForm() {
    this.form = this.formBuilder.group({
      relatedActivityId: [null],
      dependencyDetails: [null, [Validators.required]],
      orgHierarchy: [null],
      activityName: [null],
      partner: [null],
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
    const formValue = this.form.value;
    const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);
    const activityAnalysis = this.store.selectSnapshot(
      ActivityAnalysisState.activityAnalysis
    );
    const dependency = {
      ...formValue,
      orgHierarchy: {
        id: formValue?.orgHierarchy?.key,
      },
      isFound: true,
      isActive: true,
      activity: {
        internal: activityAnalysis?.activity?.internal,
        id: activityAnalysis.activity.id,
      },
      cycle: {
        id: cycle.id,
      },
    };
    console.log(dependency);

    switch (this.dependType) {
      case DEPENDENCIES_TYPES.DEPENDENCY_INTERNAL:
        this.store.dispatch(
          new BrowseActivityDependenciesAction.CreateInternal(dependency)
        );
        break;
      case DEPENDENCIES_TYPES.DEPENDENCY_EXTERNAL:
        this.store.dispatch(
          new BrowseActivityDependenciesAction.CreateExternal(dependency)
        );
        break;
      case DEPENDENCIES_TYPES.DEPENDENCY_ORG:
        this.store.dispatch(
          new BrowseActivityDependenciesAction.CreateOrg(dependency)
        );
        break;

      default:
        break;
    }
  }

  loadActivities(node) {
    this.store.dispatch(
      new OrgActivityAction.LoadPage({
        page: 0,
        size: 100,
        filters: { orgHierarchyId: node?.key },
      })
    );
  }
  filterOrgHir(event) {
    this.auditLoadOrgPage$.next(event.filter);
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
}
