import { Pipe, PipeTransform } from '@angular/core';
import { DataOptions } from '@shared/components/advanced-search/advanced-search.component';

@Pipe({
  name: 'extractDataList'
})
export class ExtractDataListPipe implements PipeTransform {

  transform(value: DataOptions[], ...args: unknown[]): any[] {
    const formControlName = args[0];
    return value.filter(v => v.formControlName == formControlName).map(v => v.children)[0];
  }

}
