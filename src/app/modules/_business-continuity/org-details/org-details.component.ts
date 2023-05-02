import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericValidators } from '@shared/validators/generic-validators';

@Component({
  selector: 'app-org-details',
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.scss'],
})
export class OrgDetailsComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      nameAr: [null, [GenericValidators.arabic, Validators.required]],
      nameEn: [null, [GenericValidators.english, Validators.required]],
      desc: [null],
      employee: [null],
      activities: [null],
      id: 0,
    });
  }
}
