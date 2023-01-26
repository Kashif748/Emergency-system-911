import { DatePipe } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

import {
  DmtFilter,
  DmtService,
  Inspection,
  InspectionCount,
} from "@core/api/services/dmt.service";

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
  selector: "app-dmt-dashboard",
  templateUrl: "./dmt-dashboard.component.html",
  styleUrls: ["./dmt-dashboard.component.scss"],
})
export class DmtDashboardComponent implements OnInit, AfterViewInit {
  public loading = true;
  public columns: string[] = [
    "applicationNumber",
    "onlineNumber",
    "inspectionDate",
    "inspectionStatusName",
    "inspectorName",
    // "workflowInstanceId",
    "workflowName",
    "startDate",
    "completeDate",
    "applicationStatus",
    "municipality",
    "serviceCenter",
    "department",
    "checkItemName",
  ];

  public categories = [
    "بلدية مدينة العين",
    "بلدية مدينة أبوظبي",
    "بلدية منطقة الظفرة",
  ];

  public workFLow = ["مخالفات قانون المظهر العام وقانون البناء"];

  public inspectionStatus = [
    "مكتمل",
    "مطلوب المشرف مزيد من التفاصيل",
    "مرفوضة",
    "تحت الإجراء",
  ];

  public chart1options: Partial<ChartOptions>;
  public chart2options: Partial<ChartOptions>;
  public chart3options: Partial<ChartOptions>;
  public chart4options: Partial<ChartOptions>;

  public totalElements;
  public dataSource = new MatTableDataSource<Inspection>();

  public responseData1: any;
  public responseData2: any;
  public responseData3: any;
  public responseData4: any;
  public responseData5: any;
  public responseData6: any;
  public responseData7: any;
  public responseData8: any;

  public totalTest: any = [];
  constructor(
    private dmtService: DmtService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {}
  ngAfterViewInit(): void {}

  public form: FormGroup;
  private buildForm(): FormGroup {
    let form = this.formBuilder.group({
      endStartDate: [],
      fromStartDate: [],
      inspectionEndDate: [],
      inspectionStartDate: [],
      inspectionStatus: [],
      municipality: [],
      workflowName: [],
      categories: [],
    });
    return form;
  }
  async ngOnInit(): Promise<void> {
    this.form = this.buildForm();
    this.loading = true;
    this.cdr.detectChanges();

    this.dmtService
      .requestDataFromMultipleSources()
      .subscribe(async (responseList) => {
        this.responseData1 = await responseList[0].result;
        this.responseData2 = await responseList[1].result;
        this.responseData3 = await responseList[2].result;

        this.responseData4 = await responseList[3].result;
        this.responseData5 = await responseList[4].result;
        this.responseData6 = await responseList[5].result;
        this.responseData7 = await responseList[6].result;

        this.responseData8 = await responseList[7].result;

      });

    let result = await this.dmtService
      .getAllFilter({ page: 0, size: 50 }, {})
      .toPromise();
    this.dataSource.data = result.content;
    this.totalElements = result.totalElements;

    await this.loadMore();

    await this.initiatChart1();
    await this.initiatChart2();
    await this.initiatChart3();
    await this.initiatChart4();
    this.loading = false;
    this.cdr.detectChanges();
  }

  private filterAndCountPageIndex = 0;
  private filterAndCountData: InspectionCount[] = [];
  public filterAndCountData$ = new BehaviorSubject<InspectionCount[]>(
    this.filterAndCountData
  );

  private filter: DmtFilter = {};
  public async clear() {
    this.form.reset();
    this.form.updateValueAndValidity();
    await this.search();
  }

  public async search() {
    let filter = {
      ...this.form.value,
      fromStartDate:
        this.form?.value?.fromStartDate?.toLocaleDateString("en-CA"),
      endStartDate: this.form?.value?.endStartDate?.toLocaleDateString("en-CA"),
      inspectionEndDate:
        this.form?.value?.inspectionEndDate?.toLocaleDateString("en-CA"),
      inspectionStartDate:
        this.form?.value?.inspectionStartDate?.toLocaleDateString("en-CA"),
    } as DmtFilter;
    this.filter = {};
    Object.keys(filter).forEach((k) => {
      if (filter[k]) {
        this.filter[k] = filter[k];
      }
    });
    this.filterAndCountData = [];
    this.filterAndCountPageIndex = 0;
    await this.loadMore();
    await this.pageChanged({
      pageSize: this.pageSize,
      pageIndex: 0,
      length: this.totalElements,
    });
  }

  public async loadMore() {
    let result = await this.dmtService
      .getAllFilterAndCount(
        { page: this.filterAndCountPageIndex, size: 50 },
        this.filter
      )
      .pipe(map((r) => r.content))
      .toPromise();

    if (result) {
      // console.log(result , "fgff")
      this.filterAndCountData.push(...result);
      this.filterAndCountData$.next(this.filterAndCountData);
      this.filterAndCountPageIndex++;
    }
  }

  public pageIndex = 0;
  public pageSize = 50;
  async pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loading = true;
    this.cdr.detectChanges();
    let result = await this.dmtService
      .getAllFilter(
        { page: event.pageIndex, size: event.pageSize },
        this.filter
      )
      .toPromise();
    this.dataSource.data = result.content;
    this.totalElements = result.totalElements;
    this.loading = false;

    this.cdr.detectChanges();
  }

  async initiatChart1() {
    this.chart1options = {
      series: [
        {
          data: [this.responseData1, this.responseData2, this.responseData3],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "بلدية مدينة العين",
          "بلدية مدينة أبوظبي",
          "بلدية منطقة الظفرة",
        ],
      },
    };
  }

  async initiatChart2() {
    this.chart3options = {
      series: [
        {
          name: "مكتمل",
          data: [this.responseData4],
        },
        {
          name: "مطلوب المشرف مزيد من التفاصيل",
          data: [this.responseData5],
        },
        {
          name: "مرفوضة",
          data: [this.responseData6],
        },
        {
          name: "تحت الإجراء",
          data: [this.responseData7],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "Inspection",
      },
      xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        labels: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    };
  }

  async initiatChart3() {
    const municipalityCount =
      this.responseData1 + this.responseData2 + this.responseData3;
    const inspectionCount =
      this.responseData4 +
      this.responseData5 +
      this.responseData6 +
      this.responseData7;
    const WorkflowCount = this.responseData8;

    this.chart2options = {
      series: [municipalityCount, inspectionCount, WorkflowCount],
      labels: ["Municipality", "InspectionStatus", "workflowCount"],
      chart: {
        type: "donut",
      },
      legend: {
        position: "bottom",
      },
    };
  }

  async initiatChart4() {
    this.chart4options = {
      series: [
        {
          name: "مخالفات قانون المظهر العام وقانون البناء",
          data: [this.responseData8],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["مخالفات قانون المظهر العام وقانون البناء"],
      },
      yaxis: {
        title: {
          text: "workflow",
        },
      },
      fill: {
        opacity: 1,
      },
    };
  }
}
