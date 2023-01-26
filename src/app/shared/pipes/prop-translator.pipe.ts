import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from 'src/app/modules/i18n/translation.service';

@Pipe({
  name: 'propTranslator',
})
export class PropTranslatorPipe implements PipeTransform {
  lang = 'en';

  constructor(private translationService: TranslationService) {
    this.lang = this.translationService.getSelectedLanguage();
  }

  transform(value: unknown, ...args: unknown[]): unknown {
    const prop = args[0];
    if (!value) {
      return '';
    }
    const result =
      value[prop + this.lang[0].toUpperCase() + this.lang.slice(1)] ??
      value[prop + this.lang.toUpperCase()];

    return result ?? '';
  }
}
