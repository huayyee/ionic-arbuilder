import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArmodePageRoutingModule } from './armode-routing.module';

import { ArmodePage } from './armode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArmodePageRoutingModule
  ],
  declarations: [ArmodePage]
})
export class ArmodePageModule {}
