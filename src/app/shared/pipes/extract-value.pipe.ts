import {Pipe, PipeTransform} from '@angular/core';
import {DataOptions} from '@shared/components/advanced-search/advanced-search.component';

@Pipe({
  name: 'extractValue'
})
export class ExtractValuePipe implements PipeTransform {

  transform(value: DataOptions, ...args: unknown[]): unknown {
    if (args && args.length) {
      const id = args[0];
      return value.children.find(item => item?.id === id);
    }
    return null;
  }

}
