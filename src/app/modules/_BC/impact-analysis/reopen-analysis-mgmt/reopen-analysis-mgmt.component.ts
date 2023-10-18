import { Component, OnInit } from '@angular/core';
import {BrowseImpactAnalysisAction} from "../states/browse-impact-analysis.action";
import {Store} from "@ngxs/store";
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-reopen-analysis-mgmt',
  templateUrl: './reopen-analysis-mgmt.component.html',
  styleUrls: ['./reopen-analysis-mgmt.component.scss']
})
export class ReopenAnalysisMgmtComponent implements OnInit {
  opened$: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'send')
    );
  }

  toggleDialog() {
    this.store.dispatch(
      new BrowseImpactAnalysisAction.ToggleDialog({ dialog: 'send' })
    );
  }

  close() {
    this.store.dispatch(new BrowseImpactAnalysisAction.ToggleDialog({}));
  }

}
