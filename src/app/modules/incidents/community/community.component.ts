import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";

import { Observable, of, Subject } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  takeUntil,
} from "rxjs/operators";

import {
  TranslationService,
  LOCALIZATION_LOCAL_STORAGE_KEY,
} from "src/app/modules/i18n/translation.service";
import { IncidentsService } from "src/app/_metronic/core/services/incidents.service";

@Component({
  selector: "app-community",
  templateUrl: "./community.component.html",
  styleUrls: ["./community.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommunityComponent),
      multi: true,
    },
  ],
})
export class CommunityComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  @Input("placeholder") placeholder: string;
  @Input("Dist") Dist: string;
  @Input("appearance") appearance: string = "outline";

  @Output() selectedOrg = new EventEmitter();
  @Input() allOrgs: any[];

  lang: string;
  control: FormControl;
  selected: any;
  //incDistricts: any[];
  incCommunity: any[];
  filteredOptions: Observable<any[]>;
  disabled: boolean;

  onChange: any = () => {};

  onTouch: any = () => {};

  confidentialties: any[];

  destroy$: Subject<boolean> = new Subject();
  constructor(
    private _translation: TranslationService,
    private incidentservice: IncidentsService
  ) {}

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
    this.lang = this._translation.getSelectedLanguage();

    this.control = new FormControl();
  }

  ngOnChanges() {
    // this detects changes in District component kafka
    if (!!this.Dist) {

       this.control.setValue('');

      this.Dist = this.Dist["nameEn"] ? this.Dist["nameEn"] : this.Dist;

      this.incidentservice.getCommunity(this.Dist).subscribe(
        (data) => {
          if (data) {
            this.incCommunity = data.result;
            this.filteredOptions = this.control.valueChanges.pipe(
              takeUntil(this.destroy$),
              filter((v) => typeof v === "string"),
              startWith(""),
              distinctUntilChanged(),
              switchMap((val) => {
                return this._filter(val || "");
              })
            );

          }
        },
        (error) => {}
      );
    }
  }

  _filter(val: string): Observable<any[]> {
    return of(
      !val || val?.length == 0
        ? this.incCommunity
        : this.incCommunity?.filter(
            (o) =>
              o?.nameAr?.toLowerCase()?.includes(val?.toLowerCase()) ||
              o?.nameEn?.toLowerCase()?.includes(val?.toLowerCase())
          )
    );
  }

  displayWith(value) {
    let lang = localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY);
    if (!value) return;
    if (lang === "en") {
      return value["nameEn"] ? value["nameEn"] : value;
    } else {
      return value["nameAr"] ? value["nameAr"] : value;
    }
  }
  getSelectedOrg(id) {
    this.selectedOrg.emit(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
