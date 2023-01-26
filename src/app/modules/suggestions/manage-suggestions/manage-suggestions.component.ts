import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { BehaviorSubject, Subscription } from 'rxjs';

import { SuggestionService } from '@core/api/services/suggestion.service';
import { Suggestion } from 'src/app/core/api/models/suggestion-models';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';

import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  startWith,
} from 'rxjs/operators';

import { OrgService } from '@core/api/services/org.service';

import { StatusDialogComponent } from '../status-dialog/status-dialog.component';
import { TranslationService } from '../../i18n/translation.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';

class State {
  dataSource: MatTableDataSource<Suggestion> =
    new MatTableDataSource<Suggestion>();
}

@Component({
  selector: 'app-manage-suggestions',
  templateUrl: './manage-suggestions.component.html',
  styleUrls: ['./manage-suggestions.component.scss'],
})
export class ManageSuggestionsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  displayedColumns: string[] = [
    'id',
    'title',
    'username',
    'organization',
    'creation-date',
    'status',
    'actions',
  ];
  loading = false;
  @ViewChild(MatSort) sort: MatSort;
  private sortState;

  public filterCrtl = new FormControl();
  private filter: { title?: string } = {};

  lang;
  public paginationConfig = {
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 0,
    id: 'pagination',
  };
  private subscriptions: Subscription[] = [];
  result = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('jwt'));

  private state: State = new State();

  private store = new BehaviorSubject<State>(this.state);

  public vm$ = this.store.asObservable();
  suggestions = [];

  private updateState(state: State) {
    this.store.next({ ...(this.state = state) });
  }

  mangeStatusDialog() {
    this.dialog.open(StatusDialogComponent, {
      minWidth: '350px',
      maxHeight: '500px',
    });
  }

  constructor(
    private suggService: SuggestionService,
    private alertService: AlertsService,
    private router: Router,
    private dialog: MatDialog,
    private translationService: TranslationService,
    private orgService: OrgService
  ) {
    this.lang = this.translationService.getSelectedLanguage();
  }

  ngAfterViewInit(): void {
    this.updateState(this.state);
  }
  ngOnInit() {
    this.onPagination({ pageIndex: 1, pageSize: 10, length: 10 }, '', null);
    this.filterCrtl.valueChanges
      .pipe(
        filter((val) => typeof val === 'string'),
        startWith(''),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((data) => {
        this.filter.title = data;
        this.updateState(this.state);
      });

    this.filterCrtl.valueChanges.subscribe((term) => {
      this.suggService.getAll(10, 0, '', term).subscribe((res) => {
        this.state.dataSource.data = res?.result?.content;
        this.suggestions = res;
        this.updateState(this.state);
      });
    });
  }
  customSort(e) {
    let sort = e.active + ',' + e.direction;
    // this.sort = event;

    this.onPagination(
      { pageIndex: 1, pageSize: 10, length: 10 },
      sort,
      this.filter.title ?? ''
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  edit(id) {
    // this.dialog.open(ReviewDialogComponent, {
    //   minWidth: "350px",
    //   maxHeight: "500px",
    //   data: { suggId: id },
    // });
    this.router.navigate(['/suggestions/review/' + id]);
  }

  onPagination(event: PageEvent, sort, pageNo, title?) {
    this.loading = true;
    if (pageNo) {
      this.paginationConfig.currentPage = pageNo;
    } else {
      this.paginationConfig.currentPage = event.pageIndex;
      this.paginationConfig.itemsPerPage = event.pageSize;
    }

    let sub = this.orgService
      .getAll()
      .pipe(
        map((response) => response.result),
        mergeMap((orgs: any[]) => {
          return this.suggService
            .getAll(
              this.paginationConfig.itemsPerPage,
              this.paginationConfig.currentPage - 1,
              sort,
              this.filter.title ?? ''
            )
            .pipe(
              map((response) => {
                this.paginationConfig.totalItems =
                  response.result.totalElements;
                let suggs = [...response.result.content];
                suggs = suggs.map((sugg: Suggestion) => {
                  const org = orgs.find(
                    (o) => o.id == sugg.user.orgStructure.id
                  );
                  return { ...sugg, org: org };
                });
                return suggs;
              })
            );
        })
      )
      .subscribe(
        (suggs) => {
          this.state.dataSource.data = suggs;
          this.suggestions = suggs;

          if (suggs) {
            this.state.dataSource.data = suggs ?? [];
            //  this.state.dataSource.paginator.length = result.totalElements;

            this.updateState(this.state);
          }
          this.updateState(this.state);

          this.loading = false;
        },
        () => {
          this.alertService.openFailureSnackBar();
          this.loading = false;
        }
      );
    this.subscriptions = [...this.subscriptions, sub];
  }

  pageChanged(event) {
    this.paginationConfig.currentPage = event;
    this.onPagination(null, '', event);
  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.state.dataSource.filter = filterValue.trim().toLowerCase();
  //   this.state.dataSource.filterPredicate = (suggestion, filter) => {
  //     let match = false;
  //     Object.keys(suggestion).forEach((k) => {
  //       if (suggestion[k] !== Object(suggestion[k])) {
  //         match = match || `${suggestion[k] ?? ""}`.toLowerCase().includes(filter);
  //       } else {
  //         Object.keys(suggestion[k]).forEach((k1) => {
  //           match = match || `${suggestion[k][k1] ?? ""}`.toLowerCase().includes(filter);
  //         });
  //       }
  //     });
  //     return match;
  //   };
  //   this.updateState(this.state);
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter.title = filterValue;
    this.updateState(this.state);
  }
}
