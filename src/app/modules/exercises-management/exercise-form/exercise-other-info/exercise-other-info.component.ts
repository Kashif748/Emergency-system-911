import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { TranslationService } from "src/app/modules/i18n/translation.service";
import { animations } from "src/app/shared/animations/animation";

@Component({
  selector: "app-exercise-other-info",
  templateUrl: "./exercise-other-info.component.html",
  styleUrls: ["./exercise-other-info.component.scss"],
  animations: animations,
})
export class ExerciseOtherInfoComponent implements OnInit {
  exerciseForm: FormGroup;

  lang = "en";
  constructor(
    private translationService: TranslationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.createForm();
  }

  createForm() {
    this.exerciseForm = this.fb.group({
      plan: [""],
      security: [""],
      seafty: [""],
      exercisWord: [false],
    });
  }

  onSubmit() {}
}
