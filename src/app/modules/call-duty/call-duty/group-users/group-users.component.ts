import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { userType } from 'src/app/modules/groups-management/group.model';
import { GroupsManagementService } from 'src/app/modules/groups-management/groups-management.service';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.scss'],
})
export class GroupUsersComponent implements OnInit {
  lang = '';
  users: any[] = [];
  loading = false;
  userTypes = userType;

  constructor(
    private groupService: GroupsManagementService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GroupUsersComponent>,
    private _translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.lang = this._translateService.currentLang;
    console.log(this.data);

    if (this.data?.users) this.users = this.data.users;
  }
}
