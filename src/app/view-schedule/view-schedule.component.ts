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
  // selectedGridType: Observable<GridType>;

  // GRID_MONTH = 'dayGridMonth';
  // GRID_WEEK = 'dayGridWeek';
  // GRID_TIME_WEEK = 'timeGridWeek';
  // GRID_DAY = 'timeGridDay';
  // LIST_WEEK = 'listWeek';


  // selectedGrid: string;

  // calendarPlugins = [dayGridPlugin];
  calendarPlugins = [dayGridPlugin, interaction, timeGridPlugin, listPlugin, interactionPlugin, bootstrapPlugin];

  tasks: any;
  calendarEvents;
  events;

  isVisible = false;
  selectedStartDate = '';
  selectedEndDate = '';
  modalTitle: string = 'Add Task';
  modalDateRange: string;

  date: Date = new Date();

  calendarOptionsMonth: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: this.calendarEvents,
    plugins: this.calendarPlugins,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleDateClick.bind(this),
    initialDate: this.date,
    themeSystem: 'boostrap'
  }

  calendarOptionsWeek: CalendarOptions = {
    initialView: 'timeGridWeek',
    events: this.calendarEvents,
    plugins: this.calendarPlugins,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleDateClick.bind(this),
    initialDate: this.date,
    themeSystem: 'boostrap'
  }

  calendarOptionsList: CalendarOptions = {
    initialView: 'listWeek',
    events: this.calendarEvents,
    plugins: this.calendarPlugins,
    eventClick: this.handleDateClick.bind(this),
    initialDate: this.date,
    themeSystem: 'boostrap'
  }

  calendarOptionsDay: CalendarOptions = {
    initialView: 'timeGridDay',
    events: this.calendarEvents,
    plugins: this.calendarPlugins,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleDateClick.bind(this),
    initialDate: this.date,
    themeSystem: 'boostrap'
  }

  constructor(private taskManagerService: TaskManagerService) { }

  ngOnInit(): void {
    this.date = new Date();
    this.selectedGridType = GridType.GRID_MONTH;
    // this.selectedGridType = this.setUpGrid(GridType.GRID_MONTH);
    this.calendarEvents = [
        { title: 'event 3', date: '2020-06-08' },
        { title: 'event 3', date: '2020-06-09' },
        { title: 'event 3', date: '2020-06-10' },
    ];

    // this.calendarOptions.events = this.calendarEvents;
  }

  ngAfterViewInit() {
    this.fullCalendarAPI = this.calendarComponent.getApi();
    // this.events = new Observable<any>((observer: Observer<any>) => {
        this.taskManagerService.getUserTasks('01-01-2020', '12-31-2020').subscribe((tasks: Array<any>) => {
          console.log(tasks);
          this.calendarEvents = [];
          this.tasks = tasks;
          this.tasks.forEach(task => {
            // console.log('start time', task.startTime.substring(0, 7));
            // console.log('start', new Date(task.date.substring(0, 11) + task.startTime));
            this.calendarEvents.push({
              title: task.taskName,
              date: task.date.substring(0, 10),
              start: new Date(task.date.substring(0, 11) + '0' + task.startTime.substring(0, 7)),
              end: new Date(task.date.substring(0, 11) + '0' + task.endTime.substring(0, 7)),
            });
          });
          console.log('calendar events', this.calendarEvents);
          // observer.next(this.calendarEvents);
          this.calendarOptionsMonth.events = this.calendarEvents;
          this.calendarOptionsWeek.events = this.calendarEvents;
          this.calendarOptionsList.events = this.calendarEvents;
          this.calendarOptionsDay.events = this.calendarEvents;

      });
  }

  // setUpGrid(selectedGrid: GridType): Observable<GridType> {
  //     return new Observable<GridType>((observer: any) => {
  //       observer.next(selectedGrid);
  //     });
  // }

  someMethod() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.next();
  }

  // addEvent() {
  //   this.calendarEvents = this.calendarEvents.concat(
  //     { title: 'event 4', date: '2020-06-09' }
  //   );
  // }

  handleDateClick(arg) { // handler method
    console.log('clicked', arg);
    alert(arg.dateStr);
    this.isVisible = true;
  }

  changeCalendarView(selectedGrid: GridType) {
    console.log('viewType', selectedGrid);
    this.selectedGridType = selectedGrid;

    // this.date = new Date(this.fullCalendarAPI.getDate());
    // this.fullCalendarAPI.gotoDate(this.date);
    // this.selectedGridType = this.setUpGrid(selectedGrid);
    // this.fullCalendarAPI.today();
    // this.selectedGridEvent.emit(this.selectedGridType);

    // console.log('SELECTED GRID EVENT',this.selectedGridEvent);

    // this.selectedGridEvent.

    // this.calendarOptions.initialView = selectedGrid;
    // console.log('INITIAL VIEW', this.calendarOptions.initialView);
    // this.fullCalendarAPI.refetchEvents();
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
  }
}
