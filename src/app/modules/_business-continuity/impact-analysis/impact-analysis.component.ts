import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DATA } from '../tabs.const';

@Component({
  selector: 'app-impact-analysis',
  templateUrl: './impact-analysis.component.html',
  styleUrls: ['./impact-analysis.component.scss'],
})
export class ImpactAnalysisComponent implements OnInit {
  public loading = false;
  public columns: string[] = ['impactType', 'low', 'medium', 'hight', 'action'];
  public page = [];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.page = DATA.impactAnalysis.map((item) => {
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
