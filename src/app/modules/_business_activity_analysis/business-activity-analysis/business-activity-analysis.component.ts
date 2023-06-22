import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TABS } from '../tempData.conts';

@Component({
  selector: 'app-business-activity-analysis',
  templateUrl: './business-activity-analysis.component.html',
  styleUrls: ['./business-activity-analysis.component.scss'],
})
export class BusinessActivityAnalysisComponent implements OnInit {
  tabs = TABS;
  tabIndex = 0;
  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const path = this.router.url.split('/').pop();
    const index = this.tabs.findIndex((item) => item.router == path);
    console.log(path ,index);

    if (index >= 0) {
      this.tabIndex = index;
    }
  }
  changeTab(event) {
    // this.tabIndex = event;
    this.router.navigate([
      'business-activity-analysis/' + this.tabs[event].router,
    ]);
  }
}
