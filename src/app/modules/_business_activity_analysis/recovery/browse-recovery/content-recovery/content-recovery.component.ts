import { Component, OnInit } from '@angular/core';
import {GenericValidators} from "@shared/validators/generic-validators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";

@Component({
  selector: 'app-content-recovery',
  templateUrl: './content-recovery.component.html',
  styleUrls: ['./content-recovery.component.scss']
})
export class ContentRecoveryComponent implements OnInit {
  demo = [];
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private lang: ILangFacade,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, GenericValidators.english]],
      capacity: [null, [Validators.required, GenericValidators.arabic]],
      spof: [null, [Validators.required, GenericValidators.english]],
      skills: [null, [Validators.required, GenericValidators.arabic]],
      remotely: [true]
    });
  }

}
