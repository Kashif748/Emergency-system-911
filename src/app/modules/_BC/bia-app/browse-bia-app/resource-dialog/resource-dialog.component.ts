import {ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Dialog} from "primeng/dialog";
import {Select, Store} from "@ngxs/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrgDetailAction} from "@core/states";
import {auditTime, map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {IAuthService} from "@core/services/auth.service";
import {ILangFacade} from "@core/facades/lang.facade";
import {TreeNode} from "primeng/api";
import {OrgDetailState} from "@core/states/bc/org-details/org-detail.state";
import {ResourceAnalysisAction} from "@core/states/impact-analysis/resource-analysis.action";
import {FormUtils} from "@core/utils/form.utils";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";
import {BrowseBiaAppAction} from "../../states/browse-bia-app.action";

@Component({
  selector: 'app-bia-resource-dialog',
  templateUrl: './resource-dialog.component.html',
  styleUrls: ['./resource-dialog.component.scss']
})
export class ResourceDialogComponent implements OnInit, OnDestroy{
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;
  @ViewChild(Dialog) dialog: Dialog;

  @Select(ResourceAnalysisState.blocking)
  blocking$: Observable<boolean>;

  @Select(OrgDetailState.loading)
  public loadingOrgHir$: Observable<boolean>;

  @Input()
  orgHir: TreeNode[];

  @Input()
  cycles;

  private auditLoadOrgPage$ = new Subject<string>();

  public get asDialog() {
    return this.route.component !== ResourceDialogComponent;
  }
  private defaultFormValue: { [key: string]: any } = {};

  form: FormGroup;
  _resourceId: number;

  get editMode() {
    return this._resourceId !== undefined && this._resourceId !== null;
  }

  get viewOnly() {
    return (
      this.route.snapshot.queryParams['_mode'] === 'viewonly'
    );
  }

  @Input()
  set remoteWorkId(v: number) {
    this._resourceId = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.store
      .dispatch(new ResourceAnalysisAction.GetResourceAnalysis({ id: v }))
      .pipe(
        switchMap(() => this.store.select(ResourceAnalysisState.resourceAnalysis)),
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
          } catch {
          }
        }
      })
    );
  }

  ngOnInit(): void {
    this.buildForm()
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'new_resource')
    );
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

  buildForm() {
    this.form = this.formBuilder.group({
      orgHierarchy: [null, [Validators.required]],
      cycle:  [null, [Validators.required]],
      isActive: [true]
    });
    this.defaultFormValue = {
      ...this.defaultFormValue,
    };
  }
  openDialog(id?: number) {
    this.store.dispatch(
      new BrowseBiaAppAction.ToggleDialog({ dialog: 'new_resource' })
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  close() {
    this.store.dispatch(new BrowseBiaAppAction.ToggleDialog({}));
  }
  clear() {
    this.store.dispatch(new ResourceAnalysisAction.GetResourceAnalysis({}));
    this.form.reset();
    this.form.patchValue(this.defaultFormValue);
    this.cdr.detectChanges();
  }
  get redirect() {
    return [this.route.snapshot.queryParams['_redirect'] ?? '..'];
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

  async submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const resource = {
      ...this.form.getRawValue(),
    };

    const orgHie = {
      id: resource.orgHierarchy.key ? resource.orgHierarchy.key : resource.orgHierarchy.data
    };

    resource.orgHierarchy = orgHie;
    resource.cycle = {
      id : resource.cycle
    };

    this.store.dispatch(new BrowseBiaAppAction.CreateResourceAnalysis(resource));

  }
}
