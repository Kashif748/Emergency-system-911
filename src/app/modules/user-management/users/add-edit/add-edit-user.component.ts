import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import {OrgService} from '@core/api/services/org.service';
import {UserService} from '@core/api/services/user.service';
import {RoleService} from '@core/api/services/role.service';
import {TranslateService} from '@ngx-translate/core';
import {GenericValidators} from '@shared/validators/generic-validators';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {TranslationService} from 'src/app/modules/i18n/translation.service';
import {PersonalInquiryService} from 'src/app/_metronic/core/services/personal-inquiry.service';
import {Role} from '../../models/Role';
import {RegxConst} from '@core/constant/RegxConst';
import {AppCommonData} from '@core/entities/AppCommonData';
import {CommonService} from '@core/services/common.service';
import {UploadTagIdConst} from '@core/constant/UploadTagIdConst';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditUserComponent implements OnInit, OnDestroy {
  // UI
  @ViewChild('rolesInput') rolesInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  _isDisabled = false;
  // Variables
  userId: string;
  isAddMode: boolean;
  formGroup: FormGroup;
  isLdapOrg = false;
  appearance = 'fill';
  roles: Role[] = [];
  signatureImgUUID: string;
  subscriptions: Subscription[] = [];
  commonData: AppCommonData;
  orgId;
  orgCode;
  lang;
  allOrgs: any[];
  user: any;
  // chipset
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredRoles$: Observable<any[]>;
  rolesCtrl = new FormControl();
  private selectedRoles: any[] = [];
  private selectedRolesStore = new BehaviorSubject<any[]>([]);
  public selectedRoles$ = this.selectedRolesStore.asObservable();
  isSearchMode = false;
  private searchModeStore = new BehaviorSubject<boolean>(false);
  searchMode$ = this.searchModeStore.asObservable();
  selectedpriorityValue: any;
  ranks: any[] = [];
  selectedOrg: any;
  // just for binding issues
  private remainingRoles: any[] = [];
  uploadTagIdConst = UploadTagIdConst;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertsService,
    private router: Router,
    private translate: TranslateService,
    public translationService: TranslationService,
    private piService: PersonalInquiryService,
    private orgService: OrgService,
    private roleService: RoleService,
    private readonly commonService: CommonService
  ) {
    this.lang = this.translationService.getSelectedLanguage();
  }

  async ngOnInit(): Promise<void> {
    this.commonData = this.commonService.getCommonData();
    this.userId = this.route.snapshot.params['id'];
    this.isAddMode = !this.userId;
    this.createForm();
    this.setChangeValidate();
    if (!this.isAddMode) {
      this.formGroup.get('userName').disable();
    }
    // this.orgId = this.formGroup.get('orgStructure').value?.id;
    this.orgCode = this.formGroup.get('orgStructure').value?.code;
    if (!this.isAddMode) {
      this.user = await this.userService
        .getById(this.userId)
        .pipe(map((r) => r.result))
        .toPromise();

      const mobiles = this.user['mobiles'];
      delete this.user['mobiles'];

      this.formGroup.patchValue({
        ...this.user,
        mobiles: [{mobile: ''}],
        rankId: this.user?.rankId?.id,
        validate: '',
        userName: this.user.samaccountname ?? this.user.userName,
        orgStructure: {id: this.user?.orgStructure?.id},
      });

      this.orgId = this.user?.orgStructure?.id;
      this.patchMobileNumber(mobiles);
    }

    this.formGroup
      .get('orgStructure')
      .valueChanges.pipe(
      filter((v) => v !== undefined && v !== null),
      distinctUntilKeyChanged('id')
    )
      .subscribe(async (data) => {
        console.log(data);
        this.selectedOrg = data;
        this.orgId = data?.id;
        this.orgCode = data?.code;
        await this.filteredee();
        if (this.orgCode == 'ADCDA') {
          if (!this.formGroup.get('rankId')) {
            this.formGroup.addControl(
              'rankId',
              new FormControl(this.user?.rankId?.id, [Validators.required])
            );
          }
        } else {
          this.formGroup.removeControl('rankId');
        }

        this.isLdapOrg = !!data?.ldapOrgId;
        if (!data?.ldapOrgId && this.isAddMode) {
          if (!this.formGroup.get('password')) {
            this.formGroup.addControl(
              'password',
              new FormControl({value: '', disabled: false}, [
                Validators.required,
                this.checkPassword,
              ])
            );
          }
          this.formGroup.get('password').enable();
        } else if (data?.ldapOrgId) {
          this.formGroup.removeControl('password');
        } else {
          if (!this.formGroup.get('password')) {
            this.formGroup.addControl(
              'password',
              new FormControl({value: '', disabled: false}, [
                Validators.required,
                this.checkPassword,
              ])
            );
          }
          this.formGroup.get('password').disable();
        }

        this.formGroup.get('roleIds').reset();
        this.updateSelectedRolesState([]);
      });

    if (!this.isAddMode) {
      const sub = this.userService.userFiles(this.userId, this.uploadTagIdConst.SIGNATURE).subscribe(
        (res: any) => {
          try {
            const imgs: any[] = res.result;
            if (imgs?.length > 0) {
              this.signatureImgUUID = imgs[imgs.length - 1].uuid;
            } else {
              this.signatureImgUUID = null;
            }
          } catch {
          }
        },
        (err) => {
          this.alertService.openSuccessSnackBar();
        }
      );
      this.subscriptions = [...this.subscriptions, sub];
    }

    this.userService.getUserRank().subscribe((rank) => {
      this.ranks = rank.result;
    });
    if (this.user) {
      this.formGroup.patchValue({
        orgStructure: {id: this.user?.orgStructure?.id},
      });
    }
  }

  uploadImage(files: FileList) {
    if (files?.length > 0) {
      const img = files[0];
      const sub = this.userService
        .uploadFile(img, this.userId, this.uploadTagIdConst.SIGNATURE)
        .subscribe(
          (res: any) => {
            this.signatureImgUUID = res.result.uuid;
            this.alertService.openSuccessSnackBar();
          },
          (err) => {
            this.alertService.openFailureSnackBar();
          }
        );
      this.subscriptions = [...this.subscriptions, sub];
    }
  }

  async filteredee() {
    this.filteredRoles$ = (this.isAddMode ? of(null) : of(this.user)).pipe(
      switchMap((userResult) =>
        this.roleService.getRoleByOrgId(this.orgId).pipe(
          map((roleResult) => {
            return {roles: roleResult.result, user: userResult};
          })
        )
      ),
      tap((data: { roles: any[]; user: any }) => {
        if (!this.isAddMode) {
          // this.formGroup.patchValue({orgStructure: this.selectedOrg});
          const userRoles = data.roles.filter((r) =>
            data.user.roleIds.find((rid) => r.id == rid)
          );
          this.updateSelectedRolesState(userRoles);
        }
      }),
      tap((data: { roles: any[]; user: any }) => {
        data.roles.forEach((r) => {
          this.roles.push(r);
          if (!this.selectedRoles.find((sr) => sr.id == r.id)) {
            this.remainingRoles.push(r);
          }
        });
      }),
      switchMap((data: { roles: any[]; user: any }) => {
        this.roles = data.roles.filter((r) => {
          return r.isActive;
        });
        return (this.filteredRoles$ = this.rolesCtrl.valueChanges.pipe(
          startWith(null),
          map((role: any | null) => this._filter(role))
        ));
      })
    );
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      title: [null],
      userName: [
        null,
        [
          Validators.required,
          Validators.pattern(RegxConst.USER_NAME_REGEX),
          Validators.minLength(5),
        ],
      ],
      orgStructure: [{id: this.commonData.currentOrgDetails.id, label: "OrgStructure"}, Validators.required],
      firstNameEn: [null, [Validators.required, GenericValidators.english]],
      middleNameEn: ['', [GenericValidators.english]],
      lastNameEn: [null, [GenericValidators.english, Validators.required]],
      firstNameAr: [null, [Validators.required, GenericValidators.arabic]],
      middleNameAr: ['', [GenericValidators.arabic]],
      lastNameAr: [null, [GenericValidators.arabic, Validators.required]],
      mobiles: this.formBuilder.array(
        [this.createMobileForm('')],
        Validators.required
      ),
      isActive: [false],
      roleIds: [null, []],
      validate: '',
      emiratesId: [
        null,
        [
          Validators.required,
          Validators.minLength(15),
          Validators.pattern(RegxConst.EMIRATES_ID_REGEX),
        ],
      ],
      expireDate: [''],
    });
  }

  createMobileForm(value): FormGroup {
    return this.formBuilder.group({
      mobile: [value, Validators.required],
    });
  }

  public addMobileForm() {
    const mobile = this.formGroup.get('mobiles') as FormArray;
    mobile.push(this.createMobileForm(''));
  }

  public removeOrClearMobile(i: number) {
    const mobile = this.formGroup.get('mobiles') as FormArray;
    if (mobile.length > 1) {
      mobile.removeAt(i);
    } else {
      mobile.reset();
    }
  }


  set isDisabled(value: boolean) {
    this._isDisabled = value;
    if (value) {
      this.formGroup.controls['expireDate'].disable();
    } else {
      this.formGroup.controls['expireDate'].enable();
    }
  }


  patchMobileNumber(numbers: { main: boolean; mobile: string }[]) {
    const mobiles = this.formGroup.get('mobiles') as FormArray;

    if (numbers?.length > 0) {
      mobiles.removeAt(0);
    }
    numbers
      .sort((a, b) => (!a.main ? +1 : -1))
      .forEach((element) => {
        const phoneNumber = `+${element['mobile']}`;
        mobiles.push(this.createMobileForm(phoneNumber));
      });
  }

  setChangeValidate() {
    const sub = this.formGroup
      .get('validate')
      .valueChanges.subscribe((validate) => {
        if (validate == '1') {
          this.formGroup
            .get('userName')
            .setValidators([Validators.required, Validators.minLength(3)]);
        } else {
          this.formGroup.get('userName').setValidators(Validators.required);
        }
        this.formGroup.get('userName').updateValueAndValidity();
      });
    this.subscriptions = [...this.subscriptions, sub];
  }

  checkPassword(control) {
    const enteredPassword = control.value;
    const passwordCheck = RegxConst.PASSWORD_REGEX;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? {requirements: true}
      : null;
  }

  private updateSearchMode() {
    this.searchModeStore.next((this.isSearchMode = !this.isSearchMode));
  }

  searchEmirateId(eid: string) {
    this.updateSearchMode();
    const sub = this.piService.getPersonalInfo(eid).subscribe(
      (ok) => {
        const user = ok.result;
        this.formGroup.patchValue({
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
          orgStructure: user?.orgStructure?.id,
        });
        this.patchMobileNumber([
          {
            main: true,
            mobile: user?.addresses?.address[0]?.localAddress?.mobileNo,
          },
        ]);
        this.updateSearchMode();
        this.alertService.openSuccessSnackBar();
      },
      (er) => {
        this.updateSearchMode();
        this.alertService.openFailureSnackBar();
      }
    );
    this.subscriptions = [...this.subscriptions, sub];
  }

  checkInUseEmail(control) {
    // mimic http database access
    const db = ['tony@gmail.com'];
    return new Observable((observer) => {
      setTimeout(() => {
        const result =
          db.indexOf(control.value) !== -1 ? {alreadyInUse: true} : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }

  getErrorMobile(i) {
    return this.formGroup
      .get('mobiles')
      ['controls'][i]?.get('mobile')
      ?.hasError('required')
      ? this.translate.get('VALIDATION_MSG.REQUIRED')
      : this.formGroup
        .get('mobiles')
        ['controls'][i]?.get('mobile')
        ?.hasError('pattern')
        ? this.translate.get('VALIDATION_MSG.MOBILE.INVALID')
        : of('');
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required')
      ? this.translate.get('VALIDATION_MSG.REQUIRED')
      : this.formGroup.get('email').hasError('email')
        ? this.translate.get('VALIDATION_MSG.EMAIL.INVALID')
        : this.formGroup.get('email').hasError('alreadyInUse')
          ? this.translate.get('VALIDATION_MSG.EMAIL.INUSE')
          : of('');
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required')
      ? this.translate.get('VALIDATION_MSG.REQUIRED')
      : this.formGroup.get('password').hasError('requirements')
        ? this.translate.get('VALIDATION_MSG.PASSWORD.INVALID')
        : of('');
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const user = {
      ...this.formGroup.getRawValue(),
      roleIds: this.selectedRoles.map((r) => r.id),
    };
    delete user.validate;
    if (!!user.samaccountname) {
      delete user.userName;
    }

    user.rankId = {id: user.rankId};
    if (this.isLdapOrg) {
      user.samaccountname = user.userName;
    }
    user.type = !this.isLdapOrg ? 'inapp' : 'middleware';

    // if (this.orgId != 17) {
    if (this.orgCode != 'ADCDA') {
      delete user.rankId;
    }

    let i = 0;
    user['mobiles'] = user['mobiles'].map((element) => {
      element = {...element, id: i, main: i == 0};
      i++;
      return element;
    });
    user['orgStructure'] = {id: user['orgStructure']?.id};

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    if (this.isAddMode) {
      this.createUser(user);
    } else {
      this.updateUser(user);
    }
  }

  private createUser(user) {
    const sub = this.userService.create(user).subscribe(
      (response: any) => {
        this.alertService.openSuccessSnackBar();
        this.router.navigate(['../../'], {relativeTo: this.route});
      },
      (err) => {
        this.alertService.openFailureSnackBarWithMsg(
          this.lang == 'en'
            ? err?.error?.error?.message_En
            : err?.error?.error?.message_Ar
        );
      }
    );
    this.subscriptions = [...this.subscriptions, sub];
  }

  private updateUser(user) {
    const sub = this.userService.update(this.userId, user).subscribe(
      () => {
        this.alertService.openSuccessSnackBar();
        this.router.navigate(['../../'], {relativeTo: this.route});
      },
      (err) => {
        this.alertService.openFailureSnackBarWithMsg(
          this.lang == 'en'
            ? err?.error?.error?.message_En
            : err?.error?.error?.message_Ar
        );
      }
    );
    this.subscriptions = [...this.subscriptions, sub];
  }

  private updateSelectedRolesState(roles: any[]) {
    this.selectedRolesStore.next([...(this.selectedRoles = roles)]);
  }

  remove(role: any): void {
    const selectedRoles = this.selectedRoles.filter((r) => r.id != role.id);
    this.updateSelectedRolesState(selectedRoles);
    this.remainingRoles.push(this.roles.find((r) => r.id == role.id));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const role: any = this.roles.find((r) => r.id == event.option.value);

    this.updateSelectedRolesState([...this.selectedRoles, role]);
    this.remainingRoles = this.roles.filter(
      (r) => !this.selectedRoles.find((ir) => r.id == ir.id)
    );
    this.rolesInput.nativeElement.value = '';
    this.rolesCtrl.setValue(null);
  }

  private _filter(value: any): any[] {
    this.remainingRoles = this.roles.filter(
      (r) => !this.selectedRoles.find((ir) => r.id == ir.id)
    );
    if (!value) {
      return this.remainingRoles;
    }
    if (typeof value !== 'string') {
      this.rolesInput.nativeElement.value = '';
      this.rolesCtrl.setValue(null);
      value = '';
    }

    const role = value.toLowerCase();

    return this.remainingRoles.filter(
      (r) => r.nameEn.toLowerCase().indexOf(role) >= 0
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
