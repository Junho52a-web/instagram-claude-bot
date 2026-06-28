import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "./config.js";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = process.env.CLAUDE_MODEL || "claude-haiku-4-5-20251001";

// Memória simples de conversa, por usuário (em memória RAM).
// Para produção com muitos usuários, troque por Redis ou um banco de dados.
const conversas = new Map();
const MAX_HISTORICO = 10; // últimas 10 mensagens (5 trocas) por usuário

function getHistorico(senderId) {
  if (!conversas.has(senderId)) conversas.set(senderId, []);
  return conversas.get(senderId);
}

/**
 * Gera a resposta do Claude para uma mensagem recebida.
 * @param {string} senderId - ID do usuário que mandou a DM
 * @param {string} mensagem - texto da mensagem recebida
 * @returns {Promise<string>} texto da resposta
 */
export async function gerarResposta(senderId, mensagem) {
  const historico = getHistorico(senderId);

  // adiciona a mensagem do usuário ao histórico
  historico.push({ role: "user", content: mensagem });

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 500,
    system: buildSystemPrompt(),
    messages: historico,
  });

  // extrai o texto da resposta
  const texto = response.content
    .filter((bloco) => bloco.type === "text")
    .map((bloco) => bloco.text)
    .join("\n")
    .trim();

  // guarda a resposta no histórico e limita o tamanho
  historico.push({ role: "assistant", content: texto });
  if (historico.length > MAX_HISTORICO) {
    historico.splice(0, historico.length - MAX_HISTORICO);
  }

  return texto || "Desculpe, não consegui entender. Pode reformular?";
}
