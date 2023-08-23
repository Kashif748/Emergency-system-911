import { Component, OnInit } from '@angular/core';
import {ILangFacade} from "@core/facades/lang.facade";
import {TranslateService} from "@ngx-translate/core";
import {BrowseRtoAction} from "../../../../bc-lists/rto/states/browse-rto.action";
import {Store} from "@ngxs/store";
import {BrowseStaffAction} from "../../states/browse-staff.action";

@Component({
  selector: 'app-staff-req-content',
  templateUrl: './staff-req-content.component.html',
  styleUrls: ['./staff-req-content.component.scss']
})
export class StaffReqContentComponent implements OnInit {
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

  openDialog(id?: number) {
    this.store.dispatch(new BrowseStaffAction.ToggleDialog({ staffId: id }));
  }

}
