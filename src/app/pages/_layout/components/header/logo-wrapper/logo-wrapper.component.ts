import { Component, Input, OnInit } from '@angular/core';
import { IThemeFacade } from '@core/facades/theme.facade';
import { CommonService } from '@core/services/common.service';
import { TranslationService } from 'src/app/modules/i18n/translation.service';

@Component({
  selector: 'app-logo-wrapper',
  templateUrl: './logo-wrapper.component.html',
  styleUrls: ['./logo-wrapper.component.scss'],
})
export class LogoWrapperComponent implements OnInit {
  @Input() isMobileView = false;
  
  orgCode = null;
  orgLogo = '';
  lang = 'en';

  constructor(
    private themeFacade: IThemeFacade,
    private commonService: CommonService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();

    this.commonService.getCommonDataState().subscribe((data) => {
      if (data) {
        this.orgCode = data?.currentOrgDetails['code'];
        this.setLogo();
      }
    });

    this.themeFacade.vm$.subscribe((data) => {
      this.setLogo();
    });
  }

  setLogo() {
    // if (!this.orgCode) return "";
    if (this.orgCode == 'ADNOC') {
      this.themeFacade.setTheme('adnoc-light');
      // this.orgLogo = `adnoc.png`;
      // return;
    }
    // if (this.orgCode == "ADCDA") {
    //   this.orgLogo = "logo.png";
    //   return;
    // }

    if (this.themeFacade.stateSnapshot.DarkMode)
      this.orgLogo = this.lang == 'en' ? 'dark-En.png' : 'dark-Ar.png';
    else this.orgLogo = this.lang == 'en' ? 'H-En.png' : 'H-Ar.png';
  }
}
