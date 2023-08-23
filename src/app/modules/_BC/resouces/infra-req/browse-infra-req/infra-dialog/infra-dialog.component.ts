import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";
import {IAuthService} from "@core/services/auth.service";
import {Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {map, tap} from "rxjs/operators";
import {BrowseInfraAction} from "../../states/browse-infra.action";
import {GenericValidators} from "@shared/validators/generic-validators";

@Component({
  selector: 'app-infra-dialog',
  templateUrl: './infra-dialog.component.html',
  styleUrls: ['./infra-dialog.component.scss']
})
export class InfraDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;

  form: FormGroup;
  _infraId: number;

  get editMode() {
    return this._infraId !== undefined && this._infraId !== null;
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
      config: [null, [Validators.required]],
      count: [null, [Validators.required]],
      avail_count: [null, [Validators.required]],
      purchased: [null, [Validators.required]],
    });
  }
  close() {
    this.store.dispatch(new BrowseInfraAction.ToggleDialog({}));
  }

  openDialog(id?: number) {
    this.store.dispatch(new BrowseInfraAction.ToggleDialog({ infraId: id }));
  }
  submit() {
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
