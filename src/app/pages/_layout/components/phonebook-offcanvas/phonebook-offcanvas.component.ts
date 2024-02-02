import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PhonebookState } from '@core/states/phonebook/phonebook.state';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
  ExternalPhonebook,
  ExternalPhonebookProjection,
  IdNameProjection,
} from 'src/app/api/models';
import { OffcanvasPhonebookAction } from './states/offcanvas-phonebook.action';
import {
  OffcanvasPhonebookState,
  OffcanvasPhonebookStateModel,
} from './states/offcanvas-phonebook.state';
import { Clipboard } from '@angular/cdk/clipboard';
import { MessageHelper } from '@core/helpers/message.helper';
import { PageRequestModel } from '@core/models/page-request.model';
import { TranslateService } from '@ngx-translate/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { CommonDataState, OrgAction, OrgState } from '@core/states';
import { PhonebookAction } from '@core/states/phonebook/phonebook.action';

@Component({
  selector: 'app-phonebook-offcanvas',
  templateUrl: './phonebook-offcanvas.component.html',
  styleUrls: ['./phonebook-offcanvas.component.scss'],
})
export class PhonebookOffcanvasComponent implements OnInit, AfterViewInit {
  display;
  phonebookTypes = [];
  @Select(PhonebookState.sidebarLoading)
  public loading$: Observable<boolean>;
  @Select(PhonebookState.totalSidebarPageRecords)
  public totalRecords$: Observable<number>;
  @Select(OffcanvasPhonebookState.state)
  public state$: Observable<OffcanvasPhonebookStateModel>;

  @Select(OffcanvasPhonebookState.hasFilters)
  public hasFilters$: Observable<boolean>;

  @Select(PhonebookState.externalsOrgs)
  public externalsOrgs$: Observable<any[]>;

  public position$ = this.langFacade.vm$.pipe(
    map(({ ActiveLang: { key } }) => (key === 'ar' ? 'left' : 'right'))
  );
  public page$: Observable<ExternalPhonebookProjection[]>;
  constructor(
    private store: Store,
    private clipboard: Clipboard,
    private messageHelper: MessageHelper,
    private translate: TranslateService,
    private langFacade: ILangFacade
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new PhonebookAction.LoadExternalOrgs({ orgName: '' }));
    this.page$ = this.store.select(PhonebookState.sidebarPage).pipe(
      filter((p) => !!p),
      map((page) => page?.filter((u) => u.isActive))
    );
  }
  ngAfterViewInit(): void {
    this.phonebookTypes = [
      {
        icon: 'pi pi-bars',
        name: 'PHONEBOOK.EXTERNAL',
        value: false,
      },
      {
        icon: 'pi pi-th-large',
        name: 'PHONEBOOK.INTERNAL',
        value: true,
      },
    ];
  }
  openSideBar() {
    this.display = !this.display;
    if (this.display) {
      this.loadPage({
        first: 0,
        rows: 20,
      });
    }
  }

  openDialog(id?: number) {
    this.store.dispatch(new OffcanvasPhonebookAction.ToggleDialog());
  }
  search() {
    this.store.dispatch(new OffcanvasPhonebookAction.LoadPhonebook());
  }

  clear() {
    this.store.dispatch([
      new OffcanvasPhonebookAction.UpdateFilter({ clear: true }),
      new OffcanvasPhonebookAction.LoadPhonebook(),
    ]);
  }
  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }

    this.store.dispatch(new OffcanvasPhonebookAction.UpdateFilter(filter));
  }
  loadByStatus(filter: { [key: string]: any }) {
    this.store
      .dispatch(new OffcanvasPhonebookAction.UpdateFilter(filter))
      .toPromise()
      .then(() => {
        this.search();
      });
  }

  public loadPage(event: PageRequestModel) {
    this.store.dispatch(
      new OffcanvasPhonebookAction.LoadPhonebook({
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
  copyToClipboard(phonebook: ExternalPhonebook) {
    this.clipboard.copy(phonebook.mobileNumber);
    this.messageHelper.success({
      summary: this.translate.instant('COMMON.SUCCESSFULLY_COPIED'),
      detail: '',
    });
  }
}
