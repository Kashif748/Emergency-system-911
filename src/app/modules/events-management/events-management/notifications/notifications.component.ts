import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EventsManagementService } from '../../events-management.service';
import { NotificationsModalComponent } from './notifications-modal/notifications-modal.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  DialogRef: MatDialogRef<any>;

  data: any[];
  displayedColumns: string[] = [
    'id',
    'code',
    'name',
    'lastModified',
    'active',
    'actions',
  ];

  dataSource: any;
  currentItem: any;
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
    this._service.getNotifications('0', '20').subscribe((response) => {
      if (response && response['status']) {
        this.data = response['result']?.content;
        this.dataSource.data = this.data;
        this.paginator.length = response['result']?.totalElements;
      }
      this.loading = false;
    });
  }

  pageChange(event: PageEvent): void {
    this._service
      .getNotifications(event.pageIndex.toString(), event.pageSize.toString())
      .subscribe((response) => {
        if (response && response['status']) {
          this.data = response['result']?.content;
          this.dataSource.data = this.data;
        }
      });
  }

  openModal(type, item) {
    this.DialogRef = this._matDialog.open(NotificationsModalComponent, {
      disableClose: false,
      panelClass: 'modal',
      data: {
        type: type,
        item: item,
      },
    });
    this.DialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loading = true;
        this._service.getNotifications( this.paginator.pageIndex.toString(), '20').subscribe((response) => {
          if (response && response['status']) {

            this.data = response['result']?.content;
            this.dataSource.data = this.data;
          }
          this.loading = false;
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
