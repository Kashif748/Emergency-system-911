import { Component, OnInit } from '@angular/core';
import {ILangFacade} from "@core/facades/lang.facade";

@Component({
  selector: 'app-browse-employees',
  templateUrl: './browse-employees.component.html',
  styleUrls: ['./browse-employees.component.scss']
})
export class BrowseEmployeesComponent implements OnInit {

  constructor(
    private lang: ILangFacade,
  ) { }

  ngOnInit(): void {
  }

}
