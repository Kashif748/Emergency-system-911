import { RanksModalComponent } from './ranks-modal/ranks-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { EventsManagementService } from "./../../events-management.service";
import { MatDialogRef } from "@angular/material/dialog";
import { Component, OnInit, ChangeDetectorRef, AfterViewInit ,ViewChild} from "@angular/core";

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.component.html',
  styleUrls: ['./ranks.component.scss']
})
export class RanksComponent implements OnInit , AfterViewInit  {
  DialogRef: MatDialogRef<any>;

  data: any[];
  displayedColumns: string[] = [
    "id",
    "nameAr",
    "nameEn",
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
    private cd: ChangeDetectorRef
  ) {}

    //MatPaginator is keyword here
    @ViewChild(MatPaginator) paginator: MatPaginator; 
    
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this._service.onRanksChange.subscribe((data) => {
      this.loading = false;
      this.data = data;
      this.dataSource.data = this.data;
    });
  }

  ngAfterViewInit(): void {   
     this.dataSource.paginator = this.paginator;
  }

  openModal(type, id) {
    this.DialogRef = this._matDialog.open(RanksModalComponent, {
      disableClose: false,
      panelClass: "modal",
      data: {
        type: type,
        id: id,
        parentId: this.itemView ? this.currentItem["id"] : null,
      },
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  pageChanged(event) {
  }

  viewItem(item) {
    this.loading = true;
    this.currentItem = item;

    this._service.getIncidintCategoryChildren(item.id).finally(() => {
      this.itemView = true;
      setTimeout(() => {
        this.loading = false;
        this.cd.detectChanges();
      }, 300);
    });
  }

  viewList() {
    this.loading = true;
    this._service.getRanks().finally(() => {
      this.itemView = false;
      this.currentItem = null;
      setTimeout(() => {
        this.loading = false;
      }, 300);
    });
  }
}
