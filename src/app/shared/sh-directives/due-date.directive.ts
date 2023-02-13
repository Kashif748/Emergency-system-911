import {
  Directive,
  ElementRef,
  Host,
  Input,
  NgModule,
  Optional,
  Renderer2,
  Self,
  ViewContainerRef,
} from '@angular/core';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';
import { Tag } from 'primeng/tag';

@Directive({
  selector: '[checkDueDate]',
})
export class DueDateDirective {
  @Input() dueDate;
  @Input() closedDate;
  @Input() colorFor: 'background' | 'text' = 'background';
  @Input() dueClass: string = 'bg-danger';
  constructor(private el: ElementRef, private readonly renderer: Renderer2) {}

  ngAfterViewChecked(): void {
    const currentDateUAE = DateTimeUtil.getDateInGMTFormat(this.dueDate);
    const closedDateUAE = DateTimeUtil.getDateInGMTFormat(this.closedDate);
    // check if current date time is elapsed.
    const isTaskDueDateElapsed = DateTimeUtil.isDateElapsed(currentDateUAE);
    const isCompleted = closedDateUAE && closedDateUAE < currentDateUAE;
    if (isTaskDueDateElapsed && !isCompleted) {
      if (this.colorFor === 'background') {
        if (this.el.nativeElement?.attributes?.hasOwnProperty('styleclass')) {
          this.dueClass?.split(' ').forEach((c) => {
            this.renderer.addClass(this.el.nativeElement.children[0], c);
          });
        } else {
          this.dueClass?.split(' ').forEach((c) => {
            this.renderer.addClass(this.el.nativeElement, c);
          });
        }
      } else {
        // set element text color.
        this.renderer.addClass(this.el.nativeElement, 'text-danger');
      }
    }
  }
}

@NgModule({
  declarations: [DueDateDirective],
  imports: [],
  exports: [DueDateDirective],
})
export class DueDateDirectiveModule {}
