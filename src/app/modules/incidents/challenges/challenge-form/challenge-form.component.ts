import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TranslationService } from "src/app/modules/i18n/translation.service";
import { AlertsService } from "src/app/_metronic/core/services/alerts.service";
import { ChallengesService } from "../challenges.service";
import { Challenge } from "../model/Challenge";

@Component({
  selector: "app-challenge-form",
  templateUrl: "./challenge-form.component.html",
  styleUrls: ["./challenge-form.component.scss"],
})
export class ChallengeFormComponent implements OnInit {
  type: "add" | "edit";

  lang: string;
  form: FormGroup;
  display: boolean;

  constructor(
    private ref: ChangeDetectorRef,
    private _challenge: ChallengesService,
    private _translation: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: Challenge,
    public _MatDialogRef: MatDialogRef<ChallengeFormComponent>,
    private _alert: AlertsService
  ) {}

  ngOnInit(): void {
    this.lang = this._translation.getSelectedLanguage();

    this.type = this.data ? "edit" : "add";

    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      challenge: new FormControl(null, [Validators.required]),
      requmendations: new FormControl(null),
    });

    if (this.type === "edit") {
      this.patchValues(this.data);
    }

    this.display = true;

    this.ref.markForCheck();
  }

  patchValues(data: Challenge) {
    this.form.patchValue(data);
  }

  submit() {
    if (!this.form.dirty) return;

    const data = this.prepareToSend();

    if (this.type == "add") {
      this._challenge
        .addChallenge(data)
        .then((res) => {
          if (res) {
            this._alert.openSuccessSnackBarWithMsg(
              this._translation.translateAWord("COMMON.SUCCESSFULLY_ADDED")
            );
            this._MatDialogRef.close();
          }
        })
        .catch((err) => {
          this._alert.openSuccessSnackBarWithMsg(
            this._translation.translateAWord("COMMON.ERROR_HAS_HAPPEND")
          );
        });
    }
    if (this.type == "edit") {
      this._challenge
        .editChallenge(data)
        .then((res) => {
          if (res) {
            this._alert.openSuccessSnackBarWithMsg(
              this._translation.translateAWord("COMMON.SUCCESSFULLY_UPDATED")
            );
            this._MatDialogRef.close();
          }
        })
        .catch((err) => {
          this._alert.openSuccessSnackBarWithMsg(
            this._translation.translateAWord("COMMON.ERROR_HAS_HAPPEND")
          );
        });
    }
  }

  prepareToSend() {
    let dataToSend: Challenge = new Challenge(this.form.value);
    dataToSend.id = this.data?.id || 0;

    return dataToSend;
  }
}
