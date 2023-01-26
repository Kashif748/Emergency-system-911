import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { LayoutDataService } from 'src/app/pages/layout.service';
import { MenuItem } from 'src/app/pages/_layout/components/header/header-menu/menu-item.model';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  // Variables
  lang = 'en';
  currentMenu: MenuItem;
  @Input() title: string;

  constructor(
    private layoutDataService: LayoutDataService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    if (!this.title) {
      this.layoutDataService.currentMenuItem.subscribe((data) => {
        if (data) {
          this.currentMenu = data;
        }
      });
    }
  }
}
