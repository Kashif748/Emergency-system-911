import {AfterViewChecked, AfterViewInit, Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {CustomDatePipe} from '@shared/pipes/custom-date.pipe';
import {DateTimeUtil} from '@core/utils/DateTimeUtil';

@Directive({
  selector: '[appDueDateColor]'
})
export class DueDateColorDirective implements AfterViewChecked {
  @Input() date;
  @Input() closedDate;
  @Input() colorFor: 'background' | 'text' = 'background';

  constructor(private el: ElementRef, private readonly renderer: Renderer2, private readonly customDate: CustomDatePipe) {

  }

  ngAfterViewChecked(): void {
    const currentDateUAE = this.customDate.transform(this.date);
    const closedDateUAE = this.customDate.transform(this.closedDate);
    // check if current date time is elapsed.
    const isTaskDueDateElapsed = DateTimeUtil.isDateElapsed(currentDateUAE );

    const isCompleted =closedDateUAE && closedDateUAE < currentDateUAE;
    if (isTaskDueDateElapsed && !isCompleted) {
      if (this.colorFor === 'background') {
        this.renderer.addClass(this.el.nativeElement, 'label-danger');
        this.renderer.addClass(this.el.nativeElement, 'text-white');
      } else {
        // set element text color.
        this.renderer.addClass(this.el.nativeElement, 'text-danger');
      }
    }
  }

}
