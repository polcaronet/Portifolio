# 💈 Salão Fashion

Aplicativo completo de gestão para barbearias e salões de beleza, desenvolvido em **Flutter** com **Dart**.

## 📱 Screenshots

| Tela | Preview |
|------|---------|
| Login | ![Login](screenshots/login.png) |
| Agendamento | ![Agendamento](screenshots/agendamento.png) |
| Painel Admin | ![Admin](screenshots/admin.png) |
| Pagamento PIX | ![PIX](screenshots/pix.png) |
| Comprovante | ![Comprovante](screenshots/comprovante.png) |
| Cadastro Colaborador | ![Colaborador](screenshots/colaborador.png) |

> 📸 Para adicionar: tire prints do app e salve na pasta `screenshots/`

## ✨ Funcionalidades

- 📅 Agendamento de horários com calendário interativo
- 👤 Cadastro de clientes e colaboradores
- 💳 Pagamento via PIX (Stripe) com parcelamento até 10x
- 🧾 Comprovantes de pagamento com compartilhamento PDF
- 👨‍💼 Painel administrativo para gerenciar funcionários
- 🔐 Autenticação com Firebase Auth
- 📊 Auto-atendimento para clientes
- 🔔 Notificações de agendamento

## 🛠️ Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Flutter, Dart, Riverpod |
| Backend | Node.js, Render |
| Banco de dados | Firebase Firestore |
| Pagamentos | Stripe (PIX + Cartão) |
| Autenticação | Firebase Auth |
| Arquitetura | Modular com Riverpod |

## 🏗️ Arquitetura

```
lib/
├── src/
│   ├── core/
│   │   ├── ui/          # Widgets e temas reutilizáveis
│   │   └── restClient/  # Configuração HTTP
│   └── features/
│       ├── schedules/   # Agendamentos
│       ├── employee/    # Funcionários
│       ├── auth/        # Login e cadastro
│       └── home/        # Painel principal
```

## 🚀 Como rodar

```bash
# Instalar dependências
flutter pub get

# Gerar código (Riverpod/Freezed)
dart run build_runner build --delete-conflicting-outputs

# Rodar no dispositivo
flutter run
```

## 📦 Pacotes principais

- `flutter_riverpod` — Gerenciamento de estado
- `table_calendar` — Calendário de agendamentos
- `dio` — Cliente HTTP
- `firebase_auth` — Autenticação
- `validatorless` — Validação de formulários

## 👨‍💻 Desenvolvido por

**Anselmo Polcaro** — [@polcaronet](https://github.com/polcaronet)

---

> 🔒 Repositório privado — código proprietário
