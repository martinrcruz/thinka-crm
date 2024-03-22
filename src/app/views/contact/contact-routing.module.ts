import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsComponent } from './leads/leads.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'contact'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'leads'
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
export class ContactRoutingModule {
}
