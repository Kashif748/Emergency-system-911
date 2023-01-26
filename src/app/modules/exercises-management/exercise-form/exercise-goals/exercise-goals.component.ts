import { Component, OnInit } from "@angular/core";
import { animations } from "src/app/shared/animations/animation";

@Component({
  selector: "app-exercise-goals",
  templateUrl: "./exercise-goals.component.html",
  styleUrls: ["./exercise-goals.component.scss"],
  animations: animations,
})
export class ExerciseGoalsComponent implements OnInit {
  activeGoal = 1;
  goals = [];
  leasons = [];
  constructor() {
    this.goals = [...this.goals, "goal 1", "goal 2"];
  }

  ngOnInit(): void {}

  onKeydown(value) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.goals.push(filterValue);
  }

  deleteGoal(index) {
    this.goals.splice(index, 1);
  }
}
