import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, DoCheck } from '@angular/core';
import { FullCalendarComponent, Calendar } from '@fullcalendar/angular';
import { GridType } from 'src/app/enums/grid-type.enum';

import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';

import { TaskManagerService } from 'src/app/services/task-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  selector: 'app-fullcalendar',
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.scss']
})
export class FullcalendarComponent implements OnInit, AfterViewInit, OnChanges, DoCheck {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  fullCalendarAPI: Calendar;

  GridType: typeof GridType = GridType;
  selectedGridType: GridType;

  calendarPlugins = [dayGridPlugin, interaction, timeGridPlugin, listPlugin, interactionPlugin, bootstrapPlugin];
  calendarEvents: any;
  tasks: any;

  date: Date = new Date();

  calendarOptions: CalendarOptions;
  gridType: GridType;

  constructor(
    private taskManagerService: TaskManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('snapshot', this.route.snapshot.url[0].path);
    const viewType = this.route.snapshot.url[0].path;
    this.gridType = this.identifyGridType(viewType);

    this.calendarOptions = {
      initialView: this.gridType,
      events: this.calendarEvents,
      plugins: this.calendarPlugins,
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleDateClick.bind(this),
      initialDate: this.date,
      themeSystem: 'boostrap'
    };

      console.log('gridType', this.gridType);
      console.log('calendarOptions', this.calendarOptions);
  }

  ngAfterViewInit(): void {
    console.log('AfterViewInit');
    this.fullCalendarAPI = this.calendarComponent.getApi();

    this.taskManagerService.getUserTasks('01-01-2020', '12-31-2020').subscribe((tasks: Array<any>) => {
      console.log(tasks);
      this.calendarEvents = [];
      this.tasks = tasks;
      this.tasks.forEach(task => {
        this.calendarEvents.push({
          title: task.taskName,
          date: task.date.substring(0, 10),
          start: new Date(task.date.substring(0, 11) + '0' + task.startTime.substring(0, 7)),
          end: new Date(task.date.substring(0, 11) + '0' + task.endTime.substring(0, 7)),
        });
      });
      console.log('calendar events', this.calendarEvents);
      this.calendarOptions.events = this.calendarEvents;
    });
  }

  ngOnChanges(): void {
    console.log('changes');
  }

  ngDoCheck(): void {
    console.log('do check');
    const viewType = this.route.snapshot.url[0].path;
    const checkGridType = this.identifyGridType(viewType);

    if (this.gridType !== checkGridType) {
      window.location.reload();
    }
  }
  
  handleDateClick(arg) {
    console.log('clicked', arg);
    alert(arg.dateStr);
    // this.isVisible = true;
  }

  private identifyGridType(viewParam: string): GridType {
    let gridType: GridType;
    switch (viewParam) {
      case 'month':
        gridType = GridType.GRID_MONTH;
        break;
      case 'week':
        gridType = GridType.GRID_TIME_WEEK;
        break;
      case 'day':
        gridType = GridType.GRID_DAY;
        break;
      // case 'list':
      //   gridType = GridType.LIST_WEEK;
      //   break;
      default:
        gridType = GridType.GRID_MONTH;
        break;
    }


    return gridType;
  }
}
