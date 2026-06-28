import "dotenv/config";
import express from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { gerarResposta } from "./claude.js";
import { enviarMensagem, indicarDigitando } from "./instagram.js";

const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PORT = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));
const politicaHtml = readFileSync(
  join(__dirname, "..", "politica-de-privacidade.html"),
  "utf-8"
);

// Para não responder a mesma mensagem duas vezes (a Meta pode reenviar)
const mensagensProcessadas = new Set();

// ---------- Healthcheck ----------
app.get("/", (_req, res) => {
  res.send("Bot do Instagram + Claude está rodando 🚀");
});

// ---------- Política de Privacidade (exigida pelo App Review da Meta) ----------
app.get("/politica", (_req, res) => {
  res.type("html").send(politicaHtml);
});

// ---------- Verificação do Webhook (a Meta chama isso 1x ao configurar) ----------
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verificado com sucesso.");
    return res.status(200).send(challenge);
  }
  console.warn("❌ Falha na verificação do webhook.");
  return res.sendStatus(403);
});

// ---------- Recebimento de mensagens ----------
app.post("/webhook", async (req, res) => {
  const body = req.body;

  // Responde 200 imediatamente para a Meta não reenviar / dar timeout.
  res.sendStatus(200);

  if (body.object !== "instagram" && body.object !== "page") return;

  for (const entry of body.entry || []) {
    const eventos = entry.messaging || [];
    for (const evento of eventos) {
      try {
        await processarEvento(evento);
      } catch (err) {
        console.error("Erro ao processar evento:", err);
      }
    }
  }
});

async function processarEvento(evento) {
  const senderId = evento.sender?.id;
  const mensagem = evento.message;

  // ignora se não for uma mensagem de texto de um usuário
  if (!senderId || !mensagem) return;

  // ignora mensagens que o PRÓPRIO bot enviou (echo)
  if (mensagem.is_echo) return;

  // evita processar a mesma mensagem duas vezes
  const mid = mensagem.mid;
  if (mid) {
    if (mensagensProcessadas.has(mid)) return;
    mensagensProcessadas.add(mid);
    // limpa o set se ficar grande demais
    if (mensagensProcessadas.size > 1000) mensagensProcessadas.clear();
  }

  const texto = mensagem.text;
  if (!texto) {
    // mensagem sem texto (figurinha, áudio, imagem...)
    await enviarMensagem(
      senderId,
      "Recebi sua mensagem! No momento consigo responder apenas mensagens de texto 🙂"
    );
    return;
  }

  console.log(`📩 Mensagem de ${senderId}: ${texto}`);

  await indicarDigitando(senderId);
  const resposta = await gerarResposta(senderId, texto);
  await enviarMensagem(senderId, resposta);

  console.log(`📤 Resposta enviada para ${senderId}: ${resposta}`);
}

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
