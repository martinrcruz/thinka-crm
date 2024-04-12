import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './views/task/task-list/task-list.component';
import { TaskDetailComponent } from './views/task/task-detail/task-detail.component';
import { ProjectListComponent } from './views/project/project-list/project-list.component';
import { ProjectDetailComponent } from './views/project/project-detail/project-detail.component';
import { TaskKanbanComponent } from './views/task/task-kanban/task-kanban.component';

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
        path: 'project-list',
        component: ProjectListComponent,
        data: {
          title: 'Projects',
        },
      },
      {
        path: 'project-detail',
        component: ProjectDetailComponent,
        data: {
          title: 'Project Details',
        },
      },
      {
        path: 'task-list',
        component: TaskListComponent,
        data: {
          title: 'Tasks',
        },
      },
      {
        path: 'task-detail',
        component: TaskDetailComponent,
        data: {
          title: 'Task Detail',
        },
      },
      {
        path: 'task-kanban',
        component: TaskKanbanComponent,
        data: {
          title: 'Task Kanban',
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
