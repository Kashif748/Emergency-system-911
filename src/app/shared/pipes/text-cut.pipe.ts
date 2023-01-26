import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'textCut'
})
export class TextCutPipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {

    let length = args[0];

    if (!length) {
      length = 70;
    }

    if (value && value.length <= length) {
      return value;
    }

    return value ? value.slice(0, length) + '...' : '--';

  }

}
