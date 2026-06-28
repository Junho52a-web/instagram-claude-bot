const GRAPH_VERSION = process.env.GRAPH_API_VERSION || "v21.0";
const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;

// API do Instagram com Login do Instagram usa o domínio graph.instagram.com
const BASE_URL = `https://graph.instagram.com/${GRAPH_VERSION}`;

/**
 * Envia uma mensagem de texto para um usuário no Instagram (Direct).
 * @param {string} recipientId - ID do destinatário (sender da mensagem recebida)
 * @param {string} texto - texto a enviar
 */
export async function enviarMensagem(recipientId, texto) {
  const url = `${BASE_URL}/me/messages`;

  const body = {
    recipient: { id: recipientId },
    message: { text: texto },
  };

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${IG_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const erro = await resp.text();
    console.error("Erro ao enviar mensagem para o Instagram:", erro);
    throw new Error(`Falha ao enviar (HTTP ${resp.status})`);
  }

  return resp.json();
}

/**
 * (Opcional) Marca a conversa como "digitando..." para parecer mais natural.
 */
export async function indicarDigitando(recipientId) {
  const url = `${BASE_URL}/me/messages`;
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${IG_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        recipient: { id: recipientId },
        sender_action: "typing_on",
      }),
    });
  } catch {
    // ignora — é só um detalhe estético
  }
}
