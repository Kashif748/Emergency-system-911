import { Component, OnInit } from '@angular/core';
import {LOCATIONS} from "../../tempData.conts";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-locations-content',
  templateUrl: './locations-content.component.html',
  styleUrls: ['./locations-content.component.scss']
})
export class LocationsContentComponent implements OnInit {


  public loading = false;
  public display = false;
  public columns: string[] = [ 'criticality', 'rto' , 'desc' ];
  public page = LOCATIONS;
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
