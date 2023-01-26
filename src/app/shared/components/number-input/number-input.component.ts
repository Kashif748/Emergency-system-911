import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-number-input",
  templateUrl: "./number-input.component.html",
  styleUrls: ["./number-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NumberInputComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: NumberInputComponent,
    },
  ],
})
export class NumberInputComponent
  implements OnInit, ControlValueAccessor, Validator, OnDestroy
{

  @Input() set max(value: number) {
    this._max = value;
    this.control.setValidators([
      Validators.max(this._max),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]);
    this.control.updateValueAndValidity();
  }
  @Input() set min(value: number) {
    this._min = value;

    this.control.setValidators([
      Validators.min(this._min),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]);
  }
  constructor(private cdr: ChangeDetectorRef) {}
  @Input() appearance = "fill";
  @Input() disabled = false;
  @Input() lable = "";
  @Input() dir = "ltr";
  @Input() step = 1;
  @Input() isNeutral = true;
  @Input() showHint = false;
  @Input() hint = "";

  control = new FormControl();
  confidentialties: any[];
  _max = 100;
  _min = 1;
  value = 0;
  destroy$: Subject<boolean> = new Subject();

  onChange: any = () => {};

  onTouch: any = () => {};

  writeValue(obj: any): void {
    this.control.setValue(obj);
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
  validate(control: AbstractControl): ValidationErrors | null {
    const quantity = control.value;

    if (quantity <= 0) {
      return {
        mustBePositive: {
          quantity,
        },
      };
    }
  }

  ngOnInit(): void {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.onChange(v);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
