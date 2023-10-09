import { AfterViewInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ILangFacade } from "@core/facades/lang.facade";
import { map } from "rxjs/operators";
import { ConfirmDialogComponent } from "src/app/modules/confirm-dialog/confirm-dialog.component";
import { EventsManagementService } from "../../events-management.service";
import { NavigationModalComponent } from "./navigation-modal/navigation-modal.component";
import { NavigationItem } from "./navigation.model";

@Component({
  selector: "app-navigations",
  templateUrl: "./navigations.component.html",
  styleUrls: ["./navigations.component.scss"],
})
export class NavigationsComponent implements OnInit, AfterViewInit {
  DialogRef: MatDialogRef<any>;
  enquiry_Array: string[] = [
    "SCADDASH",
    "COMPRO",
    "PERINFO",
    "DOHDASH",
    "ADNOCDASH",
    "ADPDASH",
    "DMTDASH",
    "DOEDASH",
    "TADWEER",
    "ADPORTS",
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  data: NavigationItem[];
  displayedColumns: string[] = [
    "icon",
    "nameAR",
    "nameEN",

    "isPublic",

    "code",
    "active",
    "modules",
    "actions",
  ];
  dir$ = this.langFacade.vm$.pipe(map((s) => s.ActiveLang.dir));

  dataSource = new MatTableDataSource<NavigationItem>();

  currentItem: any;

  itemView = false;
  loading = false;

  constructor(
    private _service: EventsManagementService,
    public _matDialog: MatDialog,
    private cd: ChangeDetectorRef,
    private langFacade: ILangFacade,

  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this._service.onNavigationsChange.subscribe((data) => {

      this.data = data;
      this.dataSource.data = this.data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  openModal(type, element) {
    this.DialogRef = this._matDialog.open(NavigationModalComponent, {
      disableClose: false,
      panelClass: "navigation-modal",
      width: "650px",
      data: {
        type: type,
        ...element,
      },
    });
  }

  deleteReport(element) {
    this.DialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false,
      panelClass: "modal",
    });

    this.DialogRef.componentInstance.confirmMessage = "GENERAL.DELETE_CONFIRM";
    this.DialogRef.componentInstance.icon = "error_outline";
    this.DialogRef.componentInstance.actionName = "ACTIONS.DELETE";

    this.DialogRef.afterClosed().subscribe((result) => {
      if (result) {
        element["active"] = false;

        this._service.updateNavigationItem(element);
      }
      this.DialogRef = null;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewItem(item) {
    if (!item.modules || item.modules.length == 0) return;

    this.loading = true;
    this.currentItem = item;

    this.dataSource.data = item.modules;
    this.itemView = true;
    setTimeout(() => {
      this.loading = false;
      this.cd.detectChanges();
    }, 600);
  }

  viewList() {
    this.loading = true;
    this.dataSource.data = this.data;
    this.itemView = false;
    this.currentItem = null;
    setTimeout(() => {
      this.loading = false;
      this.cd.detectChanges();
    }, 600);
  }

  isEnquiry(code): boolean {
    return this.enquiry_Array.includes(code) ? true : false;
  }
}
