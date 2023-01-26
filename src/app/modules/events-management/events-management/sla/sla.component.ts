import { MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { EventsManagementService } from "./../../events-management.service";
import { SlaModalComponent } from "./sla-modal/sla-modal.component";
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import { IStorageService } from "src/app/core/services/storage.service";
import { TranslationService } from "src/app/modules/i18n/translation.service";
import * as _ from "lodash";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-sla",
  templateUrl: "./sla.component.html",
  styleUrls: ["./sla.component.scss"],
})
export class SlaComponent implements OnInit, AfterViewInit, OnDestroy {
  DialogRef: MatDialogRef<any>;
  commonData: any;
  lang = "en";

  data: any[];
  displayedColumns: string[] = [
    "id",
    "contractNo",
    "contractExpiry",
    // "kpi",
    "center",
    "isActive",
    "actions",
  ];

  dataSource: any;
  currentItem: any;

  itemView = false;
  loading = true;

  constructor(
    private _service: EventsManagementService,
    public _matDialog: MatDialog,
    private translationService: TranslationService
  ) {
    this.commonData = JSON.parse(localStorage.getItem("commonData"));
  }
  private destroy$ = new Subject();
  ngOnDestroy(): void {
    this.destroy$.next();
  }
  //MatPaginator is keyword here
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.dataSource = new MatTableDataSource(this.data);
    this._service.controllers["sla"].onValueChanged.subscribe((data) => {
      this.loading = false;
      this.data = data;
      this.dataSource.data = this.data;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openModal(type, id) {
    this.DialogRef = this._matDialog.open(SlaModalComponent, {
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
        this._service.changeCurrentTab$.next(true);
        try {
          await this._service.resolve();
        } catch {}
        this.ngOnInit();
        this.viewList();
        this._service.changeCurrentTab$.next(false);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  pageChanged(event) {}

  viewItem(item) {}

  viewList() {}
}
