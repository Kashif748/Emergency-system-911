import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
@Directive({
  selector: '[appBaseComponent]',
})
export class BaseComponent implements OnDestroy {
  protected readonly destroy$ = new Subject();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
