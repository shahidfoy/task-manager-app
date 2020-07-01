import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { TaskManagerService } from '../services/task-manager.service';
import { Observable, Observer } from 'rxjs';
import { TaskManagerFormComponent } from './task-manager-form/task-manager-form.component';
import { Calendar } from '@fullcalendar/core';
import { GridType } from '../enums/grid-type.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
// import { CalendarOptions } from '@fullcalendar/angular'; 

export interface CalendarOptions {
  initialView: string,
  events: any,
  plugins: any,
  dateClick?: any,
  eventClick?: any,
  initialDate: any,
  themeSystem: string,
}

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.scss']
})
export class ViewScheduleComponent implements OnInit, AfterViewInit {

  @ViewChild(TaskManagerFormComponent) taskmanagerComponent: TaskManagerFormComponent;
  
  // references the #calendar in the template
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  fullCalendarAPI: Calendar;

  GridType: typeof GridType = GridType;
  selectedGridType: GridType;
  selectedGridEvent = new EventEmitter<GridType>();

  isVisible = false;
  selectedStartDate = '';
  selectedEndDate = '';
  modalTitle: string = 'Add Task';
  modalDateRange: string;

  date: Date = new Date();

  constructor(
    private taskManagerService: TaskManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.date = new Date();
    this.selectedGridType = GridType.GRID_MONTH;

    // this.calendarEvents = [
    //     { title: 'event 3', date: '2020-06-08' },
    //     { title: 'event 3', date: '2020-06-09' },
    //     { title: 'event 3', date: '2020-06-10' },
    // ];
  }

  ngAfterViewInit() {}

  changeCalendarView(selectedGrid: GridType) {
    console.log('viewType', selectedGrid);
    this.selectedGridType = selectedGrid;

    let gridParam: string;
    switch (this.selectedGridType) {
      case GridType.GRID_MONTH:
        gridParam = 'month';
        break;
      case GridType.GRID_TIME_WEEK:
        gridParam = 'week';
        break;
      case GridType.GRID_DAY:
        gridParam = 'day';
        break;
      case GridType.LIST_WEEK:
        gridParam = 'list';
        break;
      default:
        gridParam = 'month';
        break;
    }

    this.router.navigateByUrl(`/schedule/${gridParam}/${new Date().toISOString().substr(0,10)}`);
    console.log('url', `/schedule/${gridParam}/${new Date().toISOString().substr(0,10)}`);
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    const valid = this.taskmanagerComponent.validate();

    if (valid) {
      this.taskmanagerComponent.submitForm();
      this.isVisible = false;
    }
  }

  onChange(event: Date) {
    console.log('onChange', event);
    // this.calendarComponent.gotoDate()
    this.date = new Date(event);
    this.fullCalendarAPI.gotoDate(this.date);
    console.log('DATE', this.date);
    // this.fullCalendarAPI.next();

    // TODO:: ROUTE ON DATE CHANGE FOR FULL CALENDAR COMPONENT
  }
}
