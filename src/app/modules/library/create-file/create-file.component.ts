import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Observable, Subscription } from "rxjs";

import { AlertsService } from "src/app/_metronic/core/services/alerts.service";
import { LibrariesService } from "src/app/_metronic/core/services/library.service";

import { TranslationService } from "../../i18n/translation.service";

@Component({
  selector: "app-create-file",
  templateUrl: "./create-file.component.html",
  styleUrls: ["./create-file.component.scss"],
})
export class CreateFileComponent implements OnInit, OnDestroy {
  form: FormGroup;
  acessTypes$: Observable<any>;
  category: any[] = [];
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file
  lang = "en";
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private librarySrevice: LibrariesService,
    private translationService: TranslationService,
    private fb: FormBuilder,
    private alertService: AlertsService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.acessTypes$ = this.librarySrevice.getAccessTypes();
    let sub = this.librarySrevice
      .getCategories()
      .subscribe((x) => (this.category = x));
    this.subscriptions = [...this.subscriptions, sub];

    this.createForm();
    if (this.data.data !== null) {
      this.form.patchValue({
        ...this.data.data,
        libraryAccessType: this.data.data?.libraryAccessType?.id,
        category: this.data.data?.category?.id,
        itemType: this.data.data?.itemType?.value,
        createdOn: this.data.data?.createdOn ?? Date.now(),
      });
    }
  }

  // On file Select

  onChange(event) {
    this.file = event.target.files[0];
    if (this.file) {
      this.form.get("name").setValue(this.file.name);
    }
  }

  createForm() {
    let commonData = JSON.parse(localStorage.getItem("commonData"));
    const currentUser = commonData["currentUserDetails"];
    const currentOrg = commonData["currentOrgDetails"];

    let parentObj = { id: this.data.parent?.id };
    this.form = this.fb.group({
      itemType: "File",
      libraryAccessType: [null, [Validators.required]],
      organization: currentOrg,
      parent: parentObj,
      category: [null, [Validators.required]],
      id: null,
      name: [null, [Validators.required]],
      isActive: true,
      createdBy: { id: currentUser?.id },
      createdOn: Date.now(),
    });
  }
  deleteLibrary(id) {
    this.librarySrevice.deleteFolder(id);
  }

  uploading = false;
  onSubmit() {
    if (!(this.form.valid && (this.file || this.data.isEdit))) {
      this.form.markAllAsTouched();
      return;
    }
    this.uploading = true;
    this.alertService.openSuccessSnackBarWithMsg(
      this.translationService.get("SHARED.NOTIFICATION.CREATE")
    );

    let libraryAccessTypeObj = { id: this.form.get("libraryAccessType").value };

    this.category = this.category.filter(
      (cat) => cat.id === this.form.get("category").value
    );

    this.form.value.category = this.category[0];

    this.form.value.libraryAccessType = libraryAccessTypeObj;

    if (this.data.isEdit) {
      let sub = this.librarySrevice
        .update(this.form.value)
        .subscribe(async (x) => {
          if (this.file) {
            try {
              await this.librarySrevice
                .uploadFile(this.file, x.result.id)
                .toPromise();
            } catch {}
          }
          this.alertService.openSuccessSnackBar();
          this.dialogRef.close(this.form.value);
        });

      this.subscriptions = [...this.subscriptions, sub];
    } else {
      let sub = this.librarySrevice.CreateFolder(this.form.value).subscribe(
        async (x) => {
          await this.librarySrevice
            .uploadFile(this.file, x.result.id)
            .toPromise();
          this.dialogRef.close(this.form.value);
          this.alertService.openSuccessSnackBar();
          this.uploading = false;
        },
        (err) => {
          this.alertService.openFailureSnackBar();
          this.uploading = false;
        }
      );
      this.subscriptions = [...this.subscriptions, sub];
    }
  }
}
