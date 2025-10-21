import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import emojiToolkit from "emoji-toolkit";

// Converte :shortcodes: para emojis Unicode
function withEmojis(text = "") {
  return emojiToolkit.shortnameToUnicode(text || "");
}

// Normaliza respostas (remove "(mock)" e padroniza "não sei")
function normalizeReply(input) {
  if (input == null) return "(empty response)";
  let t = String(input).trim();
  t = t.replace(/^\(mock\)\s*/i, "");
  const unknownPatterns = [
    /i (do not|don't) know based on the current document/i,
    /i (do not|don't) know based on the current (doc|docs|documents)/i,
    /no (answer|context) available/i,
    /not found in (document|docs|kb|knowledge base)/i
  ];
  if (unknownPatterns.some((p) => p.test(t))) {
    return "I don't know based on the current document 🤷‍♀️";
  }
  return t;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [hasShownDisclaimer, setHasShownDisclaimer] = useState(false);

  const listRef = useRef(null);
  const textareaRef = useRef(null);

  // -------- Helpers de URL --------
  function getApiRoot() {
    const raw = process.env.REACT_APP_CHAT_API_URL || "";
    const base = raw.replace(/\/$/, "");
    return base.replace(/\/ask$/i, ""); // se vier .../ask, remove
  }
  function getAskUrl() {
    const root = getApiRoot();
    return root ? `${root}/ask` : "";
  }
  function getHealthUrl() {
    const root = getApiRoot();
    return root ? `${root}/health` : "";
  }

  async function checkHealth(timeoutMs = 2500) {
    const url = getHealthUrl();
    if (!url) return false;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(url, { method: "GET", mode: "cors", signal: ctrl.signal });
      return res.ok;
    } catch {
      return false;
    } finally {
      clearTimeout(timer);
    }
  }

  // -------- Auto-scroll --------
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  // -------- Auto-resize do textarea --------
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 260) + "px";
    }
  }, [input]);

  // -------- Envio de mensagem --------
  async function sendMessage(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    // exibe mensagem do usuário
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");

    // primeira mensagem do chat: checa /health e exibe disclaimer se ok
    if (!hasShownDisclaimer && messages.filter((mm) => mm.role === "user").length === 0) {
      const healthy = await checkHealth();
      if (healthy) {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              "Heads up: the first reply can take a few seconds while the model warms up ⏳"
          }
        ]);
      } else {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              "The chat service seems busy or temporarily unavailable. You can try again in a moment."
          }
        ]);
      }
      setHasShownDisclaimer(true);
    }

    const askUrl = getAskUrl();
    if (!askUrl) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Chat API URL is not set in the build." }
      ]);
      return;
    }

    try {
      const res = await fetch(askUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ question: text })
      });

      const raw = await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status} – ${raw}`);

      let data = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        // mantém vazio se não for JSON
      }

      const reply =
        (data.answer ??
          data.reply ??
          data.output ??
          data.message ??
          (data.choices?.[0]?.message?.content) ??
          (typeof data === "string" ? data : "")) || "(empty response)";

      const normalizedReply = normalizeReply(reply);
      setMessages((m) => [...m, { role: "assistant", content: normalizedReply }]);
    } catch (err) {
      console.error("Chat API error:", err);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I couldn't reach the chatbot API." }
      ]);
    }
  }

  // Ícone do botão flutuante
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
      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        style={{
          position: "fixed",
          right: 28,
          bottom: 28,
          zIndex: 1000,
          width: 68,
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
          transition: "transform .1s ease, box-shadow .2s ease"
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <ChatIcon />
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
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  margin: "8px 0"
                }}
              >
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
                        p: (props) => <p style={{ margin: "6px 0" }} {...props} />,
                        ul: (props) => (
                          <ul style={{ paddingLeft: 20, margin: "6px 0" }} {...props} />
                        ),
                        ol: (props) => (
                          <ol style={{ paddingLeft: 22, margin: "6px 0" }} {...props} />
                        ),
                        li: (props) => <li style={{ margin: "4px 0" }} {...props} />,
                        strong: (props) => <strong style={{ fontWeight: 700 }} {...props} />,
                        em: (props) => <em style={{ fontStyle: "italic" }} {...props} />,
                        a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" />
                      }}
                    >
                      {withEmojis(m.content)}
                    </ReactMarkdown>
                  ) : (
                    withEmojis(m.content)
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Campo de entrada */}
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
                  e.preventDefault();
                  const fakeEvent = { preventDefault: () => {} };
                  sendMessage(fakeEvent);
                }
              }}
              placeholder="Type your message..."
              style={{
                flex: 1,
                minHeight: "80px",      // maior
                maxHeight: "260px",     // maior
                resize: "none",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                padding: "16px 18px",   // maior
                fontSize: "16px",
                lineHeight: 1.5,
                color: "#0f172a",
                outline: "none",
                overflowY: "hidden",
                backgroundColor: "#fff",
                boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)"
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
