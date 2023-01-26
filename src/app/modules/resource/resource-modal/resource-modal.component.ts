import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-modal',
  templateUrl: './resource-modal.component.html',
  styleUrls: ['./resource-modal.component.scss']
})
export class ResourceModalComponent implements OnInit {
  controllerName = "";
  constructor() { }

  ngOnInit(): void {
  }

}
