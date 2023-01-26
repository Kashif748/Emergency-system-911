import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PickUsersComponent } from 'src/app/shared/pick-users/pick-users.component';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';

import { GroupModel, userType } from '../group.model';
import { GroupsManagementService } from '../groups-management.service';
import { TranslationService } from '../../i18n/translation.service';
import { UserService } from '@core/api/services/user.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss'],
})
export class NewGroupComponent implements OnInit {
  users$: Observable<any>;
  toList: any[] = [];
  toUsersList: any[] = [];
  lang = 'en';
  id: number;
  isAddMode: boolean;
  currentGroup: GroupModel;
  manager;
  formGroup: FormGroup;
  receiversDialogRef: MatDialogRef<PickUsersComponent>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private groupsManagementService: GroupsManagementService,
    private userService: UserService,
    private alertService: AlertsService,
    private translationService: TranslationService,
    private router: Router,
    private location: Location,
    public matDialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.users$ = this.userService
      .getAll()
      .pipe(map((users) => users.result.content));
    this.createForm();
  }

  async createForm() {
    this.formGroup = this.formBuilder.group({
      nameAr: [null, [Validators.required]],
      nameEn: [null, Validators.required],
      descAr: [null, [Validators.required]],
      descEn: [null, Validators.required],
      users: [null],
      id: this.id,
      orgStructure: [],
      global: [false],
    });

    if (!this.isAddMode) {
      // this.currentGroup = this._service.getById(this.id);
      this.groupsManagementService.getGroupById(this.id).subscribe((data) => {
        this.currentGroup = data;
        this.manager = this.currentGroup?.users.find((item) => {
          if (item.type == userType.MANAGER) {
            item.user['lastNameAr'] == null
              ? (item.user['lastNameAr'] = '')
              : item.user['lastNameAr'];
            item.user['lastNameEn'] == null
              ? (item.user['lastNameEn'] = '')
              : item.user['lastNameEn'];
            return item;
          }
        });
        const users = this.currentGroup?.users?.map((item) => item.user.id);
        this.formGroup.patchValue({
          ...this.currentGroup,
          users,
        });
      });
      // only the manager
    }
  }

  getOrgStructure() {
    let orgStruct = JSON.parse(localStorage.getItem('commonData'));
    orgStruct = orgStruct['currentOrgDetails'];

    return orgStruct;
  }

  private createGroup() {
    let dataToSend = this.formGroup.value;

    let orgStructure = dataToSend['orgStructure'];
    dataToSend['orgStructure'] = {
      id: orgStructure['id'],
      labelAr: orgStructure['entityType']['labelEn'],
    };

    this.groupsManagementService.create(dataToSend).then(
      (ok: GroupModel) => {
        this.groupsManagementService.getContacts();
        this.alertService.openSuccessSnackBar();
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      (err) => {
        this.alertService.openFailureSnackBar();
      }
    );
  }

  private updateGroup() {
    let dataToSend = this.formGroup.value;

    let orgStructure = dataToSend['orgStructure'];
    dataToSend['orgStructure'] = {
      id: orgStructure['id'],
      labelAr: orgStructure['entityType']['labelEn'],
    };
    this.groupsManagementService.updateGroup(this.id, dataToSend).then(
      (ok) => {
        this.groupsManagementService
          .updateGroupManager(this.id, this.manager)
          .subscribe();
        this.alertService.openSuccessSnackBar();
        // update  group data in store
        this.groupsManagementService.getContacts();
        // this._service.updateGroupUsersLocal(this.currentGroup);
        this.router.navigate(['../../'], { relativeTo: this.route });
      },
      (err) => {
        this.alertService.openFailureSnackBar();
      }
    );
  }

  onSubmit() {
    if (this.formGroup.invalid || !this.manager) {
      return;
    }
    if (this.isAddMode) {
      this.createGroup();
    } else {
      this.updateGroup();
    }
  }

  openModal() {
    let members = [];
    members =
      this.currentGroup?.users.filter((item) => item.type == userType.MEMBER) ||
      [];
    this.receiversDialogRef = this.matDialog.open(PickUsersComponent, {
      disableClose: false,
      panelClass: 'pick-user-modal',
      data: {
        recivers: this.manager ? [this.manager?.user] : [],
        disabledUsers: members.map((item) => item.user),
        correrspondenceMode: false,
      },
    });
    this.receiversDialogRef.componentInstance.multipleSelection = false;
    this.receiversDialogRef.afterClosed().subscribe((data) => {
      if (data && data.length > 0) {
        this.manager = {
          id: 0,
          type: userType.MANAGER,
          user: data[0],
        };
        let users = members.map((item) => item.user.id) || [];
        // data here is  single item inside array  which is the group manager data[0] = group manager
        users.push(this.manager.user.id);
        this.formGroup.get('users').setValue(users);

        // replace  with  the new manager
        let managerIndex = this.currentGroup?.users.findIndex(
          (item) => item.type == userType.MANAGER
        );
        if (managerIndex > -1)
          this.currentGroup.users[managerIndex] = this.manager;

        this.cdr.detectChanges();
      }
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  backClicked() {
    this.location.back();
  }
}
