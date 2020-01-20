import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { IndexComponent } from './index/index.component';
import { ProductComponent } from './product/product.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CatalogComponent, IndexComponent, ProductComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogRoutingModule
  ]
})
export class CatalogModule { }
