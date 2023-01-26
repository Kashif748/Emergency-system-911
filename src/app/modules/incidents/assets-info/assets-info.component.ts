import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {OrgService} from '@core/api/services/org.service';
import {Subject} from 'rxjs';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {IncidentsService} from 'src/app/_metronic/core/services/incidents.service';
import {ConfirmDialogComponent} from 'src/app/modules/confirm-dialog/confirm-dialog.component';
import * as _ from 'lodash';
import {TranslationService} from '../../i18n/translation.service';
import {AssetsFormComponent} from './assets-form/assets-form.component';
import {CommonService} from '@core/services/common.service';
import {AppCommonData} from '@core/entities/AppCommonData';

@Component({
  selector: 'app-assets-info',
  templateUrl: './assets-info.component.html',
  styleUrls: ['./assets-info.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AssetsInfoComponent),
      multi: true,
    },
  ],
})
export class AssetsInfoComponent implements OnInit, AfterViewInit, OnDestroy {

  // UI
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() incidentId: any;
  @Input() assetData: any;
  @Output() saveNewAssets: EventEmitter<any[]> = new EventEmitter();
  @Output() editAssets: EventEmitter<any[]> = new EventEmitter();

  // Variables
  Assets: any[];
  displayedColumns: string[] = [
    'Organization',
    'Category',
    'Assets',
    'Quantity',
    'actions',
  ];
  lang: string;
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  destroy$: Subject<boolean> = new Subject();
  loading = true;
  commonData: AppCommonData;

  // Functions
  onChange: any = () => {
  };
  onTouch: any = () => {
  };


  constructor(
    private alertsService: AlertsService,
    public matDialog: MatDialog,
    private translationService: TranslationService,
    private incidentsService: IncidentsService,
    private alertService: AlertsService,
    private changeDetectorRef: ChangeDetectorRef,
    private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.commonData = this.commonService.getCommonData();
    this.lang = this.translationService.getSelectedLanguage();
    this.loadAssets(this.incidentId);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  writeValue(obj: any): void {
    if (obj) {
      this.dataSource.data = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  add(org) {
    if (this.incidentId) {
      const ref = this.matDialog.open(AssetsFormComponent, {
        panelClass: 'modal',
          data: {
          incID: this.incidentId,
          org},
      });

      ref.afterClosed().subscribe((res) => {
        if (res) {
          this.addAssets(res);
          this.notify();
        }
      });
    }
  }

  edit(element: any) {
    const ref = this.matDialog.open(AssetsFormComponent, {
      data: element,
      panelClass: 'modal',
    });

    ref.afterClosed().subscribe((res) => {
      if (res) {
        this.updateAssets(res);
      }
    });
  }

  delete(ele) {
    this.matDialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe(async (res) => {
        if (res) {
          this.dataSource.data = this.dataSource.data.filter(
            (item) => item.id !== ele.id
          );
          await this.incidentsService
            .updateIncidentAssets({
              ...ele,
              isActive: false,
            })
            .toPromise();
          this.saveNewAssets.emit(this.dataSource.data);
          this.notify();
        }
      });
  }

  public updateAssets(assets) {
    if (!assets) {
      return;
    }
    this.loading = true;

    this.incidentsService.updateIncidentAssets(assets).subscribe((data) => {
      this.loading = false;
      this.loadAssets(this.incidentId);
      this.changeDetectorRef.detectChanges();
      this.alertService.openSuccessSnackBar();
    });
    this.loading = false;
  }

  public addAssets(assets) {
    if (!assets) {
      return;
    }
    this.loading = true;
    this.incidentsService
      .addIncidentAssets({...assets, incident: {id: this.incidentId}})
      .subscribe((data) => {
        this.loadAssets(this.incidentId);
        this.loading = false;
        this.changeDetectorRef.detectChanges();
        this.alertService.openSuccessSnackBar();
      });
    this.loading = false;
  }

  onPagination(event: { pageSize: number; pageIndex: number }) {
  }

  loadAssets(incidentId: number) {
    this.loading = true;
    this.incidentsService.getIncidentsAssets(incidentId).subscribe(
      (data) => {
        this.loading = false;
        if (data) {
          this.Assets = [...data.result.content];
          this.dataSource.data = [...data.result.content];
          this.changeDetectorRef.detectChanges();
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  notify() {
    this.onChange(this.dataSource.data);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
