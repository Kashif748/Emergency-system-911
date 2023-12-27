import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GenericValidators} from '@shared/validators/generic-validators';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormUtils} from '@core/utils';
import {ImpactAnalysisState} from '@core/states/impact-analysis/impact-analysis.state';
import {BcCycleStatus, BcVersions} from 'src/app/api/models';
import {BCState, BiaAction} from '@core/states';
import {VERSION_STATUSES} from '@core/states/bc/bc/bc.state';
import {BrowseBiaAppAction} from '../../states/browse-bia-app.action';
import {BrowseBiaAppState, BrowseBiaAppStateModel} from '../../states/browse-bia-app.state';
import {BrowseBCAction} from '../../../states/browse-bc.action';
import {BiaAppsState} from '@core/states/bia-apps/bia-apps.state';
import {ConfirmationService, LazyLoadEvent, MenuItem} from 'primeng/api';
import {BcCycles} from '../../../../../api/models/bc-cycles';
import {ImapactAnalysisAction} from '@core/states/impact-analysis/impact-analysis.action';
import {PrivilegesService} from '@core/services/privileges.service';
import {DateTimeUtil} from '@core/utils/DateTimeUtil';

@Component({
  selector: 'app-new-cycle-dialog',
  templateUrl: './new-cycle-dialog.component.html',
  styleUrls: ['./new-cycle-dialog.component.scss'],
})
export class NewCycleDialogComponent implements OnInit {
  VERSION_STATUSES = VERSION_STATUSES;

  @Select(BrowseBiaAppState.state)
  public state$: Observable<BrowseBiaAppStateModel>;

  @Select(ImpactAnalysisState.totalCycleRecords)
  public totalRecords$: Observable<number>;

  opened$: Observable<boolean>;

  @Select(ImpactAnalysisState.loading)
  public loading$: Observable<boolean>;

  @Select(ImpactAnalysisState.blocking)
  blocking$: Observable<boolean>;

  @Select(BCState.versions)
  public versions$: Observable<BcVersions[]>;

  @Input()
  cycle: BcCycles[];

  selectedCycle: BcCycles = {};

  public sortableColumns = [
    {
      name: 'DIALOG.NAME_AR',
      code: 'nameAr',
    },
    {
      name: 'DIALOG.NAME_EN',
      code: 'nameEn',
    },
    { name: 'DIALOG.LIST', code: 'versionId' },
    { name: 'DIALOG.STATUS', code: 'status' },
    { name: 'DIALOG.CREATED_ON', code: 'createdOn' },
  ];
  @Select(ImpactAnalysisState.cycles)
  cycles$: Observable<({ actions: MenuItem[] } & BcCycles)[]>;

  @Select(BiaAppsState.statuses)
  statuses$: Observable<BcCycleStatus[]>;

  public get minDate() {
    return new Date();
  }

  destroy$ = new Subject();

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private store: Store,
    public privilege: PrivilegesService,
    private confirmationService: ConfirmationService,
  ) {}

  menuCommandBtn(btn, item) {
    return () => btn.click(item);
  }

  ngOnInit(): void {
    this.buildForm();
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'new_cycle')
    );

    this.store.dispatch([
      new BiaAction.LoadStatuses(),
      new BrowseBCAction.LoadPage({
        statusId: 3,
      }),
    ]);
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
    this.store.dispatch(
      new BrowseBiaAppAction.CreateCycle({ form: cycleForm, cycle: this.cycle['id'] })
    );
  }
  sort(event) {
    this.store.dispatch(
      new BrowseBiaAppAction.SortCycle({ field: event.value })
    );
  }
  order(event) {
    this.store.dispatch(
      new BrowseBiaAppAction.SortCycle({
        order: event.checked ? 'desc' : 'asc',
      })
    );
  }
  deleteCycle(id) {
    return () =>
      this.store
        .dispatch(new BrowseBiaAppAction.Delete({ id }))
        .toPromise()
        .then(() => {
          this.loadPage();
        });
  }

  changeStatues(id, status: VERSION_STATUSES) {
    return () => {
      this.confirmationService.confirm({
        target: event.target,
        message: this.translate.instant('CONFIRM'),
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.store.dispatch(
            new BrowseBiaAppAction.ChangeCycleStatus({
              cycleId: id,
              statusId: status,
            })
          );
        },
        reject: () => {
        },
      });
    };
  }

  public loadPage(event?: LazyLoadEvent) {
    this.store.dispatch([
      new BrowseBiaAppAction.LoadCycles({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      }),
    ]);
  }

  onRowEditInit(cycle: BcCycles) {
    this.selectedCycle = JSON.parse(JSON.stringify(cycle));
    this.selectedCycle.dueDate = DateTimeUtil.getDateInGMTFormat(cycle.dueDate);
  }

  onRowEditSave(cycle: BcCycles) {
    this.store.dispatch(
      new ImapactAnalysisAction.UpdateCycle({
        ...this.selectedCycle,
      })
    );
    this.selectedCycle = {};
  }
}
