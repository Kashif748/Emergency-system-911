import { CommonModule, DatePipe } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';

@Pipe({
  name: 'cdate',
})
export class CdatePipe implements PipeTransform {
  /**
   *
   */
  constructor(private date: DatePipe) {}
  transform(value: any, args?: any): any {
    try {
      let result = new Date();

      if (value) {
        result = new Date(DateTimeUtil.getDateInGMTFormat(value));
      }
      if (!args?.length) {
        args = ['yyyy/MM/dd h:mm:ss a'];
      }

      return this.date.transform(result, args);
    } catch {
      return value;
    }
  }
}

@NgModule({
  declarations: [CdatePipe],
  imports: [CommonModule],
  exports: [CdatePipe],
  providers: [DatePipe],
})
export class CdateModule {}
