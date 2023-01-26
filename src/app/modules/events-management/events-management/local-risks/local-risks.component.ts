import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs/internal/Subject';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { EventsManagementService } from '../../events-management.service';

@Component({
  selector: 'app-local-risks',
  templateUrl: './local-risks.component.html',
  styleUrls: ['./local-risks.component.scss']
})
export class LocalRisksComponent implements OnInit {
  DialogRef: MatDialogRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
    // Variables
  lang = 'en';
  data = [];
  displayedColumns: string[] = [
    'id',
    'nameAr',
    'nameEn',
    'isActive',
  ];


  private destroy$ = new Subject();
  dataSource: any;
  currentItem: any;
  commonData = [];
  itemView = false;
  itemChildrenView = false;
  loading = true;




  constructor(  private managementService: EventsManagementService,
                public matDialog: MatDialog,
                private translationService: TranslationService,
                private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.commonData = this.managementService.commonData;
    this.viewList();
    this.lang = this.translationService.getSelectedLanguage();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }






  viewList() {
    this.loading = true;
    this.currentItem = null;
    this.data = [];
    this.managementService.getLocalRisks().subscribe((data => {
       this.data = data.result;

       this.dataSource.data = this.data;
       this.dataSource.paginator = this.paginator;
       
     }));

 

    setTimeout(() => {
      this.loading = false;
      this.itemView = false;
      this.cd.detectChanges();
    }, 300);
  }

  pageChanged(event) {
  }

}
