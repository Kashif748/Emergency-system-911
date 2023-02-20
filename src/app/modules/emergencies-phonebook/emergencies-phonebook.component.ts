import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ILangFacade } from '@core/facades/lang.facade';
import { PhonebookState } from '@core/states/phonebook/phonebook.state';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ExternalPhonebook } from 'src/app/api/models';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TranslationService } from '../i18n/translation.service';
import { EmergenciesPhonebookService } from './emergencies-phonebook.service';
import { PhonebookDialogComponent } from './phonebook-dialog/phonebook-dialog.component';
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

  DialogRef: MatDialogRef<any>;

  dataSource = new MatTableDataSource<any>();

  searchForm: FormGroup;
  maxDate: Date;
  minDate: Date;
  lang = 'en';
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
    private translationService: TranslationService,
    private translate: TranslateService,
    private service: EmergenciesPhonebookService,
    private fb: FormBuilder,
    public _matDialog: MatDialog,
    private store: Store,
    private langFacade: ILangFacade
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    const userActions = [
      {
        label: this.translate.instant('ACTIONS.EDIT'),
        icon: 'pi pi-pencil',
      },
      {
        label: this.translate.instant('ACTIONS.DELETE'),
        icon: 'pi pi-trash',
      },
    ] as MenuItem[];
    this.page$ = this.store.select(PhonebookState.page).pipe(
      filter((p) => !!p),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                ...userActions[0],
                command: () => {
                  this.openDialog(u.id);
                },
              },
              {
                ...userActions[1],
                command: () => {
                  this.delete(u);
                },
              },
            ],
          };
        })
      )
    );
    this.createForm();
  }

  createForm() {
    this.searchForm = this.fb.group({
      name: '',
      orgName: '',
      mobileNumber: '',
    });
  }
  onSubmit() {
    let form = {
      ...this.searchForm.value,
      mobileNumber: this.searchForm.get('mobileNumber').value?.number,
    };

    // this.service.getPhonebook(20, 0, form).subscribe();
  }
  openDialog(id?: number) {
    this.store.dispatch(
      new BrowsePhonebookAction.ToggleDialog({ phonebookId: id })
    );
  }
  delete(element) {
    this.DialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false,
      panelClass: 'modal',
    });

    this.DialogRef.componentInstance.confirmMessage = 'GENERAL.DELETE_CONFIRM';
    this.DialogRef.componentInstance.icon = 'error_outline';
    this.DialogRef.componentInstance.actionName = 'ACTIONS.DELETE';

    this.DialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.deletePhoneItem(element?.id).subscribe();
      }
      this.DialogRef = null;
    });
  }
  pageChange(event: PageEvent) {
    this.service.getPhonebook(event.pageSize, event.pageIndex).subscribe();
  }
  resetSearchForm() {
    this.searchForm.reset();

    this.service.getPhonebook().subscribe((res) => {
      this.dataSource.data = res.content;
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
}
