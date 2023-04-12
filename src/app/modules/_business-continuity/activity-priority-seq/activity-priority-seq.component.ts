import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-priority-seq',
  templateUrl: './activity-priority-seq.component.html',
  styleUrls: ['./activity-priority-seq.component.scss']
})
export class ActivityPrioritySeqComponent implements OnInit {
  public loading = false;
  public columns: string[] = [ 'criticality', 'rto' , 'desc' ];
  public page = [
    {id: 1, priority_ar: 'test1', priority_en: 'phaseOne'},
    {id: 2, priority_ar: 'test1', priority_en: 'phaseOne'},
    {id: 3, priority_ar: 'test1', priority_en: 'phaseOne'},
    {id: 4, priority_ar: 'test1', priority_en: 'phaseOne'},
    {id: 5, priority_ar: 'peri', priority_en: 'phaseOne'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
