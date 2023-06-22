import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RegxConst } from '@core/constant/RegxConst';
import { IAuthService } from '@core/services/auth.service';
import { UrlHelperService } from '@core/services/url-helper.service';
import {
  OrgAction,
  OrgState,
  RoleAction,
  RoleState,
  UserAction,
  UserState,
} from '@core/states';
import { FormUtils } from '@core/utils/form.utils';
import { Select, Store } from '@ngxs/store';
import {
  CroppedEvent,
  PhotoEditorService,
} from '@shared/sh-components/photo-editor';
import { GenericValidators } from '@shared/validators/generic-validators';
import { TreeNode } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { OrgStructure, Ranks, Role } from 'src/app/api/models';
import { PersonalInquiryControllerService } from 'src/app/api/services';
import { BrowseUsersAction } from '../../states/browse-users.action';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit, OnDestroy {
  public get minDate() {
    return new Date();
  }
  RegxConst = RegxConst;

  opened$: Observable<boolean>;
  @Input()
  activeTab: number = 0;

  @Select(OrgState.orgs)
  orgs$: Observable<OrgStructure[]>;
  @Select(RoleState.roles)
  roles$: Observable<Role[]>;
  @Select(UserState.ranks)
  ranks$: Observable<Ranks[]>;
  @Select(UserState.blocking)
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
      .dispatch(new UserAction.GetUser({ id: v }))
      .pipe(
        switchMap(() => this.store.select(UserState.user)),
        takeUntil(this.destroy$),
        take(1),
        tap((user) => {
          if (user['signature']) {
            this.signatureImg = { base64: user['signature'] };
          }
          if (user['profileImg']) {
            this.profileImg = { base64: user['profileImg'] };
          }
          const mobiles = user['mobiles'];
          this.form.patchValue({
            ...user,
            mobiles: [{ mobile: '' }],
            userName: user.samaccountname ?? user.userName,
            orgStructure: {
              key: user.orgStructure?.id,
              labelAr: user.orgStructure?.nameAr,
              labelEn: user.orgStructure?.nameEn,
              data: user.orgStructure,
            },
          });
          this.patchMobile(mobiles);
        })
      )
      .subscribe();
  }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private photoEditorService: PhotoEditorService,
    private urlHelper: UrlHelperService,
    private cdr: ChangeDetectorRef,
    private piService: PersonalInquiryControllerService,
    private auth: IAuthService,
    private route: ActivatedRoute
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

  ngOnInit() {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
    this.buildForm();
    this.store.dispatch(
      new OrgAction.LoadOrgs({ orgId: this.auth.getClaim('orgId') })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildForm() {
    this.rankControl = undefined;
    this.passwordControl = undefined;
    this.profileImg = undefined;
    this.signatureImg = undefined;
    this.activeTab = 0;
    const orgId = this.auth.getClaim('orgId');
    this.form = this.formBuilder.group({
      userName: [
        { value: null, disabled: this.editMode },
        [Validators.required, Validators.pattern(RegxConst.USER_NAME_REGEX)],
      ],
      emiratesId: [
        null,
        [Validators.required, Validators.pattern(RegxConst.EMIRATES_ID_REGEX)],
      ],
      orgStructure: [{ key: orgId }, [Validators.required]],
      expireDate: [null],
      email: [
        null,
        [Validators.required, Validators.pattern(RegxConst.EMAIL_REGEX)],
      ],

      firstNameEn: [null, [Validators.required, GenericValidators.english]],
      middleNameEn: ['', [GenericValidators.english]],
      lastNameEn: [null, [GenericValidators.english, Validators.required]],
      firstNameAr: [null, [Validators.required, GenericValidators.arabic]],
      middleNameAr: ['', [GenericValidators.arabic]],
      lastNameAr: [null, [GenericValidators.arabic, Validators.required]],
      title: [null],
      roleIds: [null, []],
      mobiles: this.formBuilder.array(
        [this.createMobile(undefined)],
        Validators.required
      ),
      isActive: [true],
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

    this.addPassword();

    this.form
      .get('orgStructure')
      .valueChanges.pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((org: TreeNode) => {
        this.store.dispatch(
          new RoleAction.LoadRoles({ orgId: org?.key as any })
        );
        this.removeRank();
        if (org?.data?.code == 'ADCDA' && !this.form.contains('rankId')) {
          this.addRank();
        }

        // password form control decision
        if (!this.form.contains('password') && !this._userId) {
          this.addPassword();
        }

        if (org?.data?.ldapOrgId || this._userId) {
          this.removePassword();
        }

        this.form.get('roleIds').reset();
      });
  }

  emiratesIdSearch() {
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
        this.patchMobile([
          {
            main: true,
            mobile: user?.addresses?.address[0]?.localAddress?.mobileNo,
          },
        ]);
      });
  }

  submit() {
    const control = this.form.get('emiratesId');
    if (!control.touched && control.value ) {
      control.clearValidators();
      control.updateValueAndValidity();
    }
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const user = {
      ...this.form.getRawValue(),
    };
    user.roleIds = user.roleIds?.map((r) => r.id);

    user.rankId = { id: user.rankId?.id };
    if (user.orgStructure?.data?.code != 'ADCDA') {
      delete user.rankId;
    }

    user.type = 'inapp';
    // check ldap user
    if (
      user.orgStructure?.data?.ldapOrgId != undefined ||
      user.orgStructure?.data?.ldapOrgId != null
    ) {
      user.samaccountname = user.userName;
      user.type = 'middleware';
      delete user.userName;
    }

    user.mobiles = user.mobiles.map((v, i) => {
      return { id: i, main: i == 0, mobile: v.mobile.e164Number };
    });

    user.orgStructure = { id: user.orgStructure?.key };

    user.id = this._userId;

    this.signatureImgUpload();
    this.profileImgUpload();

    if (this.editMode) {
      this.store.dispatch(new BrowseUsersAction.UpdateUser(user));
    } else {
      this.store.dispatch(new BrowseUsersAction.CreateUser(user));
    }
  }

  clear() {
    if (this.activeTab === 1) {
      this.signatureImg = undefined;
      return;
    } else if (this.activeTab === 2) {
      this.profileImg = undefined;
      return;
    }
    this.removeRank();
    this.store.dispatch(new UserAction.GetUser({}));
    this.patchMobile([]);
    this.form.reset();
    this.form.patchValue(this.defaultFormValue);
    this.cdr.detectChanges();
  }

  // rank
  addRank() {
    this.store.dispatch(new UserAction.GetRanks({}));
    const user = this.store.selectSnapshot(UserState.user);
    this.rankControl = this.formBuilder.control(user?.rankId, [
      Validators.required,
    ]);
    this.form.addControl('rankId', this.rankControl);
  }

  removeRank() {
    this.form.removeControl('rankId');
    this.rankControl = undefined;
    this.form.updateValueAndValidity();
  }

  // password
  addPassword() {
    this.passwordControl = this.formBuilder.control(null, [
      Validators.required,
      Validators.pattern(RegxConst.PASSWORD_REGEX),
      Validators.maxLength(32),
    ]);
    this.form.addControl('password', this.passwordControl);
  }

  removePassword() {
    this.form.removeControl('password');
    this.passwordControl = undefined;
    this.form.updateValueAndValidity();
  }

  // mobile numbers
  createMobile(value): FormGroup {
    const control = this.formBuilder.group({
      mobile: [value, Validators.required],
    });
    return control;
  }

  public addMobile() {
    const mobile = this.form.get('mobiles') as FormArray;
    mobile.push(this.createMobile(undefined));
  }

  public removeMobile(i: number) {
    const mobile = this.form.get('mobiles') as FormArray;
    if (mobile.length > 1) {
      mobile.removeAt(i);
    } else {
      mobile.reset();
    }
    this.form.updateValueAndValidity();
  }

  patchMobile(numbers: { main?: boolean; mobile: string }[]) {
    const mobiles = this.form.get('mobiles') as FormArray;

    mobiles.clear();
    if (numbers?.length <= 0) {
      mobiles.push(this.createMobile(undefined));
    }
    numbers
      ?.sort((a, b) => (!a.main ? +1 : -1))
      .forEach((element) => {
        const phoneNumber = `+${element['mobile']}`;
        mobiles.push(this.createMobile(phoneNumber));
      });
    this.form.updateValueAndValidity();
  }

  // profile image
  profileImgChange(event: any) {
    const file = event.currentFiles[0];
    this.photoEditorService
      .open(file, {
        aspectRatio: 1,
        autoCropArea: 1,
      })
      .pipe(take(1))
      .subscribe((v) => {
        this.profileImg = v;
        this.cdr.detectChanges();
      });
  }

  profileImgUpload() {
    if (!this.profileImg?.file) return;
    this.store.dispatch(
      new BrowseUsersAction.UploadProfilePhoto({ file: this.profileImg.file })
    );
  }

  // signature image
  async signatureImgChange(event: any) {
    const file = event.currentFiles[0];
    const base64 = await this.urlHelper.getBase64(file);
    this.signatureImg = {
      base64,
      file,
    };
    this.cdr.detectChanges();
  }

  signatureImgUpload() {
    if (!this.signatureImg?.file) return;
    this.store.dispatch(
      new BrowseUsersAction.UploadSignature({ file: this.signatureImg.file })
    );
  }

  close() {
    this.store.dispatch(new BrowseUsersAction.ToggleDialog({}));
  }
}
