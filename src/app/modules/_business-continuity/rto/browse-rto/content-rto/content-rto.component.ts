import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {DATA} from "../../../tabs.const";
import {ILangFacade} from "@core/facades/lang.facade";

@Component({
  selector: 'app-content-rto',
  templateUrl: './content-rto.component.html',
  styleUrls: ['./content-rto.component.scss']
})
export class ContentRtoComponent implements OnInit {
  public loading = false;
  public display = false;
  public columns: string[] = ['criticality', 'rto', 'desc'];
  public page = [];
  constructor(
    private translate: TranslateService,
    private lang: ILangFacade) {}

  ngOnInit(): void {
    this.page = DATA.rtoList.map((item) => {
      return {
        ...item,
        actions: [
          {
            label: this.translate.instant('ACTIONS.EDIT'),
            icon: 'pi pi-pencil',
            command: () => {
              // this.openDialog(item.id);
            },
          },
        ],
      };
    });
  }

  openView(Id?: number) {
    // this.store.dispatch(new BrowseGroupsAction.OpenView({ id: groupId }));
  }

  openDialog(Id?: number) {
    this.display = true;
  }
}
