import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";
import {IAuthService} from "@core/services/auth.service";
import {Select, Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {auditTime, map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {BrowseRemoteWorkAction} from "../../states/browse-remote-work.action";
import {ImpLevelWorkingAction, RemoteWorkAction, UserAction, UserState} from "@core/states";
import {Dropdown} from "primeng/dropdown";
import {BcResourcesRemoteWork, BcSystems, BcWorkImportanceLevels} from "../../../../../../api/models";
import {ImpLevelWorkingState} from "@core/states/bc/imp-level-working/imp-level-working.state";
import {SystemsState} from "@core/states/bc-setup/systems/systems.state";
import {SystemsAction} from "@core/states/bc-setup/systems/systems.action";
import {FormUtils} from "@core/utils/form.utils";
import {RemoteWorkState} from "@core/states/bc-resources/remote-work/remote-work.state";
import {Dialog} from "primeng/dialog";
import {OrgActivityAction} from "@core/states/org-activities/orgActivity.action";
import {BcResourcesDesignation} from "../../../../../../api/models/bc-resources-designation";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";

@Component({
  selector: 'app-remote-work-dialog',
  templateUrl: './remote-work-dialog.component.html',
  styleUrls: ['./remote-work-dialog.component.scss']
})
export class RemoteWorkDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;

  @ViewChild(Dialog) dialog: Dialog;
  @ViewChild('priorityLevel') priorityLevelDropdown: Dropdown;
  @ViewChild('system') systemDropdown: Dropdown;
  @ViewChild('resourceDesignation') resourceDesignationDropdown: Dropdown;

  @Select(ImpLevelWorkingState.page)
  priorityLevel$: Observable<BcWorkImportanceLevels[]>;

  @Select(RemoteWorkState.personalDesignationPage)
  resourceDesignation$: Observable<BcResourcesDesignation[]>;

  @Select(RemoteWorkState.personalDesignationLoading)
  resourceDesignationLoading$: Observable<boolean>;

  @Select(SystemsState.page)
  systems$: Observable<BcSystems[]>;

  @Select(ImpLevelWorkingState.loading)
  priorityLevelLoading$: Observable<boolean>;

  @Select(SystemsState.loading)
  systemsLoading$: Observable<boolean>;

  @Select(RemoteWorkState.blocking)
  blocking$: Observable<boolean>;

  public get asDialog() {
    return this.route.component !== RemoteWorkDialogComponent;
  }
  private defaultFormValue: { [key: string]: any } = {};
  private auditLoadPriorityLevel$ = new Subject<string>();
  private auditLoadSystemLevel$ = new Subject<string>();
  private auditLoadPersonalDesignation$ = new Subject<string>();

  form: FormGroup;
  _remoteWorkId: number;

  get editMode() {
    return this._remoteWorkId !== undefined && this._remoteWorkId !== null;
  }

  get viewOnly() {
    return (
      this.route.snapshot.queryParams['_mode'] === 'viewonly'
    );
  }

  @Input()
  set remoteWorkId(v: number) {
    this._remoteWorkId = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.store
      .dispatch(new UserAction.GetUser({ id: v }))
      .pipe(
        switchMap(() => this.store.select(UserState.user)),
        takeUntil(this.destroy$),
        take(1),
        tap((user) => {
        })
      )
      .subscribe();
  }
  destroy$ = new Subject();
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
        this.remoteWorkId = id;
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

    this.auditLoadPriorityLevel$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe((searchText) => {
        this.store.dispatch(
          new ImpLevelWorkingAction.LoadPage({ page: 0,
            size: 50, versionId: 337})
        );
      });

    this.auditLoadSystemLevel$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe((searchText) => {
        this.store.dispatch(
          new SystemsAction.LoadPage({ page: 0,
            size: 50})
        );
      });

    this.auditLoadPersonalDesignation$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe((searchText) => {
        this.store.dispatch(
          new RemoteWorkAction.LoadDesignationPage({ page: 0,
            size: 50})
        );
      });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      resourceDesignation: [null, [Validators.required]],
      importantLevel:  [null, [Validators.required]],
      skillsNeeded: [null, [Validators.required]],
      resourcesRemoteWorkSystemsInternal: [null, [Validators.required]],
      resourcesRemoteWorkSystemsExternal: [null, [Validators.required]],
      staffDistributionIn: [null, [Validators.required]],
      staffDistributionOut: [null, [Validators.required]],
      notes: [null, [Validators.required]],
    });
    this.defaultFormValue = {
      ...this.defaultFormValue,
    };
  }

  openDialog(id?: number) {
    this.store.dispatch(new BrowseRemoteWorkAction.ToggleDialog({ remoteWorkId: id }));
  }
  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const remote = {
      ...this.form.getRawValue(),
    };
    const resource = this.store.selectSnapshot(ResourceAnalysisState.resourceAnalysis);
    const remoteWork: BcResourcesRemoteWork = {
      id: this._remoteWorkId,
      importantLevel: { id: remote.importantLevel.id},
      isActive: true,
      notes: remote.notes,
      resource: {
        id: resource?.id
      },
      resourceDesignation: remote.resourceDesignation,
      resourcesRemoteWorkSystems: [{
        system: {id: remote.resourcesRemoteWorkSystemsInternal.id},
        isInternal: true,
        bcResourcesRemoteWork: {
          id: 0
        }
      },
        {
          system: {id: remote.resourcesRemoteWorkSystemsInternal.id},
          isInternal: false,
          bcResourcesRemoteWork: {
            id: 0
          }
        }],
      skillsNeeded: remote.skillsNeeded,
      staffDistributionIn: remote.staffDistributionIn,
      staffDistributionOut: remote.staffDistributionOut,
    };

    if (this.editMode) {
      this.store
        .dispatch(new BrowseRemoteWorkAction.UpdateRemoteWork(remoteWork));

    } else {
      this.store
        .dispatch(new BrowseRemoteWorkAction.CreateRemoteWork(remoteWork));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadPriorityLevel(searchText?: string, direct = false, id?: number) {
    if (direct) {
      this.store.dispatch(
        new ImpLevelWorkingAction.LoadPage({ page: 0,
          size: 50, versionId: 337})
      );
      return;
    }
    this.auditLoadPriorityLevel$.next(searchText);
  }

  loadPersonalDesignation(searchText?: string, direct = false, id?: number) {
    if (direct) {
      this.store.dispatch(
        new RemoteWorkAction.LoadDesignationPage({ page: 0,
          size: 50})
      );
      return;
    }
    this.auditLoadPersonalDesignation$.next(searchText);
  }

  loadSystems(searchText?: string, direct = false, id?: number) {
    if (direct) {
      this.store.dispatch(
        new SystemsAction.LoadPage({ page: 0,
          size: 50})
      );
      return;
    }
    this.auditLoadSystemLevel$.next(searchText);
  }
  close() {
    if (this.asDialog) {
      this.store.dispatch(new BrowseRemoteWorkAction.ToggleDialog({}));
    } else {
      this.router.navigate(this.redirect, { relativeTo: this.route });
    }
  }

  clear() {
    this.store.dispatch(new OrgActivityAction.GetOrgActivities({}));
    this.form.reset();
    this.form.patchValue(this.defaultFormValue);
    this.cdr.detectChanges();
  }

  get redirect() {
    return [this.route.snapshot.queryParams['_redirect'] ?? '..'];
  }
}
