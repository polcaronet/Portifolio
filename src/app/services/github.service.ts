import { Injectable } from '@angular/core';

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
  private: boolean;
}

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly username = 'polcaronet';
  private readonly apiBase = 'https://api.github.com';

  async getPublicRepos(): Promise<GithubRepo[]> {
    try {
      const res = await fetch(
        `${this.apiBase}/users/${this.username}/repos?sort=updated&per_page=100&type=public`,
        { headers: { 'Accept': 'application/vnd.github.mercy-preview+json' } }
      );
      if (!res.ok) throw new Error('GitHub API error');
      const repos: GithubRepo[] = await res.json();
      // Filtra forks e ordena por stars
      return repos
        .filter(r => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count);
    } catch {
      return [];
    }
  }
}
