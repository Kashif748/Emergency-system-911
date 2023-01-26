import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke,
  ChartComponent,
} from "ng-apexcharts";

import * as moment from "moment";

import * as _ from "lodash";

import { OrgService } from "@core/api/services/org.service";

import { TranslationService } from "./../../../modules/i18n/translation.service";
import { AlertsService } from "./../../../_metronic/core/services/alerts.service";
import { DohService } from "./../../../_metronic/core/services/doh.service";

import { data } from "./random-data";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: any; //ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  grid: any; //ApexGrid;
  colors: any;
  toolbar: any;
  legend: ApexLegend;
  labels: string[];
};

@Component({
  selector: "app-doh-dashboard",
  templateUrl: "./doh-dashboard.component.html",
  styleUrls: ["./doh-dashboard.component.scss"],
})
export class DohDashboardComponent implements OnInit, AfterViewInit {
  dataVol = [];
  dataBed = [];
  dataShared = [];

  displayedColumns: string[] = [
    "id",
    "name",
    "gender",
    "nationality",
    "email",
    "mobile",
    "interest",
  ];

  displayedColumnsBed: string[] = [
    "id",
    "type",
    "occupied",
    "available",
    "facility",
    "region",
    "date",
  ];

  displayedColumnsShared: string[] = [
    "id",
    "record_no",
    "incident_name",
    "inserted_emp",
    "position_emp",
    "contact",
    "status",
    "dept",
    "region",
    "dateNtime",
  ];

  dataSource: any;
  dataSourceBED: any;
  dataSourceSHARED: any;
  lang = "en";
  query: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("bedPaginator") bedPaginator: MatPaginator;
  @ViewChild("sharedPaginator") sharedPaginator: MatPaginator;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions1: Partial<ChartOptions>;

  state = "collapsed";

  covidCasesData: any = [];
  covidTestData: any = [];
  covidTestDataTotal = 0;
  covidCasesDataTotal = 0;
  covidTestDataRecovred = 0;
  covidTestDataPositive = 0;
  covidDataRecovred: any = [];
  covidDataPositive: any = [];
  widgets = data;
  organizations: any[] = [];
  hospitals: any[] = [];
  changed = false;
  myDate = Date.now(); //date

  hspData: any;

  public chart1options: Partial<ChartOptions>;
  public chart2options: Partial<ChartOptions>;
  public chart3options: Partial<ChartOptions>;
  public commonOptions: Partial<ChartOptions> = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    toolbar: {
      tools: {
        selection: false,
      },
    },
    markers: {
      size: 6,
      hover: {
        size: 10,
      },
    },
    tooltip: {
      followCursor: false,
      theme: "dark",
      x: {
        show: false,
      },
      marker: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
    },
    grid: {
      clipMarkers: false,
    },
    xaxis: {
      type: "datetime",
    },
  };

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  Casesrange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private _dohService: DohService,
    private orgService: OrgService,
    private translationService: TranslationService,
    private cd: ChangeDetectorRef,
    protected alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();

    this.dataSource = new MatTableDataSource(this.dataVol);
    this.dataSourceBED = new MatTableDataSource(this.dataBed);
    this.dataSourceSHARED = new MatTableDataSource(this.dataShared);

    this._dohService.getVolunteers().subscribe((data: any) => {

      this.dataVol = data.result;
      this.dataSource.data = this.dataVol;
    });

    this._dohService.getbedCapacity().subscribe((data: any) => {

      this.dataBed = data.result;
      this.dataSourceBED.data = this.dataBed;

      let result = this.dataBed.reduce(function (r, a) {
        r[a.FacilityName] = r[a.FacilityName] || [];
        r[a.FacilityName].push(a);
        return r;
      }, Object.create(null));

      var keys = Object.keys(result);

      this.hospitals.push(keys);


      this.hspData = result;

      this.onGroupsChange(Object.keys(result)[0]);
    });

    this._dohService.getEventInfo().subscribe((data: any) => {

      this.dataShared = data.result;
      this.dataSourceSHARED.data = this.dataShared;
    });

    this.getCovidData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceBED.paginator = this.bedPaginator;
    this.dataSourceSHARED.paginator = this.sharedPaginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceBED.filter = filterValue.trim().toLowerCase();
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceSHARED.filter = filterValue.trim().toLowerCase();
  }

  pageChanged(event) {
  }

  getCovidData() {
    this._dohService.getCovidCases().subscribe((covidData: any) => {
      this.covidCasesDataTotal = covidData.result.sum;

      this.getTotalcases();
    });
  }

  getTotalcases() {
    this._dohService.getTotalTest().subscribe((covidData: any) => {
      this.covidTestDataTotal = covidData?.result?.sum;

      //  this.initCharts();
    });
  }

  getTestData(from, to) {
    const format2 = "YYYY-MM-DD";

    from = moment(from).format(format2);
    to = moment(to).format(format2);

    // console.log(from , to , "AGGGG" ,_.isEmpty(from) ,_.isEmpty(to) )
    if (_.isEmpty(from) || from == "Invalid date") {
      this.alertService.openFailureSnackBarWithMsg(
        this.translationService.get("DOH.INVALID_START_DATE")
      );
      return;
    } else if (_.isEmpty(to) || to == "Invalid date") {
      this.alertService.openFailureSnackBarWithMsg(
        this.translationService.get("DOH.INVALID_END_DATE")
      );
      return;
    } else {
      this._dohService.getTestsbyDate(from, to).subscribe((covidData: any) => {
        this.covidTestData = covidData?.result;
        this.initCharts1();
        this.cd.detectChanges();
      });
    }
  }

  getCasesData(from, to) {
    const format2 = "YYYY-MM-DD";

    from = moment(from).format(format2);
    to = moment(to).format(format2);

    if (_.isEmpty(from) || from == "Invalid date") {
      this.alertService.openFailureSnackBarWithMsg(
        this.translationService.get("DOH.INVALID_START_DATE")
      );
      return;
    } else if (_.isEmpty(to) || to == "Invalid date") {
      this.alertService.openFailureSnackBarWithMsg(
        this.translationService.get("DOH.INVALID_END_DATE")
      );
      return;
    } else {
      this._dohService
        .getCovidCasesByDate(from, to)
        .subscribe((covidData: any) => {
          this.covidCasesData = covidData?.result;

          this.initCharts();
          this.cd.detectChanges();
        });
    }
  }

  public initCharts1(): void {
    let series = [];
    let categories = [];
    this.covidTestData.forEach((element) => {
      let x = element?.totalTest;
      let y = element?.resultDate;
      series.push(x);
      categories.push(y);
    });

    this.chart3options = {
      series: [
        {
          name: this.translationService.get("DOH.TOTAL_CASES"),
          data: series,
        },
      ],
      chart: {
        id: "fb",
        // width: 700,
        height: 300,
        type: "bar",
        stacked: true,
        toolbar: {
          tools: {
            download: false,
          },
          show: false,
        },
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8",
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        curve: "smooth",
        width: [2],
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        },
      },
      xaxis: {
        categories: categories,
      },
    };
  }

  public initCharts(): void {
    let series1 = [];
    let seriesPositive = [];
    let seriesPositiveConfirmed = [];
    let seriesRecovered = [];
    let uniqDates = [];

    this.covidCasesData.forEach((element) => {
      let y = element?.cases;
      let x = element?.resultDate;
      series1.push(x);

      uniqDates = [...new Set(series1)];

      if (element.outcome == "Recovered") {
        let y = element?.cases;
        let x = Date.parse(element?.resultDate);
        this.covidTestDataRecovred += y;
        this.covidDataRecovred.push(element);
        seriesRecovered.push(y);
      } else if (element.outcome == "Positive") {
        let y = element?.cases;
        let x = Date.parse(element?.resultDate);
        this.covidTestDataPositive += y;
        this.covidDataPositive.push(element);
        seriesPositive.push(y);
      } else if (element.outcome == "Confirmed Positive") {
        let y = element?.cases;
        let x = Date.parse(element?.resultDate);
        seriesPositiveConfirmed.push(y);
      }
    });

    this.cd.markForCheck();

    // console.log(seriesPositive ,seriesPositiveConfirmed, seriesRecovered , uniqDates,"Ajinkya")

    this.chart1options = {
      series: [
        // {
        //   name: this.translationService.get("DOH.TOTAL_TESTS"),
        //   data: series
        // },
        {
          name: this.translationService.get("DOH.TOTAL_RECOVERED"),
          data: seriesRecovered,
        },
        {
          name: this.translationService.get("DOH.TOTAL_POSITIVE"),
          data: seriesPositive,
        },
        {
          name: this.translationService.get("DOH.TOTAL_CONFIRMED"),
          data: seriesPositiveConfirmed,
        },
      ],
      chart: {
        id: "fb",
        // width: 700,
        height: 150,
        type: "area",
        stacked: true,
        toolbar: {
          tools: {
            download: false,
          },
          show: false,
        },
      },
      colors: ["#008FFB", "#00E396", "#CED4DC"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
        width: [5, 7, 5],
        // curve: 'straight',
        dashArray: [0, 8, 5],
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        },
      },
      xaxis: {
        type: "numeric",
      },
    };

    this.chart2options = {
      series: [
        // {
        //   name: this.translationService.get("DOH.TOTAL_TESTS"),
        //   data: series1
        // },

        {
          name: this.translationService.get("DOH.TOTAL_RECOVERED"),
          data: seriesRecovered,
        },
        {
          name: this.translationService.get("DOH.TOTAL_POSITIVE"),
          data: seriesPositive,
        },
        {
          name: this.translationService.get("DOH.TOTAL_CONFIRMED"),
          data: seriesPositiveConfirmed,
        },
      ],
      chart: {
        id: "tw",
        type: "area",
        stacked: true,
        height: 300,
        toolbar: {
          tools: {
            download: false,
          },
          show: false,
        },
      },
      //colors: ["#008FFB", "#00E396", "#CED4DC"],
      colors: ["#5653FE", "#17ead9", "#f02fc2"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: [0.5, 0.7, 0.5],
        // curve: 'straight',
        // dashArray: [0, 8, 5]
      },
      labels: uniqDates,
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        },
      },
      xaxis: {
        type: "datetime",
      },
    };
  }

  public generateDayWiseTimeSeries(baseval, count, yrange): any[] {
    let i = 0;
    let series = [];
    while (i < count) {
      var x = baseval;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  getOrgs() {
    this.orgService.getAll().subscribe(
      (data) => {
        if (data) {
          this.organizations = data.result.slice(0, 2);
        }
      },
      () => {}
    );
  }

  async initScadCharts(datadBed) {
    let bedType = [];
    let available = [];
    let name = "";
    datadBed.forEach((element) => {
      if (element) {
        bedType.push(element?.BedTypeAgeName);
        available.push(element?.AvailableBeds);
        name =
          this.lang == "en" ? element?.FacilityName : element?.FacilityName;
      }
    });

    this.chartOptions1 = {
      series: [
        {
          name: name,
          data: available,
        },
      ],

      chart: {
        height: 600,
        type: "bar",
        toolbar: {
          tools: {
            download: false,
          },
          show: false,
        },
      },
      // plotOptions: {
      //   bar: {
      //     columnWidth: "50%",
      //     endingShape: "rounded"
      //   }
      // },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },
      colors: ["#1bc5bd"],
      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"],
        },
      },
      xaxis: {
        title: {
          text: name,
        },
        labels: {
          rotate: this.lang == "en" ? -45 : 45,
          //  trim: true,
          //  hideOverlappingLabels: true,
        },
        categories: bedType,
        // tickPlacement: "on"
      },
      yaxis: {
        title: {
          text: "Available",
        },
      },
      fill: {
        type: "gradient",
        // gradient: {
        //   shade: "light",
        //   type: "horizontal",
        //   shadeIntensity: 0.25,
        //   gradientToColors: undefined,
        //   inverseColors: true,
        //   opacityFrom: 0.85,
        //   opacityTo: 0.85,
        //   stops: [50, 0, 100]
        // }
      },
    };
  }

  onGroupsChange(id) {
    let hspdataval = this.hspData[id];
    this.initScadCharts(hspdataval);
  }

  toggle(): void {
    this.state = this.state === "collapsed" ? "expanded" : "collapsed";
  }

  getDateOne(range) {

  }
}

