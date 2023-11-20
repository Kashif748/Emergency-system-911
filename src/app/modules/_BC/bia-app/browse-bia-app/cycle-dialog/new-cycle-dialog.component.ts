import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GenericValidators} from '@shared/validators/generic-validators';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {FormUtils} from '@core/utils';
import {ImpactAnalysisState} from '@core/states/impact-analysis/impact-analysis.state';
import {BcVersions} from 'src/app/api/models';
import {BCAction, BCState} from '@core/states';
import {VERSION_STATUSES} from '@core/states/bc/bc/bc.state';
import {BrowseBiaAppAction} from "../../states/browse-bia-app.action";
import {BrowseBiaAppState, BrowseBiaAppStateModel} from "../../states/browse-bia-app.state";
import {BrowseBCAction} from "../../../states/browse-bc.action";
import {BiaAppsState} from "@core/states/bia-apps/bia-apps.state";
import {LazyLoadEvent} from "primeng/api";
import {BcCycles} from "../../../../../api/models/bc-cycles";

@Component({
  selector: 'app-new-cycle-dialog',
  templateUrl: './new-cycle-dialog.component.html',
  styleUrls: ['./new-cycle-dialog.component.scss'],
})
export class NewCycleDialogComponent implements OnInit {

  @Select(BrowseBiaAppState.state)
  public state$: Observable<BrowseBiaAppStateModel>;

  @Select(ImpactAnalysisState.totalCycleRecords)
  public totalRecords$: Observable<number>;

  opened$: Observable<boolean>;

  @Select(BiaAppsState.loading)
  public loading$: Observable<boolean>;

  @Select(ImpactAnalysisState.blocking)
  blocking$: Observable<boolean>;

  @Select(BCState.versions)
  public versions$: Observable<BcVersions[]>;

  @Input()
  cycle: number;

  @Input()
  cycles: BcCycles[];

  public sortableColumns = [
    {
      name: 'DIALOG.NAME_AR',
      code: 'nameAr',
    },
    {
      name: 'DIALOG.NAME_EN',
      code: 'nameEn',
    },
    { name: 'DIALOG.LIST', code: 'bcVersions' },
    { name: 'DIALOG.STATUS', code: 'status' },
    { name: 'DIALOG.CREATED_ON', code: 'createdOn' },
  ];

  public get minDate() {
    return new Date();
  }

  destroy$ = new Subject();

  @Input()
  set cycleId(v: number) {
    this.buildForm();
    this.store.dispatch(new BCAction.LoadPage({ page: 0, size: 30 , statusId : VERSION_STATUSES.APPROVED}));
    if (v === undefined || v === null) {
      return;
    }
  }

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_dialog'] === 'new_cycle'),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.cycleId = 0;
      });
  }

  ngOnInit(): void {
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
  sort(event) {
    this.store.dispatch(
      new BrowseBiaAppAction.SortCycle({ field: event.value })
    );
  }
  order(event) {
    this.store.dispatch(
      new BrowseBiaAppAction.SortCycle({ order: event.checked ? 'desc' : 'asc' })
    );
  }
  deleteCycle(id) {
    this.store
      .dispatch(new BrowseBiaAppAction.Delete({ id }))
      .toPromise()
      .then(() => {
        this.loadPage();
      });
  }

  public loadPage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseBCAction.LoadPage({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }
}
