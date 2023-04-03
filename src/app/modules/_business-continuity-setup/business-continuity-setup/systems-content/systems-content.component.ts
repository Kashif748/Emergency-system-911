import { Component, OnInit } from '@angular/core';
import {Store} from "@ngxs/store";
import {SYSTEMS} from "../../tempData.conts";

@Component({
  selector: 'app-systems-content',
  templateUrl: './systems-content.component.html',
  styleUrls: ['./systems-content.component.scss']
})
export class SystemsContentComponent implements OnInit {

  public loading = false;
  public display = false;
  public columns: string[] = [ 'criticality', 'rto' , 'desc' ];
  public page = SYSTEMS;
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
