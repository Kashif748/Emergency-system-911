import { Component, OnInit } from "@angular/core";
import { animations } from "src/app/shared/animations/animation";

@Component({
  selector: "app-exercise-form",
  templateUrl: "./exercise-form.component.html",
  styleUrls: ["./exercise-form.component.scss"],
  animations: animations,
})
export class ExerciseFormComponent implements OnInit {
  tabs = [
    { name: "main_info", icon: "flaticon2-settings" },
    { name: "entitis", icon: "flaticon-safe-shield-protection" },
    { name: "committee", icon: "flaticon2-avatar" },
    { name: "goals", icon: "flaticon2-checking" },
    { name: "other_info", icon: "flaticon2-information" },
  ];

  activeTab = "main_info";
  constructor() {}

  ngOnInit(): void {}
}
