import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { map, skipUntil, takeUntil, tap, throttleTime } from 'rxjs/operators';

import { TranslationService } from 'src/app/modules/i18n/translation.service';

import { SharedServicesService } from '../../shared-services.service';
import { UserService } from '../../../core/api/services/user.service';
@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserInputComponent),
      multi: true,
    },
  ],
})
export class UserInputComponent implements OnInit, ControlValueAccessor {
  @Input('placeholder') placeholder: string;
  @Input('required') required: boolean = false;
  @Input('appearance') appearance = 'outline';

  @Input('privilege') privilege: string;

  control = new FormControl();
  selected: any;
  options: any[];
  disabled: boolean;
  searching = false;
  lang = 'en';
  searchControl: FormControl;
  onChange: any = () => {};

  onTouch: any = () => {};

  confidentialties: any[];

  @Input() withFullName = false;

  destroy$: Subject<boolean> = new Subject();
  private subscriptions: Subscription[] = [];
  constructor(
    private translationService: TranslationService,
    private userService: UserService,
    private sharedService: SharedServicesService,
    private cdr: ChangeDetectorRef
  ) {}
  public onSelection(user) {
    if (this.withFullName) {
      user.fullName = `${user?.rankId?.nameAr ?? ''} / ${user?.nameAr}`;
    }
    this.onChange(user);
  }

  async writeValue(obj: any): Promise<void> {
    console.log('write value', obj);
    this.selected = obj;
    if (!obj || typeof obj == 'string') {
      this.searchControl.reset();
      return;
    }

    if (typeof obj === 'number') {
      this.selected = await this.userService
        .getById(obj)
        .pipe(map((r) => r.result))
        .toPromise();
      obj = this.selected;
    }
    if (!this.users.find((u) => u?.id == obj?.id)) {
      this.users.push(obj);
      this.users$.next(this.users);
      //this.searchControl.setValue(obj);
      this.searchControl.patchValue(obj);
    }
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
  public focused$ = new Subject();
  onFocus() {
    this.usersLoading = true;
    // this.searching = true;
    this.focused$.next();
    this.cdr.detectChanges();
    this.filteringStore.next();
  }

  ngOnInit(): void {
    this.searchControl = new FormControl();

    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        this.applyFilter(val);
      });

    this.lang = this.translationService.getSelectedLanguage();
    let sub = this.filtering$
      .pipe(skipUntil(this.focused$))
      .subscribe(async (_) => {
        this.users = [];
        this.usersPage = 0;
        this.completeusers = false;
        this.usersLoading = false;
        this.searching = true;

        this.users$.next([]);
        await this.nextPage();
      });
    this.subscriptions.push(sub);
    // this._nextPage();
    sub = this.nextPage$.subscribe(async (_) => {
      await this._nextPage();
    });
    this.subscriptions.push(sub);
    this.registerOnChange((v) => console.log('user changed', v));
    this.registerOnTouched((v) => console.log('user touched', v));
  }

  _filter(val: string): Observable<any[]> {
    return this.userService.filterUsers(val).pipe(
      tap((res) => {
        this.options = res;
      })
    );
  }

  displayWith(subject) {
    if (subject) {
      return `${subject?.nameAr} | ${subject?.nameEn}`;
    }
    return null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();

    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

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
  nextPage(event?) {
    if (!this.usersLoading) this.nextPageStore.next();
  }
  async _nextPage() {
    if (!this.completeusers) {
      this.usersLoading = true;
      this.cdr.detectChanges();
      let users = await this.userService
        .getAll(this.search, this.usersPage, 10, this.privilege)
        .pipe(
          map((result) => {
            const usersList = result.result.content ?? result.result;
            usersList.map((item) => {
              item.nameAr = item.nameAr.replace('null', '');
              item.nameEn = item.nameEn.replace('null', '');
              return item;
            });
            return usersList;
          })
        )
        .toPromise();

      this.completeusers = users?.length == 0 || !!this.privilege;
      this.users = [...this.users, ...users];
      this.users$.next(this.users);
      this.usersPage++;
      this.usersLoading = false;
      this.searching = false;
      this.cdr.detectChanges();
    }
  }

  private search = '';
  private filteringStore = new Subject();
  private filtering$ = this.filteringStore
    .asObservable()
    .pipe(throttleTime(4000));

  async applyFilter(value: string) {
    // this.searching = true;
    this.search = typeof value === 'string' ? value : '';
    this.filteringStore.next(this.search);
  }
}
