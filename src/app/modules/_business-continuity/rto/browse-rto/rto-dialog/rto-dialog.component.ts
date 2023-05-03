import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "../../../../../shared/validators/generic-validators";
import {ILangFacade} from "@core/facades/lang.facade";

@Component({
  selector: 'app-rto-dialog',
  templateUrl: './rto-dialog.component.html',
  styleUrls: ['./rto-dialog.component.scss']
})
export class RtoDialogComponent implements OnInit {
  public display = false;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private lang: ILangFacade,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  openDialog(Id?: number) {
    this.display = true;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      criticalityEn: [null, [Validators.required, GenericValidators.english]],
      criticalityAr: [null, [Validators.required, GenericValidators.arabic]],
      rtoEn: [null, [Validators.required, GenericValidators.english]],
      rtoAr: [null, [Validators.required, GenericValidators.arabic]],
      descEn: [null, [Validators.required, GenericValidators.english]],
      descAr: [null, [Validators.required, GenericValidators.arabic]],
    });
  }
}
