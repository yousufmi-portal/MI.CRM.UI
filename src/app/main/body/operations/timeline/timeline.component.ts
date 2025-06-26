import { Component } from '@angular/core';
import { Checkbox } from 'primeng/checkbox';

@Component({
  selector: 'app-timeline',
  imports: [Checkbox],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  finishedTodos = [
    {
      "text": "There was exactly three inches.",
      "completed": true,
      "timestamp": "2025-05-09 10:03:15"
    },
    {
      "text": "Will you, won't you.",
      "completed": true,
      "timestamp": "2025-05-09 16:46:23"
    },
    {
      "text": "Queen jumped up on tiptoe, and.",
      "completed": true,
      "timestamp": "2025-05-09 10:03:15"
    },
    {
      "text": "Go on! \"I'm a poor man, your Majesty.'.",
      "completed": true,
      "timestamp": "2025-05-09 17:31:01"
    },
    {
      "text": "Alice with one eye.",
      "completed": true,
      "timestamp": "2025-05-09 10:03:15"
    }
  ]


}
