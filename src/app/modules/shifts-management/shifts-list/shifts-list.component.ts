import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'stompjs';
import { TranslationService } from '../../i18n/translation.service';
import { ShiftManagmentService } from '../shift-managment.service';

@Component({
  selector: 'app-shifts-list',
  templateUrl: './shifts-list.component.html',
  styleUrls: ['./shifts-list.component.scss']
})
export class ShiftsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private subscriptions: Subscription[] = [];
  search: string = '';
  pageSize = 10;
  pageIndex = 0;
  totalElements = 100;
  displayedColumns: string[] = [
    "UserName",
    "Organization",
    "JobTitle",
    "LoginTime",
    "logoutTime",
    "Status"
  ];

  DialogRef: MatDialogRef<any>;
  private sortState;
  private paginationState: PageEvent;
  @ViewChild(MatSort) sort: MatSort;

  paginationConfig = {
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 0,
    id: "paging",
  };

  loading = true;
  dataSource = new MatTableDataSource<any>([]);
  lang = "en";
  onDuty: false;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  constructor(    private translationService: TranslationService,   private shiftService:ShiftManagmentService ,) { }

  async ngOnInit(): Promise<void>  {
    this.lang = this.translationService.getSelectedLanguage();


    this.setTableData('', 1, 10);

  }
  setTableData(name, page, size) {
    this.shiftService.getShiftReport(name, page, size).subscribe((shift=>{
      this.loading = false;
      let report = shift.content.map((data)=> {
        return data;
      });

      this.dataSource.data = report;


      this.paginationConfig = {
        itemsPerPage: shift.itemsPerPage,
    currentPage: shift.currentPage + 1,
    totalItems: shift.totalItems,
    id: "paging",
      }

    }));
  }

  onChangeTable(e) {

    const {pageSize, pageIndex} =e;
    this.setTableData('', pageIndex + 1, pageSize);

  }


  //  sort: { active: string; direction: "asc" | "desc" } = {
  //   active: "userName",
  //   direction: "desc",
  // };
  sortChange(event) {
    this.sort = event;
    this.onPagination({
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      length: 10,
    });
  }



  pageChanged(event) {


    this.setTableData('', event, 10);
  }
  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.setTableData(filterValue, 1, 10);
  }

  // sortChange(event) {
  //   this.sortState = event;
  //   this.onPagination(this.paginationState);
  // }


  async onPagination(event: PageEvent) {
    this.pageIndex = event.pageIndex;


    // let response = await this.smsReportService
    //   .getShiftReport(
    //     'test', TranslationModule
    //    )
    //   .toPromise();
    // this.pageSize = response.result.size;
    // this.totalElements = response.result.totalElements;
    // this.dataSource.data = (<any[]>response.result.content).map((r) => {
    //   r.status = this.?.find((s) => s.userName == r.user.userName);
    //   return { ...r.userName, ...r } as any;
    // });
    // this.cdr.detectChanges();
    // return response;
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
