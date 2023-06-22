import { Component, OnInit } from '@angular/core';
import {SYSTEMS} from "../../../tempData.conts";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";

@Component({
  selector: 'app-content-dependencies',
  templateUrl: './content-dependencies.component.html',
  styleUrls: ['./content-dependencies.component.scss']
})
export class ContentDependenciesComponent implements OnInit {
  loading: false;
  page = SYSTEMS;

  columns: string[];
  demo = [];
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private lang: ILangFacade,
  ) { }
  ngOnInit(): void {
  }

}
