import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { DataInquiryService } from 'src/app/_metronic/core/services/data-inquiry.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AssetsService } from "src/app/_metronic/core/services/sources.service";
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";
import { TranslationService } from "../../i18n/translation.service";
import { ReportComponent } from "./../../resource/report/report.component";
import { debounceTime, switchMap, startWith, map } from "rxjs/operators";
import { Observable, of } from "rxjs";
import * as _ from "lodash";

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexAnnotations,
  ApexFill,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: any; //ApexXAxis;
  annotations: ApexAnnotations;
  fill: ApexFill;
  stroke: ApexStroke;
  grid: ApexGrid;
};

enum AlertsStates {
  Hide,
  HasError,
  NoError,
}

@Component({
  selector: 'app-scad-dashboard',
  templateUrl: './scad-dashboard.component.html',
  styleUrls: ['./scad-dashboard.component.scss']
})
export class ScadDashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('ScadPaginator') ScadPaginator: MatPaginator;
  alertState: AlertsStates = AlertsStates.Hide;
  alertsStates = AlertsStates;
  alertMsg = "ERROR_HAS_HAPPEND";

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  myFormGroup:FormGroup;
  formTemplate:any;
  form_template:any;
  FiltersData:any;
  selectedId:any;

  groups = [{id : "1" , nameEn : "Aj"}]

  DialogRef: MatDialogRef<any>;

  paginationConfig = {
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 0,
    id: "paging",
  };

  displayedColumns: string[] = [
    "Id",
    "Year",
    "Age group",
    "Citizen",
    "Total Value"
  ];

  loading = true;
  publicChartOptions: {
    chart?: ApexChart;
    series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
    labels?: string[];
  } = {};

  selectedChartOptions: any = {};
  selectedCat = "";

  dataSource = new MatTableDataSource<any>([]);
  dataSource1 = new MatTableDataSource<any>([]);

  categories: any[] = [];
  lang = "en";

  scadData: any[] = [];
  scadDetails: any[] = [];

  search = new FormControl();
  $search: Observable<any>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource1.paginator = this.ScadPaginator;
  }
  constructor(
    private cdr: ChangeDetectorRef,
    private translationService: TranslationService,
    private assetService: AssetsService,
    private _datainquiryService: DataInquiryService,
    public dialog: MatDialog
  ) {}


  pageChanged(event) {
    this.paginationConfig.currentPage = event;
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    let commonData = JSON.parse(localStorage.getItem("commonData"));
    if (commonData) {
      this.categories = commonData["assetsCategory"];
    }

    this._datainquiryService.getScadList().subscribe(sData=>{
      if(sData){
         this.scadData = sData.result;


        this.$search = this.search.valueChanges.pipe(
          startWith(null),
          debounceTime(200),
          switchMap((res: string) => {
            if (!res) return of(this.scadData);
            res = res.toLowerCase();
            return of(
              this.scadData.filter(x => x.nameEn.toLowerCase().indexOf(res) >= 0)
            );
          })
        );

      }
    }, err => {
      console.log(err);
    }
    );

     this.initCharts();
    this.assetService.onAlertStateChange.subscribe((newState) => {
      this.alertMsg = newState["alertMsg"];
      this.alertState = newState["alertState"];
    });

    this.assetService.onSourcesListChange.subscribe((assets) => {
      this.dataSource = new MatTableDataSource<any>(assets);
      this.dataSource.paginator = this.paginator;
      assets.map((asset) => {
        let val = this.categories.filter((c) => c.id === asset.category?.id);
        asset.category = val[0];
        return asset;
      });
      this.categories.map((cat) => {
        const count = this.dataSource.data.filter(
          (x) => x.category?.id === cat.id
        ).length;
        return (cat.count = count);
      });
      this.initiatePublicOrgChart();
      this.initiateOwnerOrgChart();
      this.changeSelectedChart(
        this.categories[0]["id"],
        this.categories[0]["nameAr"]
      );
      this.loading = false;

      this.cdr.detectChanges();
    });

  }

  onSubmit(){

    let params= "";

    _.each(this.myFormGroup.value, (value, key) => {

      // console.log(!_.isEmpty(value) ,value != "", value , key)
                  if(value != "") {
                    params=params+key+"="+value+"&"
                  }
        });

        // console.log(params , "params");

    this._datainquiryService.getScadKoiDetailsFilters(this.selectedId,params.slice(0, -1)).subscribe((sData:any)=>{
      if(sData){
        this.scadDetails = sData.content;


        this.dataSource1 = new MatTableDataSource<any>(this.scadDetails);
        this.dataSource1.paginator = this.ScadPaginator;

        this.initScadCharts(this.scadDetails);
        this.loading = false;

        this.cdr.detectChanges();

      }
    }, err => {
      console.log(err);
    });

  }

  openReport() {
    const dialogRef = this.dialog.open(ReportComponent, {
      width: "1000px",
      data: this.categories,
    });
  }

  deleteResource(id) {
    this.DialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false,
      panelClass: "modal",
    });

    this.DialogRef.componentInstance.confirmMessage = "GENERAL.DELETE_CONFIRM";
    this.DialogRef.componentInstance.icon = "error_outline";
    this.DialogRef.componentInstance.actionName = "ACTIONS.DELETE";

    this.DialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.assetService.deleteSource(id);
      }
      this.DialogRef = null;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /*
   *
   */
  initiatePublicOrgChart() {
    let series = [];
    let sum = 0;
    this.categories.forEach((element) => {
      series.push(0);
    });
    this.dataSource.data.forEach((element) => {
      let cat = element["category"];
      if (cat) {
        sum += element["quantity"];
        let index = this.categories.findIndex((item) => item.id == cat["id"]);
        if (index >= 0) {
          series[index] += element["quantity"];
        }
      }
    });

    series.forEach((element) => {
      element = (100 * element) / sum;
    });

    this.publicChartOptions.series = series;
    this.publicChartOptions.labels = this.categories.map(
      (item) => item["nameAr"]
    );
  }

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
    this.ownerOrgChart.xaxis.categories = distinctOrgs.map(
      (o) => (this.lang == "en" ? o?.nameEn : o?.nameAr) ?? ""
    );

    let groupBy = function (xs, key, key2) {
      return xs.reduce(function (rv, x) {
        try {
          (rv[x[key][key2]] = rv[x[key][key2]] || []).push(x);
        } catch {
          (rv["undefined"] = rv["undefined"] || []).push(x);
        }
        return rv;
      }, {});
    };
    let assetsGroupedByCategory = groupBy(
      this.dataSource.data,
      "category",
      "id"
    );
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
            data[index] = a?.quantity;
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
        type: "pie" as "pie",
      },
      series: [],
      labels: [],
    };
    this.ownerOrgChart = {
      chart: {
        height: 250,
        type: "bar",
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
    };


  }

  changeSelectedChart(id, name) {
    this.selectedCat = name;
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
            name: `${this.lang == "ar" ? a?.nameAr : a?.nameEn} (${
              a?.measuringType
            })`,
            data: data,
          };
        });
      })(),

      xaxis: {
        categories: distinctOrgs.map(
          (o) => (this.lang == "en" ? o?.nameEn : o?.nameAr) ?? ""
        ),
      },
      yaxis: {},
      tooltip: {},
      chart: {
        height: 250,
        type: "bar",
        stacked: true,
      } as ApexChart,
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"],
        },
        offsetX: 0,
        dropShadow: {
          enabled: true,
        },
      },
    };

    this.selectedChartOptions = options;
  }

  onGroupsChange(id){

    this.selectedId = id ;

  this.getFilters(id);

    this._datainquiryService.getScadKoiDetails(id).subscribe((sData:any)=>{
      if(sData){
        this.scadDetails = sData.content;


        this.dataSource1 = new MatTableDataSource<any>(this.scadDetails);
        this.dataSource1.paginator = this.ScadPaginator;

        this.initScadCharts(this.scadDetails);
        this.loading = false;

        this.cdr.detectChanges();

      }
    }, err => {
      console.log(err);
    });
  }

 async getFilters(id) {

    const scad = _.find(this.scadData , ['code', id]);

    this.form_template =scad;

    //Filter Forms

    this.formTemplate = this.form_template;
    let group={}
    this.form_template.filter.forEach(input_template=>{
      group[input_template]=new FormControl('');
    })
    this.myFormGroup = new FormGroup(group);

    this._datainquiryService.getMultipleFilterData(id,this.form_template.filter).subscribe(async val =>{

      this.FiltersData = await val
     //  console.log(val , "Ajinkya" ,this.FiltersData)

    }

       );


  }

 async initScadCharts(scadDetails){

    let data = [];
    let categories =[];
    let name ='';
    scadDetails.forEach(element => {
      if(element){
        data.push(element?.dataValue)
        categories.push(element?.dataYear)
        name = this.lang == 'en' ? element?.scadKoi?.nameEn : element?.scadKoi?.nameAr ;
      }
    });
this.chartOptions = {
  series: [
    {
      name: "Years",
      data: data
    }
  ],
  annotations: {
    points: [
      // {
      //   x: "Bananas",
      //   seriesIndex: 0,
      //   label: {
      //     borderColor: "#775DD0",
      //     offsetY: 0,
      //     style: {
      //       color: "#fff",
      //       background: "#775DD0"
      //     },
      //     // text: "Bananas are good"
      //   }
      // }
    ]
  },
  chart: {
    height: 350,
    type: "bar",
    toolbar: {
      tools: {
        download: false,
      },
      show : false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "50%",
      endingShape: "rounded"
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 2
  },

  grid: {
    row: {
      colors: ["#fff", "#f2f2f2"]
    }
  },
  xaxis: {
    title: {
      text: "Years",
    },
    labels: {
      rotate: -45
    },
    categories: categories,
    tickPlacement: "on"
  },
  yaxis: {
    title: {
      text: name,
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "horizontal",
      shadeIntensity: 0.25,
      gradientToColors: undefined,
      inverseColors: true,
      opacityFrom: 0.85,
      opacityTo: 0.85,
      stops: [50, 0, 100]
    }
  }
};
  }

  mySelectHandler(event){
}

}
