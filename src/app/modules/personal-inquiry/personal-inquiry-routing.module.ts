import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PersonalInquiryComponent } from "./personal-inquiry.component";

const routes: Routes = [
  {
    path: "",
    component: PersonalInquiryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalInquiryRoutingModule {}
