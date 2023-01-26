import { Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DataOptions } from '@shared/components/advanced-search/advanced-search.component';
import { Observable } from 'rxjs';
import { EmailListComponent } from '../email-list/email-list.component';

import { ResponsibleOrgsComponent } from '../view-incidents/responsible-orgs/responsible-orgs.component';
import { AppCommonData } from '@core/entities/AppCommonData';
import { CommonService } from '@core/services/common.service';
import { DisplayColumn, INCIDENT_STATUS, PageConfig } from '../incidents.model';

@Component({
  selector: 'app-incident-table',
  templateUrl: './incident-table.component.html',
  styleUrls: ['./incident-table.component.scss'],
})
export class IncidentTableComponent implements OnInit, OnChanges {
  // UI
  @Input() incidentsData: any[] = [];
  @Input() helperData: DataOptions[] = [];
  @Input() id: string;
  @Input() centers: any[];
  @Input() totalElements: number;
  @Input() currentPage: number;
  @Input() displayedColumns: DisplayColumn[] = [];
  paginationConfig: PageConfig = {
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 10,
    id: 'test',
    sort:'desc',
    active:''
  };
  @Input() loading: Observable<boolean>;
  @Input() status: INCIDENT_STATUS;
  incidentStatus = INCIDENT_STATUS;
  DialogRef: MatDialogRef<any>;
  @Output() onPaginationChange: EventEmitter<PageConfig> = new EventEmitter(
    null
  );
  @Output() onSortChange: EventEmitter<any> = new EventEmitter(null);
  commonData: AppCommonData;
  @ViewChild(MatSort) sort: MatSort;
  pageSort='';
  pageActive='';

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private readonly commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.commonData = this.commonService.getCommonData();
    this.paginationConfig = {
      itemsPerPage: 10,
      currentPage: 0,
      totalItems: 10,
      id: this.id,
      sort:this.pageSort,
      active:this.pageActive
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.totalElements?.currentValue &&
      this.paginationConfig?.totalItems
    ) {
      this.paginationConfig.totalItems = this.totalElements;
    }

    if (this.paginationConfig && changes.currentPage) {
      this.paginationConfig.currentPage = changes.currentPage.currentValue;
    }
  }

  viewIncident(id) {
    this.router.navigate(['incidents/view', id]);
  }

  pageChanged(currentPage: number) {
    this.paginationConfig.currentPage = currentPage;
    this.onPaginationChange.emit({ currentPage, ...this.paginationConfig });
  }

  sendMail(e, id) {
    e.stopPropagation();
    this.openDialog(id);
  }

  openDialog(id): void {
    this.dialog.open(EmailListComponent, {
      width: '600px',
      disableClose: false,
      data: {
        incId: id,
      },
    });
  }

  updateIncident(id) {
    this.router.navigate(['incidents/edit', id]);
  }

  canUserUpdate(Porg, respID) {
    if (this.commonData.currentOrgDetails.id == Porg) {
      return true;
    } else {
      return this.commonData.currentOrgDetails.id == respID;
    }
  }

  canUserTaskUpdate(respID) {
    return respID == this.commonData.currentOrgDetails.id;
  }

  canEditResponsibleOrg(incident: any) {
    if (incident?.status?.id === 2) {
      return false;
    }
    return (
      incident?.responsibleOrg?.id === this.commonData.currentOrgDetails.id
    );
  }

  createTask(title, id) {
    this.router.navigate(['incidents/createTask', { title, id }]);
  }

  openModal(type, id, incId) {
    this.DialogRef = this.dialog.open(ResponsibleOrgsComponent, {
      disableClose: false,
      panelClass: 'modal',
      width: '600px',
      height: 'auto',
      data: {
        type,
        id,
        incidentId: incId,
      },
    });
  }

  customSort(event) {
    if (!(event.active.includes('teams') || event.active.includes('actions'))) {
      this.sort = event;
      this.pageSort = this.sort.direction;
      this.pageActive = this.sort.active;
      this.paginationConfig = {
        itemsPerPage: 10,
        currentPage: this.currentPage,
        totalItems: this.totalElements,
        id: this.id,
        sort:this.pageSort,
        active:this.pageActive
      };
      this.onSortChange.emit(event);
    }
  }

  getCenter(centerId: number) {
    return this.centers.find((c) => c.id == centerId);
  }
}
