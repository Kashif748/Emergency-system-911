import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ILangFacade} from "@core/facades/lang.facade";
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngxs/store";
import {PageRequestModel} from "@core/models/page-request.model";
import {LazyLoadEvent} from "primeng/api";
import {BrowseInfraAction} from "../../states/browse-infra.action";
import {BcResourcesItInfrastructure} from "../../../../../../api/models/bc-resources-it-infrastructure";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-infra-content',
  templateUrl: './infra-content.component.html',
  styleUrls: ['./infra-content.component.scss']
})
export class InfraContentComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: BcResourcesItInfrastructure[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;
  public langu;
  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();
  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store,
  ) {
    this.lang.vm$
      .pipe
      ()
      .subscribe((res) => {
        if (res.ActiveLang.key == 'ar') {
          this.langu = 'ar';
        } else {
          this.langu = 'en';
        }
        console.log(this.langu);
      });
  }

  ngOnInit(): void {
    this.onPageChange.emit({
      first: this.pageRequest?.first,
      rows: this.pageRequest?.rows,
    });
  }

  openView(id?: number) {
    this.store.dispatch(new BrowseInfraAction.OpenView({ infraId: id }));
  }

  openDialog(id?: number) {
  }
}
