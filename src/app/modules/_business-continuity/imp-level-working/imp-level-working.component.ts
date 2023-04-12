import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imp-level-working',
  templateUrl: './imp-level-working.component.html',
  styleUrls: ['./imp-level-working.component.scss']
})
export class ImpLevelWorkingComponent implements OnInit {
  public loading = false;
  public columns: string[] = [ 'criticality', 'rto' , 'desc' ];
  public page = [
    {id: 1, color: '#1976D2', imp_level: 'phaseOne', desc: 'imp_level'},
    {id: 2, color: '#ff1a1a', imp_level: 'phaseTwo', desc: 'imp_level'},
    {id: 3, color: '#00ff00', imp_level: 'phaseTwo', desc: 'imp_levelt3'},
    {id: 4, color: '#ffff00', imp_level: 'phaseTwo', desc: 'imp_level3'},
    {id: 5, color: '#1976D2', imp_level: 'phaseTwo', desc: 'test3'}
  ]
  constructor() { }

  ngOnInit(): void {
  }
  openView(groupId?: number) {
    // this.store.dispatch(new BrowseGroupsAction.OpenView({ id: groupId }));
  }
}
