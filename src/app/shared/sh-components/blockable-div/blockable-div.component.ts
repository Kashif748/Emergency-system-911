import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, NgModule } from '@angular/core';
import { BlockableUI } from 'primeng/api';

@Component({
  selector: 'p-blockable-div',
  templateUrl: './blockable-div.component.html',
  styleUrls: ['./blockable-div.component.scss'],
})
export class BlockableDivComponent implements BlockableUI {
  @Input() style: any;
  @Input() class: any;

  constructor(private el: ElementRef) {}

  getBlockableElement(): HTMLElement {
    return this.el.nativeElement.children[0];
  }
}

@NgModule({
  declarations: [BlockableDivComponent],
  imports: [CommonModule],
  exports: [BlockableDivComponent],
})
export class BlockableDivModule {}
