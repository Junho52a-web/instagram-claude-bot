# Bot de Instagram com Claude (Anthropic)

API em Node.js que recebe as DMs do seu Instagram e responde automaticamente
usando o Claude, com foco em **atendimento do seu negócio**.

```
Instagram DM ──webhook──> Esta API ──> Claude ──> Esta API ──> Graph API ──> resposta no Instagram
```

## 1. Pré-requisitos

- Conta **Instagram Business ou Creator** vinculada a uma **Página do Facebook** ✅ (você já tem)
- [Node.js 18+](https://nodejs.org) instalado
- Chave da API da Anthropic: https://console.anthropic.com → Settings → API Keys

## 2. Instalar

```bash
cd "site burn"
npm install
cp .env.example .env
```

Depois abra o arquivo `.env` e preencha as chaves (veja os passos abaixo para pegar cada uma).

## 3. Personalizar o atendimento

Edite **`src/config.js`** com os dados do seu negócio: nome, descrição, horário,
formas de pagamento, prazo de entrega e perguntas frequentes. É isso que o Claude
usa para responder seus clientes.

## 4. Configurar o app na Meta (passo a passo)

> Você disse que já tem a conta Business + Página. Falta criar o app e o webhook.

1. Acesse https://developers.facebook.com → **Meus Apps** → **Criar app**.
2. Escolha o tipo **"Empresa / Business"**.
3. No painel do app, adicione o produto **"Instagram"** (Instagram Messaging / Graph API).
4. Em **Instagram → Configuração da API**, vincule sua **Página do Facebook** e a
   **conta do Instagram**.
5. Gere o **Token de Acesso da Página (Page Access Token)** e cole em
   `PAGE_ACCESS_TOKEN` no `.env`.
6. **Permissões necessárias** (peça na revisão do app):
   `instagram_basic`, `instagram_manage_messages`, `pages_manage_metadata`,
   `pages_show_list`.

### Webhook

7. Antes de configurar o webhook, a API precisa estar acessível por uma **URL pública HTTPS**.
   Para testar localmente, use o [ngrok](https://ngrok.com):

   ```bash
   npm start              # roda a API na porta 3000
   # em outro terminal:
   ngrok http 3000        # gera uma URL https pública
   ```

8. No painel da Meta, em **Instagram → Webhooks**:
   - **Callback URL**: `https://SUA-URL-DO-NGROK/webhook`
   - **Verify Token**: a mesma senha que você colocou em `VERIFY_TOKEN` no `.env`
   - Clique em **Verificar e salvar** (você verá `✅ Webhook verificado` no terminal)
   - **Inscreva-se** (subscribe) no campo **`messages`**.

## 5. Rodar

```bash
npm start          # produção
npm run dev        # com reload automático ao editar
```

Mande uma DM para a conta do Instagram e o bot deve responder. 🎉

## 6. Colocar no ar (produção)

Para o bot funcionar 24h sem o ngrok, hospede em um serviço com URL fixa, por exemplo:
[Railway](https://railway.app), [Render](https://render.com), [Fly.io](https://fly.io)
ou uma VPS. Configure as variáveis de ambiente do `.env` no painel do serviço e use a
URL pública gerada como Callback URL do webhook.

## Observações importantes

- **Janela de 24h:** o Instagram só permite responder mensagens automaticamente
  dentro de 24h após a última mensagem do usuário (regra da Meta).
- **Modo de desenvolvimento:** enquanto o app não passa pela revisão da Meta, só
  contas com função no app (admin/testador) conseguem conversar com o bot. Para
  abrir ao público, você precisa submeter o app para **App Review**.
- A memória de conversa é em RAM (`src/claude.js`). Para produção séria, troque por
  Redis ou um banco de dados.
- **Custo:** cada resposta consome tokens da API da Anthropic. O modelo padrão é o
  Haiku (rápido e barato). Você pode trocar em `CLAUDE_MODEL` no `.env`.

## Estrutura

```
src/
  server.js      → servidor Express + webhook (recebe e responde)
  claude.js      → gera a resposta com o Claude + memória de conversa
  instagram.js   → envia a resposta pela Graph API
  config.js      → dados do seu negócio (EDITE AQUI)
.env             → chaves e tokens (NÃO suba para o git)
```
