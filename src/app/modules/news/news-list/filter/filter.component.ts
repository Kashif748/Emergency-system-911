import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {

  @Output('applyFilter') applyFilter$:EventEmitter<string> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

}
