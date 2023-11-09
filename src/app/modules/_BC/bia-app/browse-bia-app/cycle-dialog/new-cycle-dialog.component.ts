import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericValidators } from '@shared/validators/generic-validators';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormUtils } from '@core/utils';
import { ImpactAnalysisState } from '@core/states/impact-analysis/impact-analysis.state';
import { BcVersions } from 'src/app/api/models';
import { BCAction, BCState } from '@core/states';
import { VERSION_STATUSES } from '@core/states/bc/bc/bc.state';
import {BrowseBiaAppAction} from "../../states/browse-bia-app.action";

@Component({
  selector: 'app-new-cycle-dialog',
  templateUrl: './new-cycle-dialog.component.html',
  styleUrls: ['./new-cycle-dialog.component.scss'],
})
export class NewCycleDialogComponent implements OnInit {
  opened$: Observable<boolean>;

  @Select(ImpactAnalysisState.blocking)
  blocking$: Observable<boolean>;

  @Select(BCState.versions)
  public versions$: Observable<BcVersions[]>;

  @Input()
  cycle: number;

  public get minDate() {
    return new Date();
  }
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new BCAction.LoadPage({ page: 0, size: 30 , statusId : VERSION_STATUSES.APPROVED}));
    this.buildForm();
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'new_cycle')
    );
  }
  toggleDialog() {
    this.store.dispatch(
      new BrowseBiaAppAction.ToggleDialog({ dialog: 'new_cycle' })
    );
  }

  close() {
    this.store.dispatch(new BrowseBiaAppAction.ToggleDialog({}));
  }
  buildForm() {
    this.form = this.formBuilder.group({
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      nameEn: [null, [Validators.required, GenericValidators.english]],
      isActive: true,
      dueDate: [new Date(), [Validators.required]],
      versionId: [null, [Validators.required]],
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

    const cycleForm = {
      ...this.form.value,
    };
    this.store.dispatch(new BrowseBiaAppAction.CreateCycle({form: cycleForm, cycle: this.cycle}));
  }
}
