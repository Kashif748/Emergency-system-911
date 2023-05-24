import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseOrgDetailComponent } from './browse-org-detail/browse-org-detail.component';
import { OrgHierarchyFormComponent } from './org-hierarchy/org-hierarchy-form/org-hierarchy-form.component';

import { OrgHierarchyComponent } from './org-hierarchy/org-hierarchy.component';

const routes: Routes = [
  {
    path: 'org-details',
    component: BrowseOrgDetailComponent,
  },
  {
    path: 'org-strucure',
    component: OrgHierarchyComponent,
    children: [
      {
        path: 'add',
        component: OrgHierarchyFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgDetailRoutingModule {}
