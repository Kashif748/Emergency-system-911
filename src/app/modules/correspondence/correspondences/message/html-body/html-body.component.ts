import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-html-body',
  templateUrl: './html-body.component.html',
  styleUrls: ['./html-body.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HtmlBodyComponent implements OnInit {

  @Input() body;

  constructor() {
  }

  ngOnInit(): void {
  }

}
