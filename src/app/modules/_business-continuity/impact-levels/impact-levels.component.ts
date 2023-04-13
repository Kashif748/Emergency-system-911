import { Component, OnInit } from '@angular/core';
import { DATA } from '../tabs.const';

@Component({
  selector: 'app-impact-levels',
  templateUrl: './impact-levels.component.html',
  styleUrls: ['./impact-levels.component.scss'],
})
export class ImpactLevelsComponent implements OnInit {
  public loading = false;
  public columns: string[] = ['levelAr', 'levelEn', 'color', 'active'];
  public page = DATA.impactLevels;

  ngOnInit(): void {}
}
