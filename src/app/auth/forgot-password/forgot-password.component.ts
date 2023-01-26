import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {TranslationService} from 'src/app/modules/i18n/translation.service';
import {IAuthService} from 'src/app/core/services/auth.service';

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  // UI
  form: FormGroup;
  // Variables
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  public serverErrors;
  lang = 'en';

  constructor(
    private formBuilder: FormBuilder,
    private authService: IAuthService,
    private cdr: ChangeDetectorRef,
    private translationService: TranslationService
  ) {
    this.lang = this.translationService.getSelectedLanguage();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
    });
  }

  async onSubmit() {
    this.errorState = ErrorStates.NotSubmitted;
    try {
      const response = await this.authService
        .forgotPassword(this.form.get('email').value)
        .toPromise();
      this.errorState = response.status
        ? ErrorStates.NoError
        : ErrorStates.HasError;

      this.form.disable();
    } catch (error) {
      this.serverErrors =
        this.translationService.getSelectedLanguage() == 'ar'
          ? error?.error?.error?.message_Ar
          : error?.error?.error?.message_En;
      this.errorState = ErrorStates.HasError;
    }
    this.cdr.detectChanges();
  }
}
