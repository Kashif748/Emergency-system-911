import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { EventsManagementService } from '../../events-management.service';
import { IncidentsCategoriesModalComponent } from './incidents-categories-modal/incidents-categories-modal.component';

@Component({
  selector: 'app-incidents-categories',
  templateUrl: './incidents-categories.component.html',
  styleUrls: ['./incidents-categories.component.scss'],
})
export class IncidentsCategoriesComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  // UI
  DialogRef: MatDialogRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // Variables
  lang = 'en';
  data = [];
  displayedColumns: string[] = [
    'id',
    'nameAr',
    'nameEn',
    'serialNumber',
    'chatBot',
    'isActive',
    'actions',
  ];
  private destroy$ = new Subject();
  dataSource: any;
  currentItem: any;
  commonData = [];
  itemView = false;
  itemChildrenView = false;
  loading = true;

  constructor(
    private managementService: EventsManagementService,
    public matDialog: MatDialog,
    private translationService: TranslationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.commonData = this.managementService.commonData;
    this.viewList();
    this.lang = this.translationService.getSelectedLanguage();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  openModal(type, item) {
    this.DialogRef = this.matDialog.open(IncidentsCategoriesModalComponent, {
      disableClose: false,
      panelClass: 'modal',
      data: {
        type,
        item,
        parentId: this.itemView ? this.currentItem['id'] : null,
      },
    });
    this.DialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (_) => {
        this.managementService.changeCurrentTab$.next(true);
        try {
          await this.managementService.resolve();
        } catch {}
        this.ngOnInit();
        this.viewList();
        // this.managementService.changeCurrentTab$.next(false);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  pageChanged(event) {}

  viewItem(item) {
    this.loading = true;
    this.currentItem = item;
    this.managementService.getIncidentsCategories('children');

    const categories: any[] = this.commonData['incidentCategories'];
    if (categories.length <= 0) {
      return;
    }

    this.dataSource.data = categories.filter((e) => e?.parent?.id == item.id);

    setTimeout(() => {
      this.itemView = true;
      this.itemChildrenView = true;
      this.loading = false;
      this.cd.detectChanges();
    }, 300);
  }

  viewList() {
    this.loading = true;
    this.currentItem = null;
    this.data = [];
    const categories: any[] = this.commonData['incidentCategories'];
    if (categories.length <= 0) {
      return [];
    }

    this.data = categories.filter((item) => item.parent == null);

    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;

    setTimeout(() => {
      this.loading = false;
      this.itemView = false;
      this.itemChildrenView = false;
      this.cd.detectChanges();
    }, 300);
  }

  public downloadPDF() {
    this.managementService.downloadIncidintCategoryReport('PDF').subscribe();
  }

  public downloadXlsx() {
    this.managementService.downloadIncidintCategoryReport('EXCEL').subscribe();
  }
}
