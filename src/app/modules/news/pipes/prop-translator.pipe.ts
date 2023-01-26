import { OnInit, Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';

@Pipe({
  name: 'propTranslator',
})
export class PropTranslatorPipe implements PipeTransform {
  lang: string = 'en';

  constructor(private _translation: TranslationService) {
    this.lang = _translation.getSelectedLanguage();
  }

  transform(value: unknown, ...args: unknown[]): unknown {
    const prop = args[0];

    return value[prop + this.lang[0].toUpperCase() + this.lang.slice(1)];
  }
}
