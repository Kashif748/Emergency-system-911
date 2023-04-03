import { Component, OnInit } from '@angular/core';
import {VENDERS} from "../../tempData.conts";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-venders-partners-content',
  templateUrl: './venders-partners-content.component.html',
  styleUrls: ['./venders-partners-content.component.scss']
})
export class VendersPartnersContentComponent implements OnInit {

  public loading = false;
  public display = false;
  public columns: string[] = [ 'criticality', 'rto' , 'desc' ];
  public page = VENDERS;
  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
  }

  openView(groupId?: number) {
    // this.store.dispatch(new BrowseGroupsAction.OpenView({ id: groupId }));
  }

  openDialog(groupId?: number) {
    this.display = true;
  }
}
