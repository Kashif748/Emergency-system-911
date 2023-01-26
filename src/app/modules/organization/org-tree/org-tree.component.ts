import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PrivilegesService } from 'src/app/core/services/privileges.service';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { IStorageService } from 'src/app/core/services/storage.service';

import { OrganizationsService } from '../organizations.service';
import { Iorganization } from '../models/organization.interface';
import { OrganizationFormComponent } from '../organization-form/organization-form.component';
import { TranslationService } from '../../i18n/translation.service';
import { Organization } from '../models/organization.model';
import { from } from 'rxjs';
import { switchMap, skipWhile, take } from 'rxjs/operators';

@Component({
  selector: 'app-org-tree',
  templateUrl: './org-tree.component.html',
  styleUrls: ['./org-tree.component.scss'],
})
export class OrgTreeComponent implements OnInit, OnDestroy {
  ds: Organization;
  selectNode(nodeData: { name: string; title: string }) {
    alert(`Hi All. I'm ${nodeData.name}. I'm a ${nodeData.title}.`);
  }

  public lang = 'en';
  org: any;

  constructor(
    public dialog: MatDialog,
    private _alert: AlertsService,
    private _privileges: PrivilegesService,
    private _translation: TranslationService,
    private _organiztions: OrganizationsService,
    private cdr: ChangeDetectorRef,
    private storageService: IStorageService
  ) {
    this.lang = _translation.getSelectedLanguage();
  }

  async ngOnInit() {
    const commonData = this.storageService.getItem('commonData');
    this.org = commonData?.currentOrgDetails;

    const currentOrgId = this.org ? this.org.id : null;
    const observable = from(this._organiztions.getOrgs(currentOrgId));

    observable
      .pipe(
        switchMap((res) => this._organiztions.treeRootChanged$),
        skipWhile((data) => data?.length == 0),
        take(1)
      )
      .subscribe((data) => {
        if (data) {
          this.ds = data[0];
          this.cdr.detectChanges();
        }
      });
  }

  openOrgForm(nodeData: Iorganization, type: 'add' | 'edit') {
    const dialogRef = this.dialog.open(OrganizationFormComponent, {
      data: {
        nodeId: nodeData.id,
        type,
        parentId: nodeData.parentOrg || nodeData.parent,
      },
      width: '45vw',
      panelClass: 'org-modal',
      hasBackdrop: true,
      disableClose: true,
    });

    return dialogRef;
  }

  addOrg(nodeData) {
    this.openOrgForm(nodeData, 'add');
  }

  editOrg(nodeData) {
    this.openOrgForm(nodeData, 'edit');
  }

  hasChildren(nodeData: Iorganization) {
    return !!nodeData.children;
  }

  deleteOrg(nodeData: Iorganization) {
    if (this.hasChildren(nodeData)) {
      this._alert.customFailureSnackBar(
        this._translation.translateAWord('ORGANIZATIONS.THIS_NODE_HAS_CHILDREN')
      );
      return;
    }

    this._organiztions
      .deleteOrg(nodeData.id)
      .then((res) => {
        if (res) {
          this._alert.openSuccessSnackBar();
        }
      })
      .catch((err) => {
        this._alert.openFailureSnackBar();
      });
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
