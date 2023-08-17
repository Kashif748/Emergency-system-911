import {Component, OnInit} from '@angular/core';
import {ILangFacade} from '@core/facades/lang.facade';
import {TABS} from "../resouces/tempData.conts";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {BrowseResourceAction} from "./states/browse-resource.action";
import {BrowseResourceState} from "./states/browse-resource.state";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.components.scss'],
})
export class ResourcesComponent implements OnInit {
  tabs = TABS;


  @Select(BrowseResourceState.tabIndex)
  public tabIndex$: Observable<any>;

  public dir$ = this.lang.vm$.pipe(
    map(({ ActiveLang: { key } }) => (key === 'ar' ? 'rtl' : 'ltr'))
  );
  constructor(
    private lang: ILangFacade,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private store: Store) {}

  ngOnInit(): void {
    console.log(this.tabs);
  }
  changeTab(index: number) {
    this.store
      .dispatch([
        new BrowseResourceAction.ChangeTab({
          index,
        }),
      ])
      .toPromise()
      .then(() => {
        this.router.navigate(
          ['bc/resources/' + this.tabs[index].router],
          {
            queryParamsHandling: 'merge',
          }
        );
      });
  }
}
