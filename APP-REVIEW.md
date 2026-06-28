# Guia do App Review — Bot Instagram + Claude (@usecriativa)

Tudo que você precisa pra enviar o app pra análise da Meta. Os textos já estão prontos
pra copiar e colar.

---

## ✅ Checklist

- [x] Verificação da empresa (Use criativa) — já concluída
- [ ] **Política de Privacidade hospedada** numa URL pública (ver abaixo)
- [ ] **Ícone do app** 1024×1024 px (PNG)
- [ ] Permissões enxugadas (deixar só `instagram_business_basic` e `instagram_business_manage_messages`)
- [ ] Descrições de uso preenchidas (textos prontos abaixo)
- [ ] Vídeo (screencast) gravado (roteiro abaixo) — **depende do recebimento de DM funcionar**
- [ ] Enviar pra análise

---

## 1. Hospedar a Política de Privacidade

O arquivo `politica-de-privacidade.html` já está pronto. Você precisa colocá-lo numa
URL pública. Opções (escolha uma):

- **Seu site:** se você tem hospedagem (ex.: o site da Use Criativa), suba o arquivo lá.
  Ex.: `https://seusite.com.br/politica-de-privacidade.html`
- **GitHub Pages (grátis):** crie um repositório, suba o arquivo, ative o Pages.
- **Netlify Drop (grátis, mais fácil):** acesse https://app.netlify.com/drop e arraste o
  arquivo — ele gera uma URL pública na hora.

Guarde a URL final — você vai colá-la no campo "URL da Política de Privacidade" das
**Configurações do app → Básico** no painel da Meta.

---

## 2. Ícone do app

PNG quadrado de 1024×1024 px (pode ser o logo da Use Criativa). Sobe em
**Configurações do app → Básico → Ícone do app**.

---

## 3. Descrições de uso (copiar e colar)

### Permissão: `instagram_business_basic`
> Nosso aplicativo usa esta permissão para identificar a conta profissional do Instagram
> conectada (@usecriativa) e obter informações básicas do perfil, necessárias para operar
> o atendimento automatizado nas mensagens diretas. Sem ela, não conseguimos vincular a
> conta nem associar as conversas recebidas.

### Permissão: `instagram_business_manage_messages`
> Nosso aplicativo usa esta permissão para receber as mensagens diretas que os clientes
> enviam para a conta @usecriativa e responder automaticamente com um atendente virtual.
> Quando um cliente manda uma DM, o app lê o texto, gera uma resposta de atendimento
> (dúvidas sobre produtos, prazos, formas de pagamento) e a envia de volta pela API
> oficial do Instagram. Mensagens que exigem um humano são encaminhadas a um atendente.

---

## 4. Roteiro do vídeo (screencast)

O vídeo precisa mostrar o fluxo completo, do ponto de vista de quem usa. Grave a tela
(do celular ou navegador) mostrando, em sequência:

1. Uma conta de cliente abrindo o Instagram e indo na conversa com **@usecriativa**.
2. O cliente **digitando e enviando** uma pergunta (ex.: "Vocês entregam para todo o Brasil?").
3. **A resposta automática chegando** na conversa (gerada pelo bot/Claude).
4. (Opcional) Uma segunda pergunta e segunda resposta, pra mostrar que é conversa real.

Dica: deixe o áudio ou uma legenda explicando "o cliente envia → nosso app recebe via
API → responde automaticamente". Suba o vídeo no formulário do App Review de cada permissão.

> ⚠️ Este vídeo só pode ser gravado quando o recebimento de DM estiver funcionando.
> Mantenha o servidor + ngrok rodando e teste de tempos em tempos (a propagação da
> configuração nova pode levar de minutos a ~48h).

---

## 5. Enviar

Painel da Meta → **Casos de uso → (o caso do Instagram) → etapa 5 "Concluir a análise do
app"** → preencher cada permissão com a descrição + vídeo → **Enviar para análise**.

A aprovação costuma levar de alguns dias. Você recebe o resultado por e-mail / no painel.
