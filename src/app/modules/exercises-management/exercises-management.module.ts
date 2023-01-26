import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExercisesManagementComponent } from "./exercises-management/exercises-management.component";
import { ExercisesManagementRoutingModule } from "./exercises-management-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { ExercisesListComponent } from "./exercises-list/exercises-list.component";
import { ExerciseFormComponent } from "./exercise-form/exercise-form.component";
import { MainDetailsComponent } from "./exercise-form/main-details/main-details.component";
import { ExerciseCommitteComponent } from "./exercise-form/exercise-committe/exercise-committe.component";
import { ExerciseEntitesComponent } from "./exercise-form/exercise-entites/exercise-entites.component";
import { ExerciseGoalsComponent } from "./exercise-form/exercise-goals/exercise-goals.component";
import { ExerciseOtherInfoComponent } from "./exercise-form/exercise-other-info/exercise-other-info.component";
import { CommitteeMemberComponent } from "./exercise-form/exercise-committe/committee-member/committee-member.component";
import { CoreModule } from "src/app/_metronic/core";
import { ExerciseEvaluationComponent } from './exercise-evaluation/exercise-evaluation.component';

@NgModule({
  declarations: [
    ExercisesManagementComponent,
    ExercisesListComponent,
    ExerciseFormComponent,
    MainDetailsComponent,
    ExerciseCommitteComponent,
    ExerciseEntitesComponent,
    ExerciseGoalsComponent,
    ExerciseOtherInfoComponent,
    CommitteeMemberComponent,
    ExerciseEvaluationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ExercisesManagementRoutingModule,
    CoreModule,
  ],
})
export class ExercisesManagementModule {}
