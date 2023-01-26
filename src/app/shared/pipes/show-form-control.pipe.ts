import { Pipe, PipeTransform } from '@angular/core';
import { FormFieldName } from '@shared/components/advanced-search/advanced-search.component';

@Pipe({
  name: 'showFormControl',
})
export class ShowFormControlPipe implements PipeTransform {
  transform(value: FormFieldName[], target: string): boolean {
    let isFound = Boolean(value.find((v) => v.formControlName === target));
    return isFound;
  }
}
