import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], ...args: string[]): Array<any> {
    const propName = args[0];
    if (Array.isArray(value)) {
      return value.sort((a, b) => a[propName] - b[propName]);
    }
    return null;
  }
}
