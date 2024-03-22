import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaComponent } from './venta/venta.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';

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
        redirectTo: 'leads'
      },
      {
        path: 'cotizacion',
        component: CotizacionComponent,
        data: {
          title: 'Cotizacion',
        },
      },
      {
        path: 'venta',
        component: VentaComponent,
        data: {
          title: 'Venta',
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
