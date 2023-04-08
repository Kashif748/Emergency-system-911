import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-add-new-activity',
  templateUrl: './add-new-activity.component.html',
  styleUrls: ['./add-new-activity.component.scss']
})
export class AddNewActivityComponent implements OnInit {

  public rtoList = [
    {id: 1, nameEn: "test1", nameAr: "test1"},
    {id: 2, nameEn: "test2", nameAr: "test2"},
    {id: 3, nameEn: "test3", nameAr: "test3"}
  ];
  public display = false;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
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
      activityDesc: [null, [Validators.required, GenericValidators.english]],
      arisGuid: [null, [Validators.required, GenericValidators.arabic]],
      activityFreq: [null, [Validators.required, GenericValidators.english]],
    });
  }

}
