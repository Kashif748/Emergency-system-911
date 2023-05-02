import { Component, OnInit } from '@angular/core';
import { BrowseGroupsAction } from '../../_team-mgmt/states/browse-groups.action';
import { Store } from '@ngxs/store';
import { DATA } from '../tabs.const';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rto-list-content',
  templateUrl: './rto-list-content.component.html',
  styleUrls: ['./rto-list-content.component.scss'],
})
export class RtoListContentComponent implements OnInit {
  public loading = false;
  public display = false;
  public columns: string[] = ['criticality', 'rto', 'desc'];
  public page = [];
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.page = DATA.rtoList.map((item) => {
      return {
        ...item,
        actions: [
          {
            label: this.translate.instant('ACTIONS.EDIT'),
            icon: 'pi pi-pencil',
            command: () => {
              // this.openDialog(item.id);
            },
          },
        ],
      };
    });
  }

  openView(groupId?: number) {
    // this.store.dispatch(new BrowseGroupsAction.OpenView({ id: groupId }));
  }

  openDialog(groupId?: number) {
    this.display = true;
  }
}
