import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-exercise-entites",
  templateUrl: "./exercise-entites.component.html",
  styleUrls: ["./exercise-entites.component.scss"],
})
export class ExerciseEntitesComponent implements OnInit {
  activeGoal = 1;
  selectedEntitis = [];
  leasons = [];

  org = new FormControl("");
  constructor() {}

  ngOnInit(): void {
    this.org.valueChanges.subscribe((data) => {

      if (data) {
        this.selectedEntitis.push(data);
        this.org.reset();
      }
    });
  }

  onKeydown(value) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.selectedEntitis.push(filterValue);
  }

  deleteGoal(index) {
    this.selectedEntitis.splice(index, 1);
  }
}
