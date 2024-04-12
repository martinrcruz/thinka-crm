import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteComponent } from './views/quote/quote.component';
import { SaleComponent } from './views/sale/sale.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Sales'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sales'
      },
      {
        path: 'quote-list',
        component: QuoteComponent,
        data: {
          title: 'Quotes',
        },
      },
      {
        path: 'sale-list',
        component: SaleComponent,
        data: {
          title: 'Sales',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {
}
