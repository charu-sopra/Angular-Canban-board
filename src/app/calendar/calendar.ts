import { Component } from '@angular/core';
import { ScheduleModule, DayService, WeekService, WorkWeekService,MonthService,AgendaService} from '@syncfusion/ej2-angular-schedule';
@Component({
  imports: [ScheduleModule],
  standalone: true,
  selector: 'app-calendar',
  providers: [ DayService, WeekService, WorkWeekService, MonthService,AgendaService],
  styleUrl: './calendar.scss',
  templateUrl: './calendar.html',
})
export class Calendar {}
