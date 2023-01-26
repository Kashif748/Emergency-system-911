import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, isFallBack = false): any {

    if (value) {
      return new Date(`${value} GMT+0400`);
    } else {
      if (isFallBack) {
        return new Date();
      } else {
        return null;
      }
    }
  }

}
