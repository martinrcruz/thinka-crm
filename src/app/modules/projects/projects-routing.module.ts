import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './views/tasks/tasks.component';
import { ProjectComponent } from './views/project/project.component';

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
        redirectTo: 'tasks'
      },
      {
        path: 'project',
        component: ProjectComponent,
        data: {
          title: 'Projects',
        },
      },
      {
        path: 'tasks',
        component: TasksComponent,
        data: {
          title: 'Tasks',
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
