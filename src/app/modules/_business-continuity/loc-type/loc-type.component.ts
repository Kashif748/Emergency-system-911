import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loc-type',
  templateUrl: './loc-type.component.html',
  styleUrls: ['./loc-type.component.scss']
})
export class LocTypeComponent implements OnInit {
  public loading = false;
  public columns: string[] = [ 'criticality', 'rto' , 'desc' ];
  public page = [
    {id: 1, type_ar: 'test1', type_en: 'phaseOne'},
    {id: 2, type_ar: 'test1', type_en: 'phaseOne'},
    {id: 3, type_ar: 'test1', type_en: 'phaseOne'},
    {id: 4, type_ar: 'test1', type_en: 'phaseOne'},
    {id: 5, type_ar: 'test1', type_en: 'phaseOne'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
