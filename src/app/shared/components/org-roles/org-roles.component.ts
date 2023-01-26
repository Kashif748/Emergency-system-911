import {
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

import { OrgService } from "@core/api/services/org.service";
import { CommonService } from "@core/services/common.service";

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
  LOCALIZATION_LOCAL_STORAGE_KEY,
  TranslationService,
} from "src/app/modules/i18n/translation.service";
import { ModulesService } from "src/app/_metronic/core/services/modules.service";
import { OrgsService } from "src/app/_metronic/core/services/orgs.service";

import { RoleService } from "../../../core/api/services/role.service";

@Component({
  selector: "app-org-roles",
  templateUrl: "./org-roles.component.html",
  styleUrls: ["./org-roles.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrgRolesComponent),
      multi: true,
    },
  ],
})
export class OrgRolesComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  @Input("placeholder") placeholder: string;
  @Input("appearance") appearance: string = "outline";

  @Output() selectedOrg = new EventEmitter();
  lang: string;
  control: FormControl;
  modulesWithPrev$: Observable<any>;

  selected: any;
  options: any[];
  filteredOptions: Observable<any[]>;
  disabled: boolean;

  onChange: any = () => {};
  module: any = [];

  onTouch: any = () => {};

  confidentialties: any[];

  destroy$: Subject<boolean> = new Subject();

  constructor(
    private _translation: TranslationService,
    private orgService: OrgService,
    private commonService: CommonService
  ) {}

  async ngOnInit(): Promise<void> {
    const currentOrg = this.commonService.getCommonData()["currentOrgDetails"];
    this.lang = this._translation.getSelectedLanguage();

    this.control = new FormControl();

    this.orgService.getById(currentOrg?.id).subscribe((x) => {
      this.options = x;
    });

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
    let lang = localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY);
    if (!value) return;
    if (lang === "en") {
      return value["nameEn"];
    } else {
      return value["nameAr"];
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
