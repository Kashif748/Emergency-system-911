import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-frquency',
  templateUrl: './activity-frquency.component.html',
  styleUrls: ['./activity-frquency.component.scss']
})
export class ActivityFrquencyComponent implements OnInit {
  public loading = false;
  public columns: string[] = [ 'criticality', 'rto' , 'desc' ];
  public page = [
    {id: 1, frq_ar: 'test1', feq_en: 'phaseOne'},
    {id: 2, frq_ar: 'test1', feq_en: 'phaseOne'},
    {id: 3, frq_ar: 'test1', feq_en: 'phaseOne'},
    {id: 4, frq_ar: 'test1', feq_en: 'phaseOne'},
    {id: 5, frq_ar: 'test1', feq_en: 'phaseOne'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
