import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";
import {SYSTEMS} from "../../../tempData.conts";

@Component({
  selector: 'app-content-systems',
  templateUrl: './content-systems.component.html',
  styleUrls: ['./content-systems.component.scss']
})
export class ContentSystemsComponent implements OnInit {

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
