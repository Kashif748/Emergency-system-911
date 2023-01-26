import { MatDialogRef } from "@angular/material/dialog";
import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Observable } from "rxjs";

import { IncidentsService } from "src/app/_metronic/core/services/incidents.service";
import { AlertsService } from "src/app/_metronic/core/services/alerts.service";
import { CommonService } from "src/app/_metronic/core/services/common.service";
import { TranslationService } from "src/app/modules/i18n/translation.service";



@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.scss']
})
export class StatusDialogComponent implements OnInit {
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  reason: any ="";

  loading = true;

  constructor(
    private alertService: AlertsService,
    private incidentservice: IncidentsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cd: ChangeDetectorRef,
    private dialogRef: MatDialogRef<StatusDialogComponent>,
    private translationService: TranslationService
  ) {

    if(data){
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
        }
  //  this.dialogRef.updateSize('500vw','500vw')

  }

  ngOnInit(): void {
  
  }


  onSubmit() {
    this.incidentservice.updateInterimStatus(this.data.incId,this.reason).subscribe(
      (ok) => {
        
        this.alertService.openSuccessSnackBar(), 
        this.loading =false;
        this.dialogRef.close();
      },
      (er) => {
        console.error(er);
        this.dialogRef.close();
        this.alertService.openFailureSnackBar();
      }
    );
  }

}
