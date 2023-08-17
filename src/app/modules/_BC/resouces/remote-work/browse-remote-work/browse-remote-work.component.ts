import { Component, OnInit } from '@angular/core';
import {ILangFacade} from "@core/facades/lang.facade";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-browse-remote-work',
  templateUrl: './browse-remote-work.component.html',
  styleUrls: ['./browse-remote-work.component.scss']
})
export class BrowseRemoteWorkComponent implements OnInit {

  constructor(private translate: TranslateService,
              private lang: ILangFacade) { }

  ngOnInit(): void {
  }

}
