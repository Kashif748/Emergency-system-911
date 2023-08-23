import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ILangFacade} from "@core/facades/lang.facade";
import {IAuthService} from "@core/services/auth.service";
import {Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, tap} from "rxjs/operators";
import {BrowseRecordAction} from "../../states/browse-records.action";

@Component({
  selector: 'app-record-dialog',
  templateUrl: './record-dialog.component.html',
  styleUrls: ['./record-dialog.component.scss']
})
export class RecordDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;

  form: FormGroup;
  _rtoId: number;

  get editMode() {
    return this._rtoId !== undefined && this._rtoId !== null;
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
      name: [null, [Validators.required]],
      recordType: [null, [Validators.required]],
      criticality: [null, [Validators.required]],
      custody: [null, [Validators.required]],
      currentLocation: [null, [Validators.required]],
      source: [null, [Validators.required]],
    });
  }

  close() {
    this.store.dispatch(new BrowseRecordAction.ToggleDialog({}));
  }

  openDialog(id?: number) {
    this.store.dispatch(new BrowseRecordAction.ToggleDialog({ recordId: id }));
  }

  submit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
