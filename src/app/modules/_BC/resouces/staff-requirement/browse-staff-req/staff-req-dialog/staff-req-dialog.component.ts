import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";
import {GenericValidators} from "@shared/validators/generic-validators";
import {BrowseRtoAction} from "../../../../bc-lists/rto/states/browse-rto.action";
import {FormUtils} from "@core/utils/form.utils";
import {Observable, Subject} from "rxjs";
import {map, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {BrowseStaffAction} from "../../states/browse-staff.action";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-staff-req-dialog',
  templateUrl: './staff-req-dialog.component.html',
  styleUrls: ['./staff-req-dialog.component.scss']
})
export class StaffReqDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;

  form: FormGroup;
  destroy$ = new Subject();

  _staffId: number;

  get editMode() {
    return this._staffId !== undefined && this._staffId !== null;
  }

  constructor(
    private formBuilder: FormBuilder,
    private lang: ILangFacade,
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.viewOnly$ = this.route.queryParams.pipe(
      map((params) => params['_mode'] === 'viewonly'),
      tap((v) => {
        if (this.form) {
          try {
            if (v) {
              this.form.disable();
            } else {
              this.form.enable();
            }
          } catch {}
        }
      })
    );
  }

  ngOnInit(): void {
    this.buildForm();
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
  }

  buildForm() {
    this.form = this.formBuilder.group({
      description: [null, [Validators.required]],
      day_more: [null, [Validators.required]],
      hour1: [null, [Validators.required]],
      hour2: [null, [Validators.required]],
      p_emp: [null, [Validators.required]],
      s_emp: [null, [Validators.required]],
      s_emp1: [null, [Validators.required]],
    });
  }

  close() {
    this.store.dispatch(new BrowseStaffAction.ToggleDialog({}));
  }
  submit() {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
