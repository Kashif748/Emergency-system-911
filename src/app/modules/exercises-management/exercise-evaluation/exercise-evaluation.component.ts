import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { animations } from "src/app/shared/animations/animation";
import { TranslationService } from "../../i18n/translation.service";
import { questionsList } from "./evaluations-questions";

@Component({
  selector: "app-exercise-evaluation",
  templateUrl: "./exercise-evaluation.component.html",
  styleUrls: ["./exercise-evaluation.component.scss"],
  animations: animations,
})
export class ExerciseEvaluationComponent implements OnInit {
  questionsList = questionsList;
  lang = "en";
  evaluationsForm = new FormArray([]);

  constructor(
    private translationService: TranslationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.createForm();
  }

  createForm() {
    questionsList[this.lang].forEach((element) => {
      const group = new FormGroup({
        answer: new FormControl(""),
        reason: new FormControl(""),
      });

      this.evaluationsForm.push(group);
    });
  }

  onSubmit() {}
}
