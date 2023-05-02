import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericValidators } from '@shared/validators/generic-validators';

@Component({
  selector: 'app-add-impact-type',
  templateUrl: './add-impact-type.component.html',
  styleUrls: ['./add-impact-type.component.scss'],
})
export class AddImpactTypeComponent implements OnInit {
  public display = false;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }
  openDialog(groupId?: number) {
    this.display = true;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      typeEn: [null, [Validators.required, GenericValidators.english]],
      typeAr: [null, [Validators.required, GenericValidators.arabic]],

      lowDescEn: [null, [Validators.required, GenericValidators.english]],
      lowDescAr: [null, [Validators.required, GenericValidators.arabic]],

      mediumDescEn: [null, [Validators.required, GenericValidators.english]],
      mediumDescAr: [null, [Validators.required, GenericValidators.arabic]],

      highDescEn: [null, [Validators.required, GenericValidators.english]],
      highDescAr: [null, [Validators.required, GenericValidators.arabic]],
    });
  }
}
