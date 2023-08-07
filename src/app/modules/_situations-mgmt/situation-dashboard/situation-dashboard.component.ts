import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CommonService } from '@core/services/common.service';
import { SituationsAction } from '@core/states/situations/situations.action';
import { SituationsState } from '@core/states/situations/situations.state';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import {LazyLoadEvent, MenuItem} from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { SituationStatisticsResponse } from 'src/app/api/models';
import { SituationProjection } from 'src/app/api/models/situation-projection';
import { BrowseSituationsAction } from '../states/browse-situations.action';
import {
  BrowseSituationsState,
  BrowseSituationsStateModel,
} from '../states/browse-situations.state';
import {BrowseGroupsAction} from "../../_team-mgmt/states/browse-groups.action";
import {ILangFacade} from "@core/facades/lang.facade";

@Component({
  selector: 'app-situation-dashboard',
  templateUrl: './situation-dashboard.component.html',
  styleUrls: ['./situation-dashboard.component.scss'],
})
export class SituationDashboardComponent implements OnInit, OnDestroy {
  @ViewChild('outer') outer: ElementRef<HTMLLinkElement>;
  public chartOptions: any;
  situationsDialog$: Observable<boolean>;

  public page$: Observable<SituationProjection[]>;
  @Select(SituationsState.loading)
  public totalRecords$: Observable<number>;

  @Select(SituationsState.loading)
  public loading$: Observable<boolean>;

  @Select(SituationsState.statisticsLoading)
  public statisticsLoading$: Observable<boolean>;

  @Select(BrowseSituationsState.state)
  public state$: Observable<BrowseSituationsStateModel>;

  situationModel;
  situation$: Observable<SituationProjection>;

  public columns = ['id', 'name', 'newsType'];
  public statistics$: Observable<any>;
  public dataTable: any;
  public chartReport$: Observable<any>;
  lang: string;

  _situationId: number;
  set situationId(v: number) {
    this._situationId = v;
    this.situation$ = this.store
      .dispatch(new SituationsAction.GetSituation({ id: v }))
      .pipe(
        switchMap(() => this.store.select(SituationsState.situation)),
        takeUntil(this.destroy$),
        take(1),
        filter((t) => !!t),
        tap((t: SituationProjection) => {
          this.getStatistics(this._situationId);
          this.getChartReport(this._situationId);
        })
      );
  }
  destroy$ = new Subject();
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private commonService: CommonService,
    private router: Router,
    private langFacade: ILangFacade,
  ) {
    // status chart
    this.chartOptions = {
      series: [],
      chart: {
        height: 300,
        type: 'pie',
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: [],
          },
          export: {
            csv: {
              filename: undefined,
              columnDelimiter: ',',
              headerCategory: 'category',
              headerValue: 'value',
              dateFormatter(timestamp) {
                return new Date(timestamp).toDateString();
              },
            },
            svg: {
              filename: undefined,
            },
            png: {
              filename: undefined,
            },
          },
          autoSelected: 'zoom',
        },
        events: {
          dataPointSelection: (event, chartContext, opts) => {
            const label = opts.w.config.labels[opts.dataPointIndex];
            this.redirectToReport({ priority: label });
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter(val) {
          return val.toFixed(2) + '%';
        },
      },
      labels: [],
      title: {
        text: this.translate.instant('SITUATIONS.CHART_TITLE'),
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: undefined,
          color: '#263238',
        },
      },
      legend: {
        position: 'bottom',
      },
    };
    this.langFacade.vm$.pipe(
    ).subscribe((res) => {
      if (res.ActiveLang.key == 'ar') {
        this.lang = 'ar';
      } else {
        this.lang = 'en';
      }
    });
  }

  ngOnInit(): void {
    this.situationsDialog$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === '_situations_dialog')
    );
    this.route.queryParams
      .pipe(
        takeUntil(this.destroy$),
        map((params) => params['_id']),
        distinctUntilChanged(),
        tap((id) => (!!id ? (this.situationId = id) : this.openDialog()))
      )
      .subscribe();

    this.page$ = this.store
      .select(SituationsState.page)
      .pipe(filter((p) => !!p));

    this.statistics$ = this.store.select(SituationsState.statistics).pipe(
      filter((p) => !!p),
      map((s) => this.prepareStatistics(s))
    );

    this.chartReport$ = this.store.select(SituationsState.chartReport).pipe(
      filter((p) => !!p),
      tap((data) => {
        const statuses = data.priority as any[];
        this.chartOptions.title.text = this.translate.instant(
          'SITUATIONS.CHART_TITLE'
        );
        this.chartOptions.labels = statuses?.map((s) =>
          this.translate.currentLang == 'en' ? s.nameEn : s.nameAr
        );

        this.chartOptions.series = statuses?.map(
          (s) => statuses?.find((ss) => ss.id == s.id)?.count ?? 0
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  public getStatistics(situationId: number) {
    this.store.dispatch(
      new BrowseSituationsAction.GetStatistics({ situationId })
    );
  }
  public getChartReport(situationId: number) {
    this.store.dispatch(
      new BrowseSituationsAction.GetChartReport({ situationId })
    );
  }

  redirectToDashboard(_id) {
    this.store.dispatch(
      new BrowseSituationsAction.ToggleDialog({
        dialogName: '_situations_dialog',
        situationId: _id,
      })
    );
  }
  search() {
    this.store.dispatch(new BrowseSituationsAction.LoadSituations());
  }

  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }

    this.store
      .dispatch(new BrowseSituationsAction.UpdateFilter(filter))
      .toPromise()
      .then(() => {
        if (filter.type) {
          this.search();
        }
      });
  }
  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseSituationsAction.LoadSituations({
        pageRequest: {
          first: event.first,
          rows: event.rows,
          filters: { active: true },
        },
      })
    );
  }

  prepareStatistics(statistics: SituationStatisticsResponse) {
    let table = {};
    table['columns'] = [];
    table['value'] = [];

    if (statistics.mainCategory?.length > 0) {
      table['value'] = statistics.mainCategory;
      table['columns'] = statistics.mainCategory[0].primaryOrgs;
    }
    if (statistics.recoveryRate) {
      table['recoveryRate'] = statistics.recoveryRate.map(
        (item) => (item.closedIncidents * 100) / item.registeredIncidents
      );
      table['recoveryRate']?.push(
        (statistics.totalClosedIncidents * 100) /
          statistics.totalRegisteredIncidents
      );
    }
    return table;
  }
  redirectToReport(payload: { [key: string]: string }) {
    const commonData = this.commonService.getCommonData();
    const situation = this.store.selectSnapshot(SituationsState.situation);

    payload = {
      ...payload,
      startDate: situation.startDate.slice(0, 10),
      endDate: situation.endDate.slice(0, 10),
    };

    if (payload?.priority) {
      const priority = commonData.priorities.find(
        (item) =>
          item.nameAr === payload.priority || item.nameEn === payload.priority
      );
      payload['priority'] = priority.id.toString();
    }

    let query = Object.entries(payload)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');

    let url = location.origin + '/reporting/incidents?' + query;
    this.outer.nativeElement.href = url;
    this.outer.nativeElement.setAttribute('target', '_blank');
    this.outer.nativeElement.click();
  }
  openDialog() {
    this.store.dispatch(
      new BrowseSituationsAction.ToggleDialog({
        dialogName: '_situations_dialog',
        situationId: this._situationId,
      })
    );
  }
  close() {
    this.store.dispatch(
      new BrowseSituationsAction.ToggleDialog({
        dialogName: '_situations_dialog',
        situationId: this._situationId,
      })
    );
  }

  export() {
    this.store.dispatch(new BrowseSituationsAction.Export({ type: 'PDF', situationId: this._situationId }));
  }
  back() {
      this.router.navigate(['..'], { relativeTo: this.route });
  }
}
