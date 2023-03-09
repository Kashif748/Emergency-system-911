import { Component, OnInit } from '@angular/core';
import {ILangFacade} from "@core/facades/lang.facade";

@Component({
  selector: 'app-team-mgmt',
  templateUrl: './team-mgmt.component.html',
  styleUrls: ['./team-mgmt.component.scss']
})
export class TeamMgmtComponent implements OnInit {

  constructor(private lang: ILangFacade) {}

  ngOnInit(): void {
  }

}
