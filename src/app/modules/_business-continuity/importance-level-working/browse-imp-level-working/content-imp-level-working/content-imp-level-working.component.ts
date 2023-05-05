import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {DATA} from "../../../tabs.const";
import {Bcrto} from "../../../../../api/models/bcrto";
import {PageRequestModel} from "@core/models/page-request.model";
import {LazyLoadEvent} from "primeng/api";
import {BcWorkImportanceLevels} from "../../../../../api/models/bc-work-importance-levels";

@Component({
  selector: 'app-content-imp-level-working',
  templateUrl: './content-imp-level-working.component.html',
  styleUrls: ['./content-imp-level-working.component.scss']
})
export class ContentImpLevelWorkingComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: BcWorkImportanceLevels[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.onPageChange.emit({
      first: this.pageRequest?.first,
      rows: this.pageRequest?.rows,
    });
/*    this.page = DATA.impactLevelsWorking.map((item) => {
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
    });*/
  }
  openView(groupId?: number) {
    // this.store.dispatch(new BrowseGroupsAction.OpenView({ id: groupId }));
  }
}
