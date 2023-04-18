import {
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
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { IncidentAction } from '@core/states/incident/incident.action';
import { IncidentState } from '@core/states/incident/incident.state';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { IncidentIdSubjectProjection } from 'src/app/api/models';
import { IncidentsService } from 'src/app/_metronic/core/services/incidents.service';

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
export class RelatedToIncidentComponent
  implements OnInit, Validator, OnDestroy
{
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
  };

  onTouch: any = () => {};
  private auditLoadIncidents$ = new Subject<string>();

  @Select(IncidentState.transLoading)
  incidentLoading$: Observable<boolean>;

  @Select(IncidentState.incidents)
  incidents$: Observable<IncidentIdSubjectProjection[]>;

  private destroy$ = new Subject();

  constructor(
    private incidentsService: IncidentsService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.control = new FormControl('');
    this.control.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        filter((val) => typeof val === 'string'),
        startWith(''),
        debounceTime(800),
        distinctUntilChanged(),
        tap((val) => this.loadIncidents(val || '', true))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  loadIncidents(searchText?: string, direct = false, id?: number) {
    if (direct) {
      this.store.dispatch(
        new IncidentAction.LoadIncidents({
          id,
          subject: searchText,
          status: [1, 2],
        })
      );
      return;
    }
    this.auditLoadIncidents$.next(searchText);
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
