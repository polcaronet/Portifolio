import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Project } from '../../models/portfolio.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  featuredProjects: Project[] = [];

  readonly skills = [
    { name: 'Flutter', color: '#54C5F8' },
    { name: 'Dart', color: '#00B4AB' },
    { name: 'Angular', color: '#DD0031' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Firebase', color: '#FFCA28' },
    { name: 'SCSS', color: '#C76494' },
    { name: 'Landing Page', color: '#6C63FF' },
    { name: 'Git', color: '#F05032' },
  ];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.featuredProjects = this.data.projects.filter(p => p.highlight);
  }
}
