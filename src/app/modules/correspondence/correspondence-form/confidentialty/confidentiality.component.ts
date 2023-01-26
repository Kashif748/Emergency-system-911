import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatRadioChange} from '@angular/material/radio';

@Component({
  selector: 'app-confidentiality',
  templateUrl: './confidentiality.component.html',
  styleUrls: ['./confidentiality.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConfidentialityComponent),
      multi: true
    }
  ]
})
export class ConfidentialityComponent implements OnInit, ControlValueAccessor {

  // UI
  @Input() displayedValue: string;
  @Input() isRequired = false;

  // Variables
  selected: any;
  disabled: boolean;
  confidentialties: any[];

  // Functions
  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  ngOnInit(): void {
    const commonData = JSON.parse(localStorage.getItem('commonData'));
    this.confidentialties = commonData.confidentialties;
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

  valueChanged(event: MatRadioChange) {
    this.onChange(event.value);
  }

}
