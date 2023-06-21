import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Dialog} from "primeng/dialog";
import {GenericValidators} from "@shared/validators/generic-validators";
import {SYSTEMS} from "../../../tempData.conts";

@Component({
  selector: 'app-systems-dialog',
  templateUrl: './systems-dialog.component.html',
  styleUrls: ['./systems-dialog.component.scss']
})
export class SystemsDialogComponent implements OnInit {
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
