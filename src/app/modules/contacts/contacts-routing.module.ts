import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsComponent } from './views/leads/leads.component';
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
        redirectTo: 'customer'
      },
      {
        path: 'leads',
        component: LeadsComponent,
        data: {
          title: 'Leads',
        },
      },
      {
        path: 'customer',
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
