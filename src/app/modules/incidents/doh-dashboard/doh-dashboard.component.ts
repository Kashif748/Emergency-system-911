import { TranslationService } from "./../../i18n/translation.service";
import { MatPaginator } from "@angular/material/paginator";
import { IncidentsService } from "./../../../_metronic/core/services/incidents.service";
import { MatTableDataSource } from "@angular/material/table";
import { BedModal, DohModal, EventInfoModal } from "./doh-modal";
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-doh-dashboard",
  templateUrl: "./doh-dashboard.component.html",
  styleUrls: ["./doh-dashboard.component.scss"],
})
export class DohDashboardComponent implements OnInit {
  data: DohModal[];
  dataBed: BedModal[];
  dataShared: EventInfoModal[];

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("bedPaginator") bedPaginator: MatPaginator;
  @ViewChild("sharedPaginator") sharedPaginator: MatPaginator;

  constructor(
    private _service: IncidentsService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();

    this.dataSource = new MatTableDataSource(this.data);
    this.dataSourceBED = new MatTableDataSource(this.dataBed);
    this.dataSourceSHARED = new MatTableDataSource(this.dataShared);

    this._service.onDohDataChange.subscribe((data) => {
      this.data = data;
      this.dataSource.data = this.data;
    });

    this._service.onBedDataChange.subscribe((data) => {
      this.dataBed = data;
      this.dataSourceBED.data = this.dataBed;
    });

    this._service.onSharedDataChange.subscribe((data) => {
      this.dataShared = data;
      this.dataSourceSHARED.data = this.dataShared;
    });
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

  pageChanged(event) {}
}
