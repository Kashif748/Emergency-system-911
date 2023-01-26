import {
  Directive,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import { FormControl, NgControl } from "@angular/forms";
import { Observable, Subject, merge, EMPTY } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FORM_ERRORS } from "./FORM-ERRORS";
@Directive({
  selector: "[appFormErrors]",
})
export class FormErrorsDirective implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject();

  submit$: Observable<Event>;

  hasView: boolean;

  @Input("appFormErrors") control: FormControl;
  @Input("errorType") errorType: string = "required";

  constructor(
    private templateRef: TemplateRef<any>,
    private vcr: ViewContainerRef,
    @Inject(FORM_ERRORS) private errors
  ) {}

  ngOnInit() {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const controlErrors = this.control.errors;
      if (controlErrors) {
        const firstKey = Object.keys(controlErrors)[0];

        // const getError = this.errors[firstKey];
        // const text = getError(controlErrors[firstKey]);

        this.setError(firstKey);
      } else {
        this.emptyContainer();
      }
    });
  }

  setError(text: string) {
    //console.log(text);

    if (!this.hasView && this.errorType === text) {
      this.vcr.createEmbeddedView(this.templateRef);
    }

    this.hasView = true;
  }

  emptyContainer() {
    this.vcr.clear();
    this.hasView = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
