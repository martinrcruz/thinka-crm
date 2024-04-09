import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'contact',
        loadChildren: () =>
          import('./modules/contacts/contacts.module').then((m) => m.ContactsModule)
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./modules/sales/sales.module').then((m) => m.SalesModule)
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./modules/projects/projects.module').then((m) => m.ProjectsModule)
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
