import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DATA } from '../tabs.const';

@Component({
  selector: 'app-activity-frquency',
  templateUrl: './activity-frquency.component.html',
  styleUrls: ['./activity-frquency.component.scss'],
})
export class ActivityFrquencyComponent implements OnInit {
  public loading = false;
  public columns: string[] = ['criticality', 'rto', 'desc'];
  public page = [];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.page = DATA.activityFrquency.map((item) => {
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
}
