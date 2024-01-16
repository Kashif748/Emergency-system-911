import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable, Subject} from "rxjs";
import {IncidentCategoriesAction} from "@core/states/incident-categories/incident-categories.action";
import {IncidentCategoriesState} from "@core/states/incident-categories/incident-categories.state";
import {IncidentCategoryProjaction} from "../../../../api/models/incident-category-projaction";

@Component({
  selector: 'app-main-category-widget',
  templateUrl: './main-category-widget.component.html',
  styleUrls: ['./main-category-widget.component.scss']
})
export class MainCategoryWidgetComponent implements OnInit, OnDestroy {
  @Select(IncidentCategoriesState.incidentCategories)
  public incidentCategories$: Observable<IncidentCategoryProjaction[]>;

  @Select(IncidentCategoriesState.loading)
  public loading$: Observable<boolean>;

  private destroy$ = new Subject();
  constructor(
      private store: Store,
  ) { }

  ngOnInit(): void {
    this.store
        .dispatch([
          new IncidentCategoriesAction.LoadIncidentCategories(),
        ]);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
