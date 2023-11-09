import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';

@Pipe({
  name: 'translateObj',
})
export class TranslateObjPipe implements PipeTransform {
  constructor(private langFacade: ILangFacade) {}

  transform(value: unknown, ...args: unknown[]): string {
    if (!value || typeof value !== 'object') {
      return '';
    }
    const lang = this.langFacade.stateSanpshot.ActiveLang.key;
    if (Array.isArray(args[0])) {
      const props = args[0] as string[];
      let result = '';
      props.forEach((prop) => {
        result +=
          (value[prop + lang[0].toUpperCase() + lang.slice(1)] ??
            value[prop + lang.toUpperCase()] ??
            value[prop] ??
            '') + ' ';
      });
      return result;
    }
    const prop = (args[0] as string) ?? 'name';
    const result =
      value[prop + lang[0].toUpperCase() + lang.slice(1)] ??
      value[prop + lang.toUpperCase()];
    return result ?? value[prop];
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [TranslateObjPipe],
  exports: [TranslateObjPipe],
  providers: [TranslateObjPipe],
})
export class TranslateObjModule {}
