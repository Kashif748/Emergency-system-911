import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SuggestionsComponent } from "./suggestions.component";

import { CreateSuggestionComponent } from "./create-suggestion/create-suggestion.component";
import { ManageSuggestionsComponent } from "./manage-suggestions/manage-suggestions.component";
import { MySuggestionsComponent } from "./my-suggestions/my-suggestions.component";
import { ReviewSuggestionComponent } from "./review-suggestion/review-suggestion.component";

const routes: Routes = [
  {
    path: "",
    component: SuggestionsComponent,
    children: [
      { path: "make", component: CreateSuggestionComponent },
      { path: "manage", component: ManageSuggestionsComponent },
      { path: "mysugg", component: MySuggestionsComponent },
      { path: "review/:id", component: ReviewSuggestionComponent },
      { path: "", redirectTo: "make" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuggestionsRoutingModule {}
