import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskManagerFormComponent } from './task-manager-form/task-manager-form.component';

export enum ModalType {
  SET_AVAILABILITY_YEAR = 'SET_AVAILABILITY_YEAR',
  SET_AVAILABILITY_MONTH = 'SET_AVAILABILITY_MONTH',
  SET_AVAILABILITY_WEEK = 'SET_AVAILABILITY_WEEK',
  SET_AVAILABILITY_DAY = 'SET_AVAILABILITY_DAY',
  ADD_TASK_WEEK = 'ADD_TASK_WEEK',
  ADD_TASK_DAY = 'ADD_TASK_DAY',
  REMOVE_AVAILABILITY = 'REMOVE_AVAILABILITY',
  REMOVE_TASK_DAY = 'REMOVE_TASK_DAY',
  REMOVE_TASK_WEEK = 'REMOVE_TASK_WEEK',
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild(TaskManagerFormComponent) taskmanagerComponent: TaskManagerFormComponent;

  readonly ONE_DAY = 1;
  readonly ONE_WEEK = 7;
  readonly ONE_YEAR = 365;

  maxWeeksInMonths: Array<number> = [1, 2, 3, 4, 5, 6];
  months: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  days: Array<string> = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

  currentDate: Date;
  currentYear: number;

  selectedStartDate = '';
  selectedEndDate = '';

  modalType: ModalType;
  modalTitle: string;
  modalDateRange: string;
  isVisible = false;

  constructor() { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
  }

  getCalendarDay(week: number, dayIndex: number, monthIndex: number, year: number) {
    const firstDayOfWeek = this.getFirstDayOfWeek(week);
    const firstDayOfWeekIndex = new Date(year, monthIndex, firstDayOfWeek).getDay();

    const weight = dayIndex - firstDayOfWeekIndex + firstDayOfWeek;
    const calendarDay = new Date(year, monthIndex, weight);
    return calendarDay.toLocaleDateString();
  }

  showModal(modalType: string): void {
    this.isVisible = true;
    console.log('MODAL TYPE', modalType);
    this.modalType = modalType as ModalType;
    console.log('MODAL TYPE', this.modalType);
    switch (modalType as ModalType) {
      case ModalType.SET_AVAILABILITY_YEAR:
        this.modalTitle = 'Set Availability for the Year';
        break;
      case ModalType.SET_AVAILABILITY_MONTH:
        this.modalTitle = 'Set Availability for the Month';
        break;
      case ModalType.SET_AVAILABILITY_WEEK:
        this.modalTitle = 'Set Availability for the Week';
        break;
      case ModalType.SET_AVAILABILITY_DAY:
        this.modalTitle = 'Set Availability for the Day';
        break;
      case ModalType.ADD_TASK_WEEK:
        this.modalTitle = 'Add Task for the Week';
        break;
      case ModalType.ADD_TASK_DAY:
        this.modalTitle = 'Add Task for the Day';
        break;
      case ModalType.REMOVE_TASK_DAY:
        this.modalTitle = 'Remove Task for the Day';
        break;
      case ModalType.REMOVE_TASK_WEEK:
        this.modalTitle = 'Remove Task for the Week';
        break;
      default:
        this.modalTitle = '';
        break;
    }
  }

  setDateRange(rangeType: string, week: number, dayIndex: number, monthIndex: number, year: number) {
    this.selectedStartDate = this.getCalendarDay(week, dayIndex, monthIndex, year);
    switch (rangeType) {
      case 'DAY':
        this.selectedEndDate = '';
        break;
      case 'WEEK':
        // TODO FIX WEEKS TO START ON SUNDAY AND END SATURDAY
        // IF START AND END DATE ARE NOT SUNDAY AND SATURDAY ADJUST WEEK ON CALENDAR
        this.selectedEndDate = this.getCalendarDay(week + 1, this.getFirstDayOfWeekIndex(week + 1, monthIndex, year), monthIndex, year);
        break;
      case 'MONTH':
        this.selectedEndDate = this.getCalendarDay(week, dayIndex + this.getDaysInMonth(monthIndex, year) - 1, monthIndex, year);
        break;
      case 'YEAR':
        this.selectedEndDate = this.getCalendarDay(this.yearLastWeek(year), this.monthLastDayIndex(11, year), 11, year);
        break;
      default:
        this.selectedEndDate = this.getCalendarDay(week, dayIndex, monthIndex, year);
        break;
    }

    this.modalDateRange = `From ${this.selectedStartDate} AM to ${this.selectedEndDate} PM`;
  }

  getFirstDayOfWeek(week: number) {
    return week * 7 - 6;
  }

  getFirstDayOfWeekIndex(week: number, monthIndex: number, year: number) {
    const day = this.getFirstDayOfWeek(week);
    return new Date(year, monthIndex, day).getDay();
  }

  getDaysInMonth(monthIndex: number, year: number): number {
    return new Date(year, monthIndex + 1, 0).getDate();
  }

  monthFirstDayIndex(monthIndex: number, year: number) {
    return new Date(year, monthIndex, 1).getDay();
  }

  monthLastDayIndex(monthIndex: number, year: number) {
    return new Date(year, monthIndex + 1, 0).getDay();
  }

  yearLastWeek(year: number): number {
    const firstDayDecIndex = new Date(year, 11, 1).getDay();
    // if the first day of the week index is greator then 4
    // then there will be 6 weeks in the last month otherwise there will be 5 weeks
    return firstDayDecIndex > 4 ? 6 : 5;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    const valid = this.taskmanagerComponent.validate();

    if (valid) {
      this.taskmanagerComponent.submitForm();
      this.isVisible = false;
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
