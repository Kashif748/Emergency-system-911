import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrgDetailState, UserAction, UserState } from '@core/states';
import { FormUtils } from '@core/utils';
import { Select, Store } from '@ngxs/store';
import { GenericValidators } from '@shared/validators/generic-validators';
import { TreeNode } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { auditTime, takeUntil, tap } from 'rxjs/operators';
import {
  BcOrgHierarchy,
  BcOrgHierarchyType,
  IdNameProjection,
} from 'src/app/api/models';
import { BrowseOrgDetailAction } from '../../states/browse-orgDetail.action';
import { BrowseOrgDetailState } from '../../states/browse-orgDetail.state';
import { Dropdown } from 'primeng/dropdown';
import { TranslateObjPipe } from '@shared/sh-pipes/translate-obj.pipe';

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

  @Select(UserState.usersIsolated('coordinator'))
  usersCoordinator$: Observable<IdNameProjection[]>;

  @Select(UserState.loading)
  usersLoading$: Observable<boolean>;

  @ViewChild('managerDropdown') managerDropdown: Dropdown;
  @ViewChild('coordinatorDropdown') coordinatorDropdown: Dropdown;

  public selectedOrgHirNode$: Observable<TreeNode>;
  private auditLoadUsers$ = new Subject<{
    search?: string;
    selectorKey?: string;
  }>();

  form: FormGroup;

  selectedOrgHirId;
  get editMode() {
    return (
      this.selectedOrgHirId !== undefined && this.selectedOrgHirId !== null
    );
  }
  private destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private translateObj: TranslateObjPipe
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.selectedOrgHirNode$ = this.store
      .select(BrowseOrgDetailState.selectedOrgHirNode)
      .pipe(
        takeUntil(this.destroy$),
        tap((node) => {
          if (this.managerDropdown) {
            setTimeout(() => {
              const firstName = this.translateObj.transform(
                node?.data?.manager,
                'firstName'
              );
              const middleName = this.translateObj.transform(
                node?.data?.manager,
                'middleName'
              );
              const lastName = this.translateObj.transform(
                node?.data?.manager,
                'lastName'
              );
              const fullName = `${firstName ?? ''}${
                middleName ? ' ' + middleName : ''
              }${lastName ? ' ' + lastName : ''}`;
              this.managerDropdown.filterValue = fullName;
              this.loadUsers(fullName, true);
            }, 100);
          }

          if (node?.data) {
            this.selectedOrgHirId = node.data?.id;
            const coordinators = node.data?.coordinators?.map((co) => co?.user);
            console.log(coordinators);

            this.form.patchValue({ ...node.data, coordinators });
          } else {
            this.selectedOrgHirId = null;
            this.buildForm();
          }
          this.form.get('parentId').setValue(node?.parent?.key);
        })
      );

    this.loadUsers(undefined, true, 'coordinator');

    this.auditLoadUsers$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe(({ search, selectorKey }) => {
        this.store.dispatch(
          new UserAction.LoadUsers({
            search,
            page: 0,
            size: 15,
            isolatedKey: selectorKey,
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
      manager: [null],
      parentId: '',
      id: '',
      coordinators: [null],
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
    const payload: BcOrgHierarchy = {
      ...this.form.value,
      coordinators: this.form.value?.coordinators?.map((user) => {
        return { user: { id: user?.id } };
      }),
      manager: { id: this.form.value?.manager?.id },
    };
    console.log(payload);

    if (this.editMode) {
      this.store.dispatch(
        new BrowseOrgDetailAction.UpdateOrgHierarchy(payload)
      );
    } else {
      this.store.dispatch(
        new BrowseOrgDetailAction.CreateOrgHierarchy(payload)
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

  loadUsers(search?: string, direct = false, selectorKey?: string) {
    if (direct) {
      this.store.dispatch(
        new UserAction.LoadUsers({
          search,
          page: 0,
          size: 15,
          isolatedKey: selectorKey,
        })
      );
      return;
    }
    this.auditLoadUsers$.next({ search, selectorKey });
  }
}
