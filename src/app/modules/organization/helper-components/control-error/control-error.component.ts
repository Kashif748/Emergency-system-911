import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss']
})
export class ControlErrorComponent  {

  _text: string;
  _hide = true;
 
  @Input() set text(value) {
    if (value !== this._text) {
      this._text = value;
      this._hide = !value;      
      this.cdr.detectChanges();
    }
  };
 
  constructor(private cdr: ChangeDetectorRef) { }
}
