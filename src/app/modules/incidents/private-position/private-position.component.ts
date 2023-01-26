import { MatDialog } from "@angular/material/dialog";
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Injector,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { ActivatedRoute, Router } from "@angular/router";

import { BehaviorSubject, Observable } from "rxjs";

import * as _ from "lodash";

import { data } from "src/app/pages/dashboard/random-data";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexYAxis,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexTitleSubtitle,
  ApexLegend,
  ApexStates,
} from "ng-apexcharts";

import { AssetService } from "src/app/core/api/services/asset.service";

import { map, tap } from "rxjs/operators";

import { TranslationService } from "src/app/modules/i18n/translation.service";

import { ApexOptions } from "apexcharts";

import { AlertsService } from "./../../../_metronic/core/services/alerts.service";
import { IncidentsService } from "./../../../_metronic/core/services/incidents.service";

import { SelectDialogComponent } from "./select-dialog/select-dialog.component";

export type ChartOptions1 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
};

export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

export type ChartOptions3 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
};

export type ChartOptions4 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  fill: ApexFill;
  markers: ApexMarkers;
  states: ApexStates;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  title: ApexTitleSubtitle;
};

export type ChartOptions5 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  stroke: ApexStroke;
  grid: ApexGrid;
  fill: ApexFill;
};

export type ChartOptions6 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  grid: ApexGrid;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
};

export type ChartOptions7 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};

export type ChartOptions8 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  fill: ApexFill;
  options: ApexOptions;
  title: ApexTitleSubtitle;
};

export type ChartOptions9 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
};

export type ChartOptionsSpark = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  colors: string[];
  labels: string[] | number[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

const sparkLineData = [
  47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61,
  27, 54, 43, 19, 46,
];

interface statistics {
  deaths: number[];
  majorInjuries: number[];
  normalInjuries: number[];
  minorInjuries: number[];
}

@Component({
  selector: "app-private-position",
  templateUrl: "./private-position.component.html",
  styleUrls: ["./private-position.component.scss"],
})
export class PrivatePositionComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild("sidenav") sidenav: MatSidenav;

  public chartLineSparkline4Options: Partial<ChartOptionsSpark>;
  public chartAreaSparkline3Options: Partial<ChartOptionsSpark>;
  public commonAreaSparlineOptions: Partial<ChartOptionsSpark> = {
    chart: {
      type: "area",
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "straight",
    },
    fill: {
      opacity: 0.3,
    },
    yaxis: {
      min: 0,
    },
  };
  public commonLineSparklineOptions: Partial<ChartOptionsSpark> = {
    chart: {
      type: "line",
      width: 100,
      height: 35,
      sparkline: {
        enabled: true,
      },
    },

    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  };
  public commonBarSparklineOptions: Partial<ChartOptionsSpark> = {
    chart: {
      type: "bar",
      width: 100,
      height: 35,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "80%",
      },
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  };

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  incidents: any = {};
  incidentTasks: any;
  incidentId: any;
  Porg: any = "";
  operational_Reports: any;
  taskTypes: any;
  ProBackstyle: any;
  paginationConfig: any;

  widgets = data;
  Sorg: any[] = [];

  lang = "en";
  currentTab = "Day";
  commonData: any;

  stats: any = {};
  totalInjuries = [];

  selectedFiles: FileList;
  progressInfos = [];
  hospitalInfo: [] = [];
  challenge: [];
  message = "";

  loading = false;

  fileInfos: Observable<any>;

  @ViewChild("chartbar") chartbar: ChartComponent;
  public chartOptions2: Partial<ChartOptions2>;

  @ViewChild("chartbubble") chartbubble: ChartComponent;
  public chartOptions3: Partial<ChartOptions3>;

  @ViewChild("chartgrad") chartgrad: ChartComponent;
  public chartOptions4: Partial<ChartOptions4>;

  @ViewChild("chartHorbar") chartHorbar: ChartComponent;
  public chartOptions5: Partial<ChartOptions5>;

  @ViewChild("chartArea") chartArea: ChartComponent;
  public chartOptions6: Partial<ChartOptions6>;

  @ViewChild("chartStck") chartStck: ChartComponent;
  public chartOptions7: Partial<ChartOptions7>;

  @ViewChild("chartLine") chartLine: ChartComponent;
  public chartOptions8: Partial<ChartOptions8>;

  @ViewChild("chartRadi") chartRadi: ChartComponent;
  public chartOptions9: Partial<ChartOptions9>;
  private mapConfigState = {
    mapType: "incident",
    zoomModel: {
      referenceId: this.incidents?.id,
      featureName: this.incidents?.featureName,
    },
    viewOnly: true,
  };
  public mapConfig$ = new BehaviorSubject<any>(this.mapConfigState);
  public assetsData = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translationService: TranslationService,
    private alertService: AlertsService,
    private cd: ChangeDetectorRef,
    private incidentservice: IncidentsService,
    private assetService: AssetService,
    private dialog: MatDialog,
    private cfr: ComponentFactoryResolver,
    private injector: Injector
  ) {
    //  let id = this.route.snapshot.params["id"];

    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return true;
    // };

    //   this.route.params.subscribe(params => {
    //     console.log("ddd")
    //     let id = params['id']; //or whatever you put in your routing
    //     // here your logic to use this id
    //     this.incidentId = id;
    //  });

    this.commonData = JSON.parse(localStorage.getItem("commonData"));
    // this.chartOptions1 = this.getChartOptions();

    this.incidentId = localStorage.getItem("incident");

    this.lang = this.translationService.getSelectedLanguage();

    this.paginationConfig = {
      itemsPerPage: 5,
      currentPage: 0,
      totalItems: 0,
    };
  }

  async ngOnInit() {
    _.isEmpty(this.incidentId)
      ? this.openAlertDialog()
      : await this.loadPrivatePositionData(this.incidentId);
  }

  prepareInjuryData(statistics) {}

  async ngAfterViewInit() {
    // this.openAlertDialog();
  }
  private workLogs = [];
  public workLogs$ = new BehaviorSubject<any[]>([]);
  private workLogsPageIndex = 0;
  private workLogsCompleted = false;
  private initLogs() {
    this.workLogs = [];
    this.workLogsPageIndex = 0;
    this.workLogsCompleted = false;
  }
  async _nextWorkLogPage() {
    if (this.workLogsCompleted) {
      return;
    }
    await this.incidentservice
      .getWorkLogsDs(this.incidentId, "", "desc", this.workLogsPageIndex, 20)
      .pipe(
        map((r) => r.result),
        tap((page) => {
          this.workLogs.push(...page.content);
          this.workLogs$.next(this.workLogs);
          this.workLogsCompleted = page.content?.length == 0;
        })
      )
      .toPromise();
    this.workLogsPageIndex++;
  }

  async loadPrivatePositionData(incId) {
    this.incidentId = incId;
    this.incidentservice.viewIncidents(this.incidentId).subscribe(
      (data) => {
        if (data) {
          this.incidents = data.result;
          this.mapConfig$.next({
            ...this.mapConfigState,
            zoomModel: {
              referenceId: this.incidents?.id,
              featureName: this.incidents?.featureName,
            },
          });
          this.hospitalInfo = data.result.incidentHospitals;
          this.challenge = data.result.incidentsChallengesReqs;
          this.cd.detectChanges();
          this.getOrgName();
        }
      },
      (error) => {}
    );

    this.incidentservice
      .getIncidentTasks(this.incidentId, this.paginationConfig)
      .subscribe(
        (data) => {
          if (data) {
            this.incidentTasks = data.result.content;
            this.paginationConfig.totalItems = data.result.totalElements;
            this.cd.markForCheck();
          }
        },
        (error) => {}
      );

    this.initLogs();
    await this._nextWorkLogPage();
    // this.incidentservice
    //   .getWorkLogsDs(this.incidentId, "", "desc", 0, 50)
    //   .subscribe(
    //     (data) => {
    //       if (data) {
    //         this.workLogs = data.result["content"];
    //         this.cd.markForCheck();
    //       }
    //     },
    //     (error) => {}
    //   );

    this.incidentservice.getIncidentFiles(this.incidentId).subscribe(
      (data) => {
        if (data) {
          this.fileInfos = data.result;
          this.cd.markForCheck();
        }
      },
      (error) => {}
    );

    this.incidentservice.getTaskTypes().subscribe(
      (data) => {
        if (data) {
          this.taskTypes = data.result;
        }
      },
      (error) => {}
    );

    await this.loadAssetsStatistics();

    let statistics = this.prepareHospitalsData();

    let total =
      statistics.majorInjuries[2] +
      statistics.normalInjuries[2] +
      statistics.minorInjuries[2];
    this.stats["normal"] = (statistics.normalInjuries[2] / total) * 100;
    this.stats["minor"] = (statistics.minorInjuries[2] / total) * 100;
    this.stats["major"] = (statistics.majorInjuries[2] / total) * 100;

    let array = [
      statistics.majorInjuries,
      statistics.normalInjuries,
      statistics.minorInjuries,
    ];
    this.totalInjuries = array.reduce(
      (r, a) => a.map((b, i) => (r[i] || 0) + b),
      []
    );

    await this.cart(statistics);
  }

  openAlertDialog() {
    const dialogRef = this.dialog.open(SelectDialogComponent, {
      data: {
        message: "HelloWorld",
        buttonText: {
          cancel: "Done",
        },
      },
    });

    dialogRef.afterClosed().subscribe((incId) => {
      this.loadPrivatePositionData(incId);
      //  console.log('The dialog was closed', incId);
    });
  }

  async cart(statistics) {
    this.loading = true;

    // console.log("44",statistics,this.translationService.getSelectedLanguage(),this.translationService.get('INCIDENTS.DATE'),this.translationService.get("INCIDENTS.MEN"))

    this.chartOptions4 = {
      series: [
        {
          name: "Injuries",
          data: this.totalInjuries,
        },
      ],
      chart: {
        type: "line",
        height: 150,
        toolbar: {
          tools: {
            download: false,
          },
          show: false,
        },
      },
      tooltip: {
        enabled: false,
        enabledOnSeries: undefined,
        marker: {
          show: false,
        },
      },
      fill: {
        colors: ["#8950fc"],
      },
      stroke: {
        curve: "straight",
        width: 2,
      },
      title: {
        text: "Injuries",
        align: "left",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          show: true,
        },
        axisBorder: {
          show: false,
        },
        // show:false
      },

      yaxis: {
        labels: {
          show: false,
        },
        show: false,
      },
    };

    this.chartLineSparkline4Options = {
      series: [
        {
          name: "chart-line-sparkline",
          data: this.randomizeArray(sparkLineData.slice(0, 10)),
        },
      ],
      colors: ["#8950fc"],
      title: {
        text: "$424,652",
        offsetX: 0,
        style: {
          fontSize: "24px",
        },
      },
      subtitle: {
        text: "Sales",
        offsetX: 0,
        style: {
          fontSize: "14px",
        },
      },
    };

    this.chartAreaSparkline3Options = {
      series: [
        {
          name: "chart-big-sparkline",
          data: this.randomizeArray(sparkLineData),
        },
      ],
      chart: {
        type: "area",
        height: 250,
        toolbar: {
          tools: {
            download: false,
          },
          show: false,
        },
      },
      title: {
        text: "120,23",
        offsetX: 0,
        style: {
          fontSize: "24px",
          fontWeight: "bold",
        },
      },
      subtitle: {
        text: "category",
        offsetX: 0,
        style: {
          fontSize: "14px",
        },
      },
      stroke: {
        width: 1,
        colors: ["#4FD7BF"],
      },
      fill: {
        colors: ["#4FD7BF"],
      },
    };
    this.chartOptions5 = {
      series: [
        {
          name: "",
          data: [519, 384, 123],
        },
      ],
      chart: {
        type: "bar",
        height: 180,
        toolbar: {
          tools: {
            download: false,
          },
        },
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "40%",
          distributed: true,
          endingShape: "rounded",
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 10,
        style: {
          fontSize: "8px",
          colors: ["#000"],
        },
      },
      fill: {},
      xaxis: {
        categories: [
          this.translationService.get("INCIDENTS.MEN"),
          this.translationService.get("INCIDENTS.WOMEN"),
          this.translationService.get("INCIDENTS.CHILDREN"),
        ],
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },

      yaxis: {
        labels: {
          show: false,
        },
        show: false,
      },

      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 0,
        fontSize: "10px",
      },
    };

    this.chartOptions6 = {
      series: [
        {
          name: "Injuries",
          data: this.totalInjuries,
        },
      ],
      chart: {
        type: "area",
        height: 200,
        toolbar: {
          tools: {
            download: false,
          },
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["8950fc"],
      },
      tooltip: {
        enabled: false,
        enabledOnSeries: undefined,
        marker: {
          show: false,
        },
      },
      fill: {
        colors: ["#8950fc"],
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },

      xaxis: {
        labels: {
          show: true,
        },
        axisBorder: {
          show: false,
        },
        // show:false
      },

      yaxis: {
        labels: {
          show: false,
        },
        show: false,
      },
    };

    this.chartOptions7 = {
      series: [
        {
          name: this.translationService.get("INCIDENTS.NO_OF_INJURIES"),
          data: [_.sum(this.totalInjuries)],
        },
        {
          name: this.translationService.get("INCIDENTS.RECOVERED"),
          data: [32],
        },
        {
          name: this.translationService.get("INCIDENTS.NO_OF_DEATHS"),
          data: [_.sum(statistics.deaths)],
        },
        {
          name: this.translationService.get("INCIDENTS.REPORTED"),
          data: [25],
        },
      ],
      chart: {
        type: "bar",
        height: 130,
        stacked: true,
        toolbar: {
          tools: {
            download: false,
          },
          show: false,
        },
        stackType: "100%",
      },
      fill: {},
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "15%",
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        // show:false
      },

      yaxis: {
        labels: {
          show: false,
        },
        show: false,
      },
      legend: {
        fontSize: "10px",
      },
    };

    this.chartOptions8 = {
      series: [
        {
          name: this.translationService.get("INCIDENTS.NO_OF_INJURIES"),
          data: statistics.normalInjuries,
        },
        {
          name: this.translationService.get("INCIDENTS.NO_OF_DEATHS"),
          data: statistics.deaths,
        },
        {
          name: this.translationService.get("INCIDENTS.RECOVERED"),
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
        },
      ],
      chart: {
        type: "line",
        height: 160,
        toolbar: {
          tools: {
            download: false,
          },
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        curve: "straight",
        colors: ["#8950fc", "#e19525", "#1bc5bd"],
        // dashArray: [0, 8, 5]
      },
      fill: {},
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        // show:false
      },

      yaxis: {
        labels: {
          show: false,
        },
        show: false,
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      legend: {
        fontSize: "10px",
      },
    };

    this.chartOptions9 = {
      series: [76],
      chart: {
        type: "radialBar",
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            strokeWidth: "0%",
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: "16px",
            },
          },
        },
      },
      stroke: {
        lineCap: "round",
      },

      fill: {
        colors: ["#FF0000"],
      },
      labels: ["Average Results"],
    };

    this.loading = false;
    this.cd.detectChanges();
  }

  async loadAssetsStatistics() {
    const statistics = (await this.assetService
      .statistics()
      .pipe(map((r) => r.result))
      .toPromise()) as {
      category: string;
      nameAr: string;
      nameEn: string;
      quantity: number;
    }[];
    this.cd.detectChanges();
  }

  getOrgName() {
    this.Sorg = [];
    this.incidents.incidentOrgs.forEach((element) => {
      if (element.isMain && element.isMain == true) {
        this.lang === "en"
          ? (this.Porg = element.orgStructure.nameEn)
          : (this.Porg = element.orgStructure.nameAr);
      } else {
        this.Sorg.push(element);
      }
    });
  }

  prepareHospitalsData(): statistics {
    let statistics: statistics = {
      deaths: new Array(12).fill(0),
      majorInjuries: new Array(12).fill(0),
      minorInjuries: new Array(12).fill(0),
      normalInjuries: new Array(12).fill(0),
    };

    this.hospitalInfo.forEach((hospital: any) => {
      let month = new Date(hospital.logDate).getMonth();

      if (!month) {
        month = new Date().getMonth();
      }

      statistics.deaths[month] += hospital.deaths;
      statistics.majorInjuries[month] += hospital.majorInjuries;
      statistics.minorInjuries[month] += hospital.minorInjuries;
      statistics.normalInjuries[month] += hospital.normalInjuries;
    });

    return statistics;
  }

  getChartOptions() {
    const strokeColor = "#D13647";

    const lbs =
      this.lang === "en"
        ? ["Normal", "Minor", "Serious"]
        : ["اصابات متوسطة", "اصايات بسيطة", "اصابات بليغة"];

    return {
      series: [10, 57, 39],
      chart: {
        width: "100%",
        type: "pie",
      },
      labels: lbs,
      legend: {
        position: "bottom",
      },
      theme: {
        monochrome: {
          enabled: true,
        },
      },
      title: {
        text: "Number of Injuries",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
  }

  createTask() {
    this.router.navigate(["incidents/createTask"]);
  }

  createTasks(id) {
    this.router.navigate(["incidents/createTask", { title: "any", id: id }]);
  }

  updateTask(id) {
    this.router.navigate(["incidents/updateTask", id]);
  }

  viewTask(id) {
    this.router.navigate(["incidents/viewTask", id]);
  }

  getPriorityNameId(id) {
    const priority = _.find(this.commonData.priorities, ["id", id]);
    if (!_.isEmpty(priority)) {
      return this.lang === "en" ? priority.nameEn : priority.nameAr;
    } else {
      return "";
    }
  }

  getLevelId(id) {
    const level = _.find(this.commonData.emergencyLevels, ["id", id]);
    if (!_.isEmpty(level)) {
      return level.level;
    } else {
      return "";
    }
  }
  getStatusId(id) {
    const status = _.find(this.commonData.incidentStatus, ["id", id]);
    if (!_.isEmpty(status)) {
      return this.lang === "en" ? status.nameEn : status.nameEn;
    } else {
      return "";
    }
    //return 'abc';
  }

  getcityId(id) {
    const city = _.find(this.commonData.cities, ["id", id]);
    if (!_.isEmpty(city)) {
      return this.lang === "en" ? city.nameEn : city.nameEn;
    } else {
      return "";
    }
  }

  getTaskPriorityNameId(id) {
    if (!_.isEmpty(this.commonData)) {
      const priority = _.find(this.commonData.priorities, ["id", id]);

      if (priority.nameEn == "Urgent" || priority.nameEn == "Critical") {
        this.ProBackstyle =
          "text-dark font-weight-500 label label-lg label-danger label-inline";
      } else if (priority.nameEn == "Medium") {
        this.ProBackstyle =
          "text-dark font-weight-500 label label-lg label-light-warning label-inline";
      } else {
        this.ProBackstyle =
          "text-dark font-weight-500 label label-lg label-light-primary label-inline";
      }

      return this.lang === "en" ? priority.nameEn : priority.nameAr;
    }
  }

  getTaskStatusId(id) {
    if (!_.isEmpty(this.commonData)) {
      const status = _.find(this.commonData.taskStatus, ["id", id]);
      return this.lang === "en" ? status.nameEn : status.nameAr;
    }
    //return 'abc';
  }

  getTaskTypeId(id) {
    if (!_.isEmpty(this.taskTypes)) {
      const task = _.find(this.taskTypes, ["id", id]);
      return this.lang === "en" ? task.nameEn : task.nameAr;
    }
    //return 'abc';
  }

  public generateData(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  public generateDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([baseval, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  public randomizeArray(arg): number[] {
    var array = arg.slice();
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  ngOnDestroy() {
    localStorage.removeItem("incident");
  }
}
