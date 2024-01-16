import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {TranslateService} from "@ngx-translate/core";
import {ILangFacade} from "@core/facades/lang.facade";
import {Observable} from "rxjs";
import {CommonDataState} from "@core/states";
import {PriorityProjection} from "../../../api/models/priority-projection";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @Select(CommonDataState.priorities)
  public priorities$: Observable<PriorityProjection[]>;

  constructor(
      private store: Store,
      private translate: TranslateService,
      private langFacade: ILangFacade,
  ) { }

  ngOnInit(): void {
  }
  search() {
    //this.store.dispatch(new BrowseVenderAction.LoadVender());
  }

  clear() {
  /*  this.store.dispatch([
      new BrowseVenderAction.UpdateFilter({ clear: true }),
      new BrowseVenderAction.LoadVender(),
    ]);*/
  }
}
