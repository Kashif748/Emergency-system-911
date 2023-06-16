import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";
import {Dialog} from "primeng/dialog";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-system-dialog',
  templateUrl: './system-dialog.component.html',
  styleUrls: ['./system-dialog.component.scss']
})
export class SystemDialogComponent implements OnInit {
  @ViewChild(Dialog) dialog: Dialog;
  public get asDialog() {
    return this.route.component !== SystemDialogComponent;
  }
  public rtoList = [
    {id: 1, nameEn: "test1", nameAr: "test1"},
    {id: 2, nameEn: "test2", nameAr: "test2"},
    {id: 3, nameEn: "test3", nameAr: "test3"}
  ];
  public display = false;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
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
      nameEn: [null, [Validators.required, GenericValidators.english]],
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      systemLogo: [null, [Validators.required, GenericValidators.english]],
      ownerDept: [null, [Validators.required, GenericValidators.arabic]],
      systemRto: [null, [Validators.required, GenericValidators.english]],
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
