import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicPositionService} from './public-position.service';
import {PublicPositionComponent} from './public-position/public-position.component';

const routes: Routes = [
  {
    path: '',
    component: PublicPositionComponent,
    resolve: {
      service: PublicPositionService
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPositionRoutingModule {
}
