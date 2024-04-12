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
import { TaskListComponent } from './views/task/task-list/task-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectListComponent } from './views/project/project-list/project-list.component';
import { ProjectModalComponent } from './components/project-modal/project-modal.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, NativeDateAdapter} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectDetailComponent } from './views/project/project-detail/project-detail.component';
import {MatCardModule} from '@angular/material/card';
import {KanbanModule} from '@syncfusion/ej2-angular-kanban';
import { TaskKanbanComponent } from './views/task/task-kanban/task-kanban.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import {MatTabsModule} from '@angular/material/tabs';
import {FileManagerModule} from '@syncfusion/ej2-angular-filemanager';
@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectModalComponent,
    ProjectDetailComponent,
    TaskModalComponent,
    TaskListComponent,
    TaskKanbanComponent
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
    ProjectsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    KanbanModule,
    MatTabsModule,
    FileManagerModule
  ],
})
export class ProjectsModule {
}
