import { Directive, ElementRef, Renderer2, TemplateRef } from '@angular/core';
import { TranslationService } from '../../modules/i18n/translation.service';

@Directive({
  selector: '[appDirection]'
})
export class DirectionDirective {

  lang:string;

  constructor(
    private renderer2: Renderer2, 
    private elementRef: ElementRef,
    private _translation:TranslationService
  ) {}

  ngOnInit(): void {

    this.lang = this._translation.getSelectedLanguage();
    
    this.lang.toLowerCase();
    const dir = this.lang === 'en' ? 'ltr' : 'rtl'

    this.renderer2.setAttribute(this.elementRef.nativeElement,'dir',dir);

  }
}
