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
  today: DateObj;
  init = new Date();

  constructor() {
    this.today = {
      day: this.init.getDate(),
      month: this.init.getMonth() + 1,
      year: this.init.getFullYear(),
    };
  }

  getMonthData(month: number, year: number): number[][] {
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

  getMonthName(month: number): string {
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

    return months[month - 1];
  }

  getMonthDaysArray(month: number | string, year: number | string): number[] {
    const days = new Date(Number(year), Number(month), 0).getDate();

    return Array(days)
      .fill(1)
      .map((elem: number, index: number) => 1 + index);
  }

  getToday(): DateObj {
    return this.today;
  }
}
