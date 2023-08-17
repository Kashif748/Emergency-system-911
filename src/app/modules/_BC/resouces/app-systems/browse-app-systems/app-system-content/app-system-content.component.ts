import { Component, OnInit } from '@angular/core';
import {ILangFacade} from "@core/facades/lang.facade";
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-app-system-content',
  templateUrl: './app-system-content.component.html',
  styleUrls: ['./app-system-content.component.scss']
})
export class AppSystemContentComponent implements OnInit {
  loading = false;
  columns = ['test', 'test2'];
  page = [
    {id: 1, criticalityAr: 'الأربعاء', criticalityEn: 'Test1122', nameAr: 'الأربعاء', nameEn: 'Test2'},
    {id: 2, criticalityAr: 'الأربعاء', criticalityEn: 'Test1122', nameAr: 'الأربعاء', nameEn: 'Test2'},
  ]
  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store,
  ) { }

  ngOnInit(): void {
  }

}
