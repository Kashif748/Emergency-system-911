import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {environment} from 'src/environments/environment';
import {TranslationService} from '../modules/i18n/translation.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  // Variables
  lang = 'en';
  showSubLogo = false;
  orgLogo = '';
  private subscription: Subscription;

  constructor(private translationService: TranslationService, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.lang = this.translationService.getSelectedLanguage();
  }

  onActivate(componentReference) {
    this.subscription = componentReference.showHideLogo?.subscribe((data) => {
      if (data && data.view == 'show') {
        this.orgLogo =
          data.orgLogo == ''
            ? 'assets/logos/Small_Logo.png'
            : `${environment.apiUrl}/dms/load-logo/ext/${data.orgLogo}`;
        this.showSubLogo = true;
      } else {
        this.showSubLogo = false;
      }
      this.cd.detectChanges();
    });
    if (componentReference.showHideLogo) {
    } else {
      localStorage.clear();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
