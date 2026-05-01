# 🚀 Portfólio Dev — Angular + TypeScript + Vercel

## Stack
- **Angular 17** + **TypeScript**
- **SCSS** com design system completo
- **Angular Router** com rotas lazy-ready
- **Reactive Forms** no formulário de contato

## Páginas
| Rota | Descrição |
|------|-----------|
| `/` | Home com hero animado, skills e projetos em destaque |
| `/projetos` | Grid de projetos com filtro por categoria e busca |
| `/lives` | Lives do TikTok com embed e modal |
| `/conteudo` | Conteúdo migrado do Instagram com filtros |
| `/sobre` | Bio, stack técnica e timeline de carreira |
| `/contato` | Formulário validado + redes sociais |

## Personalizar

### Seus dados (um só lugar)
Edite `src/app/services/data.service.ts`:
- `projects` → seus projetos reais
- `lives` → IDs dos vídeos do TikTok
- `posts` → conteúdo do Instagram
- `timeline` → sua trajetória
- `socials` → seus links

### Seu nome
Em `src/app/components/navbar/navbar.component.html` troque `Seu Nome`.

### ID dos vídeos TikTok
A URL do vídeo é: `tiktok.com/@usuario/video/7XXXXXXXXXX`  
Use apenas o número `7XXXXXXXXXX` no campo `id` dos lives.

### Formulário de contato
Integre com **Formspree** (gratuito):
1. Crie conta em [formspree.io](https://formspree.io)
2. No `contato.component.ts`, troque o `setTimeout` por:
```typescript
fetch('https://formspree.io/f/SEU_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(this.form.value)
}).then(() => { this.loading = false; this.sent = true; });
```

## Rodar localmente
```bash
npm install
npm start
# abre em http://localhost:4200
```

## Build
```bash
npm run build
# gera a pasta dist/portfolio-angular/browser
```

## Deploy na Vercel
1. Suba para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) → Import Project
3. **Framework Preset:** Angular
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist/portfolio-angular/browser`
6. Deploy ✅

O `vercel.json` já configura o roteamento SPA corretamente.
