import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";
import {SYSTEMS} from "../../../tempData.conts";

@Component({
  selector: 'app-content-employees',
  templateUrl: './content-employees.component.html',
  styleUrls: ['./content-employees.component.scss']
})
export class ContentEmployeesComponent implements OnInit {
  loading: false;
  page = SYSTEMS;

  columns: string[];
  demo = [];
  constructor(
    private formBuilder: FormBuilder,
    private lang: ILangFacade,
  ) { }

  ngOnInit(): void {
  }

}
