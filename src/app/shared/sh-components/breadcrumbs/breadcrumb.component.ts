import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { LayoutDataService } from 'src/app/pages/layout.service';
import { MenuItem } from 'src/app/pages/_layout/components/header/header-menu/menu-item.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
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

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [CommonModule],
  exports: [BreadcrumbComponent],
})
export class SharedBreadcrumbModule {}
