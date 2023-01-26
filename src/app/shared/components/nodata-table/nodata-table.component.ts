import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "nodata-table",
  templateUrl: "./nodata-table.component.html",
  styleUrls: ["./nodata-table.component.scss"],
})
export class NodataTableComponent implements OnInit {
  @Input() input: any;
  @Input() loading: boolean;
  constructor() {}

  ngOnInit(): void {}
}
