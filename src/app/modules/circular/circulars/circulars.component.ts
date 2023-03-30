import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { UrlHelperService } from '@core/services/url-helper.service';

import { Observable, Subject } from 'rxjs';

import { CircularsService } from 'src/app/_metronic/core/services/circulars.service';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { LayoutDataService } from 'src/app/pages/layout.service';

import { TranslationService } from '../../i18n/translation.service';

import { ReceiversListComponent } from './receivers-list/receivers-list.component';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-circulars',
  templateUrl: './circulars.component.html',
  styleUrls: ['./circulars.component.scss'],
})
export class CircularsComponent implements OnInit {
  public loading$: Observable<any>;

  displayedColumns: string[] = [
    'number',
    'confidentialty',
    'date',
    'status',
    'priority',
    'receivers',
    'actions',
  ];
  confidentialty: any[];
  priorities: { [key: number]: any } = {};
  circularStatus: any[];
  dataSource = new MatTableDataSource<any>([]);
  paginationConfig = {
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 0,
    id: 'paging',
  };
  private filterValue = '';

  // dataSource: CircularsDataSource;
  correspondencesList: any[] = [];
  user$: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  lang = 'en';

  receiversDialogRef: MatDialogRef<ReceiversListComponent>;

  private filterStore = new Subject();
  private filter$ = this.filterStore.asObservable();

  constructor(
    private translationService: TranslationService,
    private cirService: CircularsService,
    public _matDialog: MatDialog,
    private alertService: AlertsService,
    private _layoutDataService: LayoutDataService,
    private urlHelper: UrlHelperService
  ) {}

  ngOnInit(): void {
    this.loading$ = this.cirService.loading$;

    let commonData = JSON.parse(localStorage.getItem('commonData'));
    if (commonData) {
      this.confidentialty = commonData['confidentialties'];
      this.circularStatus = commonData['circularStatus'];
      this.user$ = commonData['currentUserDetails'];
      (commonData['priorities'] as any[]).forEach((p) => {
        this.priorities[p.id] = p;
      });
    }
    this.lang = this.translationService.getSelectedLanguage();

    this.cirService.onCircularsChange.subscribe((data) => {
      this.dataSource.data = data;
      // this.dataSource.paginator = this.paginator;
    });

    this.cirService.onPaginationConfigChange.subscribe((data) => {
      this.paginationConfig.itemsPerPage = data.itemsPerPage;
      this.paginationConfig.totalItems = data.totalItems;
      this.paginationConfig.currentPage = data.currentPage + 1;
    });

    this.filter$.pipe(throttleTime(700)).subscribe((v) => {
      this.pageChanged(1);
    });

    // this.dataSource = new CircularsDataSource(this.cirService);
    // this.dataSource.loadCirculars(0, 10, "asc");
    // this.circularsService.getCirculars().subscribe(cir=>{
    //   this.correspondencesList = cir.content
    //   this.dataSource = new MatTableDataSource<any>(this.correspondencesList);
    //   //console.log(this.dataSource.data)
    //   this.dataSource.paginator = this.paginator;
    //   this.cdr.detectChanges()
    // })
    // this.circularsService.getCirculars(0).subscribe(cir=>console.log(cir))
  }
  getDataBySearch(text) {
    this;
  }
  review(id) {
    this.cirService.review(id).subscribe((response) => {
      const newBlob = new Blob([response], { type: 'application/pdf' });
      this.urlHelper.downloadBlob(newBlob);
    });
  }

  approval(id) {
    this.cirService.loadingSubject.next(true);
    this.cirService.approval(id).subscribe(
      (data) => {
        this.cirService.loadingSubject.next(false);
        if (data && data['status']) {
          this.alertService.openSuccessSnackBar();
          this.cirService.updateItem(data['result']);
        }
      },
      (err) => {
        this.cirService.loadingSubject.next(false);
        this.alertService.openFailureSnackBar();
      }
    );
  }

  sendCircular(row) {
    this.cirService.loadingSubject.next(true);
    this.cirService.sendCircular(row.id, row.manager.id).subscribe(
      (data) => {
        this.cirService.loadingSubject.next(false);

        if (data && data['status']) {
          this.alertService.openSuccessSnackBar();
          this.cirService.updateItem(data['result']);
        }
      },
      (err) => {
        this.cirService.loadingSubject.next(false);
        this.alertService.openFailureSnackBar();
      }
    );
  }

  publish(id) {
    this.cirService.loadingSubject.next(true);
    this.cirService.publish(id).then(
      () => {
        this.cirService.loadingSubject.next(false);

        this.cirService.getCirculars(0, 10, 'desc');
      },
      (err) => {
        this.cirService.loadingSubject.next(false);
        this.alertService.openFailureSnackBar();
      }
    );
  }

  reject(id) {
    this.cirService.loadingSubject.next(true);
    this.cirService.reject(id).subscribe(
      (data) => {
        this.cirService.loadingSubject.next(false);

        if (data && data['status']) {
          this.alertService.openSuccessSnackBar();
          this.cirService.updateItem(data['result']);
        }
      },
      (err) => {
        this.cirService.loadingSubject.next(false);
        this.alertService.openFailureSnackBar();
      }
    );
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterStore.next();
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModal(item) {
    this.receiversDialogRef = this._matDialog.open(ReceiversListComponent, {
      disableClose: false,
      panelClass: 'modal',
      data: { ...item['orgs'] },
    });
  }

  getCircularStatus(status) {
    let statusName = this.circularStatus.find((x) => x.id === status['id']);

    if (!statusName) return { nameAr: '', nameEn: '' };

    return statusName;
  }

  getConfidentialty(confidentialty) {
    return this.confidentialty.find((x) => x.id === confidentialty['id']);
  }

  customSort(event) {
    this.cirService.getSortedCirculars(0, event);
  }

  pageChanged(event) {
    this.cirService.getCirculars(event - 1, 10, 'desc', this.filterValue);
  }
}
