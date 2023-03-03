import { Injectable } from '@angular/core';

export interface DateObj {
  day: number;
  month: number;
  year: number;
}

@Injectable({
  providedIn: 'root',
})
export class CalendarProviderService {
  current: DateObj;

  constructor() {
    const init = new Date();
    this.current = {
      day: init.getDate(),
      month: init.getMonth() + 1,
      year: init.getFullYear(),
    };
  }

  getMonthData(month: number, year: number) {
    const data: number[][] = [];
    const days = new Date(year, month, 0).getDate();
    const startWeekDay = new Date(year, month - 1, 1).getDay();
    let currentDay = 1 - startWeekDay;
    while (currentDay <= days) {
      let week: number[] = [];
      for (let i = 0; i < 7; i++) {
        if (currentDay < 1 || currentDay > days) {
          week.push(0);
        } else {
          week.push(currentDay);
        }
        currentDay++;
      }
      data.push(week);
    }

    return data;
  }

  getMonthName(month: number) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return months[month-1];
  }
}
