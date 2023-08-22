import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";
import {IAuthService} from "@core/services/auth.service";
import {Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {map, tap} from "rxjs/operators";
import {BrowseOtherAction} from "../../states/browse-other.action";
import {GenericValidators} from "@shared/validators/generic-validators";

@Component({
  selector: 'app-other-dialog',
  templateUrl: './other-dialog.component.html',
  styleUrls: ['./other-dialog.component.scss']
})
export class OtherDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;

  form: FormGroup;
  _otherId: number;

  get editMode() {
    return this._otherId !== undefined && this._otherId !== null;
  }
  destroy$ = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private lang: ILangFacade,
    private store: Store,
    private route: ActivatedRoute,
    private auth: IAuthService
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
          } catch {
          }
        }
      })
    );
  }

  ngOnInit(): void {
    this.buildForm()
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
  }

  buildForm() {
    this.form = this.formBuilder.group({
      detailEn: [null, [Validators.required, GenericValidators.english]],
      detailAr: [null, [Validators.required, GenericValidators.arabic]],
      count: [null, [Validators.required]],
    });
  }
  close() {
    this.store.dispatch(new BrowseOtherAction.ToggleDialog({}));
  }
  openDialog(id?: number) {
    this.store.dispatch(new BrowseOtherAction.ToggleDialog({ otherId: id }));
  }
  submit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
