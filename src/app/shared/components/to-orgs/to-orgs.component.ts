import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { OrgsService } from 'src/app/_metronic/core/services/orgs.service';
import { OrgService } from '@core/api/services/org.service';
import { ORGANIZATION_TYPE } from 'src/app/modules/correspondence/correspondance.model';

@Component({
  selector: 'app-to-orgs',
  templateUrl: './to-orgs.component.html',
  styleUrls: ['./to-orgs.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToOrgsComponent),
      multi: true,
    },
  ],
})
export class ToOrgsComponent implements OnInit, OnChanges {
  // UI
  @Input() isRequired = false;
  @Input() multiple = true;
  @Input() appearance = 'fill';
  @Input() placeholder: string;
  @Input() hasCClabel = false;
  @Input() hasCCbutton = true;
  @Output() displayCC: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('Input') Input: ElementRef<HTMLInputElement>;
  @Input() correspondanceOrgType: ORGANIZATION_TYPE;
  @Input() selectAll: boolean;
  @Output() selectAllChange: EventEmitter<boolean> = new EventEmitter();

  // Variables
  lang: string;
  orgs: any[];
  allOrgs: any[];
  disabled: boolean;
  selectedItem: string;
  Ctrl = new FormControl();
  filteredOrgs: Observable<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private orgsService: OrgsService,
    private orgService: OrgService,
    private translationService: TranslationService,
    protected cdr: ChangeDetectorRef
  ) {}

  onChange: any = () => {};

  onTouch: any = () => {};

  writeValue(obj: any): void {
    this.selectedItem = obj;
    if (this.selectedItem?.length) {
      this.orgs = [...this.selectedItem];
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

  ngOnInit(): void {
    const commonData = JSON.parse(localStorage.getItem('commonData'));
    const currentOrg = commonData['currentOrgDetails'];

    if (this.hasCClabel) {
      this.hasCCbutton = false;
    }

    this.lang = this.translationService.getSelectedLanguage();

    this.orgs = [];
    (this.correspondanceOrgType == ORGANIZATION_TYPE.INTERNAL
        ? this.orgsService.getOrgsByID(currentOrg?.id)
        : this.orgService.getAll().pipe(map((r) => r.result))
    ).subscribe((data) => {
      this.allOrgs = data;
      this.listenToChanges();
    });

    this.filteredOrgs = this.Ctrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    const commonData = JSON.parse(localStorage.getItem('commonData'));
    const currentOrg = commonData['currentOrgDetails'];
    this.orgs = [];
    if (changes?.correspondanceOrgType?.currentValue) {
      (this.correspondanceOrgType == ORGANIZATION_TYPE.INTERNAL
          ? this.orgsService.getOrgsByID(currentOrg?.id)
          : this.orgService.getAll().pipe(map((r) => r.result))
      ).subscribe((data) => {
        this.allOrgs = data;
        this.listenToChanges();
      });
    }
    if (
      changes?.selectAll?.currentValue ||
      (!changes?.selectAll?.currentValue &&
        !changes?.selectAll?.isFirstChange())
    ) {
      this.filteredOrgs?.subscribe((orgs) => {
        this.orgs = changes?.selectAll?.currentValue ? orgs : this.orgs;
        this.onChange(this.orgs);
        //this.cdr.detectChanges();
      });
    }
  }

  listenToChanges() {
     this.filteredOrgs = this.Ctrl.valueChanges.pipe(
       startWith(null),
       map((user: string | null) =>
         user ? this._filter(user) : this.allOrgs.slice()
       )
     );
     this.cdr.detectChanges();
  }

  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
  }

  remove(org) {
    const index = this.checkIfExsit(org);
    if (index !== -1) {
      this.orgs.splice(index, 1);
      this.selectAll = false;
    }

    this.onChange(this.orgs);
  }

  selected(event: MatAutocompleteSelectedEvent) {
    const check = this.checkIfExsit(event.option.value);
    if (check === -1) {
      this.orgs = [event.option.value, ...this.orgs];
    }

    this.Input.nativeElement.value = '';
    //this.Ctrl.setValue(event.option.value);
    this.Input.nativeElement.blur();
    this.onChange(this.orgs);
  }

  private checkIfExsit(org) {
    return this.orgs.findIndex((item) => item.id == org.id);
  }

  private _filter(value: any): any[] {
    const remainingOrgs = this.allOrgs?.filter(
      (org) => !this.orgs.includes(org)
    );
    const filteredOrg = remainingOrgs?.filter((org) => {
      return org?.id !== value?.id;
    });
    var remainingFilteredOrg =[];
    for (let index = 0; index < this.allOrgs?.length; index++) {
      if((this.allOrgs[index].code.includes(value) == true) || (this.allOrgs[index].nameEn === value)){
        remainingFilteredOrg.push(this.allOrgs[index]);
      }
    }
    if(remainingFilteredOrg.length == 0){
      return filteredOrg;
    }else{
      return remainingFilteredOrg;
    }
  }

  toggleDisplayCC(event) {
    event.stopPropagation();
    this.displayCC.emit(true);
    this.hasCCbutton = false;
  }
}
