import {Component, OnInit, ViewChild} from '@angular/core';
import {GenericValidators} from "@shared/validators/generic-validators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {SYSTEMS} from "../../../tempData.conts";
import {ActivatedRoute} from "@angular/router";
import {Dialog} from "primeng/dialog";
import {SystemsDialogComponent} from "../../../systems/browse-systems/systems-dialog/systems-dialog.component";

@Component({
  selector: 'app-dependencies-dialog',
  templateUrl: './dependencies-dialog.component.html',
  styleUrls: ['./dependencies-dialog.component.scss']
})
export class DependenciesDialogComponent implements OnInit {

  public page = SYSTEMS;
  public loading = false;
  @ViewChild(Dialog) dialog: Dialog;
  public display = false;

  public List = [
    {id: 1, nameEn: "test1", nameAr: "test1"},
    {id: 2, nameEn: "test2", nameAr: "test2"},
    {id: 3, nameEn: "test3", nameAr: "test3"}
  ];

  public get asDialog() {
    return this.route.component !== DependenciesDialogComponent;
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
      limit: [null, [Validators.required]],
      section: [null, [Validators.required]],
      activeDep: [null, [Validators.required]],
      desc: [null, [Validators.required]],
      dependency: [true],
      associateDep: [null, [Validators.required]],
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
