import { Optional } from '@angular/core';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  filter,
} from 'rxjs/operators';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';

import { BehaviorSubject, Subject, Subscription, of } from 'rxjs';
import { throttleTime, tap } from 'rxjs/operators';

import { TranslationService } from 'src/app/modules/i18n/translation.service';

import { SharedServicesService } from '../shared-services.service';
@Component({
  selector: 'app-pick-users',
  templateUrl: './pick-users.component.html',
  styleUrls: ['./pick-users.component.scss'],
})
export class PickUsersComponent implements OnInit, OnDestroy {
  @ViewChild('users') usersSelection: MatSelectionList;
  @Output() selectionChange = new EventEmitter();
  @Input() isModal = true;
  @Input() multipleSelection = true;
  @Input()
  correrspondenceMode = true;
  selectAllUsers = false;
  searching = false;
  lang = 'en';
  recivers = [];
  disabledUsers = [];
  searchControl: FormControl;

  private subscriptions: Subscription[] = [];
  // filterTextChanged: Subject<string> = new Subject<string>();

  // pagination
  public users$ = new BehaviorSubject([]);
  private users = [];
  private usersPage = 0;
  private completeusers = false;
  public usersLoading = false;
  private nextPageStore = new Subject();
  private nextPage$ = this.nextPageStore
    .asObservable()
    .pipe(throttleTime(1000));
  // nextPage(event?) {
  //   console.log(event)
  //   this._nextPage();
  //   this.nextPageStore.next();
  // }

  // filtering
  // private search = '';
  // private filteringStore = new Subject();
  // private filtering$ = this.filteringStore
  //   .asObservable()
  //   .pipe(filter(value=> value?.length>=3),debounceTime(700),distinctUntilChanged());

  constructor(
    private translationService: TranslationService,
    private sharedService: SharedServicesService,
    private cdr: ChangeDetectorRef,
    @Optional() public dialogRef: MatDialogRef<PickUsersComponent>,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: any = {}
  ) {
    if (data) {
      this.recivers = data['recivers'];
      this.disabledUsers = data['disabledUsers'] || [];
      this.correrspondenceMode = data['correrspondenceMode'];
      this.merageLists([]);
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.searchControl = new FormControl('');
    this.lang = this.translationService.getSelectedLanguage();
    // tslint:disable-next-line: deprecation
    this.nextPage(event);
    // let sub = this.filtering$.subscribe(async (_) => {
    //   // keep  selected items before  filter
    // let ids = this.usersSelection.selectedOptions.selected.map((item) => {
    //   return item['value'];
    // });

    // this.users = this.users.filter((user) => {
    //   if (!ids.includes(user.id)) {
    //     return user;
    //   }
    // });
    // this.merageLists();
    // // reset  flages
    // this.usersPage = 0;
    // this.completeusers = false;
    // this.usersLoading = false;
    //  this.users$.next(this.users);
    //await this.nextPage();
    //});
    // this.subscriptions.push(sub);
    // sub = this.nextPage$.subscribe(async (_) => {
    //   await this._nextPage();
    // });
    // this.subscriptions.push(sub);

    this.searchControl.valueChanges
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        tap(() => {
          this.usersPage = 0;
          this.usersLoading = true;
        }),
        switchMap((value) =>
          this.sharedService.getAllUsers(this.usersPage, 10, value)
        )
      )
      .subscribe((data) => {
        let ids = this.usersSelection.selectedOptions.selected.map((item) => {
          return item['value'];
        });

        this.users = this.users.filter((user) => {
          if (!ids.includes(user.id)) {
            return user;
          }
        });
        this.merageLists(data);
        // reset  flages
        this.usersPage = 0;
        this.completeusers = false;

        this.users$.next(this.users);
      });
  }

  getAllSelectedData() {
    let users = this.usersSelection.selectedOptions.selected.map((item) => {
      return item['value'];
    });
    this.selectionChange.emit({
      users,
      selectAllUsers: this.selectAllUsers,
    });
  }

  nextPage(event) {
    this.sharedService
      .getAllUsers(this.usersPage, 10, this.searchControl.value)
      .subscribe((users) => {
        users = this.removeSelectedFromMainList(users);
        this.completeusers = users?.length == 0;
        this.users = [...this.users, ...users];
        this.users$.next(this.users);
        this.usersPage++;
        this.usersLoading = false;
        this.cdr.detectChanges();
      });
  }

  // async applyFilter(event: Event) {
  //   this.searching = true;
  //   this.search = (event.target as HTMLInputElement).value;
  //   this.filteringStore.next(this.search);
  // }

  /**
   * we use  this method  to  remove  any  user from  new  users page that selected
   */
  removeSelectedFromMainList(users: any[]) {
    let ids = this.recivers.map((item) => item.id);
    ids = [...ids, ...this.disabledUsers.map((item) => item.id)];
    return users.filter((user) => {
      if (!ids.includes(user.id)) {
        return user;
      }
    });
  }

  merageLists(users?: any[]) {
    this.users = [...this.disabledUsers, ...this.recivers];

    this.users.map((item) => {
      item['nameAr'] = item['firstNameAr'] + ' ' + item['lastNameAr'];
      item['nameEn'] = item['firstNameEn'] + ' ' + item['lastNameEn'];
      item['nameAr'] = item['nameAr']?.replace('null', ' ');
      item['nameEn'] = item['nameEn']?.replace('null', ' ');
      return item;
    });
  }
  // if component  is Dialog
  saveAndClose() {
    let users = this.usersSelection.selectedOptions.selected.map((item) => {
      // if multipleSelection is false  method will  return  full selected  user  object else only  ids
      if (!this.multipleSelection) {
        return this.users.find((user) => user.id == item.value);
      } else if (!item.disabled) {
        return this.users.find((user) => user.id == item.value);
      }
    });
    users = users.filter((item) => item != undefined);
    let unloadedUsers = this.recivers.filter((item) => {
      if (this.users.findIndex((user) => user.id == item.id) == -1) {
        return item.id;
      }
    });

    this.dialogRef.close(users.concat(unloadedUsers));
  }

  isSelected(id) {
    if (this.recivers != null) {
      return (
        this.selectAllUsers ||
        this.recivers.findIndex((item) => item.id == id) != -1
      );
    } else {
      return this.selectAllUsers;
    }
  }
  isDisabled(id) {
    return this.disabledUsers.findIndex((item) => item.id == id) != -1;
  }

  selectAllChange() {
    this.selectAllUsers
      ? this.usersSelection.deselectAll()
      : this.usersSelection.selectAll();

    if (this.disabledUsers.length > 0) {
      this.disabledUsers.forEach((element) => {
        this.usersSelection.options.find(
          (item) => item.value == element.id
        ).selected = true;
      });
    }
    this.selectAllUsers = !this.selectAllUsers;
    this.getAllSelectedData();
  }
}
