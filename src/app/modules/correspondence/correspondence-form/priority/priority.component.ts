import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatRadioChange} from '@angular/material/radio';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PriorityComponent),
      multi: true
    }
  ]
})
export class PriorityComponent implements OnInit, ControlValueAccessor {

  // Variables
  selected: any;
  disabled: boolean;
  priorities: any[];

  // Functions
  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  ngOnInit(): void {
    const commonData = JSON.parse(localStorage.getItem('commonData'));
    this.priorities = commonData.priorities;
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
