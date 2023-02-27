import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TreeNode} from "primeng/api";
import {OrgStructure, UserAndRoleProjection} from "../../../../api/models";
import {auditTime, catchError, distinctUntilChanged, filter, finalize, map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {GroupAction, OrgAction, OrgState, RoleAction, RoleState, UserAction, UserState} from "@core/states";
import {EMPTY, Observable, Subject} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegxConst} from "@core/constant/RegxConst";
import {Select, Store} from "@ngxs/store";
import {CroppedEvent} from "@shared/sh-components/photo-editor";
import {GenericValidators} from "@shared/validators/generic-validators";
import {FormUtils} from "@core/utils/form.utils";
import {IAuthService} from "@core/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {BrowseGroupsAction} from "../../states/browse-groups.action";
import {TranslationService} from "../../../i18n/translation.service";
import {GroupState} from "@core/states/group/group.state";
import {userType} from "../../../groups-management/group.model";

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit, OnDestroy {

  RegxConst = RegxConst;

  opened$: Observable<boolean>;
  @Input()
  activeTab: number = 0;

  @Select(OrgState.orgs)
  orgs$: Observable<OrgStructure[]>;

  @Select(UserState.groupMapUsers)
  users$: Observable<UserAndRoleProjection[]>;

  // users$: Observable<UserAndRoleProjection[]>;

  @Select(GroupState.blocking)
  blocking$: Observable<boolean>;

  viewOnly$: Observable<boolean>;

  @Input()
  orgsTree: TreeNode[];

  form: FormGroup;
  private defaultFormValue: { [key: string]: any } = {};

  userGroupForm: FormGroup;
   private defaultUserFormValue: { [key: string]: any } = {};

  destroy$ = new Subject();
  private LoadUsers$ = new Subject<string>();
  lang = 'en';

  _userId: number;
  get loggedinUserId() {
    return this.auth.getClaim('sub');
  }
  get editMode() {
    return this._userId !== undefined && this._userId !== null;
  }

  @Input()
  set userId(v: number) {
    this._userId = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.loadUsers('', true);
    this.store
      .dispatch(new GroupAction.GetGroup({ id: v }))
      .pipe(
        switchMap(() => this.store.select(GroupState.group)),
        takeUntil(this.destroy$),
        take(1),
        tap((user) => {
          this.form.patchValue({
            ...user,
            orgStructure: {
              key: user.orgStructure?.id,
              labelAr: user.orgStructure?.nameAr,
              labelEn: user.orgStructure?.nameEn,
              data: user.orgStructure,
            },
          });
          this.patchSelectedOrg(user.users);
        })
      )
      .subscribe();
  }
  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store,
    private formBuilder: FormBuilder,
    private auth: IAuthService,
    private route: ActivatedRoute,
    private translationService: TranslationService,
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.userId = id;
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

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
    this.buildForm();
    this.buildUserForm();
    this.store.dispatch([
      new OrgAction.LoadOrgs({ orgId: this.auth.getClaim('orgId') }),
      // new UserAction.LoadUserPage({ name: '', page: 0, size: 10 })
    ]);
    this.LoadUsers$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe((name) => {
        this.store.dispatch(
          new UserAction.LoadGroupMapUserPage({
            name,
            page: 0,
            size: 15,
          })
        );
      });

 /*   this.users$ = this.store.select(UserState.page).pipe(
      filter((r) => !!r),
      take(1)
    );*/
  }

  loadUsers(name?: string, direct = false) {
    if (direct) {
      this.store.dispatch(
        new UserAction.LoadGroupMapUserPage({
          name,
          page: 0,
          size: 15,
        })
      );
      return;
    }
    this.LoadUsers$.next(name);
  }


  patchSelectedOrg(user: any) {
    const manager = user.find((item, index) => {
      if (item.type == userType.MANAGER) {
       /* item.user['lastNameAr'] == null
          ? (item.user['lastNameAr'] = '')
          : item.user['lastNameAr'];
        item.user['lastNameEn'] == null
          ? (item.user['lastNameEn'] = '')
          : item.user['lastNameEn'];*/
        return item.user;
      }
    });
    this.form.patchValue({
      userStructure: manager?.user
    })
    console.log(user);
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildForm() {
    this.activeTab = 0;
    const orgId = this.auth.getClaim('orgId');
    this.form = this.formBuilder.group({
      nameEn: [null, [Validators.required, GenericValidators.english]],
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      descEn: [null, [Validators.required, GenericValidators.english]],
      descAr: [null, [Validators.required, GenericValidators.arabic]],
      orgStructure: [{ key: orgId }, [Validators.required]],
      userStructure: [undefined, [Validators.required]],
    });
    this.defaultFormValue = {
      ...this.defaultFormValue,
      isActive: true,
      orgId: orgId,
    };
    this.orgs$
      .pipe(
        takeUntil(this.destroy$),
        filter((orgs) => !!orgs),
        take(1),
        tap((orgs) => {
          const o = orgs?.find((o) => o.id === orgId);
          this.defaultFormValue = {
            ...this.defaultFormValue,
            orgStructure: {
              key: o?.id,
              labelAr: o?.nameAr,
              labelEn: o?.nameEn,
              data: o,
            },
          };
          this.form.patchValue({
            orgStructure: this.defaultFormValue.orgStructure,
          });
        })
      )
      .subscribe();

    // this.addPassword();

/*    this.form
      .get('orgStructure')
      .valueChanges.pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((org: TreeNode) => {
        this.store.dispatch(
          new RoleAction.LoadRoles({ orgId: org?.key as any })
        );
      });*/
  }

  buildUserForm() {
    this.userGroupForm = this.formBuilder.group({
      usersIds: [undefined, [Validators.required]],
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

    const groupUser = [{
      id: 0,
      type: 1,
      user: null
    }];

    if (this.form.dirty) {
      const group = {
        ...this.form.getRawValue(),
      };
      group.orgStructure = {id: group.orgStructure?.key };
      const groupUserValue = this.form.get('userStructure').value;
      groupUser[0].user = {
        id : groupUserValue.id
      };

      if (this.editMode) {
        // this.store.dispatch(new BrowseGroupsAction.UpdateUser(user));
      } else {
        this.store.dispatch(new BrowseGroupsAction.CreateGroup(group)).pipe(
          tap(() => {
            this.store.dispatch(new BrowseGroupsAction.CreateUser({
              user: groupUser
            }));
            takeUntil(this.destroy$);
            take(1);
          }),
        ).subscribe();
      }

    } else if (this.userGroupForm.dirty) {
      // Validation for user
      if (!this.userGroupForm.valid) {
        this.userGroupForm.markAllAsTouched();
        FormUtils.ForEach(this.userGroupForm, (fc) => {
          fc.markAsDirty();
        });
        return;
      }
      const groupUserValue = {
        ...this.userGroupForm.getRawValue(),
      };
      groupUserValue.usersIds = groupUserValue.usersIds?.map((r) => r.id);
      console.log(groupUserValue);
      groupUserValue.usersIds.forEach((element, index) => {
        groupUser[index] = {
          id: 0,
          type: 2,
          user: {
            id: groupUserValue.usersIds[index]
          }
        };
      });
      if (this._userId) {
         this.store.dispatch(new BrowseGroupsAction.CreateUser({groupId: this._userId, user: groupUser}));
      }
    }



  /*  const user = {
      ...this.form.getRawValue(),
    };*/
    // user.roleIds = user.roleIds?.map((r) => r.id);

  /*  user.rankId = { id: user.rankId?.id };
    if (user.orgStructure?.data?.code != 'ADCDA') {
      delete user.rankId;
    }*/

    // user.type = 'inapp';
    // check ldap user
 /*   if (
      user.orgStructure?.data?.ldapOrgId != undefined ||
      user.orgStructure?.data?.ldapOrgId != null
    ) {
      user.samaccountname = user.userName;
      user.type = 'middleware';
      delete user.userName;
    }*/

    // user.orgStructure = { id: user.orgStructure?.key };

    // user.id = this._userId;



    if (this.activeTab === 0) {

      return;
    } else if (this.activeTab === 2) {
      // this.profileImg = undefined;
      return;
    }
  }

  delete() {
    const group = {
      ...this.form.getRawValue(),
    };
    group.id = this._userId;
    group.isActive = false;
    group.global = null;
    group.orgStructure = {id: group.orgStructure?.key };
    this.store.dispatch(new BrowseGroupsAction.DeletedGroup(group));
  }

  clear() {
    if (this.activeTab === 1) {
      // this.signatureImg = undefined;
      return;
    } else if (this.activeTab === 2) {
      // this.profileImg = undefined;
      return;
    }
    // this.store.dispatch(new UserAction.GetUser({}));
    // this.patchMobile([]);
    this.form.reset();
    this.form.patchValue(this.defaultFormValue);
    this.cdr.detectChanges();
  }

  close() {
    this.store.dispatch(new BrowseGroupsAction.ToggleDialog({}));
  }

}
