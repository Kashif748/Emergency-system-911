import { Component, OnInit } from '@angular/core';
import {SYSTEMS} from "../../../tempData.conts";
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngxs/store";
import {ILangFacade} from "@core/facades/lang.facade";

@Component({
  selector: 'app-system-content',
  templateUrl: './system-content.component.html',
  styleUrls: ['./system-content.component.scss']
})
export class SystemContentComponent implements OnInit {
  public columns: string[] = [ 'criticality', 'rto' , 'desc' ];
  public page = SYSTEMS;
  public loading = false;
  constructor(
    private store: Store,
    private translate: TranslateService,
    private lang: ILangFacade,
  ) { }

  ngOnInit(): void {
  }

}
