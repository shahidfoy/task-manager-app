import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ViewScheduleComponent } from './view-schedule.component';
import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';

const routes: Routes = [
  { 
    path: '', 
    component: ViewScheduleComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: `month/${ new Date().toISOString().substr(0,10) }` },
      { path: ':view/:date', component: FullcalendarComponent },
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
