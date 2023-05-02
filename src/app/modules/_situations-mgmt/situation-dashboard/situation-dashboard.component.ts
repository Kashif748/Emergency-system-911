import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SituationsAction } from '@core/states/situations/situations.action';
import { SituationsState } from '@core/states/situations/situations.state';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { SituationProjection } from 'src/app/api/models/situation-projection';
import { BrowseSituationsAction } from '../states/browse-situations.action';
import {
  BrowseSituationsState,
  BrowseSituationsStateModel,
} from '../states/browse-situations.state';

@Component({
  selector: 'app-situation-dashboard',
  templateUrl: './situation-dashboard.component.html',
  styleUrls: ['./situation-dashboard.component.scss'],
})
export class SituationDashboardComponent implements OnInit, OnDestroy {
  public chartOptions: any;

  @Select(SituationsState.statisticsLoading)
  public loading$: Observable<boolean>;

  @Select(BrowseSituationsState.state)
  public state$: Observable<BrowseSituationsStateModel>;

  public suggestions$: Observable<SituationProjection[]>;
  public statistics$: Observable<any>;
  public chartReport$: Observable<any>;

  situationModel;
  situation$: Observable<SituationProjection>;

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
          this.loadPage({ first: 0, rows: 20 });
        })
      );
  }
  destroy$ = new Subject();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
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
      },
      dataLabels: {
        enabled: true,
        formatter(val) {
          return val.toFixed(2) + '%';
        },
      },
      labels: [],
      title: {
        text: this.translate.instant('REPORTING.INCIDENTS.BY_STATUS.TITLE'),
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
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.situationId = id;
      });
    this.suggestions$ = this.store
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

  onSuggestionSelect(event) {
    if (event?.data) {
      this.router.navigate(['/situations-management/situation', event.data.id]);
    }
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
        },
      })
    );
  }

  prepareStatistics(statistics: any[]) {
    let categories = [];
    statistics.forEach((element) => {
      let orgs = [];
      let category = {
        nameAr: element['MAINCATEGORYNAMEAR'],
        nameEn: element['MAINCATEGORYNAMEEN'],
        total: element['TOTAL'],
      };
      for (const [key, value] of Object.entries(element)) {
        if (
          !['MAINCATEGORYNAMEAR', 'MAINCATEGORYNAMEEN', 'TOTAL'].includes(key)
        ) {
          const name = key.split('|'); // key is with format => "englishName |arabicName"
          orgs.push({
            nameEn: name[0], // english name
            nameAr: name[1], // arabic name
            count: value,
          });
        }
      }
      category['orgs'] = orgs;
      categories.push(category);
    });
    return categories;
  }
}
