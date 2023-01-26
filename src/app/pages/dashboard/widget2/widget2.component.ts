import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '@core/services/common.service';
import { PropTranslatorPipe } from '@shared/pipes/prop-translator.pipe';

import { Subscription } from 'rxjs';
import { distinctUntilKeyChanged, skip, tap } from 'rxjs/operators';

import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-widget2',
  templateUrl: './widget2.component.html',
  styleUrls: ['./widget2.component.scss'],
})
export class Widget2Component implements OnInit, OnChanges {
  @Input('widgets') widgets: any[];

  bscriptions: Subscription[] = [];

  priorities: any[];
  constructor(protected commonService: CommonService) {}

  ngOnInit(): void {
    const commonData = this.commonService.getCommonData();
    this.priorities = commonData?.priorities;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['widgets'].currentValue?.length > 0) {
      this.widgets = changes['widgets'].currentValue;
      this.widgets = this.widgets.map((widget) => {
        const priority = this.priorities.find((item) => item.id === widget.id);
        widget['color'] = priority.color;
        return widget;
      });
    }
  }
}
