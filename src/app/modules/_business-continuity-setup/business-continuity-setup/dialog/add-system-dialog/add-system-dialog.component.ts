import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";

@Component({
  selector: 'app-add-system-dialog',
  templateUrl: './add-system-dialog.component.html',
  styleUrls: ['./add-system-dialog.component.scss']
})
export class AddSystemDialogComponent implements OnInit {
  public rtoList = [
    {id: 1, nameEn: "test1", nameAr: "test1"},
    {id: 2, nameEn: "test2", nameAr: "test2"},
    {id: 3, nameEn: "test3", nameAr: "test3"}
  ];
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
      nameEn: [null, [Validators.required, GenericValidators.english]],
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      systemLogo: [null, [Validators.required, GenericValidators.english]],
      ownerDept: [null, [Validators.required, GenericValidators.arabic]],
      systemRto: [null, [Validators.required, GenericValidators.english]],
    });
  }
}
