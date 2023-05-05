import { Component, OnInit } from '@angular/core';
import {GenericValidators} from "@shared/validators/generic-validators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-imp-level-working-dialog',
  templateUrl: './imp-level-working-dialog.component.html',
  styleUrls: ['./imp-level-working-dialog.component.scss']
})
export class ImpLevelWorkingDialogComponent implements OnInit {
  public display = false;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  openDialog(groupId?: number) {
    this.display = true;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      criticalityEn: [null, [Validators.required, GenericValidators.english]],
      criticalityAr: [null, [Validators.required, GenericValidators.arabic]],
      levelEn: [null, [Validators.required, GenericValidators.english]],
      levelAr: [null, [Validators.required, GenericValidators.arabic]],
      descEn: [null, [Validators.required, GenericValidators.english]],
      descAr: [null, [Validators.required, GenericValidators.arabic]],
    });
  }
}
