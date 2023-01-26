import { MatPaginator } from "@angular/material/paginator";
import { KpiModalComponent } from "./kpi-modal/kpi-modal.component";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { EventsManagementService } from "./../../events-management.service";
import { IncidentsCategoryModel } from "./../incidents-categories/incidents-category-model";
import { MatDialogRef } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "./../../../../shared/components/confirm-dialog/confirm-dialog.component";
import { IncidentsCategoriesModalComponent } from "./../incidents-categories/incidents-categories-modal/incidents-categories-modal.component";
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
// import { KpiModel } from './kpi-modal';

@Component({
  selector: "app-kpi",
  templateUrl: "./kpi.component.html",
  styleUrls: ["./kpi.component.scss"],
})
export class KpiComponent implements OnInit, AfterViewInit, OnDestroy {
  DialogRef: MatDialogRef<any>;

  data: any[];
  displayedColumns: string[] = [
    "id",
    "nameAr",
    "nameEn",
    "descriptionAr",
    "descriptionEn",
    "isActive",
    "actions",
  ];

  dataSource: any;
  currentItem: any;

  itemView = false;
  itemChildrenView = false;

  loading = true;

  constructor(
    private _service: EventsManagementService,
    public _matDialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}

  //MatPaginator is keyword here
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this._service.controllers["kpi"].onValueChanged.subscribe((data) => {
      this.loading = false;
      this.data = data;
      this.dataSource.data = this.data;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  private destroy$ = new Subject();
  ngOnDestroy(): void {
    this.destroy$.next();
  }
  openModal(type, id) {
    this.DialogRef = this._matDialog.open(KpiModalComponent, {
      disableClose: false,
      panelClass: "modal",
      data: {
        type: type,
        id: id,
        parentId: this.itemView ? this.currentItem["id"] : null,
      },
    });
    this.DialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (_) => {
        if (_.reload) {
          this._service.changeCurrentTab$.next(true);
          try {
            await this._service.resolve();
          } catch {}
          this.ngOnInit();
          this.viewList();
          this._service.changeCurrentTab$.next(false);
        }
      });
  }

  // deleteItem(item) {
  //   this.DialogRef = this._matDialog.open(ConfirmDialogComponent, {
  //     disableClose: false,
  //     panelClass: "modal",
  //   });

  //   this.DialogRef.componentInstance.confirmMessage = "GENERAL.DELETE_CONFIRM";
  //   this.DialogRef.componentInstance.icon = "error_outline";
  //   this.DialogRef.componentInstance.actionName = "ACTIONS.DELETE";

  //   this.DialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       item["isActive"] = false;
  //       this._service.updateKpi(item);
  //     }
  //     this.DialogRef = null;
  //   });
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  pageChanged(event) {}

  viewItem(item) {
    // this.loading = true;
    // this.currentItem = item;

    // this._service.getIncidintCategoryChildren(item.id).finally(() => {
    //   this.itemView = true;
    //   setTimeout(() => {
    //     this.loading = false;
    //     this.cd.detectChanges();
    //   }, 300);
    // });

    this.loading = true;
    this.currentItem = item;
    this.dataSource.data = this.data.filter((c) => c.parent?.id == item.id);
    this.dataSource.paginator = this.paginator;
    setTimeout(() => {
      this.itemView = true;
      this.itemChildrenView = true;
      this.loading = false;
      this.cd.detectChanges();
    }, 300);
  }

  // viewList() {
  //   this.loading = true;
  //   this._service.getkpis().finally(() => {
  //     this.itemView = false;
  //     this.currentItem = null;
  //     setTimeout(() => {
  //       this.loading = false;
  //     }, 300);
  //   });
  // }

  viewList() {
    this.loading = true;
    this.currentItem = null;
    this.dataSource.data = this.data.filter((c) => !c.parent);
    this.dataSource.paginator = this.paginator;
    setTimeout(() => {
      this.loading = false;
      this.itemView = false;
      this.itemChildrenView = false;
      this.cd.detectChanges();
    }, 300);
  }
}
