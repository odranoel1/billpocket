import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { StoreComponent } from './store.component';
import { IndexComponent } from './index/index.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PayComponent } from './pay/pay.component';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
    children: [
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'confirm',
        component: ConfirmComponent
      },
      {
        path: 'pay',
        component: PayComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
