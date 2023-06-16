import { Component, OnInit } from '@angular/core';
import {VENDERS} from "../../../tempData.conts";

@Component({
  selector: 'app-vender-content',
  templateUrl: './vender-content.component.html',
  styleUrls: ['./vender-content.component.scss']
})
export class VenderContentComponent implements OnInit {
  public columns: string[] = [ 'criticality', 'rto' , 'desc' ];
  public page = VENDERS;
  public loading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
