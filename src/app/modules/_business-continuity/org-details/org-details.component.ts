import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-org-details',
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.scss'],
})
export class OrgDetailsComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.form = this.formBuilder.group({
      nameAr: [null, [Validators.required]],
      nameEn: [null, [Validators.required]],
      desc: [null],
      employee: [null],
      activities: [null],
      id: 0,
    });
  }
}
