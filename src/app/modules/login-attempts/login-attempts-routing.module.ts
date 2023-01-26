import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExercisesListComponent} from "../exercises-management/exercises-list/exercises-list.component";
import {ExerciseFormComponent} from "../exercises-management/exercise-form/exercise-form.component";
import {ExercisesManagementComponent} from "../exercises-management/exercises-management/exercises-management.component";
import {ExerciseEvaluationComponent} from "../exercises-management/exercise-evaluation/exercise-evaluation.component";
import {LoginAttemptsListComponent} from "./login-attempts-list/login-attempts-list.component";
import {LoginAttemptsComponent} from "./login-attempts/login-attempts.component";

const routes: Routes = [
  {
    path: "",
    component: LoginAttemptsComponent,
    children: [
      {
        path: "",
        component: LoginAttemptsListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginAttemptsRoutingModule { }
