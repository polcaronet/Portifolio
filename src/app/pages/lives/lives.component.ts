import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LiveVideo } from '../../models/portfolio.models';

@Component({
  selector: 'app-lives',
  templateUrl: './lives.component.html',
  styleUrls: ['./lives.component.scss'],
})
export class LivesComponent implements OnInit {
  lives: LiveVideo[] = [];

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.lives = this.data.lives;
  }

  openTikTok(id: string): void {
    window.open(`https://www.tiktok.com/@anselmopolcaro/video/${id}`, '_blank');
  }

  getThumbnail(id: string): string {
    // TikTok não permite thumbnail direto por CORS — usamos gradiente com ícone
    return id;
  }

  // Cores de gradiente alternados para os cards
  getGradient(index: number): string {
    const gradients = [
      'linear-gradient(135deg, #1a0010 0%, #4d0030 50%, #ff0050 100%)',
      'linear-gradient(135deg, #0d001a 0%, #2d0050 50%, #6c63ff 100%)',
      'linear-gradient(135deg, #001a0d 0%, #003d20 50%, #00c48c 100%)',
      'linear-gradient(135deg, #1a0a00 0%, #4d2000 50%, #ff6b00 100%)',
      'linear-gradient(135deg, #1a001a 0%, #4d0050 50%, #ff0080 100%)',
      'linear-gradient(135deg, #00101a 0%, #002040 50%, #0ea5e9 100%)',
    ];
    return gradients[index % gradients.length];
  }
}
