import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";

import { AdcdaService } from "@core/api/services/adcda.service";

import { BehaviorSubject, Subject } from "rxjs";
import { map, skipUntil, takeUntil, throttleTime } from "rxjs/operators";

import { TranslationService } from "../../i18n/translation.service";

@Component({
  selector: "app-area-input",
  templateUrl: "./area-input.component.html",
  styleUrls: ["./area-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaInputComponent),
      multi: true,
    },
  ],
})
export class AreaInputComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  private destroy$ = new Subject();

  @Input("placeholder") placeholder: string;
  @Input("required") required: boolean = false;
  @Input("appearance") appearance = "outline";

  public onSelection(area) {
    this.onChange(area);
  }

  constructor(
    private adcdaService: AdcdaService,
    private cdr: ChangeDetectorRef,
    private translationService: TranslationService
  ) {}

  lang = this.translationService.getSelectedLanguage();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
  displayWith(subject) {
    if (subject) {
      return `${subject?.nameAr} | ${subject?.nameEn}`;
    }
    return null;
  }

  private selected: any;

  public control = new FormControl();
  public searchControl = new FormControl();

  // pagination
  private areas = [];
  public areas$ = new BehaviorSubject<any[]>([]);
  private pageSize = 10;
  private pageIndex = 0;
  private complete = false;
  public loading = false;
  private nextPageStore = new Subject();
  private nextPage$ = this.nextPageStore
    .asObservable()
    .pipe(throttleTime(1000));

  public searching = false;
  private searchTxt;
  private filteringStore = new Subject();
  private filtering$ = this.filteringStore
    .asObservable()
    .pipe(throttleTime(4000));

  async applyFilter(value: string) {
    this.searchTxt = typeof value === "string" ? value : "";
    this.filteringStore.next(this.searchTxt);
  }

  nextPage(event?) {
    if (!this.loading) this.nextPageStore.next();
  }

  async _nextPage() {
    if (!this.complete) {
      this.loading = true;
      this.cdr.detectChanges();
      let areas = await this.adcdaService
        .getAreas(this.pageIndex, this.pageSize, this.searchTxt)
        .pipe(map((page) => page.content))
        .toPromise();

      this.complete = areas?.length == 0;
      this.areas = [...this.areas, ...areas];
      this.areas$.next(this.areas);
      this.pageIndex++;
      this.loading = false;
      this.searching = false;
      this.cdr.detectChanges();
    }
  }
  public focused$ = new Subject();
  onFocus() {
    this.loading = true;
    this.focused$.next();
    this.cdr.detectChanges();
    this.filteringStore.next();
  }

  writeValue(obj: any): void {
    this.selected = obj;
    if (!obj) {
      return;
    }
    if (!this.areas.find((u) => u?.id == obj?.id)) {
      this.areas.push(obj);
      this.areas$.next(this.areas);
      this.searchControl.setValue(obj);
    }
  }

  onChange: any = () => {};

  onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public disabled: boolean;
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() {
    this.nextPage$.pipe(takeUntil(this.destroy$)).subscribe(async (_) => {
      await this._nextPage();
    });
    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        this.applyFilter(val);
      });

    this.filtering$.pipe(skipUntil(this.focused$)).subscribe(async (_) => {
      this.areas = [];
      this.pageIndex = 0;
      this.complete = false;
      this.loading = false;
      this.searching = true;

      this.areas$.next([]);
      await this.nextPage();
    });
  }
}
