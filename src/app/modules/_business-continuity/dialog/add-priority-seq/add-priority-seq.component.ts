import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";

@Component({
  selector: 'app-add-priority-seq',
  templateUrl: './add-priority-seq.component.html',
  styleUrls: ['./add-priority-seq.component.scss']
})
export class AddPrioritySeqComponent implements OnInit {
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
