import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventsManagementService} from "../../../events-management.service";
import {TranslationService} from "../../../../i18n/translation.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RegxConst} from "@core/constant/RegxConst";

@Component({
  selector: 'app-add-edit-mobile-version',
  templateUrl: './add-edit-mobile-version.component.html',
  styleUrls: ['./add-edit-mobile-version.component.scss']
})
export class AddEditMobileVersionComponent implements OnInit {

  // UI
  formGroup: FormGroup;
  // Variables
  lang = "en";
  id: string;
  isLoading = false;


  constructor(
    private formBuilder: FormBuilder,
    private eventsManagementService: EventsManagementService,
    private translationService: TranslationService,
    public dialogRef: MatDialogRef<AddEditMobileVersionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    if (this.data["item"]) {
      this.id = this.data["item"].id;
    }
    this.lang = this.translationService.getSelectedLanguage();
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      id: [0],
      isActive: [true, [Validators.required]],
      lastSupportedVersion: [null, [Validators.required]],
      releaseLink: [null, [Validators.required, Validators.pattern(RegxConst.URL)]],
      releaseNote: [null, Validators.required],
      versionName: [null, Validators.required],
      versionNumber: [null, Validators.required]
    });

    if (this.data["item"]) {
      this.formGroup.patchValue(this.data["item"]);
    }
  }

  onSubmit() {
    const version = this.formGroup.value;
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    // check if add or edit version number
    if (version.id > 0) {
      // edit
      this.eventsManagementService.updateMobileVersion(version).subscribe((res) => {
        this.isLoading = false;
        this.dialogRef.close(true);
      }, (e) => {
        console.log(e);
        this.isLoading = false;
      });
    } else {
      // add
      delete version.id;
      this.eventsManagementService.createMobileVersion(version).subscribe((res) => {
        this.isLoading = false;
        this.dialogRef.close(true);
      }, (e) => {
        console.log(e);
        this.isLoading = false;
      });
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

}
