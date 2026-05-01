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

  /** Syntax highlight simples para JSON (Dracula colors) */
  highlightJson(code: string): string {
    const preview = code.substring(0, 400);
    return preview
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Strings (valores entre aspas)
      .replace(/"([^"]+)"(\s*:)/g, '<span class="hl-key">"$1"</span>$2')
      .replace(/:\s*"([^"]+)"/g, ': <span class="hl-string">"$1"</span>')
      // Booleans
      .replace(/:\s*(true|false)/g, ': <span class="hl-bool">$1</span>')
      // Numbers
      .replace(/:\s*(\d+\.?\d*)/g, ': <span class="hl-num">$1</span>')
      // Brackets
      .replace(/([{}[\]])/g, '<span class="hl-bracket">$1</span>')
      + '<span class="hl-fade">...</span>';
  }
}
