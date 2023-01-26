import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { Challenge } from '../../challenges/model/Challenge';

@Component({
  selector: 'app-local-challenges-form',
  templateUrl: './local-challenges-form.component.html',
  styleUrls: ['./local-challenges-form.component.scss']
})
export class LocalChallengesFormComponent implements OnInit {

  type:"add" | "edit";

  lang:string;
  form:FormGroup;
  display:boolean;

  constructor(
    private ref: ChangeDetectorRef,
    private _translation:TranslationService,
    @Inject(MAT_DIALOG_DATA) public data:Challenge,
    private _MatDialogRef:MatDialogRef<LocalChallengesFormComponent>,
    private _alert:AlertsService
  ) { }

  ngOnInit(): void {

    this.lang = this._translation.getSelectedLanguage();
    
    this.type = this.data ? 'edit' : 'add';

    this.createForm();

  }

  createForm() {

    this.form = new FormGroup({
      challenge:new FormControl(null,[Validators.required]),
      requmendations:new FormControl(null)
    });
    
    if(this.type === 'edit') {

      this.patchValues(this.data);

    }

    this.display = true;
    
    this.ref.markForCheck();

  }

  patchValues(data:Challenge) {
    
    this.form.patchValue(data);

  }

  submit() {
    
    if(!this.form.dirty) return;
    
    const data = this.prepareToSend();

    this._MatDialogRef.close(data);
    
  }

  prepareToSend() {
    
    let dataToSend:Challenge = new Challenge(this.form.value);
    dataToSend.id = this.data?.id || new Date().getTime()
    
    return dataToSend;

  }

}
