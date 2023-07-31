import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ImpactLevelState } from '@core/states';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BcImpactLevel, BCRtoDetails } from 'src/app/api/models';

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.scss'],
})
export class ColorSelectorComponent implements OnInit {
  @ViewChild('colorBar') colorBar: ElementRef<HTMLDivElement>;

  @Select(ImpactLevelState.page)
  public impactLevels$: Observable<BcImpactLevel[]>;

  @Input()
  selectedImpactType: BCRtoDetails;

  @Output() onChange = new EventEmitter<BcImpactLevel>();
  activeIndex = -1;
  hoverIndex;
  constructor() {}

  ngOnInit(): void {}
  checkPartColor(i, item) {
    console.log(item);
  }
  selectColor(i, item: BcImpactLevel) {
    this.selectedImpactType.bcImpactLevelId = item?.id;
    this.activeIndex = i;
    this.onChange.emit(item);
  }
}
