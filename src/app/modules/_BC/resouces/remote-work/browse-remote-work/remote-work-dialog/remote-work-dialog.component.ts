import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";
import {IAuthService} from "@core/services/auth.service";
import {Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {map, tap} from "rxjs/operators";
import {GenericValidators} from "@shared/validators/generic-validators";
import {BrowseRemoteWorkAction} from "../../states/browse-remote-work.action";

@Component({
  selector: 'app-remote-work-dialog',
  templateUrl: './remote-work-dialog.component.html',
  styleUrls: ['./remote-work-dialog.component.scss']
})
export class RemoteWorkDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;

  form: FormGroup;
  _remoteWorkId: number;

  get editMode() {
    return this._remoteWorkId !== undefined && this._remoteWorkId !== null;
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
      pDesignation: [null, [Validators.required]],
      pLevel:  [null, [Validators.required]],
      description: [null, [Validators.required]],
      internal_system: [null, [Validators.required]],
      other: [null, [Validators.required]],
      inside: [null, [Validators.required]],
      outside: [null, [Validators.required]],
      otherRemarks: [null, [Validators.required]],
    });
  }
  close() {
    this.store.dispatch(new BrowseRemoteWorkAction.ToggleDialog({}));
  }
  openDialog(id?: number) {
    this.store.dispatch(new BrowseRemoteWorkAction.ToggleDialog({ remoteWorkId: id }));
  }
  submit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
