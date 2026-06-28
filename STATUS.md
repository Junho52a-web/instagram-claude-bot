# STATUS DO PROJETO — Bot Instagram + Claude (@usecriativa)

Última atualização: 28/06/2026

Atendente virtual que responde DMs do Instagram da @usecriativa usando o Claude (IA da Anthropic).

---

## 🔗 Endereços e identificadores

| O quê | Valor |
|---|---|
| Serviço no ar (Render) | https://instagram-claude-bot-r4km.onrender.com |
| Webhook | https://instagram-claude-bot-r4km.onrender.com/webhook |
| Política de privacidade | https://instagram-claude-bot-r4km.onrender.com/politica |
| Repositório (GitHub) | https://github.com/Junho52a-web/instagram-claude-bot (público) |
| App Meta — nome / ID | Integração_inst / 2104862027048193 |
| ID do app do Instagram | 2432926543785963 |
| Conta Instagram | @usecriativa (user_id 17841406551586867) |
| Conta testadora | @juniousecriativa |
| Empresa (verificada) | Use criativa |
| Verify token do webhook | use-criativa-bot-9f3k2x |
| Modelo do Claude | claude-haiku-4-5-20251001 |

> Segredos (token do Instagram e chave do Claude) ficam só no `.env` local e nas
> variáveis de ambiente do Render. **Nunca** vão para o GitHub.

---

## ✅ Concluído

- [x] Código do bot (Node.js + Express): recebe DM → Claude gera resposta → envia pela API do Instagram
- [x] Conta Business + Página + empresa verificada (Use criativa)
- [x] App criado no Meta for Developers (caso de uso: Gerenciar mensagens e conteúdo no Instagram)
- [x] Permissões adicionadas: instagram_business_basic, manage_comments, manage_messages
- [x] Token de acesso gerado (válido, salvo no .env / Render)
- [x] Conta @usecriativa conectada; @usecriativa e @juniousecriativa como Testadores do Instagram (aceitos)
- [x] "Permitir acesso às mensagens" LIGADO no app do Instagram
- [x] Deploy em produção no Render (URL fixa, grátis)
- [x] Webhook verificado e assinado no campo `messages`
- [x] Configurações básicas do app: política de privacidade, categoria "Mensagens", ícone 1024×1024
- [x] Chave da Anthropic configurada e testada (Claude respondendo)

## ⏳ Pendente — App Review (Acesso Avançado)

- [ ] Solicitar Acesso Avançado para `instagram_business_basic` e `instagram_business_manage_messages`
- [ ] Preencher descrições + instruções de teste (prontas em APP-REVIEW.md)
- [ ] Enviar vídeo/screencast (ver APP-REVIEW.md, seção 3)
- [ ] Aguardar aprovação da Meta

---

## ⚠️ O BLOQUEIO ATUAL (importante entender)

O bot está **completo e correto**, mas **não recebe DMs ainda**. Confirmado no log do
servidor: as mensagens não chegam.

**Causa:** o app está em **modo de desenvolvimento (Acesso Padrão)**. O Instagram só
entrega as mensagens recebidas de usuários para apps com **Acesso Avançado**, que é
concedido após o **App Review** da Meta.

Tudo que dependia de configuração já foi verificado e está correto (webhook, token,
permissões, assinatura, toggle "permitir acesso a mensagens", contas testadoras). O
único passo que falta é a aprovação da Meta.

**Desafio do App Review:** o formulário pede um vídeo do bot respondendo uma DM — mas
isso só funciona depois do Acesso Avançado (dependência circular). A saída é caprichar
nas "instruções de teste" para o revisor da Meta testar enviando uma DM ele mesmo.

---

## 🛠️ Como rodar / operar

- **Produção:** roda sozinho no Render (a partir do GitHub). Para atualizar: faça o
  `git push` no repositório que o Render redeploya automaticamente.
- **Variáveis de ambiente no Render:** ANTHROPIC_API_KEY, IG_ACCESS_TOKEN, IG_USER_ID,
  VERIFY_TOKEN, CLAUDE_MODEL, GRAPH_API_VERSION (definidas via render.yaml + painel).
- **Plano grátis do Render:** "dorme" após inatividade; a 1ª DM após dormir pode
  demorar ~50s. Para produção real, subir para plano pago (~US$7/mês) evita isso.
- **Editar o atendimento:** mexa em `src/config.js` (dados do negócio, FAQ, tom de voz).
- **Token do Instagram expira em ~60 dias** — precisará ser renovado no painel da Meta
  (tela "Gerar tokens de acesso") e atualizado no Render.

## 📁 Arquivos do projeto

- `src/server.js` — servidor + webhook + rota /politica
- `src/claude.js` — geração de resposta com o Claude + memória de conversa
- `src/instagram.js` — envio de mensagem pela API do Instagram (graph.instagram.com)
- `src/config.js` — **dados do negócio (EDITAR AQUI)**
- `politica-de-privacidade.html` — política (servida em /politica)
- `app-icon.png` — ícone 1024×1024 do app
- `render.yaml` — config do deploy
- `APP-REVIEW.md` — material pronto para enviar o App Review
- `README.md` — visão geral e instruções
