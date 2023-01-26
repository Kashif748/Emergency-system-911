import {ChangeDetectorRef, Component, EventEmitter, forwardRef, OnDestroy, OnInit, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {Subject} from 'rxjs';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {IncidentsService} from 'src/app/_metronic/core/services/incidents.service';
import {TranslationService} from '../../i18n/translation.service';
import {HospitalFormComponent} from './hospital-form/hospital-form.component';
import {ConfirmDialogComponent} from 'src/app/modules/confirm-dialog/confirm-dialog.component';
import {ILangFacade} from '@core/facades/lang.facade';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HospitalsComponent),
      multi: true,
    },
  ],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  // UI.
  @Output() saveNewHospital: EventEmitter<any[]> = new EventEmitter();
  // Variables.
  hospitals: any[];
  lang = 'en';
  loading = true;
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  destroy$: Subject<boolean> = new Subject();
  public dir$ = this.langFacade.vm$.pipe(map((s) => s.ActiveLang.dir));
  displayedColumns: string[] = [
    'hospital',
    'deaths',
    'majorInjuries',
    'minorInjuries',
    'normalInjuries',
    'staffInjuries',
    'actions',
  ];


  // Functions.
  onChange: any = () => {
  };
  onTouch: any = () => {
  };

  constructor(
    private alertsService: AlertsService,
    public matDialog: MatDialog,
    private translationService: TranslationService,
    private incidentService: IncidentsService,
    private langFacade: ILangFacade,
    protected cdr: ChangeDetectorRef
  ) {
  }


  ngOnInit(): void {
    this.loadHospitals();
    this.lang = this.translationService.getSelectedLanguage();
  }

  writeValue(obj: any): void {
    if (obj) {
      this.dataSource.data = obj;
      this.incidentService.setHospitals(obj);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  add() {
    const ref = this.matDialog.open(HospitalFormComponent, {
      panelClass: 'modal',
    });

    ref.afterClosed().subscribe((res) => {
      if (res) {
        this.saveNewHospital.emit([...this.dataSource.data, res]);
      }
    });
  }

  edit(element: any) {
    const ref = this.matDialog.open(HospitalFormComponent, {
      data: element,
      panelClass: 'modal',
    });

    ref.afterClosed().subscribe((res) => {
      if (res) {
        const hospitals = this.dataSource.data.map((item) => {
          if (item.id == element.id) {
            return Object.assign({}, res);
          } else {
            return Object.assign({}, item);
          }
        });
        this.saveNewHospital.emit(hospitals);
      }
    });
  }

  delete(id: number) {
    this.matDialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          const hospitals = this.dataSource.data.filter(
            (item) => item.id != id
          );
          this.saveNewHospital.emit(hospitals);
        }
      });
  }

  onPagination(event: { pageSize: number; pageIndex: number }) {
  }

  loadHospitals() {
    this.loading = true;
    this.incidentService.getHospitals().subscribe(
      (data) => {
        this.loading = false;
        if (data) {
          this.hospitals = [...data.result.content];
          this.dataSource.data = this.dataSource.data.map((item) => {
            const hot = this.getHospital(item.hospital.id);
            item['nameEN'] = hot['nameEN'];
            item['nameAR'] = hot['nameAR'];
            return item;
          });
          this.cdr.detectChanges();
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getHospital(id: number) {
    let host;
    if (this.hospitals && this.hospitals.length) {
      host = this.hospitals.find((item) => item.id == id);
    }

    if (host) {
      if (this.lang == 'ar') {
        return host['nameAR'];
      }
      if (this.lang == 'en') {
        return host['nameEN'];
      }
    }
  }

  notify() {
    this.onChange(this.dataSource.data);
  }

  getStaff(staffInjury: boolean) {
    if (staffInjury) {
      return this.lang === 'en' ? 'true' : 'نعم';
    } else {
      return this.lang === 'en' ? 'false' : 'لا';
    }
  }

  setHospitals(hospitals) {
    this.dataSource.data = hospitals;
    this.notify();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
