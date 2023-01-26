import { Directive, Input } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[enableControl]",
})
export class EnableControlDirective {
  @Input() set enableControl(condition: boolean) {
    if (condition) {
      this.ngControl.control?.enable();
    } else this.ngControl.control["disable"];
  }

  constructor(private ngControl: NgControl) {}
}
