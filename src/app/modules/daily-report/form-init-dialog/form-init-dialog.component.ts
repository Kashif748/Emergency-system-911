import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";

import { IStorageService } from "@core/services/storage.service";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-form-init-dialog",
  templateUrl: "./form-init-dialog.component.html",
  styleUrls: ["./form-init-dialog.component.scss"],
})
export class FormInitDialogComponent implements OnInit {
  private destroy$ = new Subject();
  /**
   * Constructor
   *
   * @param {MatDialogRef<ConfirmDialogComponent>} dialogRef
   */
  constructor(
    public dialogRef: MatDialogRef<FormInitDialogComponent>,
    private router: Router,
    private formBuilder: FormBuilder,
    private storageService: IStorageService
  ) {}
  ngOnInit() {
    this.form = this.buildForm();
    let value = this.storageService.getItem("daily-report-init");
    this.form.patchValue(value ?? {});

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.storageService.setState("daily-report-init", v);
    });
  }

  public continue() {
    this.dialogRef.close(this.form.value);
  }
  private buildForm() {
    let form = this.formBuilder.group({
      approvedBy: [null, Validators.required],
      date: [new Date(), Validators.required],
    });

    return form;
  }

  public form: FormGroup;

  public cancel() {
    this.dialogRef.close(false);
    this.router.navigate(["/daily-report/list"]);
  }
}
