import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrgService} from '@core/api/services/org.service';
import {interval, Subscription} from 'rxjs';
import {environment} from 'src/environments/environment';
import {map, skip} from 'rxjs/operators';
import {IAuthService} from 'src/app/core/services/auth.service';
import {TranslationService} from 'src/app/modules/i18n/translation.service';
import {IStorageService} from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // UI
  @Output() showHideLogo: EventEmitter<any> = new EventEmitter();
  public form: FormGroup;
  // Variables
  public orgs: any[] = [];
  showSubLogo = false;
  public filteredOrgs = [];
  public loading = true;
  public checkOtp = false;
  public loginUaePass = false;
  public loginCaptcha = false;
  public loginNormal = false;
  public loginOtp = false;
  public otpCountDown = '';
  public errorMsg;
  isLoading = false;
  public timeLeftToResendOtp = 60;
  private subscriptions: Subscription[] = [];
  public lang = 'en';
  public uaePassErroCode;
  private uaePassLink = `${environment.UAE_PASS_HOST}/idshub/authorize?redirect_uri=${window.location.protocol}//${window.location.host}${environment.UAE_PASS_ROUTE}&client_id=${environment.UAE_PASS_CLIENT_ID}&state=ShNP22hyl1jUU2RGjTRkp%20g==&response_type=code&scope=urn:uae:digitalid:profile:general&acr_values=urn:safelayer:tws:policies:authentication:level:low&ui_locales=${this.lang}`;
  private otpFunc: void | ((otp: string) => Promise<void>);

  constructor(
    private formBuilder: FormBuilder,
    private storageService: IStorageService,
    private authService: IAuthService,
    private orgService: OrgService,
    private cdr: ChangeDetectorRef,
    private translationService: TranslationService
  ) {
    this.lang = this.translationService.getSelectedLanguage();
  }


  uaePassReadMore() {
    if (this.uaePassErroCode == 'UPASS_USER_SOP1') {
      if (typeof window !== 'undefined') {
        window.open('https://selfcare.uaepass.ae/locations', '_blank');
      }
    }
  }

  async ngOnInit(): Promise<void> {
    this.form = this.buildForm();
    // check uae pass error
    this.errorMsg = this.storageService.getItem('UaePassError');
    this.uaePassErroCode = this.storageService.getItem('UaePassErroCode');
    this.cdr.detectChanges();
    setTimeout((_) => {
      if (this.errorMsg) {
        this.storageService.removeItem('UaePassError');
      }
    }, 2000);

    let sub = this.form
      .get('org')
      .valueChanges.pipe(skip(1))
      .subscribe(async (org) => {
        this.loginUaePass = org?.loginUaePass;
        this.loginCaptcha = org?.loginCaptcha;
        this.loginNormal = org?.loginNormal;
        this.loginOtp = org?.loginOtp;

        // this logic  to  show/hide logo  in auth.html
        if (org?.id && !this.showSubLogo) {
          if (!org?.logoHorizental) {
            org.logoHorizental = await this.orgService.getOrgHorizontalImage(org?.id).pipe(map(res => {
              return res.result.logoHorizental;
            })).toPromise();
          }
          this.showHideLogo.emit({
            view: 'show',
            orgLogo: org?.logoHorizental,
          });
          this.showSubLogo = true;
        }
        if (!org?.id && this.showSubLogo) {
          this.showHideLogo.emit('hide');
          this.showSubLogo = false;
        }
        this.cdr.detectChanges();
        this.loading = true;
        this.applyFilter(org);
      });
    this.subscriptions.push(sub);

    sub = this.form.valueChanges.pipe(skip(1)).subscribe((_) => {
      this.errorMsg = null;
    });

    this.subscriptions.push(sub);

    try {
      this.orgs = await this.orgService
        .getAll()
        .pipe(map((r) => r.result))
        .toPromise();
    } catch (error) {
      this.errorMsg =
        this.lang == 'en'
          ? error?.error?.error?.message_En
          : error?.error?.error?.message_Ar;
    }

    this.filteredOrgs = this.orgs;
    this.loading = false;
    this.form.get('org').enable();
    this.cdr.detectChanges();
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      org: [{value: '', disabled: true}, Validators.required],
      otp: '',
      resendOtp: true,
    });
  }

  async resendOtp() {
    this.form.get('resendOtp').setValue(true);
    this.startOtpCountDown();
    this.otpFunc = undefined;
    await this.onSubmit();
  }

  uaePassLogin() {
    this.storageService.setItem('uae-pass-org', this.form.get('org').value);
    if (typeof window !== 'undefined') {
      window.location.href = this.uaePassLink;
    }
  }


  async onSubmit() {
    this.isLoading = true;
    this.cdr.detectChanges();
    // call api
    const loginInfo = this.form.value;
    loginInfo['orgId'] = loginInfo['org']?.id || loginInfo['orgId'];
    delete loginInfo['org'];
    if (this.otpFunc) {
      try {
        await this.otpFunc(loginInfo?.otp);
      } catch (error) {
        this.isLoading = false;
        this.errorMsg = error;
      }
      this.cdr.detectChanges();
      return;
    }
    try {
      this.otpFunc = await this.authService.signInAsync(loginInfo);
      this.checkOtp = !!this.otpFunc;
      if (this.checkOtp) {
        this.startOtpCountDown();
      }
    } catch (error) {
      this.errorMsg = error;
      this.isLoading = false;
    }
    this.cdr.detectChanges();
    return;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  applyFilter(value) {
    const filterValue = value;
    if (typeof value == 'string' && filterValue.replace(/\s/g, '').length) {
      this.filteredOrgs = this.orgs.filter((item) => {
        const key = item.nameEn + ' - ' + item.nameAr;
        if (key && key.toLowerCase().includes(filterValue.toLowerCase())) {
          return item;
        }
      });
    } else {
      this.filteredOrgs = this.orgs;
    }
    this.loading = false;
  }

  displayFn(subject) {
    return subject ? subject.nameEn + ' - ' + subject.nameAr : undefined;
  }

  startOtpCountDown() {
    this.timeLeftToResendOtp = 60;
    // Create an Observable that will publish a value on an interval
    const secondsCounter = interval(1000);
    // Subscribe to begin publishing values
    const subscription = secondsCounter.subscribe((n) => {
      if (n >= 60) {
        this.otpCountDown = '';
        this.cdr.detectChanges();
        subscription.unsubscribe();
      }
      this.timeLeftToResendOtp = 60 - n;
      this.otpCountDown = `( ${this.timeLeftToResendOtp.toString()} ) `;
      this.cdr.detectChanges();
    });
  }
  
  ngDoCheck(){
    this.lang = this.translationService.getSelectedLanguage();
  }
}
