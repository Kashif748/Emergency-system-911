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
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";

import { Subscription } from "rxjs";

@Component({
  selector: "app-layers-input",
  templateUrl: "./layers-input.component.html",
  styleUrls: ["./layers-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LayersInputComponent),
      multi: true,
    },
  ],
})
export class LayersInputComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  selectable = true;
  removable = true;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() appearance: string = "outline";

  control = new FormControl();
  selectedLayers: { text: string; value: string }[] = [];
  allLayers: { text: string; value: string }[] = [
    { text: "MAP_DASHBOARD.LAYERS.INCIDENT.POINT", value: "Inc_point" },
    { text: "MAP_DASHBOARD.LAYERS.TASK.POINT", value: "Tsk_point" },
    { text: "MAP_DASHBOARD.LAYERS.INCIDENT.LINE", value: "Inc_Polyline" },
    { text: "MAP_DASHBOARD.LAYERS.TASK.LINE", value: "Tsk_Polyline" },
    { text: "MAP_DASHBOARD.LAYERS.INCIDENT.POLYGON", value: "Inc_Polygon" },
    { text: "MAP_DASHBOARD.LAYERS.TASK.POLYGON", value: "Tsk_Polygon" },
  ];
  remainingLayers: { text: string; value: string }[] = [];

  @ViewChild("layerInput") layerInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  constructor(private cdr: ChangeDetectorRef) {
    this.remainingLayers = [...this.allLayers];
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
  onChange: any = () => {};

  onTouch: any = () => {};
  value: any;

  writeValue(obj: any): void {
    this.value = obj;
    this.control.setValue(obj);
    this.selectedLayers = obj ?? [];
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
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {}

  remove(layer: string): void {
    const index = this.selectedLayers.map((l) => l.value).indexOf(layer);

    if (index >= 0) {
      this.selectedLayers.splice(index, 1);
      this.remainingLayers = this.allLayers.filter(
        (al) => !this.selectedLayers.find((l) => l.value == al.value)
      );
      this.onChange(this.selectedLayers);
    }
    this.cdr.detectChanges();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedLayers.push(
      this.allLayers.find((l) => l.value == event.option.value)
    );

    this.remainingLayers = this.allLayers.filter(
      (al) => !this.selectedLayers.find((l) => l.value == al.value)
    );
    this.onChange(this.selectedLayers.map((l) => l.value));

    this.layerInput.nativeElement.value = "";
    this.control.setValue(null);
    this.cdr.detectChanges();
  }
}
