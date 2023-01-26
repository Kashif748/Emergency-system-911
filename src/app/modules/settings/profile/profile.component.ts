import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {PersonalInquiryService} from 'src/app/_metronic/core/services/personal-inquiry.service';
import {UserService} from '@core/api/services/user.service';
import {TranslationService} from '../../i18n/translation.service';
import {Role} from '../../user-management/models/Role';
import {RegxConst} from '@core/constant/RegxConst';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  // UI
  @ViewChild('rolesInput') rolesInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  // Variables
  userId: string;
  formGroup: FormGroup;
  appearance = 'fill';
  roles: Role[] = [];
  profileImgUUID: string;
  lang;
  hidePassword = true;
  private subscriptions: Subscription[] = [];
  currentUser: any;
  isSearchMode = false;
  private searchModeStore = new BehaviorSubject<boolean>(false);
  // chipset
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  rolesCtrl = new FormControl();
  private selectedRoles: any[] = [];
  private selectedRolesStore = new BehaviorSubject<any[]>([]);
  public selectedRoles$ = this.selectedRolesStore.asObservable();
  // just for binding issues
  private remainingRoles: any[] = [];


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertsService,
    private translate: TranslateService,
    public translationService: TranslationService,
    private piService: PersonalInquiryService,
  ) {
    this.lang = this.translationService.getSelectedLanguage();
  }

  ngOnInit(): void {
    const commonData = JSON.parse(localStorage.getItem('commonData'));
    this.userId = commonData['currentUserDetails'].id + '';
    this.createForm();
    this.setChangeValidate();

    let sub = this.userService
      .getById(this.userId)
      .pipe(
        map((userResult) => {
          this.currentUser = userResult.result;
          return {roles: [], user: userResult.result};
        })
      )
      .pipe(
        tap((data: { roles: any; user: any }) => {
          const mobiles = data.user['mobiles'];
          delete data.user['mobiles'];
          this.formGroup.patchValue({
            ...data.user,
            emirateId: data.user?.emiratesId,
          });
          this.patchMobileNumber(mobiles);

          const userRoles = data.roles.filter(
            (r) => !!data.user.roleIds.find((rid) => r.id == rid)
          );

          this.updateSelectedRolesState(userRoles);
        }),
        tap((data: { roles: any; user: any }) => {
          data.roles.forEach((r) => {
            this.roles.push(r);
            // for filling data of the selected roles
            const selectRole = this.selectedRoles.find((sr) => sr.id == r.id);
            if (selectRole) {
              selectRole.nameEn = r.nameEn;
            } else {
              this.remainingRoles.push(r);
            }
          });
        })
      )
      .subscribe();

    this.subscriptions.push(sub);

    sub = this.userService.userFiles(this.userId, '19').subscribe(
      (res: any) => {
        try {
          const imgs: any[] = res.result;
          if (imgs?.length > 0) {
            this.profileImgUUID = imgs[imgs.length - 1]?.uuid;
          } else {
            this.profileImgUUID = null;
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

  uploadImage(files: FileList) {
    if (files?.length > 0) {
      const img = files[0];
      const sub = this.userService.uploadFile(img, this.userId, 19).subscribe(
        (res: any) => {
          this.profileImgUUID = res.result.uuid;
          this.alertService.openSuccessSnackBar();
        },
        (err) => {
          this.alertService.openFailureSnackBar();
        }
      );
      this.subscriptions = [...this.subscriptions, sub];
    }
  }


  createMobileForm(value): FormGroup {
    return new FormGroup({
      mobile: new FormControl(value, [
        Validators.required,
        Validators.pattern(RegxConst.PHONE_REGEX)
      ]),
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

  patchMobileNumber(numbers: any[]) {
    const mobiles = this.formGroup.get('mobiles') as FormArray;
    if (numbers?.length > 0) {
      mobiles.removeAt(0);
    }
    numbers
      .sort((a, b) => (a.main ? +1 : -1))
      .forEach((element) => {
        const phoneNumber = `+${element['mobile']}`;
        mobiles.push(this.createMobileForm(phoneNumber));
      });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(RegxConst.EMAIL_REGEX)]],
      title: [null],
      userName: [
        null,
        [Validators.required, Validators.pattern(RegxConst.USER_NAME_REGEX)],
      ],
      mobiles: this.formBuilder.array(
        [this.createMobileForm('')],
        Validators.required
      ),
      firstNameEn: [null],
      middleNameEn: [null],
      lastNameEn: [null],
      firstNameAr: [null],
      middleNameAr: [null],
      lastNameAr: [null],
      isActive: [{value: '', disabled: true}],
      roleIds: [null],
      validate: '',
      emirateId: [null],
    });
  }

  setChangeValidate() {
    const sub = this.formGroup
      .get('validate')
      .valueChanges.subscribe((validate) => {
        if (validate == '1') {
          this.formGroup
            .get('name')
            .setValidators([Validators.required, Validators.minLength(3)]);
        } else {
          this.formGroup.get('name').setValidators(Validators.required);
        }
        this.formGroup.get('name').updateValueAndValidity();
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
        this.formGroup.patchValue(user);
        const userRoles = this.roles.filter(
          (r) => !!user.roleIds.find((rid) => r.id == rid)
        );
        this.updateSelectedRolesState(userRoles);
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
      : this.formGroup.get('email').hasError('pattern')
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
    const user = {
      ...this.currentUser,
      userName: this.formGroup.value.userName,
      // password: this.formGroup.value.password,
      email: this.formGroup.value.email,
      mobiles: this.formGroup.value.mobiles,
    };

    let i = 0;
    user['mobiles'] = user['mobiles'].map((element) => {
      element = {...element, id: i, main: i == 0};
      i++;
      return element;
    });

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    this.updateUser(user);
  }

  private updateUser(user) {
    const sub = this.userService.updateProfile(this.userId, user).subscribe(
      () => {
        this.alertService.openSuccessSnackBar();
      },
      () => {
        this.alertService.openFailureSnackBar();
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
    const role: any = {
      id: event.option.value,
      nameEn: event.option.viewValue,
    };
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
