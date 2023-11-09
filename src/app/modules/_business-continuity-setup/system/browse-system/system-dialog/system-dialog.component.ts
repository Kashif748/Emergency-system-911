import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { OrgDetailAction, OrgDetailState } from '@core/states';
import { Observable, Subject } from 'rxjs';
import { BcSystems } from 'src/app/api/models/bc-systems';
import { TreeNode } from 'primeng/api';
import { TranslateObjPipe } from '@shared/sh-pipes/translate-obj.pipe';
import {
  auditTime,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { FormUtils } from '@core/utils';
import { BrowseSystemsAction } from '../../states/browse-systems.action';
import { SystemsState } from '@core/states/bc-setup/systems/systems.state';
import { SystemsAction } from '@core/states/bc-setup/systems/systems.action';
import { GenericValidators } from '@shared/validators/generic-validators';
import { Dialog } from 'primeng/dialog';
import { BcOrgHierarchyProjection } from 'src/app/api/models/bc-org-hierarchy-projection';
import { TreeHelper } from '@core/helpers/tree.helper';
import { ILangFacade } from '@core/facades/lang.facade';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-system-dialog',
  templateUrl: './system-dialog.component.html',
  styleUrls: ['./system-dialog.component.scss'],
})
export class SystemDialogComponent implements OnInit, OnDestroy {
  @Input() asDialog: boolean = true;
  @Output() onClose = new EventEmitter<boolean>();
  @ViewChild(Dialog)
  dialog: Dialog;
  isOpened$: Observable<boolean>;
  public orgHir: TreeNode[] = [];
  private auditLoadOrgPage$ = new Subject<string>();
  @Select(OrgDetailState.loading)
  public loadingOrgHir$: Observable<boolean>;
  viewOnly$: Observable<boolean>;

  @Select(SystemsState.blocking)
  blocking$: Observable<boolean>;

  form: FormGroup;

  _systemId: number;
  private defaultFormValue: { [key: string]: any } = {};

  get editMode() {
    return this._systemId !== undefined && this._systemId !== null;
  }

  @Input()
  set systemId(v: number) {
    this._systemId = v;
    this.buildForm();
    if (v === undefined || v === null) {
      this.defaultFormValue = null;
      return;
    }
    this.store
      .dispatch(new SystemsAction.GetSystem({ id: v }))
      .pipe(
        switchMap(() => this.store.select(SystemsState.system)),
        takeUntil(this.destroy$),
        take(1),
        tap((system) => {
          this.form.patchValue({
            ...system,
          });
          this.patchvalue(system);
          this.defaultFormValue = system;
        })
      )
      .subscribe();
  }
  private destroy$ = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store,
    private translateObj: TranslateObjPipe,
    private router: Router,
    protected cdr: ChangeDetectorRef,
    private treeHelper: TreeHelper,
    private translateService: TranslateService
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.systemId = id;
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
  patchvalue(system) {
    this.form.patchValue({
      orgHierarchy: {
        key: system.orgHierarchy.id,
        label: this.translateObj.transform(system.orgHierarchy),
      },
    });
  }

  ngOnInit(): void {
    this.buildForm();
    this.isOpened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );

    this.store.dispatch([
      new OrgDetailAction.GetOrgHierarchySearch({ page: 0, size: 100 }),
    ]);

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
        this.orgHir =[];
        this.store.dispatch(
          new OrgDetailAction.GetOrgHierarchySearch({
            page: 0,
            size: 100,
            name: search,
          })
        );
      });
  }

  filterOrgHir(event) {
    this.auditLoadOrgPage$.next(event);
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
  openDialog(systemId?: number) {
    this.store.dispatch(new BrowseSystemsAction.ToggleDialog({ systemId }));
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      nameEn: [null, [Validators.required, GenericValidators.english]],
      orgHierarchy: [null, [Validators.required]],
      isActive: true,
      id: null,
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

    var biaSystem: BcSystems = {
      ...this.form.value,
      orgHierarchy: {
        id: this.form.value?.orgHierarchy?.key,
      },
      id: this._systemId,
    };

    if (this.editMode) {
      this.store.dispatch(new BrowseSystemsAction.UpdateSystem(biaSystem));
    } else {
      this.store
        .dispatch(new BrowseSystemsAction.CreateSystem(biaSystem))
        .toPromise()
        .then(() => {
          if (this.dialog) {
            this.store.dispatch(new BrowseSystemsAction.ToggleDialog({}));
          } else {
            this.onClose.emit(true);
          }
        });
    }
  }

  public setTree(_searchResponses: BcOrgHierarchyProjection[]) {
    if (_searchResponses.length == 0) {
      if (this.orgHir.length == 0) {
        this.orgHir = [];
      }
      return;
    }
    let branch = this.treeHelper.orgHir2TreeNode(_searchResponses);
    if (branch?.length > 0) {
      branch.forEach(
        (item) => (item.label = this.translateObj.transform(item.data))
      );
    }

    const parentId = _searchResponses[0].parentId;
    const parentNode = this.treeHelper.findOrgHirById(this.orgHir, parentId);

    if (parentNode && parentId) {
      parentNode.children = [...branch, ...parentNode.children];
    } else {
      this.orgHir = branch;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  get redirect() {
    return [this.route.snapshot.queryParams['_redirect'] ?? '..'];
  }
  close() {
    if (this.asDialog) {
      this.store.dispatch(new BrowseSystemsAction.ToggleDialog({}));
    } else {
      this.router.navigate(this.redirect, { relativeTo: this.route });
    }
  }
  clear() {
    this.form.reset();
    this.form.patchValue(this.defaultFormValue);
    this.patchvalue(this.defaultFormValue);
    this.cdr.detectChanges();
  }
}
