import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AppCommonData } from '@core/entities/AppCommonData';
import { CommonService } from '@core/services/common.service';
import { DataOptions } from '@shared/components/advanced-search/advanced-search.component';
import { Observable } from 'rxjs';
import { EmailListComponent } from '../email-list/email-list.component';
import { DisplayColumn, PageConfig } from '../incidents.model';
import { ResponsibleOrgsComponent } from '../view-incidents/responsible-orgs/responsible-orgs.component';

@Component({
  selector: 'app-inquiry-table',
  templateUrl: './inquiry-table.component.html',
  styleUrls: ['./inquiry-table.component.scss'],
})
export class InquiryTableComponent implements OnInit {
  // UI
  @Input() inquiriesData: any[] = [];
  @Input() helperData: DataOptions[] = [];
  @Input() id: string;
  @Input() totalElements: number;
  @Input() currentPage: number;
  @Input() displayedColumns: DisplayColumn[] = [];
  paginationConfig: PageConfig;
  @Input() loading: Observable<boolean>;
  DialogRef: MatDialogRef<any>;
  @Output() onPaginationChange: EventEmitter<PageConfig> = new EventEmitter(
    null
  );
  @Output() onSortChange: EventEmitter<any> = new EventEmitter(null);
  commonData: AppCommonData;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private readonly commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.commonData = this.commonService.getCommonData();
    this.paginationConfig = {
      itemsPerPage: 20,
      currentPage: 0,
      totalItems: 100,
      id: this.id,
      sort: '',
      active:''
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
    this.router.navigate(['incidents/view', id], {
      queryParams: { isInquiry: true },
    });
  }

  pageChanged(currentPage: number) {
    this.paginationConfig.currentPage = currentPage - 1;
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

  updateInquiry(id) {
    this.router.navigate(['incidents/edit', id], {
      queryParams: { isInquiry: true },
    });
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
    this.sort = event;
    this.onSortChange.emit(event);
  }
}
