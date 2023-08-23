import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";
import {IAuthService} from "@core/services/auth.service";
import {Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {map, tap} from "rxjs/operators";
import {BrowseAppSystemAction} from "../../states/browse-app-system.action";

@Component({
  selector: 'app-app-system-dialog',
  templateUrl: './app-system-dialog.component.html',
  styleUrls: ['./app-system-dialog.component.scss']
})
export class AppSystemDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;

  form: FormGroup;
  _appSystemId: number;

  get editMode() {
    return this._appSystemId !== undefined && this._appSystemId !== null;
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
      softApp: [null, [Validators.required]],
      purpose: [null, [Validators.required]],
      users: [null, [Validators.required]],
      license: [null, [Validators.required]],
      license_Type: [null, [Validators.required]],
      day1: [null, [Validators.required]],
      hour8: [null, [Validators.required]],
      hour24: [null, [Validators.required]],
      week1: [null, [Validators.required]],
      week2: [null, [Validators.required]],
    });
  }
  close() {
    this.store.dispatch(new BrowseAppSystemAction.ToggleDialog({}));
  }

  openDialog(id?: number) {
    this.store.dispatch(new BrowseAppSystemAction.ToggleDialog({ appSystemId: id }));
  }
  submit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
