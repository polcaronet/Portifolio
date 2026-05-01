import {
  Component,
  Input,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    tiktokEmbed?: { lib?: { render?: () => void } };
  }
}

@Component({
  selector: 'app-tiktok-embed',
  templateUrl: './tiktok-embed.component.html',
  styleUrls: ['./tiktok-embed.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TiktokEmbedComponent implements AfterViewInit, OnDestroy {
  @Input() videoId!: string;
  @Input() title: string = '';
  @Input() durationSec: number = 60;

  private static scriptLoaded = false;
  private static scriptLoading = false;

  playing = false;
  overlayVisible = false;
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.loadScript();
  }

  /** Usuário clicou em "Assistir" — mostra embed e inicia timer */
  startVideo(): void {
    this.playing = true;
    this.overlayVisible = false;

    // Re-renderiza o embed caso o script já tenha rodado antes
    setTimeout(() => {
      if (window.tiktokEmbed?.lib?.render) {
        window.tiktokEmbed.lib.render();
      }
    }, 50);

    // Timer para mostrar overlay quando o vídeo terminar
    const totalMs = (this.durationSec + 3) * 1000;
    this.timer = setTimeout(() => {
      this.overlayVisible = true;
    }, totalMs);
  }

  /** Fecha overlay e volta ao estado inicial */
  resetVideo(): void {
    this.playing = false;
    this.overlayVisible = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  /** Abre no TikTok */
  openTikTok(): void {
    window.open(
      `https://www.tiktok.com/@anselmopolcaro/video/${this.videoId}`,
      '_blank'
    );
  }

  private loadScript(): void {
    if (TiktokEmbedComponent.scriptLoaded) {
      this.reRender();
      return;
    }
    if (TiktokEmbedComponent.scriptLoading) {
      const interval = setInterval(() => {
        if (TiktokEmbedComponent.scriptLoaded) {
          clearInterval(interval);
          this.reRender();
        }
      }, 200);
      return;
    }

    TiktokEmbedComponent.scriptLoading = true;
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    script.onload = () => {
      TiktokEmbedComponent.scriptLoaded = true;
      TiktokEmbedComponent.scriptLoading = false;
    };
    document.body.appendChild(script);
  }

  private reRender(): void {
    setTimeout(() => {
      if (window.tiktokEmbed?.lib?.render) {
        window.tiktokEmbed.lib.render();
      }
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }
}
