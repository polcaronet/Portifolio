# 🎨 Art Plastic — Backend API

Backend em **Python** (FastAPI) para o app Art Plastic. Gerencia pagamentos PIX, rastreio de encomendas, chat com IA e autenticação.

## 🚀 Endpoints

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/google` | Login com Google |
| GET | `/api/auth/me` | Dados do usuário logado |

### Pagamentos
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/payments/mercadopago/pix` | Gerar pagamento PIX |

### Rastreio
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/tracking/code/{codigo}` | Consultar rastreio Correios |

### Suporte IA
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/support/chat` | Chat com IA sobre as obras |

### Health
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/health` | Status do servidor |

## 🛠️ Tecnologias

- **Python 3.11+**
- **FastAPI** — Framework web assíncrono
- **Google Gemini 2.5 Flash** — IA generativa
- **MercadoPago SDK** — Pagamentos PIX
- **Firebase Admin** — Firestore + Auth
- **Docker** — Containerização
- **Leapcell** — Hospedagem

## 🏗️ Estrutura

```
├── main.py              # Entry point + rotas
├── firebase_client.py   # Conexão Firebase
├── Dockerfile           # Multi-stage build
├── requirements.txt     # Dependências
└── static/              # Landing page
```

## 🚀 Como rodar

```bash
# Instalar dependências
pip install -r requirements.txt

# Rodar localmente
uvicorn main:app --reload --port 8000

# Build Docker
docker build -t art-backend .
docker run -p 8000:8000 art-backend
```

## 🔐 Variáveis de ambiente

```env
MERCADOPAGO_ACCESS_TOKEN=...
GOOGLE_AI_API_KEY=...
FIREBASE_CREDENTIALS=...
JWT_SECRET=...
```

## 👨‍💻 Desenvolvido por

**Anselmo Polcaro** — [@polcaronet](https://github.com/polcaronet)

---

> 🔒 Repositório privado — código proprietário
