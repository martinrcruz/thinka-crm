import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TareasComponent } from './tareas/tareas.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Projects'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tareas'
      },
      {
        path: 'tareas',
        component: TareasComponent,
        data: {
          title: 'Tareas',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
