import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';

@Pipe({
  name: 'translateObj',
})
export class TranslateObjPipe implements PipeTransform {
  constructor(private langFacade: ILangFacade) {}

  transform(value: unknown, ...args: unknown[]): unknown {
    const lang = this.langFacade.stateSanpshot.ActiveLang.key;
    const prop = args[0] as string;
    if (!value) {
      return '';
    }
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
})
export class TranslateObjModule {}
