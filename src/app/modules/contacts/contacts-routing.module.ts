import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './views/customer/customer.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'contacts'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'customer-list'
      },
      {
        path: 'customer-list',
        component: CustomerComponent,
        data: {
          title: 'Customers',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule {
}
