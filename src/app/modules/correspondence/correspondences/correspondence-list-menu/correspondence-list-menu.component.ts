import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-correspondence-list-menu',
  templateUrl: './correspondence-list-menu.component.html',
  styleUrls: ['./correspondence-list-menu.component.scss'],
})
export class CorrespondenceListMenuComponent {

  // UI
  @Input() current: | 'IN' | 'OUT' | 'IN_WITH_CIRCULAR' | 'OUT_WITH_CIRCULAR' = 'IN';
  // tslint:disable-next-line:no-output-rename
  @Output('tabChanged') tabChanged$: EventEmitter<any> = new EventEmitter();

  // Variables
  accSelected: 'IN' | 'OUT' = 'IN';
  accActive: string;
  tabs = [
    {
      key: 'CORRERSPONDENCE.INCOMING_CORRESPONDENCE',
      icon: 'Communication/Incoming-box',
      index: 'IN',
      children: [
        {
          key: 'CORRERSPONDENCE.ALL',
          icon: 'Communication/Incoming-box',
          index: 'IN',
        },
        {
          key: 'CORRERSPONDENCE.IN_WITH_CIRCULAR',
          icon: 'Communication/Incoming-box',
          index: 'IN_WITH_CIRCULAR',
        },
        {
          key: 'CORRERSPONDENCE.EXTERNAL',
          icon: 'Communication/Incoming-box',
          index: 'IN_EXTERNAL',
        },
      ],
    },
    {
      key: 'CORRERSPONDENCE.OUTCOMING_CORRESPONDENCE',
      icon: 'Communication/Outgoing-box',
      index: 'OUT',
      children: [
        {
          key: 'CORRERSPONDENCE.ALL',
          icon: 'Communication/Incoming-box',
          index: 'OUT',
        },
        {
          key: 'CORRERSPONDENCE.OUT_WITH_CIRCULAR',
          icon: 'Communication/Incoming-box',
          index: 'OUT_WITH_CIRCULAR',
        },
        {
          key: 'CORRERSPONDENCE.EXTERNAL',
          icon: 'Communication/Incoming-box',
          index: 'OUT_EXTERNAL',
        },
      ],
    },
  ];


  toggle(index) {
    if (index == this.accSelected) {
      this.accSelected = null;
      this.accActive = this.current.split('_')[0];
    } else {
      this.accSelected = index;
    }
  }

  changeCurrentTab(current: 'IN' | 'OUT' | 'IN_WITH_CIRCULAR' | 'OUT_WITH_CIRCULAR') {
    if (this.current == current) {
      return;
    }
    this.current = current;
    this.accActive = this.current.split('_')[0];
    this.tabChanged$.emit(this.current);
  }
}
