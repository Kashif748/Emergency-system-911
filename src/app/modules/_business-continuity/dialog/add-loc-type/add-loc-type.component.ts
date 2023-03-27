import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";

@Component({
  selector: 'app-add-loc-type',
  templateUrl: './add-loc-type.component.html',
  styleUrls: ['./add-loc-type.component.scss']
})
export class AddLocTypeComponent implements OnInit {
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
      priEn: [null, [Validators.required, GenericValidators.english]],
      priAr: [null, [Validators.required, GenericValidators.arabic]],
    });
  }
}
