import { Component, OnInit } from '@angular/core';
import {LOCATIONS} from "../../../tempData.conts";
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-location-content',
  templateUrl: './location-content.component.html',
  styleUrls: ['./location-content.component.scss']
})
export class LocationContentComponent implements OnInit {
  public page = LOCATIONS;
  public loading = false;
  public columns: string[] = [ 'criticality', 'rto' , 'desc' ];
  constructor(
    private store: Store,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
  }

}
