import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArinputPage } from './arinput.page';

const routes: Routes = [
  {
    path: '',
    component: ArinputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArinputPageRoutingModule {}
