import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

import { OrgService } from "@core/api/services/org.service";
import { ILangFacade } from "@core/facades/lang.facade";

import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-orgs-input",
  templateUrl: "./orgs-input.component.html",
  styleUrls: ["./orgs-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrgsInputComponent),
      multi: true,
    },
  ],
})
export class OrgsInputComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  selectable = true;
  removable = true;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() appearance: string = "outline";

  @ViewChild("orgsInput") orgsInput: ElementRef<HTMLInputElement>;

  control = new FormControl();
  selectedOrgs: {
    text: string;
    value: string;
    textAr: string;
    textEn: string;
  }[] = [];
  allOrgs: { text: string; value: string; textAr: string; textEn: string }[] =
    [];
  remainingOrgs: {
    text: string;
    value: string;
    textAr: string;
    textEn: string;
  }[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private orgService: OrgService,
    private langFacade: ILangFacade
  ) {}
  public remainingOrgs$ = new BehaviorSubject<any[]>([]);
  async ngOnInit() {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.remainingOrgs$.next(this._filter(v));
    });
    let orgs = await this.orgService
      .getAll()
      .pipe(map((r) => r.result as any[]))
      .toPromise();
    let lang = this.langFacade.stateSanpshot.ActiveLang.key;
    this.allOrgs = orgs.map((o) => {
      return {
        text: lang == "ar" ? o.nameAr : o.nameEn,
        value: o.code,
        textAr: o.nameAr,
        textEn: o.nameEn,
      };
    });

    this.remainingOrgs = [...this.allOrgs];
    this.remainingOrgs$.next(this.remainingOrgs);
    this.cdr.detectChanges();
  }

  onChange: any = () => {};

  onTouch: any = () => {};
  value: any;

  writeValue(obj: any): void {
    this.value = obj;
    this.control.setValue(obj);
    this.selectedOrgs = obj ?? [];
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  disabled: boolean;

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    isDisabled ? this.control.disable() : this.control.enable();
  }

  _filter(val: string): any[] {
    return !val || val?.length == 0
      ? this.remainingOrgs
      : this.remainingOrgs?.filter(
          (o) =>
            o?.textEn?.toLowerCase()?.includes(val?.toLowerCase()) ||
            o?.textAr?.toLowerCase()?.includes(val?.toLowerCase()) ||
            o?.value?.toLowerCase()?.includes(val?.toLowerCase())
        );
  }

  filter(event) {
  }

  remove(org: string): void {
    const index = this.selectedOrgs.map((l) => l.value).indexOf(org);

    if (index >= 0) {
      this.selectedOrgs.splice(index, 1);
      this.remainingOrgs = this.allOrgs.filter(
        (al) => !this.selectedOrgs.find((l) => l.value == al.value)
      );
      this.remainingOrgs$.next(this.remainingOrgs);
      this.onChange(this.selectedOrgs);
    }
    this.cdr.detectChanges();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedOrgs.push(
      this.allOrgs.find((l) => l.value == event.option.value)
    );

    this.remainingOrgs = this.allOrgs.filter(
      (al) => !this.selectedOrgs.find((l) => l.value == al.value)
    );
    this.remainingOrgs$.next(this.remainingOrgs);
    this.onChange(this.selectedOrgs.map((l) => l.value));

    this.orgsInput.nativeElement.value = "";
    this.control.setValue(null);
    this.cdr.detectChanges();
  }

  private destroy$ = new Subject();
  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
