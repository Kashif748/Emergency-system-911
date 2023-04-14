import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";

@Component({
  selector: 'app-add-activity-frq',
  templateUrl: './add-activity-frq.component.html',
  styleUrls: ['./add-activity-frq.component.scss']
})
export class AddActivityFrqComponent implements OnInit {
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
      frqEn: [null, [Validators.required, GenericValidators.english]],
      frqAr: [null, [Validators.required, GenericValidators.arabic]],
    });
  }

}
