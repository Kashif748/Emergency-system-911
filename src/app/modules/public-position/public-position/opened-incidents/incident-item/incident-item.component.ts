import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-incident-item',
  templateUrl: './incident-item.component.html',
  styleUrls: ['./incident-item.component.scss']
})
export class IncidentItemComponent implements OnInit {

  // Variables.
  @Input() incident: any;
  @Input() selectedIncident: any;
  @Output() outOnIncidentClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  getClasses() {
    if (this.selectedIncident === this.incident) {
      return 'selected-item d-flex align-items-center';
    }
    return 'item d-flex align-items-center';
  }

  onItemClick() {
    this.outOnIncidentClick.emit(this.incident);
  }
}
