import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "../../../../../shared/validators/generic-validators";
import {ILangFacade} from "@core/facades/lang.facade";
import {FormUtils} from "@core/utils/form.utils";
import {BrowseUsersAction} from "../../../../_user-mgmt/states/browse-users.action";
import {Store} from "@ngxs/store";
import {BrowseRtoAction} from "../../states/browse-rto.action";

@Component({
  selector: 'app-rto-dialog',
  templateUrl: './rto-dialog.component.html',
  styleUrls: ['./rto-dialog.component.scss']
})
export class RtoDialogComponent implements OnInit {
  public display = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private lang: ILangFacade,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  openDialog(Id?: number) {
    this.display = true;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      criticalityEn: [null, [Validators.required, GenericValidators.english]],
      criticalityAr: [null, [Validators.required, GenericValidators.arabic]],
      nameEn: [null, [Validators.required, GenericValidators.english]],
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      descriptionEn: [null, [Validators.required, GenericValidators.english]],
      descriptionAr: [null, [Validators.required, GenericValidators.arabic]],
    });
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const rto = {
      ...this.form.getRawValue(),
    };

    rto.versionId = 1;
    rto.isActive = true;
    this.store.dispatch(new BrowseRtoAction.CreateRto(rto));

    /*if (this.editMode) {
      this.store.dispatch(new BrowseUsersAction.UpdateUser(user));
    } else {
      this.store.dispatch(new BrowseUsersAction.CreateUser(user));
    }*/
  }
}
