import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {Subject} from 'rxjs';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {ConfirmDialogComponent} from '../../confirm-dialog/confirm-dialog.component';
import {TranslationService} from '../../i18n/translation.service';
import {Challenge} from '../challenges/model/Challenge';
import {LocalChallengesFormComponent} from './local-challenges-form/local-challenges-form.component';

@Component({
  selector: 'app-local-challenges',
  templateUrl: './local-challenges.component.html',
  styleUrls: ['./local-challenges.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LocalChallengesComponent),
      multi: true
    }
  ]
})
export class LocalChallengesComponent implements ControlValueAccessor, OnDestroy {

  // UI
  @Input() incidentId: number;

  // Variables
  displayedColumns: string[] = [
    'challenge',
    'requmendations',
    'organization',
    'actions',
  ];
  dataSource: MatTableDataSource<Challenge> = new MatTableDataSource([]);
  destroy$: Subject<boolean> = new Subject();

  // Functions
  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  constructor(public matDialog: MatDialog) {
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

  setDisabledState?(isDisabled: boolean): void {
    // this.disabled = isDisabled;
  }


  applyFilter(filter) {

  }


  add() {
    const ref = this.matDialog.open(LocalChallengesFormComponent);
    ref.afterClosed()
      .subscribe(res => {
        if (res) {
          this.dataSource.data.push(res);
          this.dataSource.data = [...this.dataSource.data];
          this.notify();
        }
      });
  }

  edit(element: Challenge) {
    const ref = this.matDialog.open(LocalChallengesFormComponent,
      {
        data: element
      }
    );

    ref.afterClosed()
      .subscribe(res => {
        if (res) {
          this.dataSource.data = this.dataSource.data.map(item => {
            if (item.id == element.id) {
              item = {...res};
            }
            return item;
          });
          this.notify();
        }
      });

  }

  delete(id: number) {

    this.matDialog.open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
          this.notify();
        }
      });
  }

  onPagination(event: { pageSize: number, pageIndex: number }) {
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
