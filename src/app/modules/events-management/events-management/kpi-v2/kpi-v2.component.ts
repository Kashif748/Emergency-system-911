import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { KpiV2Service } from '@core/api/services/kpi-v2.service';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  skip,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { KbiV2ModalComponent } from './kbi-v2-modal/kbi-v2-modal.component';
import { KpiPrioritiesModalComponent } from './kpi-priorities-modal/kpi-priorities-modal.component';

@Component({
  selector: 'app-kpi-v2',
  templateUrl: './kpi-v2.component.html',
  styleUrls: ['./kpi-v2.component.scss'],
})
export class KpiV2Component implements OnInit {
  constructor(
    public matDialog: MatDialog,
    private kpiV2Service: KpiV2Service,
    private cd: ChangeDetectorRef
  ) {
    this.paginationState = {
      pageIndex: 0,
      pageSize: 20,
      length: 0,
      previousPageIndex: 0,
    };
  }
  // MatPaginator is keyword here
  @ViewChild(MatPaginator) paginator: MatPaginator;
  DialogRef: MatDialogRef<any>;
  itemView = false;
  displayedColumns: string[] = [
    'id',
    'nameAr',
    'nameEn',
    'version',
    'isActive',
    'actions',
  ];
  data: any[];

  dataSource: any;
  currentItem: any;
  loading = true;

  paginationState: PageEvent;

  filterControl = new FormControl('');
  private destroy$ = new Subject();

  ngOnInit(): void {
    this.kpiV2Service.getAllKpiV2(this.paginationState);

    this.kpiV2Service.onKpisV2.pipe(skip(1)).subscribe((data: any) => {
      this.loading = false;
      this.data = data;
      this.dataSource = new MatTableDataSource(this.data);
      this.cd.detectChanges();
    });

    this.filterControl.valueChanges
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe((data) => {
        this.loading = true;
        this.kpiV2Service.getAllKpiV2(this.paginationState, data);
      });

    this.kpiV2Service.onPaginationConfigChange
      .pipe(
        tap((config) => {
          this.paginationState = config;
        })
      )
      .subscribe();
  }

  openModal(type, id) {
    this.DialogRef = this.matDialog.open(KbiV2ModalComponent, {
      disableClose: false,
      panelClass: 'modal',
      data: {
        type,
        id,
      },
    });
    this.DialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (_) => {
        if (_?.reload) {
          this.loading = true;
          this.kpiV2Service.getAllKpiV2(this.paginationState);
        }
      });
  }

  showKpiPriorities(element) {
    this.DialogRef = this.matDialog.open(KpiPrioritiesModalComponent, {
      disableClose: false,
      panelClass: 'modal',
      maxWidth: '600px',
      width: '600px',
      data: {
        kpi: element,
      },
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onPagination(event: PageEvent) {
    this.loading = true;
    this.kpiV2Service.getAllKpiV2(event);
  }

  sortData(event: Sort) {
    console.log(event);
    this.loading = true;
    this.paginationState.pageIndex = 0;
    this.kpiV2Service.getAllKpiV2(this.paginationState, '', event);
  }
}
