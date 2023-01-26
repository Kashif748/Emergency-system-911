import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExerciseEvaluationComponent } from "./exercise-evaluation/exercise-evaluation.component";
import { ExerciseFormComponent } from "./exercise-form/exercise-form.component";
import { ExercisesListComponent } from "./exercises-list/exercises-list.component";
import { ExercisesManagementComponent } from "./exercises-management/exercises-management.component";

const routes: Routes = [
  {
    path: "",
    component: ExercisesManagementComponent,
    children: [
      {
        path: "",
        component: ExercisesListComponent,
      },
      {
        path: "view",
        component: ExerciseFormComponent,
      },
      {
        path: "evaluation",
        component: ExerciseEvaluationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercisesManagementRoutingModule {}
