import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { OrgDetailAction, OrgDetailState, RtoState } from '@core/states';
import { Observable, of, Subject } from 'rxjs';
import { BcOrgHierarchy, Bcrto } from 'src/app/api/models';
import { BcSystems } from 'src/app/api/models/bc-systems';
import { TreeNode } from 'primeng/api';
import { TranslateObjPipe } from '@shared/sh-pipes/translate-obj.pipe';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { FormUtils } from '@core/utils';
import { BrowseSystemsAction } from '../../states/browse-systems.action';
import { SystemsState } from '@core/states/bc-setup/systems/systems.state';
import { SystemsAction } from '@core/states/bc-setup/systems/systems.action';

@Component({
  selector: 'app-system-dialog',
  templateUrl: './system-dialog.component.html',
  styleUrls: ['./system-dialog.component.scss'],
})
export class SystemDialogComponent implements OnInit, OnDestroy {
  isOpened$: Observable<boolean>;

  public orgHir$: Observable<TreeNode[]>;

  @Select(SystemsState.blocking)
  blocking$: Observable<boolean>;

  form: FormGroup;

  _systemId: number;

  get editMode() {
    return this._systemId !== undefined && this._systemId !== null;
  }

  @Input()
  set systemId(v: number) {
    this._systemId = v;
    this.buildForm();
    if (v === undefined || v === null) {
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
        })
      )
      .subscribe();
  }
  private destroy$ = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store,
    private translateObj: TranslateObjPipe
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.systemId = id;
      });
  }

  ngOnInit(): void {
    this.buildForm();
    this.isOpened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );

    this.store.dispatch([
      new OrgDetailAction.GetOrgHierarchy({ page: 0, size: 100 }),
    ]);

    this.orgHir$ = this.store.select(OrgDetailState.orgHir).pipe(
      takeUntil(this.destroy$),
      filter((p) => !!p),
      map((data) => this.setTree(data)),
      tap(console.log)
    );
  }
  openDialog(systemId?: number) {
    this.store.dispatch(new BrowseSystemsAction.ToggleDialog({ systemId }));
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nameAr: [null],
      nameEn: [null],
      orgHierarchy: [null],
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
      this.store.dispatch(new BrowseSystemsAction.CreateSystem(biaSystem));
    }
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
