import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Direction } from '@angular/cdk/bidi';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { LayoutDataService } from 'src/app/pages/layout.service';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/_metronic/core';
import { MenuItem } from '../header/header-menu/menu-item.model';
import { SelectDialogComponent } from '../header/header-menu/select-dialog/select-dialog.component';

function getCurrentURL(location) {
  return location.split(/[?#]/)[0];
}

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss'],
})
export class HeaderMobileComponent implements OnInit {
  dir: Direction;

  navigationsList$: Observable<MenuItem[]>;
  inquiryList: string[] = [
    'SCADDASH',
    'COMPRO',
    'PERINFO',
    'DOHDASH',
    'ADNOCDASH',
    'ADPDASH',
    'DMTDASH',
    'DOEDASH',
    'TADWEER',
    'ADPORTS',
  ];

  svgColoersClasses = [
    'warning',
    'primary',
    'danger',
    'secondary',
    'success',
    'dark',
    'info',
    'dark-75',
    'dark-25',
  ];

  ulCSSClasses: string;
  rootArrowEnabled: boolean;
  location: Location;
  headerMenuDesktopToggle: string;

  constructor(
    private layout: LayoutService,
    private translationService: TranslationService,
    private loc: Location,
    private dashboardService: LayoutDataService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.location = this.loc;
  }

  ngOnInit(): void {
    this.dashboardService.dashboardService();
    this.navigationsList$ =
      this.dashboardService.onNavigationsChange.asObservable();

    this.ulCSSClasses = this.layout.getStringCSSClasses('header_menu_nav');
    this.rootArrowEnabled = this.layout.getProp('header.menu.self.rootArrow');
    this.headerMenuDesktopToggle = this.layout.getProp(
      'header.menu.desktop.toggle'
    );
    this.dir = this.translationService.getSelectedLanguage() == 'en' ? 'ltr' : 'rtl';
  }

  getMenuItemActive(url) {
    return this.checkIsActive(url) ? 'menu-item-active' : '';
  }

  checkIsActive(url) {
    const location = this.location.path();
    const current = getCurrentURL(location);
    if (!current || !url) {
      return false;
    }
    if (current === url) {
      return true;
    }
    return current.indexOf(url) > -1;
  }

  getColor(index) {
    return index > 8
      ? this.svgColoersClasses[index % 8]
      : this.svgColoersClasses[index];
  }

  openAlertDialog() {
    const dialogRef = this.dialog.open(SelectDialogComponent, {
      data: {
        message: 'HelloWorld',
        buttonText: {
          cancel: 'Done',
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  isEnquiry(code): boolean {
    return this.inquiryList.includes(code);
  }
}
