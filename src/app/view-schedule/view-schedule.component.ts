import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import { TaskManagerService } from '../services/task-manager.service';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.scss']
})
export class ViewScheduleComponent implements OnInit, AfterViewInit {

  // references the #calendar in the template
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  GRID_MONTH = 'dayGridMonth';
  GRID_WEEK = 'dayGridWeek';
  GRID_TIME_WEEK = 'timeGridWeek';
  LIST_WEEK = 'listWeek';

  selectedGrid: string;

  // calendarPlugins = [dayGridPlugin];
  calendarPlugins = [dayGridPlugin, interaction, timeGridPlugin, listPlugin, interactionPlugin];

  tasks: any;
  calendarEvents;
  events;

  constructor(private taskManagerService: TaskManagerService) { }

  ngOnInit(): void {
    this.selectedGrid = 'GRID_MONTH';
    this.calendarEvents = [
        { title: 'event 3', date: '2020-06-08' },
        { title: 'event 3', date: '2020-06-09' },
        { title: 'event 3', date: '2020-06-10' },
    ];
  }

  ngAfterViewInit() {
    this.events = new Observable<any>((observer: Observer<any>) => {
        this.taskManagerService.getUserTasks('01-01-2020', '12-31-2020').subscribe((tasks: Array<any>) => {
          console.log(tasks);
          this.calendarEvents = [];
          this.tasks = tasks;
          this.tasks.forEach(task => {
            this.calendarEvents.push({
              title: task.taskName,
              date: task.date.substring(0, 10),
            });
          });
          observer.next(this.calendarEvents);
      });
    });
    
    // this.taskManagerService.getUserTasks('01-01-2020', '12-31-2020').subscribe((tasks: Array<any>) => {
    //   console.log(tasks);
    //   this.tasks = tasks;

    //   this.tasks.forEach(task => {
    //     this.calendarEvents.push({
    //       title: task.taskName,
    //       date: task.date.substring(0, 10),
    //     });
    //   });

    //   console.log('calendar events', this.calendarEvents);
    // });
  }

  someMethod() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.next();
  }

  // addEvent() {
  //   this.calendarEvents = this.calendarEvents.concat(
  //     { title: 'event 4', date: '2020-06-09' }
  //   );
  // }

  // modifyTitle(eventIndex, newTitle) {
  //   let calendarEvents = this.calendarEvents.slice(); // a clone
  //   let singleEvent = Object.assign({}, calendarEvents[eventIndex]); // a clone
  //   singleEvent.title = newTitle;
  //   calendarEvents[eventIndex] = singleEvent;
  //   this.calendarEvents = calendarEvents; // reassign the array
  // }

  handleDateClick(arg) { // handler method
    console.log('clicked', arg);
    alert(arg.dateStr);
  }


  changeCalendarView(viewType: string) {
    console.log('viewType', viewType);
    this.selectedGrid = viewType;
  }
}
