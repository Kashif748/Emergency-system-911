import {Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, } from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, startWith, switchMap, tap, } from 'rxjs/operators';
import {IncidentsService} from 'src/app/_metronic/core/services/incidents.service';

@Component({
  selector: 'app-related-to-incident',
  templateUrl: './related-to-incident.component.html',
  styleUrls: ['./related-to-incident.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RelatedToIncidentComponent),
      multi: true,
    },

    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => RelatedToIncidentComponent),
    },
  ],
})
export class RelatedToIncidentComponent implements OnInit, Validator {

  // UI
  @Input() appearance = 'fill';
  @Output() outputOnChangeIncident = new EventEmitter();
  control: FormControl;

  // Variables
  selected: any;
  options: any[] = [];
  filteredOptions: Observable<any[]>;
  disabled: boolean;
  error = false;
  confidentialties: any[];

  // Functions
  onChange: any = ($event) => {
    if ($event && typeof $event === 'object') {
      this.outputOnChangeIncident.emit($event);
    }
  }

  onTouch: any = () => {
  }

  constructor(private incidentsService: IncidentsService) {
  }

  ngOnInit(): void {
    this.control = new FormControl('');
    this.filteredOptions = this.control.valueChanges.pipe(
      filter((val) => typeof val === 'string'),
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val) => {
        return this._filter(val || '');
      })
    );
  }

  writeValue(obj: any): void {
    this.selected = obj;
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

  _filter(val: string): Observable<any[]> {
    return this.incidentsService.filterIncidents(val).pipe(
      tap((res) => {
        this.options = res;
      })
    );
  }

  displayWith(value) {
    if (value) {
      return value['subject'];
    }
    return null;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.control.value == '') {
      return null;
    }
    if (
      this.options.findIndex((item) => item.id == this.control.value?.id) < 0
    ) {
      this.error = this.control.invalid;
      this.control.setErrors({
        incorrect: this.control.invalid,
      });
      return {
        incorrect: this.control.invalid,
      };
    }

    return null;
  }

}
