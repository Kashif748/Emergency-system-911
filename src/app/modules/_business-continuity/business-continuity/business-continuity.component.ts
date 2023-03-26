import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { TABS } from '../tabs.const';

@Component({
  selector: 'app-business-continuity',
  templateUrl: './business-continuity.component.html',
  styleUrls: ['./business-continuity.component.scss'],
})
export class BusinessContinuityComponent implements OnInit, AfterViewInit {
  items: MenuItem[] = [];

  constructor(private lang: ILangFacade, private translate: TranslateService) {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.items = this.translateMenu(TABS);
      console.log(this.items);
    }, 1000);
  }
  translateMenu(items: MenuItem[]): MenuItem[] {
    return items.map((tab) => {
      tab.label = this.translate.instant(tab.label);
      if (tab.items && tab.items.length > 0) {
        tab.items = this.translateMenu(tab.items);
      }
      return tab;
    });
  }
}
