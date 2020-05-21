import { Component, OnInit } from '@angular/core';

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

  isVisible = false;

  constructor() { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
  }

  getDaysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  getCalendarDay(week: number, day: number, month: number, year: number) {
    const firstDayOfWeek = week * 7 - 6;
    const firstDayOfWeekIndex = new Date(year, month, firstDayOfWeek).getDay();

    const weight = day - firstDayOfWeekIndex + firstDayOfWeek;
    const calendarDay = new Date(year, month, weight);

    return calendarDay.toLocaleDateString();
  }

  showModal(): void {
    this.isVisible = true;
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
