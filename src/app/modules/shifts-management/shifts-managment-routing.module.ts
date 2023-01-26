import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PrivilegeGuard } from "@shared/guards/privilege.guard";
import { ShiftsListComponent } from "./shifts-list/shifts-list.component";



const routes: Routes = [

    {
        path: "",
        canLoad: [PrivilegeGuard],
        data: { permission: "PRIV_VW_SHF" },


        component: ShiftsListComponent,
        children: [
          {
            path: "",
            redirectTo: 'shifts',
            pathMatch: "full",
          },
    
          { path: "", redirectTo: "shifts", pathMatch: "full" },
          { path: "**", redirectTo: "shifts", pathMatch: "full" },
        ],
      },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShiftsManagmentRoutingModule {}