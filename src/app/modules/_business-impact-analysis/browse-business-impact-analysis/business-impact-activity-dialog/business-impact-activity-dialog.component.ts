import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";
import {TranslateService} from "@ngx-translate/core";
import {BusinessImpactAnalysisDialogComponent} from "../business-impact-analysis-dialog/business-impact-analysis-dialog.component";
import {Dialog} from "primeng/dialog";
import {ActivatedRoute} from "@angular/router";
import {BrowseTasksAction} from "../../../_task-mgmt/states/browse-tasks.action";
import {ILangFacade} from "@core/facades/lang.facade";

@Component({
  selector: 'app-business-impact-activity-dialog',
  templateUrl: './business-impact-activity-dialog.component.html',
  styleUrls: ['./business-impact-activity-dialog.component.scss']
})
export class BusinessImpactActivityDialogComponent implements OnInit {
  @ViewChild(Dialog) dialog: Dialog;
  public get asDialog() {
    return this.route.component !== BusinessImpactActivityDialogComponent;
  }
  justifyOptions = [
    {icon: 'pi pi-user', nameAr: 'خارجي', nameEn: 'External'},
    {icon: 'pi pi-tablet', nameAr: 'داخلي', nameEn: 'Internal'},
  ];
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
    private route: ActivatedRoute,
    private lang: ILangFacade,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  openDialog(groupId?: number) {
    this.display = true;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      dept: [null, [Validators.required]],
      section: [null, [Validators.required]],
      sector: [null, [Validators.required]],
      nameEn: [null, [Validators.required, GenericValidators.english]],
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      activityDesc: [null, [Validators.required, GenericValidators.english]],
      arisGuid: [null, [Validators.required, GenericValidators.arabic]],
      activityFreq: [null, [Validators.required, GenericValidators.english]],
      activityArea: [true]
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
