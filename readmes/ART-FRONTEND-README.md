# 🎨 Art Plastic — App Mobile

Aplicativo de **e-commerce de arte** desenvolvido em **Flutter** com **Dart** para o artista Damião Martins. Galeria de quadros, pagamentos PIX, rastreio de encomendas e suporte com IA.

## 📱 Screenshots

| Tela | Preview |
|------|---------|
| Home / Galeria | ![Home](screenshots/home.png) |
| Detalhes da Obra | ![Detalhes](screenshots/detalhes.png) |
| Carrinho | ![Carrinho](screenshots/carrinho.png) |
| Pagamento PIX | ![PIX](screenshots/pix.png) |
| Rastreio Correios | ![Rastreio](screenshots/rastreio.png) |
| Chat IA (Suporte) | ![Chat IA](screenshots/chat-ia.png) |
| Perfil do Artista | ![Perfil](screenshots/perfil.png) |
| Painel Admin | ![Admin](screenshots/admin.png) |
| Login | ![Login](screenshots/login.png) |
| Idiomas | ![Idiomas](screenshots/idiomas.png) |

> 📸 Para adicionar: tire prints do app e salve na pasta `screenshots/`

## ✨ Funcionalidades

- 🖼️ Galeria de obras de arte com imagens em alta resolução
- 🛒 Carrinho de compras e checkout completo
- 💳 Pagamento via PIX (MercadoPago)
- 📦 Rastreio de encomendas (Correios)
- 🤖 Suporte com IA (Gemini) — chat inteligente sobre as obras
- 🌍 Internacionalização — 8 idiomas com bandeiras e conversão de moedas
- 👤 Perfil do artista com biografia, exposições e premiações
- 🔐 Login com Google + Email/Senha
- 👨‍💼 Painel admin para gerenciar pedidos e clientes
- 📸 Foto de perfil com crop circular

## 🛠️ Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Flutter, Dart, Riverpod |
| Backend | Python (FastAPI), Leapcell |
| Banco de dados | Firebase Firestore |
| Pagamentos | MercadoPago (PIX) |
| IA | Google Gemini 2.5 Flash |
| Imagens | Firebase Storage |
| Autenticação | Firebase Auth + Google Sign In |
| Rastreio | API Correios |

## 🏗️ Arquitetura

```
lib/
├── features/
│   ├── home/         # Página principal com galeria
│   ├── auth/         # Login, registro, Google Sign In
│   ├── profile/      # Perfil do artista
│   ├── payment/      # Checkout, PIX, sucesso/erro
│   ├── tracking/     # Rastreio Correios
│   ├── support/      # Chat com IA
│   ├── admin/        # Painel administrativo
│   └── splash/       # Tela de carregamento
├── core/
│   ├── providers/    # Riverpod providers
│   ├── routes/       # GoRouter navegação
│   └── theme/        # Design system
```

## 🚀 Como rodar

```bash
# Limpar e instalar
flutter clean
flutter pub get

# Rodar no emulador ou dispositivo
flutter run

# Build release (APK)
flutter build apk --release

# Gerar código Riverpod
dart run build_runner build --delete-conflicting-outputs
```

## 📦 Pacotes principais

- `flutter_riverpod` + `riverpod_annotation` — Estado reativo
- `go_router` — Navegação declarativa
- `dio` — Cliente HTTP
- `firebase_auth` + `google_sign_in` — Autenticação
- `cloud_firestore` — Banco de dados
- `cached_network_image` — Cache de imagens
- `intl` — Internacionalização
- `shared_preferences` — Persistência local

## 🌐 Backend

O backend roda em Python (FastAPI) hospedado na Leapcell:
- API de pagamentos MercadoPago
- API de rastreio Correios
- Chat IA com Gemini
- Autenticação JWT

## 👨‍💻 Desenvolvido por

**Anselmo Polcaro** — [@polcaronet](https://github.com/polcaronet)

🔗 Site do artista: [damiaomartins.com.br](https://damiaomartins.com.br)

---

> 🔒 Repositório privado — código proprietário
