import { Component, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { PhonebookState } from '@core/states/phonebook/phonebook.state';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ExternalPhonebook } from 'src/app/api/models';
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
export class EmergenciesPhonebookComponent implements OnInit {
  @Select(PhonebookState.loading)
  public loading$: Observable<boolean>;
  @Select(PhonebookState.totalRecords)
  public totalRecords$: Observable<number>;
  @Select(BrowsePhonebookState.state)
  public state$: Observable<BrowsePhonebookStateModel>;

  public page$: Observable<ExternalPhonebook[]>;

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
}
