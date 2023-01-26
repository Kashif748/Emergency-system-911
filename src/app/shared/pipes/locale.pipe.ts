import {Pipe, PipeTransform} from '@angular/core';
import {TranslationService} from '../../modules/i18n/translation.service';

@Pipe({
  name: 'locale'
})
export class LocalePipe implements PipeTransform {
  private readonly lang;
  private nameAr = 'nameAr';
  private nameEn = 'nameEn';

  constructor(private readonly translationService: TranslationService) {
    this.lang = this.translationService.getSelectedLanguage();
  }


  transform(value: any, ...args: string[]): unknown {
    if (!value) {
      return '';
    }

    if (typeof value !== 'object') {
      return value;
    }

    if (args.length >= 2) {
      this.nameAr = args[0];
      this.nameEn = args[1];
    } else if (args.length === 1) {
      // try detect language field name to append to key name.
      this.nameAr = args[0] + 'Ar';
      this.nameEn = args[0] + 'En';
      if (!value.hasOwnProperty(this.nameAr) && !value.hasOwnProperty(this.nameEn)) {
        this.nameAr = args[0] + 'AR';
        this.nameEn = args[0] + 'EN';
      }
    }
    return this.getAttrValueByLang(value);
  }

  private getAttrValueByLang(item: any) {
    return this.isLangAr() ? item[this.nameAr] : item[this.nameEn];
  }

  private isLangAr() {
    return this.lang === 'ar';
  }

}
