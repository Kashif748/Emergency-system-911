import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { TranslationService } from "src/app/modules/i18n/translation.service";

@Component({
  selector: "app-main-details",
  templateUrl: "./main-details.component.html",
  styleUrls: ["./main-details.component.scss"],
})
export class MainDetailsComponent implements OnInit {
  exerciseForm: FormGroup;
  maxDate: Date;
  minDate: Date;
  lang = "en";
  constructor(
    private translationService: TranslationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.createForm();

    this.exerciseForm.get("region").valueChanges.subscribe((data) => {
    });
  }

  createForm() {
    this.exerciseForm = this.fb.group({
      type: [""],
      name: [""],
      date: [""],
      code: [""],
      desc: [""],
      region: [""],
    });
  }

  onSubmit() {}

  onNewLocationChange(event) {
    // this.mapService
    //   .openMap({
    //     mapType: "task",
    //     // zoomModel: {
    //     //   referenceId: this.task?.id,
    //     //   featureName: this.task?.featureName,
    //     // },
    //   })
    //   .subscribe((response) => {
    //     console.log(response);
    //     // this.addLocationToMapFunc = response?.ff;
    //     // this.formGroup.get("location").patchValue(response?.gType);
    //     // if (response) {
    //     //   this.formGroup.get("newLocation").patchValue(true);
    //     // }
    //   });
  }
}
