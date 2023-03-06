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
  yearsSpan = Array(101)
    .fill(1)
    .map((elem: number, index: number) => 1970 + index);
  monthSpan = Array(12)
    .fill(1)
    .map((elem: number, index: number) => 1 + index);
  CPS: CalendarProviderService;

  currentDate: DateObj;
  searchDate: DateObj;
  highlightDate: DateObj;

  month!: number[][];

  constructor(private calendarProvider: CalendarProviderService) {
    this.CPS = calendarProvider;
    this.currentDate = { ...calendarProvider.getToday() };
    this.searchDate = { ...calendarProvider.getToday(), day: 0 };
    this.highlightDate = { ...calendarProvider.getToday() };
  }

  ngOnInit(): void {
    this.updateMonthDisplay();
  }

  nextMonth() {
    if (this.currentDate.month === 12) {
      this.currentDate.month = 1;
      this.currentDate.year = this.currentDate.year + 1;
    } else {
      this.currentDate.month += 1;
    }
    console.log(this.CPS.getToday());

    this.updateMonthDisplay();
  }
  prevMonth() {
    if (this.currentDate.month === 1) {
      this.currentDate.month = 12;
      this.currentDate.year = this.currentDate.year - 1;
    } else {
      this.currentDate.month -= 1;
    }
    this.updateMonthDisplay();
  }

  getTitle() {
    return (
      this.calendarProvider.getMonthName(this.currentDate.month) +
      ' - ' +
      this.currentDate.year
    );
  }

  doHighlight(day: number): boolean {
    if (
      this.highlightDate.month === this.currentDate.month &&
      this.highlightDate.year === this.currentDate.year &&
      this.highlightDate.day === day
    ) {
      return true;
    }
    return false;
  }

  updateSearch(key: 'day' | 'month' | 'year', value: string) {
    if (!value) return;
    this.searchDate[key] = Number(value);
  }

  findDate() {
    this.currentDate = {
      ...this.searchDate,
      day: this.searchDate.day
        ? this.searchDate.day
        : this.currentDate.day,
    };
    if (this.searchDate.day) {
      this.highlightDate = {
        ...this.searchDate
      };
    }else{
      this.highlightDate = {...this.calendarProvider.getToday()};
    }

    this.updateMonthDisplay();
  }

  showToday() {
    this.currentDate = { ...this.CPS.getToday() };
    this.highlightDate = { ...this.CPS.getToday() };
    this.updateMonthDisplay();
  }

  updateMonthDisplay() {
    this.month = this.calendarProvider.getMonthData(
      this.currentDate.month,
      this.currentDate.year
    );
  }
}
