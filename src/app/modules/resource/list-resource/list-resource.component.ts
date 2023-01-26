import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AssetsService } from 'src/app/_metronic/core/services/sources.service';

import { map, takeUntil } from 'rxjs/operators';

import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { TranslationService } from '../../i18n/translation.service';
import { ReportComponent } from './../../resource/report/report.component';
import { CategoryService } from './../../../_metronic/core/services/categories.service';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Observable, Subject } from 'rxjs';
import { IStorageService } from '@core/services/storage.service';
import { RoleService } from '@core/api/services/role.service';

import { ResourceModalComponent } from '../resource-modal/resource-modal.component';

import * as _ from 'lodash';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';

enum AlertsStates {
  Hide,
  HasError,
  NoError,
}
@Component({
  selector: 'app-list-resource',
  templateUrl: './list-resource.component.html',
  styleUrls: ['./list-resource.component.scss'],
})
export class ListResourceComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  alertState;
  @Input('controllerName') controllerName: string;
  private destroy$ = new Subject();
  alertsStates = AlertsStates;
  alertMsg = 'ERROR_HAS_HAPPEND';
  @ViewChild(MatSort) sort: MatSort;
  panelOpenState: boolean = false;
  form: FormGroup = this.fb.group({
    nameEn: [''],
    nameAr: [''],
    category: [''],
    details: [''],
    organization: [''],
    pageNumber: 0,
    sort: 'id,desc',
  });
  status: any;
  page = 1;
  paginationConfig: any;
  @ViewChild('panel') panel: MatExpansionPanel;
  categories$: Observable<any[]>;
  public orgs$: Observable<any>;
  DialogRef: MatDialogRef<any>;
  @ViewChild('searchbar') searchbar: ElementRef;
  searchText = '';
  toggleSearch: boolean = false;
  displayedColumns: string[] = [
    'category',
    'name',
    'quantity',
    'type',
    'organization',
  ];

  loading = true;

  publicChartOptions: {
    chart?: ApexChart;
    series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
    labels?: string[];
  } = {};

  selectedChartOptions: any = {};
  selectedCat = '';

  dataSource = new MatTableDataSource<any>([]);

  categories: any[] = [];
  lang = 'en';

  constructor(
    private cdr: ChangeDetectorRef,
    private translationService: TranslationService,
    private assetService: AssetsService,
    public dialog: MatDialog,
    private catService: CategoryService,
    private roleService: RoleService,
    private storageService: IStorageService,

    private fb: FormBuilder
  ) {
    this.paginationConfig = {
      itemsPerPage: 10,
      currentPage: 0,
      totalItems: 0,
      id: 'first',
    };
  }

  pageChanged(event) {
    this.paginationConfig.currentPage = event;
    this.form.patchValue({
      pageNumber: this.paginationConfig.currentPage - 1,
    });
    this.searchAssest();
  }

  customSort(event) {
    this.loading = true;
    this.sort = event;
    this.getAssets(0, event);
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    let currentOrg =
      this.storageService.getItem('commonData')?.currentOrgDetails;
    this.categories$ = this.catService.categories();

    let commonData = JSON.parse(localStorage.getItem('commonData'));
    if (commonData) {
      this.categories = commonData['assetsCategory'];
    }

    this.orgs$ = this.roleService
      .getOrgById(currentOrg?.id)
      .pipe(map((r) => r.result));
    this.initCharts();
    this.assetService.onAlertStateChange.subscribe((newState) => {
      this.alertMsg = newState['alertMsg'];
      this.alertState = newState['alertState'];
    });

    setTimeout(() => {
      this.alertState = this.alertsStates.Hide;
    }, 1000);

    this.assetService.onSourcesListChange.subscribe(
      (assets) => {
        this.dataSource = new MatTableDataSource<any>(assets);
        this.dataSource.paginator = this.paginator;
        assets.map((asset) => {
          let val = this.categories.find((c) => c.id === asset.category?.id);
          if (val) {
            asset.category = val;
          }
          return asset;
        });
        if (!assets.length) {
          this.loading = false;
          //here print message to user
          // this.alertService.customFailureSnackBar(this._translation.translateAWord ("RESOURCE.NO_DATA"));
        } else {
          const newCategories = this.categories.map((cat) => {
            const count = this.dataSource.data.filter(
              (x) => x.category?.id === cat.id
            ).length;
            return (cat.count = count);
          });
          this.initiateOwnerOrgChart();

          if (this.form.value.category) {
            const category = this.categories.find(
              (v) => v.id == this.form.value.category
            );
            this.changeSelectedChart(
              category.id,
              category.nameAr,
              category.nameEn
            );
          } else {
            this.changeSelectedChart(
              this.categories[0]?.id,
              this.categories[0]?.nameAr,
              this.categories[0]?.nameEn
            );
          }

          this.loading = false;

          this.cdr.detectChanges();
        }
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  openReport() {
    const dialogRef = this.dialog.open(ReportComponent, {
      width: '1000px',
      data: this.categories,
    });
  }

  deleteResource(id) {
    this.DialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false,
      panelClass: 'modal',
    });

    this.DialogRef.componentInstance.confirmMessage = 'GENERAL.DELETE_CONFIRM';
    this.DialogRef.componentInstance.icon = 'error_outline';
    this.DialogRef.componentInstance.actionName = 'ACTIONS.DELETE';

    this.DialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.assetService.deleteSource(id);
      }
      this.DialogRef = null;
    });
  }

  // initiatePublicOrgChart() {
  //   let series = [];
  //   let sum = 0;
  //   let cats = [];
  //   let arr = this.dataSource.data.filter((e) => {
  //     if (e.organization.id == 2 && e.category) {
  //       cats.push({ category: e.category, qunatity: e.quantity });
  //     }
  //     return e.organization.id == 2 && e.category;
  //   });

  //   this.categories.forEach((element) => {
  //     series.push(0);
  //   });
  //   this.dataSource.data.forEach((element) => {
  //     let cat = element['category'];
  //     if (cat) {
  //       sum += element['quantity'];
  //       let index = this.categories.findIndex((item) => item.id == cat['id']);
  //       if (index >= 0) {
  //         series[index] += element['quantity'];
  //       }
  //     }
  //   });
  //   // series.forEach((element) => {
  //   //   element = (100 * element) / sum;
  //   // });
  //   for (let index = 0; index < series.length; index++) {
  //     series[index] = (100 * series[index]) / sum;
  //     series[index] = parseFloat(series[index]).toFixed(2);
  //   }

  //   // this.publicChartOptions.series = series;
  //   // // let lang = this.lang;
  //   // // if (this.lang) {
  //   // //   this.publicChartOptions.labels = this.categories.map(function (value) {
  //   // //     return lang == 'en' ? value['nameEn'] : value['nameAr'];
  //   // //   });
  //   // // }

  //   // if (this.lang == 'en') {
  //   //   this.publicChartOptions.labels = this.categories.map(
  //   //     (item) => item['nameEn']
  //   //   );
  //   // } else {
  //   //   this.publicChartOptions.labels = this.categories.map(
  //   //     (item) => item['nameAr']
  //   //   );
  //   // }
  // }

  public ownerOrgChart: {
    chart?: ApexChart;
    series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
    labels?: string[];
    xaxis?: ApexXAxis;
    yaxis?: ApexYAxis | ApexYAxis[];
    plotOptions?: ApexPlotOptions;
  };

  async initiateOwnerOrgChart() {
    let distinctOrgs = this.dataSource.data
      .map((a) => a?.organization)
      .filter((v, i, self) => self.findIndex((o) => o?.id == v?.id) === i);
    this.ownerOrgChart.xaxis.categories = distinctOrgs.map((o) =>
      this.lang == 'en' ? o.nameEn : o.nameAr
    );

    let groupBy = function (xs, key, key2) {
      return xs.reduce(function (rv, x) {
        try {
          (rv[x[key][key2]] = rv[x[key][key2]] || []).push(x);
        } catch {
          (rv['undefined'] = rv['undefined'] || []).push(x);
        }
        return rv;
      }, {});
    };
    let assetsGroupedByCategory = groupBy(
      this.dataSource.data,
      'category',
      'id'
    );
    this.ownerOrgChart.series = [];
    Object.keys(assetsGroupedByCategory).forEach((k) => {
      this.ownerOrgChart.series.push({
        name: assetsGroupedByCategory[k][0]?.category?.nameAr as string,
        data: (() => {
          let data = Array.apply(
            null,
            new Array(this.ownerOrgChart.xaxis.categories.length)
          ).map(Number.prototype.valueOf, 0);
          assetsGroupedByCategory[k]?.forEach((a) => {
            const index = distinctOrgs.findIndex(
              (o) => a?.organization?.id == o?.id
            );
            data[index] += a?.quantity;
          });
          return data;
        })(),
      } as any);
    });
    this.cdr.detectChanges();
  }

  initCharts() {
    this.publicChartOptions = this.selectedChartOptions = {
      chart: {
        height: 250,
        type: 'radialBar' as 'radialBar',
      },
      series: [],
      labels: [],

      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          colors: ['#fff'],
        },
        offsetX: 0,
        dropShadow: {
          enabled: true,
        },
      },
    };
    this.ownerOrgChart = {
      chart: {
        height: 250,
        type: 'bar',
        stacked: true,
      },
      labels: [],
      series: [],
      xaxis: {},
      yaxis: {},
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      // dataLabels: {
      //   enabled: true,
      //   textAnchor: "start",
      //   style: {
      //     colors: ["#fff"],
      //   },
      //   offsetX: 0,
      //   dropShadow: {
      //     enabled: true,
      //   },
      // },
    };
  }

  changeSelectedChart(id, nameAr, nameEn) {
    this.lang == 'en'
      ? (this.selectedCat = nameEn)
      : (this.selectedCat = nameAr);

    let assetsOfCategory = this.dataSource.data.filter(
      (a) => a?.category?.id == id
    );
    let distinctOrgs = this.dataSource.data
      .map((a) => a?.organization)
      .filter((v, i, self) => self.findIndex((o) => o?.id == v?.id) === i);
    let options = {
      labels: [],
      series: (() => {
        return assetsOfCategory.map((a) => {
          let data = Array.apply(null, new Array(distinctOrgs.length)).map(
            Number.prototype.valueOf,
            0
          );

          let index = distinctOrgs.findIndex(
            (o) => o?.id == a?.organization?.id
          );
          data[index] = a?.quantity;

          return {
            name: `${this.lang == 'en' ? a?.nameEn : a?.nameAr} `,
            data: data,
          };
        });
      })(),

      // series:[100,50,45,90],

      xaxis: {
        categories: distinctOrgs.map((o) =>
          this.lang == 'en' ? o?.nameEn : o?.nameAr
        ),
      },
      yaxis: {},
      tooltip: {},
      chart: {
        height: 250,
        type: 'bar',

        stacked: true,
      } as ApexChart,

      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          colors: ['#fff'],
        },
        offsetX: 0,
        dropShadow: {
          enabled: true,
        },
      },
    };

    this.selectedChartOptions = options;
  }

  getAssets(
    page: number,
    sort?: { active: string; direction: 'asc' | 'desc' }
  ) {
    this.loading = true;

    if (!sort?.active) {
      sort = { active: 'id', direction: 'desc' };
    }

    if (sort.active == 'name') {
      if (this.lang == 'en') {
        sort.active = 'name_en';
      } else {
        sort.active = 'name_ar';
      }
    }
    this.paginationConfig.currentPage = page + 1;
    this.form.patchValue({
      sort: sort.active + ',' + sort.direction,
      pageNumber: 0,
    });
    this.searchAssest();
  }

  searchAssest() {
    this.assetService.searchAssets(this.form.value).subscribe((form) => {
      this.loading = false;
      form?.content.forEach(
        (element) => {
          element.category = this.getAssetCategory(element?.category?.id);
          element.assetsGroup = this.getAssetGroup(element?.assetsGroup?.id);
        },
        (err) => {
          this.loading = false;
        }
      );
      this.dataSource = new MatTableDataSource<any>(form.content);
      this.cdr.detectChanges();
    });
  }

  onSubmit() {
   // this.loading = true;
    //this.ngOnInit();
    this.assetService.searchAssets(this.form.value).subscribe(
      (assets) => {
        assets?.content.forEach(
          (element) => {
            element.category = this.getAssetCategory(element?.category?.id);
            element.assetsGroup = this.getAssetGroup(element?.assetsGroup?.id);
          },
          (err) => {
            this.loading = false;
          }
        );

        this.dataSource = new MatTableDataSource<any>(assets.content);
        this.dataSource.paginator = this.paginator;
        assets.content.map((asset) => {
          let val = this.categories.filter((c) => c.id === asset.category?.id);
          asset.category = val[0];
          return asset;
        });
        if (assets['content']?.length == 0) {
          this.loading = false;
          //here print message to user
          // this.alertService.customFailureSnackBar(this._translation.translateAWord ("RESOURCE.NO_DATA"));
        } else {
          this.categories.map((cat) => {
            const count = this.dataSource.data.filter(
              (x) => x.category?.id === cat.id
            ).length;
            return (cat.count = count);
          });
          this.loading = false;
        }
        this.initiateOwnerOrgChart();

        if (this.form.value.category) {
          const category = this.categories.find(
            (v) => v.id == this.form.value.category
          );
          this.changeSelectedChart(
            category.id,
            category.nameAr,
            category.nameEn
          );
        } else {
          this.changeSelectedChart(
            this.categories[0]?.id,
            this.categories[0]?.nameAr,
            this.categories[0]?.nameEn
          );
        }
        this.cdr.detectChanges();
      },
      (err) => {
        this.loading = false;
      }
    );
    this.assetService.getSourcesListFilter(this.form.value);
    // this.panel.close();
  }

  clearSearch() {
    this.loading = true;
    this.form.reset();
    //this.getAssets(0);
    this.onSubmit();
    this.loading = false;
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createTask() {
    // this.router.navigate(["/add"]);
  }

  openModal(type, id) {
    this.DialogRef = this.dialog.open(ResourceModalComponent, {
      disableClose: false,
      panelClass: 'modal',
      data: { type: type, id: id, controllerName: this.controllerName },
    });
    this.DialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (_) => {
        // this._service.changeCurrentTab$.next(true);
        try {
          // await this._service.resolve();
        } catch {}
        this.ngOnInit();
        // this._service.changeCurrentTab$.next(false);
      });
  }

  getAssetCategory(id) {
    let commonData = JSON.parse(localStorage.getItem('commonData'));
    const assetCat = _.find(commonData.assetsCategory, ['id', id]);
    if (!_.isEmpty(assetCat)) {
      return assetCat;
    } else {
      return null;
    }
  }

  getAssetGroup(id) {
    let commonData = JSON.parse(localStorage.getItem('commonData'));
    const assetGroup = _.find(commonData.assetsGroup, ['id', id]);
    if (!_.isEmpty(assetGroup)) {
      return assetGroup;
    } else {
      return null;
    }
  }

  public downloadPDF() {
    this.assetService.downloadReport('PDF', this.form.value).subscribe();
  }

  public downloadXlsx() {
    this.assetService.downloadReport('EXCEL', this.form.value).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
