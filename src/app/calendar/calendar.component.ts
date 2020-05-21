import { Component, OnInit } from '@angular/core';

export enum ModalType {
  SET_AVAILABILITY_YEAR = 'SET_AVAILABILITY_YEAR',
  SET_AVAILABILITY_MONTH = 'SET_AVAILABILITY_MONTH',
  SET_AVAILABILITY_WEEK = 'SET_AVAILABILITY_WEEK',
  SET_AVAILABILITY_DAY = 'SET_AVAILABILITY_DAY',
  ADD_TASK_WEEK = 'ADD_TASK_WEEK',
  ADD_TASK_DAY = 'ADD_TASK_DAY',
  REMOVE_TASK = 'REMOVE_TASK',
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  maxWeeksInMonths: Array<number> = [1, 2, 3, 4, 5, 6];
  months: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  days: Array<string> = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

  currentDate: Date;
  currentYear: number;

  modalType: ModalType;
  isVisible = false;

  constructor() { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
  }

  getDaysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  getCalendarDay(week: number, dayIndex: number, monthIndex: number, year: number) {
    const firstDayOfWeek = week * 7 - 6;
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
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
