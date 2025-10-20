import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import emojiToolkit from "emoji-toolkit";


function withEmojis(text = "") {
  // Converte shortcodes :...: (GitHub/Slack) para Unicode.
  // Se já for Unicode, o toolkit não altera.
  return emojiToolkit.shortnameToUnicode(text);
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const listRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  // Auto-resize do textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reseta antes de medir
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 220) + "px"; // limita o crescimento
    }
  }, [input]);

async function sendMessage(e) {
  e.preventDefault();
  const text = input.trim();
  if (!text) return;

  // mostra mensagem do usuário
  setMessages((m) => [...m, { role: "user", content: text }]);
  setInput("");

  // URL da API (ENV deve conter a base, com ou sem /ask)
  const base = (process.env.REACT_APP_CHAT_API_URL || "").replace(/\/$/, "");
  if (!base) {
    setMessages((m) => [
      ...m,
      { role: "assistant", content: "Chat API URL is not set in the build." }
    ]);
    return;
  }
  const url = base.endsWith("/ask") ? base : `${base}/ask`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ question: text }) // sua API espera {question}
    });

    // tenta extrair texto bruto para fallback
    const raw = await res.text();
    if (!res.ok) throw new Error(`HTTP ${res.status} – ${raw}`);

    // tenta parsear JSON
    let data = {};
    try { data = raw ? JSON.parse(raw) : {}; } catch { /* mantém vazio */ }

    // captura campos comuns
    const reply =
      (data.answer ??
      data.reply ??
      data.output ??
      data.message ??
      (data.choices?.[0]?.message?.content) ??
      (typeof data === "string" ? data : "")) ||
      "(empty response)";

    setMessages((m) => [...m, { role: "assistant", content: String(reply) }]);
  } catch (err) {
    console.error("Chat API error:", err);
    setMessages((m) => [
      ...m,
      { role: "assistant", content: "I couldn't reach the chatbot API." }
    ]);
  }
}



  // Ícone SVG do botão flutuante
  const ChatIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <>
      {/* Botão flutuante — maior e mais visível */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        style={{
          position: "fixed",
          right: 28,
          bottom: 28,
          zIndex: 1000,
          width: 68,                // era 56 → agora maior
          height: 68,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(145deg, #6842ff, #4a23d8)",
          color: "white",
          boxShadow: "0 12px 24px rgba(89,50,234,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform .1s ease, box-shadow .2s ease",
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {/* Ícone ampliado */}
        <svg
          width="30"               // era 22 → ampliado
          height="30"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
        </svg>
      </button>



      {/* Janela do chat */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            right: 24,
            bottom: 96,
            width: 420,
            maxWidth: "90vw",
            maxHeight: "72vh",
            background: "white",
            borderRadius: 18,
            boxShadow: "0 24px 48px rgba(0,0,0,.24)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1000
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 18px",
              background: "#1f6feb",
              color: "white",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              letterSpacing: 0.2
            }}
          >
            Assistant • Portfolio
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: 22,
                cursor: "pointer",
                lineHeight: 1
              }}
            >
              ×
            </button>
          </div>

          {/* Lista de mensagens */}
          <div
            ref={listRef}
            style={{
              padding: 14,
              overflowY: "auto",
              flex: 1,
              background: "#f8fafc"
            }}
          >
            {messages.map((m, i) => (
            <div
              style={{
                background: m.role === "user" ? "#5932ea" : "white",
                color: m.role === "user" ? "white" : "#0f172a",
                border: m.role === "user" ? "none" : "1px solid #e2e8f0",
                borderRadius: 14,
                padding: "12px 14px",
                maxWidth: "85%",
                lineHeight: 1.55,
                fontSize: 15,
                boxShadow:
                  m.role === "user"
                    ? "0 6px 16px rgba(89,50,234,.20)"
                    : "0 4px 10px rgba(0,0,0,.06)"
              }}
            >
            {m.role === "assistant" ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  li: ({children}) => <li style={{margin: "4px 0"}}>{children}</li>,
                  ul: ({children}) => <ul style={{paddingLeft: 20, margin: "6px 0"}}>{children}</ul>,
                  strong: ({children}) => <strong style={{fontWeight: 700}}>{children}</strong>,
                  em: ({children}) => <em style={{fontStyle: "italic"}}>{children}</em>,
                  p: ({children}) => <p style={{margin: "6px 0"}}>{children}</p>,
                  a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" />
                }}
              >
                {withEmojis(m.content)}
              </ReactMarkdown>
            ) : (
              // mensagem do usuário (opcionalmente com emojis também)
              withEmojis(m.content)
            )}

            </div>

            ))}
          </div>

          {/* Campo de entrada com auto-resize */}
          <form
            onSubmit={sendMessage}
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 10,
              padding: 14,
              borderTop: "1px solid #e2e8f0",
              background: "white"
            }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();            // evita quebra de linha
                  // simula o submit do form
                  const fakeEvent = { preventDefault: () => {} };
                  sendMessage(fakeEvent);
                }
              }}
              placeholder="Type your message..."
              style={{
                flex: 1,
                minHeight: "60px",
                maxHeight: "220px",
                resize: "none",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                padding: "14px 16px",
                fontSize: "16px",
                lineHeight: 1.5,
                color: "#0f172a",
                outline: "none",
                overflowY: "hidden",
                backgroundColor: "#fff",
                boxShadow: "inset 0 2px 5px rgba(0,0,0,0.04)"
              }}
            />

            <button
              type="submit"
              style={{
                border: "none",
                borderRadius: "10px",
                padding: "14px 18px",
                background: "#5932ea",
                color: "white",
                fontWeight: 700,
                fontSize: "15px",
                cursor: "pointer",
                boxShadow: "0 6px 12px rgba(89,50,234,0.25)",
                transition: "filter .15s ease"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
