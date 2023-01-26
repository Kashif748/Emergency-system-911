import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {EventsManagementService} from "../../events-management.service";
import {TranslationService} from "../../../i18n/translation.service";
import {MatTableDataSource} from "@angular/material/table";
import {takeUntil} from "rxjs/operators";
import {AlertsService} from "../../../../_metronic/core/services/alerts.service";
import {MobileVersion, MobileVersionResponse} from "./models/mobile-versions-response.model";
import {AddEditMobileVersionComponent} from "./add-edit-mobile-version/add-edit-mobile-version.component";

@Component({
  selector: 'app-mobile-versions',
  templateUrl: './mobile-versions.component.html',
  styleUrls: ['./mobile-versions.component.scss']
})
export class MobileVersionsComponent implements OnInit, AfterViewInit, OnDestroy {

  // UI
  DialogRef: MatDialogRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // Variables
  lang = 'en';
  data: MobileVersion[] = [];
  displayedColumns: string[] = [
    'id',
    'versionName',
    'versionNumber',
    'lastSupportedVersion',
    'isActive',
    'actions',
  ];
  private destroy$ = new Subject();
  dataSource: any;
  currentItem: any;
  commonData = [];
  loading = true;

  constructor(
    private managementService: EventsManagementService,
    public matDialog: MatDialog,
    private translationService: TranslationService,
    private alertService: AlertsService,
    private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.commonData = this.managementService.commonData;
    this.lang = this.translationService.getSelectedLanguage();
    this.loadMobileVersions();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  openAddEditModal(item) {
    this.DialogRef = this.matDialog.open(AddEditMobileVersionComponent, {
      disableClose: false,
      panelClass: 'modal',
      width: "600",
      data: {
        item
      },
    });
    this.DialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (loadData) => {
        if (loadData) {
          this.loadMobileVersions();
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  private loadMobileVersions() {
    this.loading = true;
    this.managementService.getMobileVersions().subscribe((res) => {
      const response = res as MobileVersionResponse;
      this.data = response.result.versions;
      this.dataSource.data = this.data;
      this.loading = false;
      this.cd.detectChanges();
    }, (e) => {
      this.loading = false;
      this.alertService.openFailureSnackBar();
      this.cd.detectChanges();
    });
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
    setTimeout(() => {
      this.loading = false;
      this.cd.detectChanges();
    }, 300);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
