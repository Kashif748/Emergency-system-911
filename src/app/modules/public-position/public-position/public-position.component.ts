import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {IncidentReportService} from '@core/api/services/incident-report.service';
import {AlertsService} from '../../../_metronic/core/services/alerts.service';
import {AppUtil} from '@core/utils/AppUtil';
import {TranslationService} from '../../i18n/translation.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IncidentsService} from 'src/app/_metronic/core/services/incidents.service';
import {EventsManagementService} from '../../events-management/events-management.service';
import {DateTimeUtil} from '@core/utils/DateTimeUtil';
import {MapComponent} from '@shared/components/map/map.component';
import {MapActionType} from '@shared/components/map/utils/MapActionType';
import {CommonService} from '@core/services/common.service';
import {OrgService} from '@core/api/services/org.service';
import {
  filter,
  map,
  switchMap,
  switchMapTo,
  take,
  takeUntil,
  tap,
  throttleTime,
} from 'rxjs/operators';
import {BaseComponent} from '@shared/components/base.component';
import {BehaviorSubject} from 'rxjs';

export interface ReportItem {
  key: string;
  nameAr: string;
  nameEn: string;
  count: number;
  total: number;
  percentage: number;
}

export interface AssetStatistics {
  assetId: number;
  nameAr: string;
  nameEn: string;
  quantity: number;
  assetCategoryId: number;
  categoryIcon: string;
  categoryIconColor: string;
}

@Component({
  selector: 'app-public-position',
  templateUrl: './public-position.component.html',
  styleUrls: ['./public-position.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicPositionComponent
  extends BaseComponent
  implements OnInit, AfterViewInit {
  isLoadingIncidentReport = true;
  isLoadingStatistics = true;
  report: any = null;
  priorities: ReportItem[] = [];
  priors: any[] = [];
  status: any[] = [];
  centers: ReportItem[] = [];
  categories: ReportItem[] = [];
  assetsStatistics: AssetStatistics[] = [];
  loading$ = new BehaviorSubject<boolean>(true);
  form: FormGroup;
  panelOpenState = false;
  lang = 'en';
  minDate: Date;
  maxDate: Date;
  incCategories: any;
  ctrs: any;
  filterQuery: any;
  @ViewChildren('mapContainer') maps: QueryList<MapComponent>;
  private map: MapComponent;
  private filterLayers: (where: any, fName: MapActionType) => void;

  constructor(
    private readonly incidentReportService: IncidentReportService,
    private alertService: AlertsService,
    private cd: ChangeDetectorRef,
    private translationService: TranslationService,
    private incidentsService: IncidentsService,
    private formBuilder: FormBuilder,
    private eventsMgmtService: EventsManagementService,
    private commonService: CommonService,
    private orgService: OrgService
  ) {
    super();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  async ngAfterViewInit(): Promise<void> {
    this.loading$
      .pipe(
        filter((l) => !l),
        take(1),
        switchMapTo(this.maps.changes),
        map((ql) => ql.first),
        tap((map) => {
          this.map = map;
        }),
        switchMap(() => this.map.filterLayersFunc$)
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (fun) => {
        this.cd.detectChanges();
        this.filterLayers = fun;
        await this.showMapGraphics(fun);
      });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      priority: [''],
      fromDate: [DateTimeUtil.getFirstDayOfCurrentMonth()],
      toDate: [DateTimeUtil.getTodayDate()],
      categoryId: [''],
      centerId: [''],
    });
    this.filterQuery = this.getFilterQuery();
  }

  async ngOnInit(): Promise<void> {
    this.lang = this.translationService.getSelectedLanguage();
    this.buildForm();
    this.loadIncidentReport();
    this.loadIncidentStatistics();
    this.incidentsService.getPriorities().subscribe(
      (data) => {
        if (data) {
          this.priors = data.result.content;
        }
      },
      (error) => {
      }
    );

    this.incidentsService.getIncidentStatus().subscribe(
      (data) => {
        if (data) {
          this.status = data.result.content;
        }
      },
      (error) => {
      }
    );

    this.incidentsService.getIncidentCategories().subscribe(
      (data) => {
        if (data) {
          this.incCategories = data.result;
        }
      },
      (error) => {
      }
    );
    this.eventsMgmtService.getCenters().subscribe(
      (data) => {
        if (data) {
          this.ctrs = data.result;
        }
      },
      (error) => {
      }
    );
  }

  clearSearch() {
    this.form.reset({
      priority: '',
      fromDate: DateTimeUtil.getFirstDayOfCurrentMonth(),
      toDate: DateTimeUtil.getTodayDate(),
      categoryId: '',
      centerId: '',
    });
  }

  async onSubmit() {
    const isFormValid = this.isFormValid();
    if (!isFormValid) {
      return;
    }
    this.filterQuery = this.getFilterQuery();
    this.loadIncidentReport();
    this.loadIncidentStatistics();
    this.map.mapView?.graphics?.removeAll();
    await this.showMapGraphics(this.filterLayers);
  }

  private async showMapGraphics(
    filterLayers: (where, fName: MapActionType) => void
  ) {
    const org = this.commonService.getCommonData()?.currentOrgDetails;
    if (!org) {
      return;
    }
    const orgChildOrgs = await this.orgService
      .getOrgChild(org.id)
      .pipe(map((orgs: any[]) => orgs.map((o) => o?.code)))
      .toPromise();
    let orgs = `( `;
    orgChildOrgs.forEach((c) => {
      orgs += `'${c}',`;
    });
    orgs = `${orgs.slice(0, orgs.length - 1)} )`;

    const filter = this.getFilterQuery();

    const incidentIds: string[] = await this.incidentsService
      .getIncidentsIds(0, {
        ...filter,
        createdDate: filter.fromDate,
        endDate: filter.toDate,
      })
      .pipe(map((res) => res?.result))
      .toPromise();
    let incidents = `(`;
    incidentIds.forEach((id) => (incidents += `${id},`));
    incidents = `${incidents.slice(0, incidents.length - 1)} )`;

    const where = `ORG_NAME in ${orgs} and INCIDENT_REF_ID in ${incidents}`;
    filterLayers(where, MapActionType.INCIDENT_POINT);
    filterLayers(where, MapActionType.INCIDENT_POLYLINE);
    filterLayers(where, MapActionType.INCIDENT_POLYGON);
    const taskIds = await this.incidentsService
      .getMyAssignedOrgTaskIds(
        0,
        {
          // status: 6
        },
        null,
        10
      )
      .pipe(map((r) => r.result))
      .toPromise();

    let tasks = `(`;
    taskIds.forEach((id) => (tasks += `${id},`));
    tasks = `${tasks.slice(0, tasks.length - 1)} )`;

    const con = `ORG_NAME in ${orgs} and TASK_REF_ID in ${tasks} and INCIDENT_REF_ID in ${incidents}`;
    filterLayers(con, MapActionType.TASK_POINT);
    filterLayers(con, MapActionType.TASK_POLYLINE);
    filterLayers(con, MapActionType.TASK_POLYGON);
  }

  private async loadIncidentReport() {
    try {
      const query = this.getFilterQuery();
      const response: any = await this.incidentReportService
        .loadReport(query)
        .toPromise();
      this.extractReportData(response.result);
      this.isLoadingIncidentReport = false;
    } catch (e) {
      this.isLoadingIncidentReport = false;
      this.alertService.openFailureSnackBar();
    }
    this.cd.detectChanges();
  }

  private extractReportData(result: any) {
    // 1 - extract priorities.
    let totalPriorities = 0;
    const tempPriorities = [];
    (result.priority as any[]).forEach((p) => {
      totalPriorities += p.count;
    });
    (result.priority as any[]).forEach((p) => {
      const percentage = (p.count / totalPriorities) * 100;
      tempPriorities.push({
        key: p.key,
        nameAr: p.nameAr,
        nameEn: p.nameEn,
        count: p.count,
        total: totalPriorities,
        percentage: AppUtil.formatDecimal(percentage),
      });
    });
    this.priorities = tempPriorities;

    // 2- extract centers.
    let totalCenters = 0;
    const tempCenters = [];
    (result.center as any[]).forEach((c) => {
      totalCenters += c.count;
    });
    (result.center as any[]).forEach((c) => {
      const percentage = (c.count / totalCenters) * 100;
      tempCenters.push({
        key: c.key,
        nameAr: c.nameAr,
        nameEn: c.nameEn,
        count: c.count,
        total: totalCenters,
        percentage: AppUtil.formatDecimal(percentage),
      });
    });
    this.centers = tempCenters;

    // 3- extract categories.
    let totalCategories = 0;
    const tempCategories = [];
    (result.category as any[]).forEach((p) => {
      totalCategories += p.count;
    });
    (result.category as any[]).forEach((p) => {
      const percentage = (p.count / totalCategories) * 100;
      tempCategories.push({
        key: p.key,
        nameAr: p.nameAr,
        nameEn: p.nameEn,
        count: p.count,
        total: totalCategories,
        percentage: AppUtil.formatDecimal(percentage),
      });
    });
    this.categories = tempCategories;
  }

  loadIncidentStatistics() {
    const query = this.getFilterQuery();
    this.incidentReportService.loadStatistics(query).subscribe(
      (response: any) => {
        const assetsCategories =
          this.commonService.getCommonData().assetsCategory;
        this.assetsStatistics = [];
        const tempStatistics = [];
        (response.result as any[]).forEach((statistics) => {
          const category = assetsCategories.find(
            (value) => value.id === statistics.assetCategoryId
          );
          const asset: any = {
            assetId: statistics.assetId,
            nameAr: statistics.nameAr,
            nameEn: statistics.nameEn,
            quantity: statistics.quantity,
            assetCategoryId: statistics.assetCategoryId,
          };
          if (category) {
            asset.categoryIcon = category.icon
              ? category.icon + '.svg'
              : 'Home/Home.svg';
            asset.categoryIconColor = category.color ? category.color : 'info';
          } else {
            asset.categoryIcon = 'Home/Home.svg';
            asset.categoryIconColor = 'info';
          }
          tempStatistics.push(asset);
        });
        this.assetsStatistics = tempStatistics;
        this.isLoadingStatistics = false;
        this.loading$.next(false);
      },
      (e) => {
        this.isLoadingStatistics = false;
        this.alertService.openFailureSnackBar();
        this.loading$.next(false);
      }
    );
    this.cd.detectChanges();
  }

  getFilterQuery() {
    const query = Object.assign({}, this.form.value);
    query.fromDate = DateTimeUtil.format(query.fromDate, 'YYYY-MM-DD');
    query.toDate = DateTimeUtil.format(query.toDate, 'YYYY-MM-DD');
    return query;
  }

  getFromDateValidationError() {

  }

  getToDateValidationError() {

  }

  private isFormValid() {
    // validate from date & to date.
    let isFormValid = true;
    const fromDate = this.form.value.fromDate;
    const toDate = this.form.value.toDate;
    const isFromDateAfterToDate = DateTimeUtil.isFirstDateAfterSecond(fromDate, toDate);
    if (isFromDateAfterToDate) {
      this.form.get('fromDate').setErrors({msg: 'VALIDATION_MSG.DATE.START_DATE_SHOULD_BEFORE_END'});
      isFormValid = false;
    } else {
      this.form.get('fromDate').setErrors(null);
    }

    const isToDateBeforeFromDate = DateTimeUtil.isFirstDateBeforeSecond(toDate, fromDate);
    if (isToDateBeforeFromDate) {
      this.form.get('toDate').setErrors({msg: 'VALIDATION_MSG.DATE.END_DATE_SHOULD_AFTER_START'});
      isFormValid = false;
    } else {
      this.form.get('toDate').setErrors(null);
    }

    return isFormValid;
  }

}
