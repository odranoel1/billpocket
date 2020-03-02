import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { IndexComponent } from './index/index.component';
import { ProductComponent } from './product/product.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [IndexComponent, ProductComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogRoutingModule,
    FormsModule
  ]
})
export class CatalogModule { }
