import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';



@NgModule({
  declarations: [
    CalendarViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CalendarViewComponent
  ]
})
export class CalendarModule { }
