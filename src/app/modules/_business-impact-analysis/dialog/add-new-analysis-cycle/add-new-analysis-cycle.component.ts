import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-add-new-analysis-cycle',
  templateUrl: './add-new-analysis-cycle.component.html',
  styleUrls: ['./add-new-analysis-cycle.component.scss']
})
export class AddNewAnalysisCycleComponent implements OnInit {
  public rtoList = [
    {id: 1, nameEn: "test1", nameAr: "test1"},
    {id: 2, nameEn: "test2", nameAr: "test2"},
    {id: 3, nameEn: "test3", nameAr: "test3"}
  ];
  public get minDate() {
    return new Date();
  }
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
      name: [null, [Validators.required, GenericValidators.english]],
      date: [new Date(), [Validators.required]],
      nameBC: [null, [Validators.required, GenericValidators.english]],
    });
  }

}
