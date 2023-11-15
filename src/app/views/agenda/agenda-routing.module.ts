import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteComponent } from './note/note.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Agenda'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'note'
      },
      {
        path: 'note',
        component: NoteComponent,
        data: {
          title: 'Notes',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule {
}
