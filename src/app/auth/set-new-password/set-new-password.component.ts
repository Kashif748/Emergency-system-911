import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {first, map} from 'rxjs/operators';
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
  selector: "app-set-new-password",
  templateUrl: "./set-new-password.component.html",
  styleUrls: ["./set-new-password.component.scss"],
})
export class SetNewPasswordComponent implements OnInit {
  // UI
  form: FormGroup;
  // Variables
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  public serverErrors;

  constructor(
    private fb: FormBuilder,
    private authService: IAuthService,
    private route: ActivatedRoute,
    private translate: TranslationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group(
      {
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

  async onSubmit() {
    const forgetToken = this.route.snapshot.paramMap.get("forget-token");
    const body = {
      newPassword: this.form.get("password").value,
      forgetToken,
    };

    this.errorState = ErrorStates.NotSubmitted;
    try {
      const status = await this.authService
        .setNewPassword(body)
        .pipe(
          first(),
          map((r) => r.status)
        )
        .toPromise();
      this.errorState = status ? ErrorStates.NoError : ErrorStates.HasError;
    } catch (error) {
      this.serverErrors =
        this.translate.getSelectedLanguage() == "ar"
          ? error?.error?.error?.message_Ar
          : error?.error?.error?.message_En;
      this.errorState = ErrorStates.HasError;
    }
    this.cdr.detectChanges();
  }
}
