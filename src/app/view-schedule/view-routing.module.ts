import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ViewScheduleComponent } from './view-schedule.component';

const routes: Routes = [
  { 
    path: '', 
    component: ViewScheduleComponent,
    children: [
      // { path: '', pathMatch: 'full', redirectTo: 'schedule' },
      { path: 'month', loadChildren: () => undefined },
      { path: 'week', loadChildren: () => undefined },
      { path: 'day', loadChildren: () => undefined },
      { path: 'list', loadChildren: () => undefined },
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
