import { Component, OnInit } from '@angular/core';
import {ILangFacade} from "@core/facades/lang.facade";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";

@Component({
  selector: 'app-browse-locations',
  templateUrl: './browse-locations.component.html',
  styleUrls: ['./browse-locations.component.scss']
})
export class BrowseLocationsComponent implements OnInit {
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
