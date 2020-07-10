import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArinputPageRoutingModule } from './arinput-routing.module';

import { ArinputPage } from './arinput.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArinputPageRoutingModule
  ],
  declarations: [ArinputPage]
})
export class ArinputPageModule {}
