import { Component, OnInit } from '@angular/core';
import { CalendarProviderService } from '../calendar-provider.service';
import type { DateObj } from '../calendar-provider.service';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css'],
})
export class CalendarViewComponent implements OnInit {
  date = new Date();
  today: DateObj = {
    day: this.date.getDate(),
    month: this.date.getMonth() + 1,
    year: this.date.getFullYear(),
  };

  currentDate: DateObj = {
    day: this.date.getDate(),
    month: this.date.getMonth() + 1,
    year: this.date.getFullYear(),
  };

  searchDate: DateObj = {
    day: this.date.getDate(),
    month: this.date.getMonth() + 1,
    year: this.date.getFullYear(),
  };

  month!: number[][];

  constructor(private calendarProvider: CalendarProviderService) {}

  ngOnInit(): void {
    this.updateMonthDisplay()
  }

  nextMonth() {
    if (this.currentDate.month === 12) {
      this.currentDate.month = 1;
      this.currentDate.year = this.currentDate.year + 1;
    } else {
      this.currentDate.month += 1;
    }
    this.updateMonthDisplay
  }
  prevMonth() {
    if (this.currentDate.month === 1) {
      this.currentDate.month = 12;
      this.currentDate.year = this.currentDate.year - 1;
    } else {
      this.currentDate.month -= 1;
    }
    this.updateMonthDisplay()
  }

  getTitle() {
    return (
      this.calendarProvider.getMonthName(this.currentDate.month) +
      ' ' +
      this.currentDate.year
    );
  }

  isContainToday(): boolean {
    if (
      this.today.month === this.currentDate.month &&
      this.today.year === this.currentDate.year
    ) {
      return true;
    }
    return false;
  }

  updateCurrent(key: 'day' | 'month' | 'year', value: string) {
    if (!value) return;
    this.searchDate[key] = Number(value);
  }

  findDate() {
    this.currentDate = { ...this.searchDate };
    this.updateMonthDisplay()
  }

  showToday() {
    this.currentDate = { ...this.today };
    this.updateMonthDisplay();
  }

  updateMonthDisplay(){
    this.month = this.calendarProvider.getMonthData(
      this.currentDate.month,
      this.currentDate.year
    );
  }
}
