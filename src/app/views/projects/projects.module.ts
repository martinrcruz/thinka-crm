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
import { TareasComponent } from './tareas/tareas.component';
import { ProjectsRoutingModule } from './projects-routing.module';


@NgModule({
  declarations: [
    TareasComponent
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
    ProjectsRoutingModule
  ],
})
export class ProjectsModule {
}
