import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { Observable, of, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { BrowseActivityDependenciesAction } from '../states/browse-dependencies.action';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { OrgDetailAction, OrgDetailState } from '@core/states';
import { TreeNode } from 'primeng/api';
import { BcOrgHierarchy, PageBcActivities } from 'src/app/api/models';
import { TranslateObjPipe } from '@shared/sh-pipes/translate-obj.pipe';
import { ActivityAnalysisAction } from '@core/states/activity-analysis/activity-analysis.action';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';
import { FormUtils } from '@core/utils';
import { ActivityDependenciesState, DEPENDENCIES_TYPES } from '@core/states/activity-analysis/dependencies/dependencies.state';

@Component({
  selector: 'app-dependencies-dialog',
  templateUrl: './dependencies-dialog.component.html',
  styleUrls: ['./dependencies-dialog.component.scss'],
})
export class DependenciesDialogComponent implements OnInit, OnDestroy {
  dependenciesLimts = [];
  opened$: Observable<boolean>;
  dependType: DEPENDENCIES_TYPES;

  @Select(ActivityAnalysisState.activities)
  activies$: Observable<PageBcActivities[]>;

  public blocking$: Observable<boolean>;

  public orgHir$: Observable<TreeNode[]>;

  form: FormGroup;
  destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private translateObj: TranslateObjPipe,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.dependenciesLimts = [
      {
        name: 'DEPENDENCY_EXTERNAL',
        value: DEPENDENCIES_TYPES.DEPENDENCY_EXTERNAL,
      },
      {
        name: 'DEPENDENCY_INTERNAL',
        value: DEPENDENCIES_TYPES.DEPENDENCY_INTERNAL,
      },
      { name: 'DEPENDENCY_ORG', value: DEPENDENCIES_TYPES.DEPENDENCY_ORG },
    ];
  }

  ngOnInit(): void {
    this.buildForm();

    this.opened$ = this.route.queryParams.pipe(
      takeUntil(this.destroy$),
      tap((params) => {
        this.form.reset();
        this.dependType = params['_dependType'];
      }),
      map((params) => params['_dialog'] === 'opened')
    );

    this.blocking$ = this.store.select(ActivityDependenciesState.blocking).pipe(
      takeUntil(this.destroy$),
      filter((p) => !!p),
      map((data) => data[this.dependType])
    );
    this.store.dispatch([
      new OrgDetailAction.GetOrgHierarchy({ page: 0, size: 100 }),
      new ActivityAnalysisAction.LoadActivities({ page: 0, size: 100 }),
    ]);

    this.orgHir$ = this.store.select(OrgDetailState.orgHir).pipe(
      takeUntil(this.destroy$),
      filter((p) => !!p),
      map((data) => this.setTree(data)),
      tap(console.log)
    );
  }
  public setTree(_searchResponses: BcOrgHierarchy[]): TreeNode[] {
    const nest = (items, id = null, link = 'parentId') =>
      items
        .filter((item) => item[link] === id)
        .map((item: BcOrgHierarchy) => {
          let node: TreeNode;
          node = {
            key: item.id.toString(),
            data: item,
            label: this.translateObj.transform(item),
            children: nest(items, item.id),
          };
          return node;
        });
    return nest(_searchResponses);
  }
  toggleDialog(id?: number) {
    this.store.dispatch(
      new BrowseActivityDependenciesAction.ToggleDialog({ id })
    );
  }
  buildForm() {
    this.form = this.formBuilder.group({
      activity: [null, [Validators.required]],
      dependencyDetails: [null, [Validators.required]],
      orgHierarchy: [null, [Validators.required]],
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
    const dependency = {
      ...formValue,
      orgHierarchy: {
        id: formValue?.orgHierarchy?.key,
      },
      isFound: true,
      activityName: formValue.activity?.nameEn,
      relatedActivityId: formValue.activity?.id,
      isActive: true,
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
