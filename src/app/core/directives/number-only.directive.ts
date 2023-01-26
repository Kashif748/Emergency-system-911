import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {

  constructor() {
  }

  @HostListener('keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const oldValue = input.value;
    input.value = oldValue.replace(/[^0-9]+/g, '');
  }

}
