import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DATA } from '../tabs.const';

@Component({
  selector: 'app-imp-level-working',
  templateUrl: './imp-level-working.component.html',
  styleUrls: ['./imp-level-working.component.scss'],
})
export class ImpLevelWorkingComponent implements OnInit {
  public loading = false;
  public columns: string[] = ['criticality', 'rto', 'desc'];
  public page = [];
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.page = DATA.impactLevelsWorking.map((item) => {
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
}
