import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppCommonData } from '@core/entities/AppCommonData';
import { CommonService } from '@core/services/common.service';
import { DataOptions } from '@shared/components/advanced-search/advanced-search.component';
import { Observable } from 'rxjs';
import { EmailListComponent } from '../email-list/email-list.component';
import { DisplayColumn, INCIDENT_STATUS, PageConfig } from '../incidents.model';
import { ResponsibleOrgsComponent } from '../view-incidents/responsible-orgs/responsible-orgs.component';

@Component({
  selector: 'app-incident-card',
  templateUrl: './incident-card.component.html',
  styleUrls: ['./incident-card.component.scss']
})
export class IncidentCardComponent implements OnInit {
  @Input() incidentsData: any[] = [];
  @Input() helperData: DataOptions[] = [];
  @Input() id: string;
  @Input() centers: any[];
  @Input() totalElements: number;
  @Input() currentPage: number;
  @Input() displayedColumns: DisplayColumn[] = [];
  paginationConfig: PageConfig;
  @Input() loading: Observable<boolean>;
  @Input() status: INCIDENT_STATUS;
  incidentStatus = INCIDENT_STATUS;
  DialogRef: MatDialogRef<any>;
  @Output() onPaginationChange: EventEmitter<PageConfig> = new EventEmitter(null);
  commonData: AppCommonData;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private readonly commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.commonData = this.commonService.getCommonData();
  }

  getCenter(centerId: number) {
    return this.centers.find((c) => c.id == centerId);
  }

  canUserUpdate(Porg, respID) {
    if (this.commonData?.currentOrgDetails?.id == Porg) {
      return true;
    } else {
      return this.commonData?.currentOrgDetails?.id == respID;
    }
  }


  viewIncident(id) {
    this.router.navigate(['incidents/view', id]);
  }

  pageChanged(currentPage: number) {
    this.paginationConfig.currentPage = currentPage;
    this.onPaginationChange.emit({currentPage, ...this.paginationConfig});
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

  canUserTaskUpdate(respID) {
    return respID == this.commonData?.currentOrgDetails.id;
  }

  canEditResponsibleOrg(incident: any) {
    if (incident?.status.id === 2) {
      return false;
    }
    return (
      incident?.responsibleOrg?.id === this.commonData?.currentOrgDetails.id
    );
  }

  createTask(title, id) {
    this.router.navigate(['incidents/createTask', {title, id}]);
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


}
