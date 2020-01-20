import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { IndexComponent } from './index/index.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PayComponent } from './pay/pay.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StoreComponent, IndexComponent, ConfirmComponent, PayComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }
