import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ILangFacade } from '@core/facades/lang.facade';
import { PhonebookState } from '@core/states/phonebook/phonebook.state';
import { Store } from '@ngrx/store';
import { Select } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TranslationService } from '../i18n/translation.service';
import { EmergenciesPhonebookService } from './emergencies-phonebook.service';
import { PhonebookDialogComponent } from './phonebook-dialog/phonebook-dialog.component';

@Component({
  selector: 'app-emergencies-phonebook',
  templateUrl: './emergencies-phonebook.component.html',
  styleUrls: ['./emergencies-phonebook.component.scss'],
})
export class EmergenciesPhonebookComponent implements OnInit {
  //MatPaginator is keyword here

  public page$: Observable<any[]>;
  @Select(PhonebookState.loading)
  public loading$: Observable<boolean>;
  @Select(PhonebookState.totalRecords)
  public totalRecords$: Observable<number>;
  // @Select(BrowseUsersState.state)
  // public state$: Observable<BrowseUsersStateModel>;

  // @Select(BrowseUsersState.hasFilters)
  // public hasFilters$: Observable<boolean>;
  public paginator$: Observable<PageEvent>;
  public phonebook$: Observable<any[]>;

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
  DialogRef: MatDialogRef<any>;

  loading: boolean = true;
  dataSource = new MatTableDataSource<any>();

  searchForm: FormGroup;
  maxDate: Date;
  minDate: Date;
  lang = 'en';
  constructor(
    private translationService: TranslationService,
    private service: EmergenciesPhonebookService,
    private fb: FormBuilder,
    public _matDialog: MatDialog,
    private store: Store,
    private langFacade: ILangFacade
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();

    this.page$ = this.store.select(PhonebookState.page);

    this.service.getPhonebook().subscribe();

    this.phonebook$ = this.service.phonebookChange$.pipe(
      tap((res) => (this.loading = false))
    );
    this.paginator$ = this.service.paginatorChange$;

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
    this.loading = true;
    this.service.getPhonebook(20, 0, form).subscribe();
  }
  addItem(item): void {
    this.DialogRef = this._matDialog.open(PhonebookDialogComponent, {
      disableClose: false,
      panelClass: 'new-item-modal',
      data: {
        type: item ? 'edit' : 'new',
        item: item,
      },
    });
  }
  deleteItem(element) {
    this.DialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false,
      panelClass: 'modal',
    });

    this.DialogRef.componentInstance.confirmMessage = 'GENERAL.DELETE_CONFIRM';
    this.DialogRef.componentInstance.icon = 'error_outline';
    this.DialogRef.componentInstance.actionName = 'ACTIONS.DELETE';

    this.DialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loading = true;
        this.service.deletePhoneItem(element?.id).subscribe();
      }
      this.DialogRef = null;
    });
  }
  pageChange(event: PageEvent) {
    this.loading = true;
    this.service.getPhonebook(event.pageSize, event.pageIndex).subscribe();
  }
  resetSearchForm() {
    this.searchForm.reset();
    this.loading = true;
    this.service.getPhonebook().subscribe((res) => {
      this.dataSource.data = res.content;
    });
  }
}
