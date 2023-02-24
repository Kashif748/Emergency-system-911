import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TreeNode} from "primeng/api";
import {OrgStructure, Ranks, Role, UserAndRoleProjection} from "../../../../api/models";
import {catchError, distinctUntilChanged, filter, finalize, map, switchMap, take, takeUntil, tap} from "rxjs/operators";
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
import {GroupUser} from "../../../../api/models/group-user";

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit, OnDestroy {
  public get minDate() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  }
  RegxConst = RegxConst;

  opened$: Observable<boolean>;
  @Input()
  activeTab: number = 0;

  @Select(OrgState.orgs)
  orgs$: Observable<OrgStructure[]>;


  users$: Observable<UserAndRoleProjection[]>;

/*  @Select(RoleState.roles)
  roles$: Observable<Role[]>;*/
  /*@Select(UserState.ranks)
  ranks$: Observable<Ranks[]>;*/
  @Select(GroupState.blocking)
  blocking$: Observable<boolean>;

  viewOnly$: Observable<boolean>;

  @Input()
  orgsTree: TreeNode[];

  form: FormGroup;
  passwordControl: FormControl;
  rankControl: FormControl;
  private defaultFormValue: { [key: string]: any } = {};

  profileImg?: CroppedEvent;
  signatureImg?: CroppedEvent;

  destroy$ = new Subject();
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
    this.store
      .dispatch(new GroupAction.GetGroup({ id: v }))
      .pipe(
        switchMap(() => this.store.select(GroupState.group)),
        takeUntil(this.destroy$),
        take(1),
        tap((user) => {
          /*if (user['signature']) {
            this.signatureImg = { base64: user['signature'] };
          }
          if (user['profileImg']) {
            this.profileImg = { base64: user['profileImg'] };
          }*/
         //  const mobiles = user['mobiles'];
          this.form.patchValue({
            ...user,
            // mobiles: [{ mobile: '' }],
           // userName: user.samaccountname ?? user.userName,
            orgStructure: {
              key: user.orgStructure?.id,
              labelAr: user.orgStructure?.nameAr,
              labelEn: user.orgStructure?.nameEn,
              data: user.orgStructure,
            },
          });
          this.patchSelectedOrg(user.users);
          // this.patchMobile(mobiles);
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
    this.store.dispatch([
      new OrgAction.LoadOrgs({ orgId: this.auth.getClaim('orgId') }),
      new UserAction.LoadUserPage({ name: '', page: 0, size: 10 })
    ]);
    this.users$ = this.store.select(UserState.page).pipe(
      filter((r) => !!r),
      take(1)
    );
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
      orgStructure: [{ key: orgId }, [Validators.required]],
      nameEn: [null, [Validators.required, GenericValidators.english]],
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      descEn: [null, [Validators.required, GenericValidators.english]],
      descAr: [null, [Validators.required, GenericValidators.arabic]],
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

    this.form
      .get('orgStructure')
      .valueChanges.pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((org: TreeNode) => {
        this.store.dispatch(
          new RoleAction.LoadRoles({ orgId: org?.key as any })
        );
        /*this.removeRank();
        if (org?.data?.code == 'ADCDA' && !this.form.contains('rankId')) {
          this.addRank();
        }*/

        // password form control decision
        if (!this.form.contains('password') && !this._userId) {
          // this.addPassword();
        }

        if (org?.data?.ldapOrgId || this._userId) {
          // this.removePassword();
        }
      });
  }

  /*emiratesIdSearch() {
    const emiratesId = this.form.get('emiratesId').value;
    this.piService
      .getPersonalInfo(emiratesId)
      .pipe(take(1))
      .subscribe((ok) => {
        const user = ok.result;
        this.form.patchValue({
          firstNameEn: user?.personName?.firstNameEnglish,
          middleNameEn: user?.personName?.secondNameEnglish,
          lastNameEn:
            user?.personName?.familyNameEnglish ??
              user?.personName?.fourthNameEnglish,
          firstNameAr: user?.personName?.firstNameArabic,
          middleNameAr: user?.personName?.secondNameArabic,
          lastNameAr:
            user?.personName?.familyNameArabic ??
              user?.personName?.fourthNameArabic,
          email: user?.addresses?.address[0]?.localAddress?.emailAddress,
        });
       /!* this.patchMobile([
          {
            main: true,
            mobile: user?.addresses?.address[0]?.localAddress?.mobileNo,
          },
        ]);*!/
      });
  }*/

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }
    const group = {
      ...this.form.getRawValue(),
    }
    const user = {
      ...this.form.getRawValue(),
    };
    // user.roleIds = user.roleIds?.map((r) => r.id);

    user.rankId = { id: user.rankId?.id };
    if (user.orgStructure?.data?.code != 'ADCDA') {
      delete user.rankId;
    }

    user.type = 'inapp';
    // check ldap user
 /*   if (
      user.orgStructure?.data?.ldapOrgId != undefined ||
      user.orgStructure?.data?.ldapOrgId != null
    ) {
      user.samaccountname = user.userName;
      user.type = 'middleware';
      delete user.userName;
    }*/

    user.orgStructure = { id: user.orgStructure?.key };
    group.orgStructure = {id: group.orgStructure?.key };
    user.id = this._userId;
    const groupUserValue = this.form.get('userStructure').value
    const groupUser = groupUserValue;
      /*= [{
      id: null,
      type: null,
      user: {
        id: null
      }
    }]*/
    if (this.editMode) {
      // this.store.dispatch(new BrowseGroupsAction.UpdateUser(user));
    } else {
      this.store.dispatch(new BrowseGroupsAction.CreateGroup(group)).pipe(
        switchMap(() => {
            console.log();
            return this.store.dispatch(new GroupAction.CreateUser(groupUser));
      }),
        catchError((err) => {
          console.log(err);
        // this.messageHelper.error({ error: err });
          return EMPTY;
      }),
        finalize(() => {
          // console.log("test ptab");
          //  dispatch(new BrowseGroupsAction.ToggleDialog({}));
        })
    );
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
      this.signatureImg = undefined;
      return;
    } else if (this.activeTab === 2) {
      this.profileImg = undefined;
      return;
    }
    // this.removeRank();
    this.store.dispatch(new UserAction.GetUser({}));
    // this.patchMobile([]);
    this.form.reset();
    this.form.patchValue(this.defaultFormValue);
    this.cdr.detectChanges();
  }

  close() {
    this.store.dispatch(new BrowseGroupsAction.ToggleDialog({}));
  }

}
