import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { Subscription, BehaviorSubject } from "rxjs";

import { Suggestion } from "src/app/core/api/models/suggestion-models";
import { SuggestionStatusService } from "@core/api/services/suggestion-status.service";
import { SuggestionService } from "@core/api/services/suggestion.service";
import { AlertsService } from "src/app/_metronic/core/services/alerts.service";

class State {
  dataSource: MatTableDataSource<Suggestion> = new MatTableDataSource<Suggestion>();
}

@Component({
  selector: "app-my-suggestions",
  templateUrl: "./my-suggestions.component.html",
  styleUrls: ["./my-suggestions.component.scss"],
})
export class MySuggestionsComponent
  implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = [
    "id",
    "title",
    "creation-date",
    "status",
    "actions",
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private subscriptions: Subscription[] = [];
  paginationConfig = {
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 0,
    id: "paging",
  };

  private state: State = new State();

  private store = new BehaviorSubject<State>(this.state);

  public vm$ = this.store.asObservable();

  private updateState(state: State) {
    this.store.next({ ...(this.state = state) });
  }

  constructor(
    private suggService: SuggestionService,
    private suggStatusService: SuggestionStatusService,
    private alertService: AlertsService
  ) {}
  ngAfterViewInit(): void {
    this.state.dataSource.paginator = this.paginator;
    this.updateState(this.state);
  }

  ngOnInit() {
    let commonData = JSON.parse(localStorage.getItem("commonData"));
    this.currentUser = commonData["currentUserDetails"];
    this.onPagination({ pageIndex: 0, pageSize: 10, length: 10 });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private currentUser: any;

  loading = false;
  onPagination(event: PageEvent) {
    this.loading = true;
    let sub = this.suggService
      .getAll(event.pageSize, event.pageIndex)
      .subscribe(
        (ok) => {
          if (ok) {
            this.state.dataSource.data =
              ok.result.filter((s) => s.user.id == this.currentUser.id) ?? [];
            this.updateState(this.state);
            this.loading = false;
          }
        },
        (ex) => {
          this.alertService.openFailureSnackBar();
        }
      );
    this.subscriptions = [...this.subscriptions, sub];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.state.dataSource.filter = filterValue.trim().toLowerCase();
    this.updateState(this.state);
  }
  pageChanged(event) {
    this.paginationConfig.currentPage = event;
  }
}
