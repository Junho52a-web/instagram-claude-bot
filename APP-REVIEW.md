# Guia do App Review — Bot Instagram + Claude (@usecriativa)

App: **Integração_inst** (ID 2104862027048193)
URL do serviço (Render): **https://instagram-claude-bot-r4km.onrender.com**

---

## ✅ Já concluído

- [x] Verificação da empresa (Use criativa)
- [x] Deploy em servidor com URL fixa (Render)
- [x] Webhook verificado e assinado no campo `messages`
- [x] Política de Privacidade pública: https://instagram-claude-bot-r4km.onrender.com/politica
- [x] Categoria do app: "Mensagens"
- [x] Ícone do app 1024×1024

## ⏳ Falta (para enviar o App Review)

- [ ] Solicitar **Acesso Avançado** para `instagram_business_basic` e `instagram_business_manage_messages`
- [ ] Preencher descrição de uso (textos prontos abaixo)
- [ ] Instruções de teste para o revisor (prontas abaixo)
- [ ] Vídeo (screencast) — ver seção "Sobre o vídeo"
- [ ] Enviar

---

## 1. Descrições de uso (copiar e colar)

### `instagram_business_basic`
> Usamos esta permissão para identificar a conta profissional do Instagram conectada
> (@usecriativa) e associar corretamente as conversas recebidas. É a base necessária
> para o atendimento automatizado funcionar.

### `instagram_business_manage_messages`
> Operamos um atendente virtual nas mensagens diretas da conta @usecriativa, uma loja.
> Quando um cliente envia uma DM, nosso aplicativo recebe a mensagem via webhook, gera
> uma resposta de atendimento (dúvidas sobre produtos, prazos de entrega, formas de
> pagamento) usando IA e a envia de volta pela API oficial do Instagram. Casos que
> exigem um humano são encaminhados a um atendente. Não usamos as mensagens para
> nenhuma outra finalidade.

---

## 2. Instruções de teste para o revisor da Meta (copiar e colar)

> 1. Envie uma mensagem direta (DM) para a conta @usecriativa no Instagram
>    (ex.: "Vocês entregam para todo o Brasil?").
> 2. Em alguns segundos você receberá uma resposta automática gerada pelo nosso
>    atendente virtual, respondendo a sua pergunta.
> 3. Pode enviar uma segunda pergunta para confirmar que a conversa é contínua.
>
> Observação: o servidor está hospedado em plano gratuito e pode levar até ~50s para
> responder a primeira mensagem após um período de inatividade.

---

## 3. Sobre o vídeo (screencast)

O vídeo deve mostrar o fluxo: um cliente manda uma DM para @usecriativa e recebe a
resposta automática. Grave a tela do celular mostrando:

1. Abrir a conversa com @usecriativa.
2. Digitar e enviar uma pergunta.
3. A resposta automática chegando.

⚠️ **Importante:** esse fluxo só funciona depois que a Meta concede o Acesso Avançado.
Enquanto o app está em desenvolvimento, o Instagram não entrega as DMs recebidas.
Por isso:
- Envie a solicitação com as descrições + instruções de teste acima (o revisor da Meta
  testa enviando uma DM para a conta).
- Se o formulário **exigir** o vídeo antes de enviar e você não conseguir gravar o fluxo
  completo, grave um vídeo curto explicando o caso de uso e mostrando a conta @usecriativa
  e o painel de configuração. Em muitos casos a Meta aprova testando por conta própria.

---

## 4. Onde enviar

Painel da Meta → menu lateral **Casos de uso** → abra o caso "Instagram" →
aba **Permissões e recursos** → em cada permissão, clique em **Solicitar Acesso
Avançado** → preencha descrição + vídeo → **Enviar para análise**.

Aprovação costuma levar de alguns dias e pode ter idas e voltas.
