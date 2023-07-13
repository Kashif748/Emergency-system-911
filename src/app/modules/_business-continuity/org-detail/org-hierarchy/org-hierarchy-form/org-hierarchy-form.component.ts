import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrgDetailState, UserAction, UserState } from '@core/states';
import { FormUtils } from '@core/utils';
import { Select, Store } from '@ngxs/store';
import { GenericValidators } from '@shared/validators/generic-validators';
import { TreeNode } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { auditTime, takeUntil, tap } from 'rxjs/operators';
import { BcOrgHierarchy, BcOrgHierarchyType, IdNameProjection } from 'src/app/api/models';
import { BrowseOrgDetailAction } from '../../states/browse-orgDetail.action';
import { BrowseOrgDetailState } from '../../states/browse-orgDetail.state';

@Component({
  selector: 'app-org-hierarchy-form',
  templateUrl: './org-hierarchy-form.component.html',
  styleUrls: ['./org-hierarchy-form.component.scss'],
})
export class OrgHierarchyFormComponent implements OnInit, OnDestroy {
  @Select(OrgDetailState.loading)
  public loading$: Observable<boolean>;

  @Select(OrgDetailState.orgHirTypes)
  public orgHirTypes$: Observable<BcOrgHierarchyType[]>;

  @Select(UserState.users)
  users$: Observable<IdNameProjection[]>;

  public selectedOrgHirNode$: Observable<TreeNode>;
  private auditLoadUsers$ = new Subject<string>();

  form: FormGroup;

  selectedOrgHirId;
  get editMode() {
    return (
      this.selectedOrgHirId !== undefined && this.selectedOrgHirId !== null
    );
  }
  private destroy$ = new Subject();

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.buildForm();
    this.selectedOrgHirNode$ = this.store
      .select(BrowseOrgDetailState.selectedOrgHirNode)
      .pipe(
        takeUntil(this.destroy$),
        tap((node) => {
          console.log(node);
          if (node?.data) {
            this.selectedOrgHirId = node.data?.id;
            this.form.patchValue(node.data);
          } else {
            this.selectedOrgHirId = null;
            this.buildForm();
          }
          this.form.get('parentId').setValue(node?.parent?.key);
        })
      );

    this.auditLoadUsers$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe((search) => {
        this.store.dispatch(
          new UserAction.LoadUsers({
            search,
            page: 0,
            size: 15,
          })
        );
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nameEn: [null, [Validators.required, GenericValidators.english]],
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      managerId: null,
      parentId: '',
      id: '',
      coordinatorId: null,
      bcOrgHirType: null,
      isActive: true,
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

    if (this.editMode) {
      this.store.dispatch(
        new BrowseOrgDetailAction.UpdateOrgHierarchy(this.form.value)
      );
    } else {
      this.store.dispatch(
        new BrowseOrgDetailAction.CreateOrgHierarchy(this.form.value)
      );
    }
  }

  deleteHir() {
    this.store.dispatch(
      new BrowseOrgDetailAction.DeleteOrgHierarchy({
        id: this.selectedOrgHirId,
      })
    );
  }

  loadUsers(search?: string, direct = false) {
    if (direct) {
      this.store.dispatch(
        new UserAction.LoadUsers({
          search,
          page: 0,
          size: 15,
        })
      );
      return;
    }
    this.auditLoadUsers$.next(search);
  }
}
