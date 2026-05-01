import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ContentPost } from '../../models/portfolio.models';

@Component({
  selector: 'app-conteudo',
  templateUrl: './conteudo.component.html',
  styleUrls: ['./conteudo.component.scss'],
})
export class ConteudoComponent implements OnInit {
  all: ContentPost[] = [];
  filtered: ContentPost[] = [];
  activeCategory = 'Todos';
  copiedIndex: number | null = null;
  readonly categories = ['Todos', 'Setup', 'VSCode', 'Terminal', 'Flutter', 'Angular'];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.all = this.data.posts;
    this.applyFilter();
  }

  setCategory(cat: string): void { this.activeCategory = cat; this.applyFilter(); }

  private applyFilter(): void {
    this.filtered = this.activeCategory === 'Todos'
      ? this.all
      : this.all.filter(p => p.category === this.activeCategory);
  }

  get totalLikes(): number { return this.all.reduce((s, p) => s + p.likes, 0); }

  copyCommand(i: number, content: string): void {
    navigator.clipboard.writeText(content).catch(() => { });
    this.copiedIndex = i;
    setTimeout(() => this.copiedIndex = null, 2000);
  }

  badgeClass(cat: string): string {
    const m: Record<string, string> = { Flutter: 'badge-purple', Angular: 'badge-red', VSCode: 'badge-green', Terminal: 'badge-yellow', Setup: 'badge-pink' };
    return m[cat] ?? 'badge-purple';
  }
}
