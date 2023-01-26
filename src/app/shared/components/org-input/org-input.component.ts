import { ConstantPool } from '@angular/compiler';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { CommonService } from '@core/services/common.service';

import { Observable, of, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import {
  TranslationService,
  LOCALIZATION_LOCAL_STORAGE_KEY,
} from 'src/app/modules/i18n/translation.service';
import { OrgsService } from 'src/app/_metronic/core/services/orgs.service';

@Component({
  selector: 'app-org-input',
  templateUrl: './org-input.component.html',
  styleUrls: ['./org-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrgInputComponent),
      multi: true,
    },
  ],
})
export class OrgInputComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  // UI
  @Input() placeholder: string;
  @Input() appearance = 'outline';
  @Output() selectedOrg = new EventEmitter();
  @Input() allOrgs: any[];
  @Input() childrenOfCurrentOrg = false;

  // Variables.
  lang: string;
  control: FormControl;
  selected: any;
  options: any[];
  filteredOptions: Observable<any[]>;
  disabled: boolean;
  confidentialties: any[];
  destroy$: Subject<boolean> = new Subject();

  // Functions
  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(
    // tslint:disable-next-line:variable-name
    private _orgs: OrgsService,
    // tslint:disable-next-line:variable-name
    private _translation: TranslationService,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.lang = this._translation.getSelectedLanguage();
    const currentOrg = this.commonService.getCommonData()['currentOrgDetails'];

    this.control = new FormControl('');
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      if (v) {
        this.onChange(v);
      }
    });
    try {
      this.options = await (this.childrenOfCurrentOrg
        ? this._orgs.getOrgsByID(currentOrg?.id)
        : this._orgs.getOrgs()
      )
        .pipe(map((r) => r))
        .toPromise();
    } catch {
      this.options = [];
    }
    this.selected =
      this.options?.find((o) => o.id == this.selected?.id) ?? this.selected;
    this.control.setValue(this.selected);

    this.filteredOptions = this.control.valueChanges.pipe(
      takeUntil(this.destroy$),
      filter((v) => typeof v === 'string'),
      startWith(''),
      distinctUntilChanged(),
      switchMap((val) => {
        return this._filter(val || '');
      })
    );
  }

  writeValue(obj: any): void {
    this.selected = obj;
    this.selected =
      this.options?.find((o) => o.id == this.selected?.id) ?? this.selected;
    this.control.setValue(this.selected);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.disabled ? this.control.disable() : this.control.enable();
  }

  _filter(val: string): Observable<any[]> {
    return of(
      !val || val?.length == 0
        ? this.options
        : this.options?.filter(
            (o) =>
              o?.nameAr?.toLowerCase()?.includes(val?.toLowerCase()) ||
              o?.nameEn?.toLowerCase()?.includes(val?.toLowerCase()) ||
              o?.code?.toLowerCase()?.includes(val?.toLowerCase())
          )
    );
  }

  displayWith(value) {
    const lang = localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY);
    if (!value) {
      return;
    }
    if (lang === 'en') {
      return value['nameEn'];
    } else {
      return value['nameAr'];
    }
  }

  getSelectedOrg(id) {
    this.selectedOrg.emit(id);
  }

  get validator() {
    if (this.control?.validator) {
      console.log(this.control.validator);

      const validator = this.control.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    return false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
