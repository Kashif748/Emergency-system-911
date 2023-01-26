import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Observable } from "rxjs";

import { LibrariesService } from "src/app/_metronic/core/services/library.service";
import { AlertsService } from "src/app/_metronic/core/services/alerts.service";

import { TranslationService } from "../../i18n/translation.service";

@Component({
  selector: "app-create-folder",
  templateUrl: "./create-folder.component.html",
  styleUrls: ["./create-folder.component.scss"],
})
export class CreateFolderComponent implements OnInit {
  form: FormGroup;
  accessType$: Observable<any>;
  lang = "en";
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private translationService: TranslationService,
    private fb: FormBuilder,
    private libraryService: LibrariesService,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.accessType$ = this.libraryService.getAccessTypes();

    this.createForm();

    if (this.data.data !== null) {
      this.form.patchValue({
        ...this.data.data,
        itemType: this.data.data?.itemType?.value,
        libraryAccessType: this.data.data?.libraryAccessType?.id,
        createdOn: this.data.data?.createdOn ?? Date.now(),
      });
    }
  }

  private currentUser: any;
  createForm() {
    let commonData = JSON.parse(localStorage.getItem("commonData"));
    this.currentUser = commonData["currentUserDetails"];
    const currentOrg = commonData["currentOrgDetails"];

    let parentObj = { id: this.data.parent?.id };
    this.form = this.fb.group({
      itemType: "Folder",
      libraryAccessType: [null, [Validators.required]],
      organization: {
        id: currentOrg.id,
        nameEn: currentOrg.nameEn,
        nameAr: currentOrg.nameAr,
      },
      parent: parentObj,
      category: { id: 1 },
      id: null,
      name: [null, [Validators.required]],
      isActive: true,
      createdBy: { id: this.currentUser.id },
      createdOn: Date.now(),
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    let libraryAccessTypeObj = { id: this.form.get("libraryAccessType").value };
    this.form.value.libraryAccessType = libraryAccessTypeObj;
    if (this.data.isEdit) {
      this.libraryService.update(this.form.value).subscribe((_) => {
        this.alertService.openSuccessSnackBar();
        this.dialogRef.close(this.form.value);
      });
    } else {
      this.libraryService.CreateFolder(this.form.value).subscribe(
        (_) => {
          this.alertService.openSuccessSnackBar();
          this.dialogRef.close(this.form.value);
        },
        (_) => {
          this.alertService.openFailureSnackBar();
          this.dialogRef.close(this.form.value);
        }
      );
    }
  }
}
