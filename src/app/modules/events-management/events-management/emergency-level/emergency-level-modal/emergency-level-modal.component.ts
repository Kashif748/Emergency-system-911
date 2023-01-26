import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TranslationService } from "src/app/modules/i18n/translation.service";
import { EventsManagementService } from "../../../events-management.service";

@Component({
  selector: "app-emergency-level-modal",
  templateUrl: "./emergency-level-modal.component.html",
  styleUrls: ["./emergency-level-modal.component.scss"],
})
export class EmergencyLevelModalComponent implements OnInit {
  lang = "en";
  id: string;
  isAddMode: boolean;
  formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _service: EventsManagementService,
    private translationService: TranslationService,
    public dialogRef: MatDialogRef<EmergencyLevelModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {

    if (this.data["type"] == "edit") {
      this.id = this.data["id"];
    }
    this.isAddMode = !this.id;
    this.lang = this.translationService.getSelectedLanguage();

    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      level: [null, [Validators.required]],
      isActive: [false, [Validators.required]],
      id: this.id,
    });

    if (!this.isAddMode) {
      let report = this._service.getEmergencyLevelById(parseInt(this.id));
      this.formGroup.patchValue(report);
    }
  }

  private createGroup() {
    this._service.createEmergencyLevel(this.formGroup.value).then((ok) => {
      this.dialogRef.close();
    });
  }

  private updateGroup() {
    this._service
      .updateEmergencyLevel(this.id, this.formGroup.value)
      .then((ok) => {
        this.dialogRef.close();
      });
  }
  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.createGroup();
    } else {
      this.updateGroup();
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };
}
