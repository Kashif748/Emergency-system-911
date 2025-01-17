import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { CommonDataState, OrgAction, OrgState } from '@core/states';
import { PhonebookAction } from '@core/states/phonebook/phonebook.action';
import { PhonebookState } from '@core/states/phonebook/phonebook.state';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { auditTime, filter, map, startWith, takeUntil } from 'rxjs/operators';
import {
  ExternalPhonebookProjection,
  IdNameProjection,
} from 'src/app/api/models';
import { BrowsePhonebookAction } from './states/browse-phonebook.action';
import {
  BrowsePhonebookState,
  BrowsePhonebookStateModel,
} from './states/browse-phonebook.state';

@Component({
  selector: 'app-emergencies-phonebook',
  templateUrl: './emergencies-phonebook.component.html',
  styleUrls: ['./emergencies-phonebook.component.scss'],
})
export class EmergenciesPhonebookComponent implements OnInit, OnDestroy {
  @Select(PhonebookState.loading)
  public loading$: Observable<boolean>;
  @Select(PhonebookState.totalRecords)
  public totalRecords$: Observable<number>;
  @Select(BrowsePhonebookState.state)
  public state$: Observable<BrowsePhonebookStateModel>;
  @Select(OrgState.orgs)
  orgs$: Observable<IdNameProjection[]>;
  public page$: Observable<ExternalPhonebookProjection[]>;

  @Select(PhonebookState.externalsOrgs)
  public externalsOrgs$: Observable<any[]>;
  private auditLoadExternalOrgs$ = new Subject<string>();
  private destroy$ = new Subject();

  displayedColumns: string[] = [
    'firstName',
    'title',
    'jobTitle',
    'phoneNumber',
    'mobileNumber',
    'orgName',
    'isActive',
    'actions',
  ];
  constructor(
    private translate: TranslateService,
    private store: Store,
    private langFacade: ILangFacade
  ) {}

  ngOnInit(): void {
    this.loadOrgs();
    this.auditLoadExternalOrgs$
      .pipe(startWith(''), takeUntil(this.destroy$), auditTime(2000))
      .subscribe((search: string) => {
        this.store.dispatch(
          new PhonebookAction.LoadExternalOrgs({ orgName: search })
        );
      });
    this.page$ = this.store.select(PhonebookState.page).pipe(
      filter((p) => !!p),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                label: this.translate.instant('ACTIONS.EDIT'),
                icon: 'pi pi-pencil',
                command: () => {
                  this.openDialog(u.id);
                },
              },
            ],
          };
        })
      )
    );
  }

  openDialog(id?: number) {
    this.store.dispatch(
      new BrowsePhonebookAction.ToggleDialog({ phonebookId: id })
    );
  }

  search() {
    this.store.dispatch(new BrowsePhonebookAction.LoadPhonebook());
  }

  clear() {
    this.store.dispatch([
      new BrowsePhonebookAction.UpdateFilter({ clear: true }),
      new BrowsePhonebookAction.LoadPhonebook(),
    ]);
  }
  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }

    this.store.dispatch(new BrowsePhonebookAction.UpdateFilter(filter));
  }
  loadByStatus(filter: { [key: string]: any }) {
    this.store
      .dispatch(new BrowsePhonebookAction.UpdateFilter(filter))
      .toPromise()
      .then(() => {
        this.search();
      });
  }

  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new BrowsePhonebookAction.LoadPhonebook({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
  }
  loadOrgs() {
    const currentOrg = this.store.selectSnapshot(CommonDataState.currentOrg);
    this.store.dispatch(new OrgAction.LoadOrgs({ orgId: currentOrg?.id }));
  }
  filterOrg (event) {
    this.auditLoadExternalOrgs$.next(event);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
