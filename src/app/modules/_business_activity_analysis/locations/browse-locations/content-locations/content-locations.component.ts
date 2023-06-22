import { Component, OnInit } from '@angular/core';
import {SYSTEMS} from "../../../tempData.conts";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";

@Component({
  selector: 'app-content-locations',
  templateUrl: './content-locations.component.html',
  styleUrls: ['./content-locations.component.scss']
})
export class ContentLocationsComponent implements OnInit {
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
