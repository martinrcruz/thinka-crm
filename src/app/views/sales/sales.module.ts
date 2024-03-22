import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AlertModule,
  BadgeModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  ToastModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';
import { VentaComponent } from './venta/venta.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { SalesRoutingModule } from './sales-routing.module';


@NgModule({
  declarations: [
    CotizacionComponent,
    VentaComponent
  ],
  imports: [
    CommonModule,
    AlertModule,
    GridModule,
    CardModule,
    BadgeModule,
    ButtonModule,
    FormModule,
    ModalModule,
    ToastModule,
    SharedModule,
    UtilitiesModule,
    TooltipModule,
    PopoverModule,
    ProgressModule,
    SalesRoutingModule
  ],
})
export class SalesModule {
}
