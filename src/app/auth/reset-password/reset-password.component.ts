import {Location} from '@angular/common';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {TranslationService} from 'src/app/modules/i18n/translation.service';
import {IAuthService} from 'src/app/core/services/auth.service';
import {ConfirmPasswordValidator} from 'src/app/shared/validators/confirm-password.validator';

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
  INVALID_TOKEN,
}

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  // Ui
  form: FormGroup;
  // Variables
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  serverErrors = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: IAuthService,
    private cdr: ChangeDetectorRef,
    private translate: TranslationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  buildForm() {
    return this.formBuilder.group(
      {
        oldPassword: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
          ]),
        ],
        password: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
          ]),
        ],
        confirmPassword: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
          ]),
        ],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  cancel() {
    this.location.back();
    this.authService.signOutAsync();
  }


  async onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.errorState = ErrorStates.NotSubmitted;

    try {
      const status = await this.authService
        .updatePassword({ ...this.form.value })
        .pipe(map((r) => r.result.status))
        .toPromise();
      this.serverErrors = null;
      this.cdr.detectChanges();
      this.errorState = status ? ErrorStates.NoError : ErrorStates.HasError;
      await this.authService.signOutAsync();
    } catch (error) {
      this.errorState = ErrorStates.HasError;
      this.serverErrors =
        this.translate.getSelectedLanguage() == "ar"
          ? error?.error?.error?.message_Ar
          : error?.error?.error?.message_En;
    }
    this.cdr.detectChanges();
  }
}
