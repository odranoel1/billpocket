import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: 'product/:id',
    component: ProductComponent,
    children: [
      // {
      //   path: '',
      //   component: IndexComponent
      // },
      // {
      //   path: 'product/:id',
      //   component: ProductComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
