import { Component, OnInit } from '@angular/core';
import { GithubService, GithubRepo } from '../../services/github.service';
import { DataService } from '../../services/data.service';
import { Project } from '../../models/portfolio.models';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
})
export class ProjetosComponent implements OnInit {
  // Repositórios reais do GitHub
  githubRepos: GithubRepo[] = [];
  filteredRepos: GithubRepo[] = [];

  // Projetos em destaque (manuais, para os privados)
  featuredProjects: Project[] = [];

  search = '';
  activeLanguage = 'Todos';
  languages: string[] = ['Todos'];
  loading = true;
  error = false;

  constructor(
    private github: GithubService,
    private data: DataService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.featuredProjects = this.data.projects.filter(p => p.highlight);
    await this.loadRepos();
  }

  private async loadRepos(): Promise<void> {
    this.loading = true;
    this.error = false;
    try {
      this.githubRepos = await this.github.getPublicRepos();
      // Monta lista de linguagens únicas
      const langs = this.githubRepos
        .map(r => r.language)
        .filter((l): l is string => !!l);
      this.languages = ['Todos', ...Array.from(new Set(langs))];
      this.applyFilter();
    } catch {
      this.error = true;
    } finally {
      this.loading = false;
    }
  }

  setLanguage(lang: string): void {
    this.activeLanguage = lang;
    this.applyFilter();
  }

  onSearch(): void { this.applyFilter(); }

  private applyFilter(): void {
    const q = this.search.toLowerCase();
    this.filteredRepos = this.githubRepos.filter(r => {
      const matchLang = this.activeLanguage === 'Todos' || r.language === this.activeLanguage;
      const matchSearch = !q ||
        r.name.toLowerCase().includes(q) ||
        (r.description ?? '').toLowerCase().includes(q) ||
        r.topics.some(t => t.toLowerCase().includes(q));
      return matchLang && matchSearch;
    });
  }

  // Formata nome do repo para exibição
  formatName(name: string): string {
    return name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  // Cor da linguagem
  langColor(lang: string | null): string {
    const colors: Record<string, string> = {
      'Dart': '#00B4AB', 'Flutter': '#54C5F8',
      'TypeScript': '#3178C6', 'JavaScript': '#F7DF1E',
      'Python': '#3572A5', 'Go': '#00ADD8',
      'HTML': '#E34C26', 'CSS': '#563D7C',
      'PHP': '#4F5D95', 'Java': '#B07219',
      'C#': '#178600', 'Kotlin': '#F18E33',
      'Swift': '#FA7343', 'Shell': '#89E051',
    };
    return colors[lang ?? ''] ?? '#6c63ff';
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
  }
}
