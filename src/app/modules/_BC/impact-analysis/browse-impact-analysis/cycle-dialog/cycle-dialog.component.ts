import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericValidators } from '@shared/validators/generic-validators';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BrowseImpactAnalysisAction } from '../../states/browse-impact-analysis.action';
import { FormUtils } from '@core/utils';
import { ImpactAnalysisState } from '@core/states/impact-analysis/impact-analysis.state';
import { BcVersions } from 'src/app/api/models';
import { BCAction, BCState } from '@core/states';

@Component({
  selector: 'app-cycle-dialog',
  templateUrl: './cycle-dialog.component.html',
  styleUrls: ['./cycle-dialog.component.scss'],
})
export class CycleDialogComponent implements OnInit {
  opened$: Observable<boolean>;

  @Select(ImpactAnalysisState.blocking)
  blocking$: Observable<boolean>;

  @Select(BCState.versions)
  public versions$: Observable<BcVersions[]>;

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
    this.store.dispatch(new BCAction.LoadPage({ page: 0, size: 30 }));
    this.buildForm();
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'new_cycle')
    );
  }
  toggleDialog() {
    this.store.dispatch(
      new BrowseImpactAnalysisAction.ToggleDialog({ dialog: 'new_cycle' })
    );
  }

  close() {
    this.store.dispatch(new BrowseImpactAnalysisAction.ToggleDialog({}));
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

    const cycle = {
      ...this.form.value,
    };
    this.store.dispatch(new BrowseImpactAnalysisAction.CreateCycle(cycle));
  }
}
