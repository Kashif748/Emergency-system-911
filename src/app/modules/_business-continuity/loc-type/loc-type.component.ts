import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DATA } from '../tabs.const';

@Component({
  selector: 'app-loc-type',
  templateUrl: './loc-type.component.html',
  styleUrls: ['./loc-type.component.scss'],
})
export class LocTypeComponent implements OnInit {
  public loading = false;
  public columns: string[] = ['criticality', 'rto', 'desc'];
  public page = [];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.page = DATA.locTypes.map((item) => {
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
