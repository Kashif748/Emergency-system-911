import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngxs/store";
import {BreakpointObserver} from "@angular/cdk/layout";
import {ILangFacade} from "@core/facades/lang.facade";

@Component({
  selector: 'app-business-continuity-setup',
  templateUrl: './business-continuity-setup.component.html',
  styleUrls: ['./business-continuity-setup.component.scss']
})
export class BusinessContinuitySetupComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver,
    private translate: TranslateService,
    private lang: ILangFacade
    ) {
  }


  ngOnDestroy(): void {
  }

  ngOnInit(): void {


  }
}
