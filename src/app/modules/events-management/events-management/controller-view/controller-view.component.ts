import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ConfirmDialogComponent } from 'src/app/modules/confirm-dialog/confirm-dialog.component';
import { TranslationService } from 'src/app/modules/i18n/translation.service';

import { EventsManagementService } from '../../events-management.service';

import { EntityModel } from './reports-via';

import { ControllerModalComponent } from './controller-modal/controller-modal.component';

@Component({
  selector: 'app-controller-view',
  templateUrl: './controller-view.component.html',
  styleUrls: ['./controller-view.component.scss'],
})
export class ControllerViewComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input('controllerName') controllerName: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  lang = 'en';
  DialogRef: MatDialogRef<any>;
  expression = false;
  data: EntityModel[];
  displayedColumns: string[] = [
    'id',
    'Name Ar',
    'Name En',
    "Module",
    'plotNumber',
    'Organization',
    'Color',
    'OrganizationCategory',
    'Active',
    'actions',
  ];

  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private _service: EventsManagementService,
    private translationService: TranslationService,
    public _matDialog: MatDialog
  ) {}
  private destroy$ = new Subject();
  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource(this.data);
    this.lang = this.translationService.getSelectedLanguage();

    this._service.controllers[this.controllerName].onValueChanged.subscribe(
      (data) => {
        this.data = data;
        console.log(this.data);
        this.dataSource.data = this.data;
        this.dataSource.paginator = this.paginator;
      }
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  public modalClosed$ = new BehaviorSubject<boolean>(false);
  openModal(type, id, data?: any) {
    this.DialogRef = this._matDialog.open(ControllerModalComponent, {
      disableClose: false,
      panelClass: 'modal',
      data: {
        type: type,
        id: id,
        controllerName: this.controllerName,
        model: data,
      },
    });
    this.DialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (_) => {
        this._service.changeCurrentTab$.next(true);
        try {
          await this._service.resolve();
        } catch {}
        this.ngOnInit();
        this._service.changeCurrentTab$.next(false);
      });
  }

  deleteReport(groupId) {
    this.DialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false,
      panelClass: 'modal-delete',
    });

    this.DialogRef.componentInstance.confirmMessage = 'GENERAL.DELETE_CONFIRM';
    this.DialogRef.componentInstance.icon = 'error_outline';
    this.DialogRef.componentInstance.actionName = 'ACTIONS.DELETE';

    this.DialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._service.deleteReportVia(groupId, this.controllerName);
      }
      this.DialogRef = null;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
