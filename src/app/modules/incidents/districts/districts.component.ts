import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";
import {Observable, of, Subject} from "rxjs";
import {distinctUntilChanged, filter, startWith, switchMap, takeUntil} from "rxjs/operators";
import {LOCALIZATION_LOCAL_STORAGE_KEY, TranslationService} from "src/app/modules/i18n/translation.service";
import {OrgsService} from "src/app/_metronic/core/services/orgs.service";
import {IncidentsService} from "src/app/_metronic/core/services/incidents.service";

@Component({
  selector: "app-districts",
  templateUrl: "./districts.component.html",
  styleUrls: ["./districts.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DistrictsComponent),
      multi: true,
    },
  ],
})
export class DistrictsComponent
  implements OnInit, ControlValueAccessor, OnDestroy, OnChanges {

  // UI
  @Input() placeholder: string;
  @Input() appearance = "outline";
  @Input() city: string;
  @Output() selectedDist = new EventEmitter();
  @Input() allOrgs: any[];
  @Output() outLoadedDistricts = new EventEmitter();

  // Variables
  lang: string;
  control: FormControl;
  selected: any;
  incDistricts: any[];
  filteredOptions: Observable<any[]>;
  disabled: boolean;
  confidentialties: any[];
  destroy$: Subject<boolean> = new Subject();
  districtControl: NgControl;

  // Functions
  onChange: any = () => {
  }
  onTouch: any = () => {
  }


  constructor(
    private orgsService: OrgsService,
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef,
    private incidentsService: IncidentsService,
    private injector: Injector
  ) {
  }

  writeValue(obj: any): void {
    this.selected = obj;
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

  async ngOnInit(): Promise<void> {
    this.lang = this.translationService.getSelectedLanguage();
    this.districtControl = this.injector.get(NgControl);
    this.control = new FormControl();
  }

  _filter(val: string): Observable<any[]> {
    return of(
      !val || val?.length == 0
        ? this.incDistricts
        : this.incDistricts?.filter(
          (o) =>
            o?.nameAr?.toLowerCase()?.includes(val?.toLowerCase()) ||
            o?.nameEn?.toLowerCase()?.includes(val?.toLowerCase())
        )
    );

  }

  ngOnChanges() {
    // this detects changes in District component
    if (!this.city) {
      return;
    }

    this.districtControl.control.setValue('');
    this.incidentsService.getDistrictsbyCity(this.city).subscribe(
      (data) => {
        if (data) {
          this.incDistricts = data.result;
          this.outLoadedDistricts.emit(this.incDistricts);
          this.filteredOptions = this.districtControl.control.valueChanges.pipe(
            takeUntil(this.destroy$),
            filter((v) => typeof v === "string"),
            startWith(""),
            distinctUntilChanged(),
            switchMap((val) => {
              return this.filter(val || "");
            })
          );

        }
      }
    );
  }

  filter(val: string): Observable<any[]> {
    return of(
      !val || val?.length == 0
        ? this.incDistricts
        : this.incDistricts?.filter(
          (o) =>
            o?.nameAr?.toLowerCase()?.includes(val?.toLowerCase()) ||
            o?.nameEn?.toLowerCase()?.includes(val?.toLowerCase())
        )
    );

  }

  displayWith(value) {
    const lang = localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY);
    if (!value) {
      return;
    }
    if (lang === "en") {
      return value["nameEn"] ? value["nameEn"] : value;
    } else {
      return value["nameAr"] ? value["nameAr"] : value;
    }
  }

  getSelectedDist(id) {
    this.selectedDist.emit(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
