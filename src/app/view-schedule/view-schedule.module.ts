import { FullCalendarModule } from '@fullcalendar/angular';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interaction from '@fullcalendar/interaction';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';

import { ViewScheduleComponent } from './view-schedule.component';
import { TaskManagerFormComponent } from './task-manager-form/task-manager-form.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewRoutingModule } from './view-routing.module';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  interactionPlugin,
  interaction,
  timeGridPlugin,
  dayGridPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [ViewScheduleComponent, TaskManagerFormComponent],
  imports: [
    CommonModule,
    FullCalendarModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzCheckboxModule,
    NzNotificationModule,
    NzToolTipModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    FormsModule,
    ViewRoutingModule,
  ],
  exports: [ViewScheduleComponent, TaskManagerFormComponent]
})
export class ViewScheduleModule { }
