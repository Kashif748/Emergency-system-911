import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BcImpactLevel } from 'src/app/api/models';

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.scss'],
})
export class ColorSelectorComponent implements OnInit {
  @ViewChild('colorBar') colorBar: ElementRef<HTMLDivElement>;
  @Input()
  impactTypes: BcImpactLevel[];
  obj = ['#FFBFB7', '#320D6D', '#FFD447', '#700353', '#4C1C00'];
  activeIndex = -1;
  hoverIndex
  constructor() {}

  ngOnInit(): void {}
  checkPartColor(i, item) {
    console.log(item);


  }
  selectColor(i, item) {
    this.hoverIndex = i
      // const bar = this.colorBar.nativeElement.children.item(i) as HTMLSpanElement;
      // bar.style.backgroundColor = item;
  }
}
