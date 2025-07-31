import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, signal, ViewChild } from '@angular/core';

import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventDropArg, EventInput } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { TaskDto } from '../../../../../api-dtos/task.dto';
import { TasksService } from '../../../../service/tasks-service/tasks.service';
import { UpdateTaskDateTimeDto } from '../../../../../api-dtos/update-tast-datetime.dto';


@Component({
  selector: 'app-timeline-calendar',
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './timeline-calendar.component.html',
  styleUrls: ['./timeline-calendar.component.scss']
})
export class TimelineCalendarComponent implements AfterViewInit, OnInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  TODAY_STR = new Date().toISOString().replace(/T.*$/, '');
  INITIAL_EVENTS: EventInput[] = [
    // Single All-day Event
    {
      id: '1',
      title: 'All-day event',
      start: '2025-07-22',
      color: '#ff9f89'
    },

    // Timed Events on another day
    {
      id: '2',
      title: 'Morning Meeting',
      start: '2025-07-23T09:00:00',
      end: '2025-07-23T10:00:00'
    },
    {
      id: '3',
      title: 'Team Sync',
      start: '2025-07-23T11:00:00',
      end: '2025-07-23T12:00:00'
    },

    // Multiple events on 24th to trigger "See more"
    {
      id: '4',
      title: 'Event A',
      start: '2025-07-24'
    },
    {
      id: '5',
      title: 'Event B',
      start: '2025-07-24'
    },
    {
      id: '6',
      title: 'Event C',
      start: '2025-07-24'
    },
    {
      id: '7',
      title: 'Event D',
      start: '2025-07-24'
    },
    {
      id: '8',
      title: 'Event E',
      start: '2025-07-24'
    },
    {
      id: '9',
      title: 'Event F',
      start: '2025-07-24'
    },

    // Events on a future date
    {
      id: '10',
      title: 'Strategy Call',
      start: '2025-07-27T15:00:00',
      end: '2025-07-27T16:30:00'
    },
    {
      id: '11',
      title: 'Design Review',
      start: '2025-07-28T14:00:00',
      end: '2025-07-28T15:00:00'
    }
  ];

  tasks: TaskDto[] = [];

  projectId = 19; // Use actual projectId or inject via route

  constructor(private taskService: TasksService) {

  }

  ngOnInit(): void {
    this.loadTasks();
  }
  loadTasks() {
    this.taskService.getTasksByProject(this.projectId).subscribe({
      next: (data) => {
        this.tasks = data;
        this.calendarOptions.initialEvents = this.mapTasksToCalendarEvents(this.tasks);

        const calendarApi = this.calendarComponent.getApi();
        calendarApi.removeAllEvents();
        calendarApi.addEventSource(this.calendarOptions.initialEvents);
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      }
    });
  }

  addDays(dateStr: string, days: number): string {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0]; // return YYYY-MM-DD
  }


  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'dayGridMonth,timeGridWeek,timeGridDay',
      center: 'title',
      right: 'prev,today,next',

    },
    buttonText: {
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day'
    },
    firstDay: 1, // Monday as the first day of the week
    initialView: 'dayGridMonth',
    initialEvents: [],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventDrop: this.onEventDropOrResize.bind(this),
    eventResize: this.onEventDropOrResize.bind(this),
    // select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  ngAfterViewInit(): void {
    const calendarEl = document.querySelector('.fc');

    if (calendarEl) {
      const resizeObserver = new ResizeObserver(() => {
        if (this.calendarComponent) {
          this.calendarComponent.getApi().updateSize();
        }
      });

      resizeObserver.observe(calendarEl.parentElement as Element);
    }
  }

  mapTasksToCalendarEvents(tasks: TaskDto[]): EventInput[] {

    return tasks.map(task => {
      const start = task.startDate ? new Date(task.startDate) : null;
      const end = task.endDate ? new Date(task.endDate) : null;

      const isAllDay =
        start &&
        end &&
        start.getHours() === 0 &&
        start.getMinutes() === 0 &&
        start.getSeconds() === 0 &&
        end.getHours() === 23 &&
        end.getMinutes() === 59 &&
        end.getSeconds() === 59;

      return {
        id: task.id.toString(),
        title: task.title,
        start: task.startDate ?? '',
        end: task.endDate ?? undefined,
        color: task.statusColor,
        allDay: isAllDay || undefined,
        extendedProps: {
          id: task.id,
          title: task.title,
          description: task.description,
          assignedTo: task.assignedTo,
          statusId: task.statusId,
          statusName: task.statusName,
          activityTypeId: task.activityTypeId,
          activityTypeName: task.activityTypeName,
          startDate: task.startDate,
          endDate: task.endDate,
        }
      };
    });

  }

  onEventDropOrResize(arg: EventDropArg | EventResizeDoneArg): void {
    const task = arg.event.extendedProps as TaskDto;

    const newStart = arg.event.start?.toISOString();
    const newEnd = arg.event.end?.toISOString() || newStart;

    if (task.startDate === newStart && task.endDate === newEnd) {
      return;
    }

    if (!newStart || !newEnd) {
      console.error('Invalid start or end date for task:', task);
      return;
    }

    const dto: UpdateTaskDateTimeDto = {
      taskId: task.id,
      startDateTime: newStart,
      endDateTime: newEnd
    };

    this.taskService.updateTaskDateTime(dto).subscribe({
      next: () => {
        task.startDate = newStart;
        task.endDate = newEnd;
        console.log('Updated task date/time');
      },
      error: err => {
        console.error('Failed to update task', err);
      }
    });
  }
}

