import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";
import {TranslateService} from "@ngx-translate/core";
import {TaskDialogComponent} from "../../../_task-mgmt/browse-tasks/task-dialog/task-dialog.component";
import {ActivatedRoute} from "@angular/router";
import {Dialog} from "primeng/dialog";

@Component({
  selector: 'app-business-impact-analysis-dialog',
  templateUrl: './business-impact-analysis-dialog.component.html',
  styleUrls: ['./business-impact-analysis-dialog.component.scss']
})
export class BusinessImpactAnalysisDialogComponent implements OnInit {
  @ViewChild(Dialog) dialog: Dialog;
  public get asDialog() {
    return this.route.component !== BusinessImpactAnalysisDialogComponent;
  }
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
      name: [null, [Validators.required, GenericValidators.english]],
      date: [new Date(), [Validators.required]],
      nameBC: [null, [Validators.required, GenericValidators.english]],
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
