import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { map, pluck, startWith, throttleTime } from 'rxjs/operators';

import { TranslationService } from 'src/app/modules/i18n/translation.service';

import { UserService } from '../../../core/api/services/user.service';

@Component({
  selector: 'app-to-users',
  templateUrl: './to-users.component.html',
  styleUrls: ['./to-users.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToUsersComponent),
      multi: true,
    },
  ],
})
export class ToUsersComponent
  implements OnInit, ControlValueAccessor, OnDestroy, OnChanges
{
  lang: string;
  selectedUsers: any[];
  allUsers: any[];
  disabled: boolean;
  selectedItem: string;
  Ctrl = new FormControl();
  filteredUsers: Observable<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() selectAll: boolean;
  @Output() selectAllChange: EventEmitter<boolean> = new EventEmitter();

  @Input('isRequired') isRequired: boolean = false;
  @Input('apiOption') apiOption: boolean;
  @Input('placeholder') placeholder: string;
  @Input('hasCClabel') hasCClabel: boolean = false;
  @Input('hasCCbutton') hasCCbutton: boolean = true;
  @Output('displayCC') displayCC: EventEmitter<boolean> = new EventEmitter();
  @Input('appearance') appearance: string = 'fill';
  @Input('userStatics') userStatics: boolean = false;
  @Input('orgChanged') orgChanged: number = null;


  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;

  constructor(
    private userService: UserService,
    private _translation: TranslationService,
    private cdr: ChangeDetectorRef
  ) {}

  private subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  onChange: any = () => {};

  onTouch: any = () => {};

  writeValue(obj: any): void {
    if (obj) {
      console.log('this.selectedUsers : ', this.selectedUsers);
      this.selectedUsers = obj.map((element) => {
        return {
          id: element['user']['id'],
          nameAr:
            element['user']['firstNameAr'] +
            ' ' +
            element['user']['lastNameAr'],
          nameEn:
            element['user']['firstNameEn'] +
            ' ' +
            element['user']['lastNameEn'],
        };
      });
      console.log('after : ', this.selectedUsers);
    } else this.selectedItem = obj;
    this.onChange(this.selectedUsers);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.orgChanged?.currentValue) {
      this._getAllUsers(changes.orgChanged.currentValue);
    }
    if (
      changes?.selectAll?.currentValue ||
      (!changes?.selectAll?.currentValue &&
        !changes?.selectAll?.isFirstChange())
    ) {
      this.users$.subscribe((users) => {
        this.selectedUsers = changes?.selectAll?.currentValue ? users : [];
        this.onChange(this.selectedUsers);
      });
    }
  }

  // pagination
  public users$ = new BehaviorSubject([]);
  private users = [];
  public orgName$ = new BehaviorSubject([]);
  private orgName = [];
  private usersPage = 0;
  private completeusers = false;
  public usersLoading = false;
  private nextPageStore = new Subject();
  private nextPage$ = this.nextPageStore
  private nextUserPageStore = new Subject();
  private nextUserPage$ = this.nextUserPageStore
    .asObservable()
    .pipe(throttleTime(1000));

  nextPage(event?) {
    if (this.userStatics) {
      if (!this.usersLoading && this.users.length >= 10) {
        this.nextUserPageStore.next();
      }
    } else {
      if (!this.usersLoading) {
        this.nextPageStore.next();
      }
    }
  }
  _nextPage() {
    if (!this.completeusers) {
      this.usersLoading = true;
      this.userService
        .getAllUsersOfOrganization(this.search, this.usersPage)
        .pipe(pluck('result'))
        .subscribe((users: any) => {
          this.completeusers = users?.length == 0;
          this.users = [...this.users, ...users];
          this.users$.next(this.users);
          this.usersPage++;
          this.usersLoading = false;
          this.cdr.detectChanges();
        });
    }
  }

  _getAllUsers(orgId?: number) {
    let data: {};
    data = {orgName: ''};

    if (orgId) {
      data = {orgName: orgId};
      this.users = [];
      this.usersPage = 0;
    }
    if (!this.completeusers) {
      this.usersLoading = true;
      this.userService
        .getAllUserOfOrgAndSubOrg(this.search, this.usersPage, orgId ? data : '')
        .pipe(pluck('result'))
        .subscribe((users: any) => {
          //this.completeusers = users.content?.length == 0;
          this.users = [...this.users, ...users.content];
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].isActive) {
            }else {
              this.users.slice(i, 1);
            }
          }
          this.users$.next(this.users);
          this.usersPage++;
          this.usersLoading = false;
          this.cdr.detectChanges();
        });
    }
  }

  getUserGroupOrg(index: number) {
    const user = this.users[index];
    const orgStructure = user?.orgStructure;
    if (this.lang === 'en') {
      return orgStructure?.nameEn;
    } else {
      return orgStructure?.nameAr;
    }
  }

  private search = '';
  private filteringStore = new Subject();
  private filtering$ = this.filteringStore
    .asObservable()
    .pipe(throttleTime(1000));
  searching = false;

  async applyFilter(value: string) {
    this.searching = true;
    this.search = value;
    this.filteringStore.next(this.search);
  }
  // +++++++++++++++++++++++++++++++++++++++++

  ngOnInit(): void {
    console.log(this.orgChanged);
    if (this.hasCClabel) this.hasCCbutton = false;
    this.lang = this._translation.getSelectedLanguage();

    this.selectedUsers = [];

    let sub = this.filtering$.subscribe(async (_) => {
      this.users = [];
      this.usersPage = 0;
      this.completeusers = false;
      this.usersLoading = false;
      this.users$.next([]);
      await this.nextPage();
    });
    this.subscriptions.push(sub);

    if (this.userStatics){
      this._getAllUsers();
    } else {
      this._nextPage();
    }
    sub = this.nextPage$.pipe(throttleTime(2000)).subscribe(async (_) => {
      await this._nextPage();
    });

    sub = this.nextUserPage$.pipe(throttleTime(2000)).subscribe(async (_) => {
      await this._getAllUsers();
    });

    this.subscriptions.push(sub);

    sub = this.Ctrl.valueChanges.pipe(throttleTime(2000)).subscribe((v) => {
      console.log(v, 'asd');
      /**
       * this  condetion  is  to  prevent  api  call  when selection  input event
       * otherwise : (reset control , user  filtering) call  API
       */
      if (!v?.id) this.applyFilter(v);
    });
    this.subscriptions.push(sub);
  }

  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
  }

  remove(user) {
    const index = this.checkIfExsit(user);
    if (index !== -1) {
      this.selectedUsers.splice(index, 1);
    }
    this.onChange(this.selectedUsers);
  }

  selected(event: MatAutocompleteSelectedEvent) {
    const check = this.checkIfExsit(event.option.value);
    if (check === -1) {
      this.selectedUsers.push(event.option.value);
    }

    this.userInput.nativeElement.value = '';
    this.userInput.nativeElement.blur();
    this.Ctrl.setValue(null);

    this.onChange(this.selectedUsers);
  }

  private checkIfExsit(user) {
    return this.selectedUsers.findIndex((item) => item.id == user.id);
  }

  toggleDisplayCC(event) {
    event.stopPropagation();
    this.displayCC.emit(true);
    this.hasCCbutton = false;
  }
}
