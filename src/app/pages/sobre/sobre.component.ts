import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TimelineItem } from '../../models/portfolio.models';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss'],
})
export class SobreComponent implements OnInit {
  timeline: TimelineItem[] = [];
  bioExpanded = false;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.timeline = this.data.timeline;
  }

  toggleBio(): void {
    this.bioExpanded = !this.bioExpanded;
  }

  iconClass(type: string): string {
    return { work: 'icon-work', edu: 'icon-edu', award: 'icon-award' }[type] ?? '';
  }
}
