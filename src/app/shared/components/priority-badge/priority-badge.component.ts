import { Component, Input, OnInit } from '@angular/core';
import { Priority } from '@core/entities/AppCommonData';
import { PropTranslatorPipe } from 'src/app/modules/news/pipes/prop-translator.pipe';

@Component({
  selector: 'app-priority-badge',
  templateUrl: './priority-badge.component.html',
  styleUrls: ['./priority-badge.component.scss'],
  providers: [PropTranslatorPipe],
})
export class PriorityBadgeComponent implements OnInit {
  @Input() priority: Priority;
  priorityName: string;
  color: string;
  constructor(private propertyTranslator: PropTranslatorPipe) {}

  ngOnInit(): void {
    if (this.priority) {
      this.priorityName = this.propertyTranslator.transform(
        this.priority,
        'name'
      ) as string;
      this.getColor(this.priority.color);
    }
  }

  getColor(color: string) {
    switch (color) {
      case 'warning':
      case 'light-warning':
        this.color = 'bg-pr-danger';
        break;
      case 'info':
        this.color = 'bg-pr-info';
        break;
      case 'danger':
        this.color = 'bg-pr-dark';
        break;
      case 'primary':
      case 'light-dark':
        this.color = 'bg-pr-primary';
        break;
    }
  }
}
