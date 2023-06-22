import {Component, OnInit, ViewChild} from '@angular/core';
import {GenericValidators} from "@shared/validators/generic-validators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {SYSTEMS} from "../../../tempData.conts";
import {Dialog} from "primeng/dialog";
import {SystemsDialogComponent} from "../../../systems/browse-systems/systems-dialog/systems-dialog.component";

@Component({
  selector: 'app-employees-dialog',
  templateUrl: './employees-dialog.component.html',
  styleUrls: ['./employees-dialog.component.scss']
})
export class EmployeesDialogComponent implements OnInit {
  public page = SYSTEMS;
  public loading = false;
  @ViewChild(Dialog) dialog: Dialog;
  public display = false;

  public get asDialog() {
    return this.route.component !== SystemsDialogComponent;
  }

  public columns = [
    { name: 'ACTIVITY_NAME', code: 'userName', disabled: true },
    {
      name: 'ACTIVITY_FEQ',
      code: 'nameAr',
    }
  ];
  public List = [
    {id: 1, nameEn: "test1", nameAr: "test1"},
    {id: 2, nameEn: "test2", nameAr: "test2"},
    {id: 3, nameEn: "test3", nameAr: "test3"}
  ];
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  openDialog(groupId?: number) {
    this.display = true;
  }
  buildForm() {
    this.form = this.formBuilder.group({
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      nameEn: [null, [Validators.required, GenericValidators.english]],
      type: [],
      landline: [null, [Validators.pattern(/^-?([0-9]\d*)?$/)]],
      mobile: [null, [Validators.pattern(/^-?([0-9]\d*)?$/)]],
      otherPhone: []
    });
  }
  close() {
    if (this.asDialog) {
      this.display = false;
      // this.store.dispatch(new BrowseTasksAction.ToggleDialog({}));
    } else {
      // this.router.navigate(this.redirect, { relativeTo: this.route });
    }
  }

}
