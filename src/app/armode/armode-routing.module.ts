import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArmodePage } from './armode.page';

const routes: Routes = [
  {
    path: '',
    component: ArmodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArmodePageRoutingModule {}
