import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rto-list-content',
  templateUrl: './rto-list-content.component.html',
  styleUrls: ['./rto-list-content.component.scss']
})
export class RtoListContentComponent implements OnInit {
  public loading = false;
  public columns: string[] = [ 'criticality', 'rto' , 'desc' ];
  public page = [
    {id: 1, criticality: 'test1', rto: 'phaseOne', desc: 'test3'},
    {id: 2, criticality: 'test2', rto: 'phaseTwo', desc: 'test3'},
    {id: 3, criticality: 'test3', rto: 'phaseTwo', desc: 'test3'},
    {id: 4, criticality: 'test4', rto: 'phaseTwo', desc: 'test3'},
    {id: 5, criticality: 'test5', rto: 'phaseTwo', desc: 'test3'}
    ]
  constructor() { }

  ngOnInit(): void {
  }

  openView(groupId?: number) {
    // this.store.dispatch(new BrowseGroupsAction.OpenView({ id: groupId }));
  }

}
