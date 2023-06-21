import { Component, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { NOTES } from '../tempData.conts';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notes = NOTES;
  constructor(private lang: ILangFacade) {}

  ngOnInit(): void {}
}
