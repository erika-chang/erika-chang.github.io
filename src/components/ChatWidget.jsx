import React, { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function sendMessage(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMsg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    try {
      const res = await fetch(process.env.REACT_APP_CHAT_API_URL || "/api/mock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply || "No response received." }
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Connection error. Try again later." }
      ]);
    }
  }

  // Ícone SVG do botão
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
      {/* FAB do chat */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        style={{
          position: "fixed",
          right: 24,
          bottom: 24,
          zIndex: 1000,
          width: 56,
          height: 56,
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          background: "#5932ea",       // primária
          color: "white",
          boxShadow: "0 10px 20px rgba(0,0,0,.20)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform .08s ease, box-shadow .2s ease"
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
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
            width: 420,              // maior
            maxWidth: "90vw",
            maxHeight: "72vh",       // mais alto
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
              background: "#f8fafc" // leve cinza
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  margin: "10px 0",
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start"
                }}
              >
                <div
                  style={{
                    background: m.role === "user" ? "#5932ea" : "white",
                    color: m.role === "user" ? "white" : "#0f172a",
                    border: m.role === "user" ? "none" : "1px solid #e2e8f0",
                    borderRadius: 14,
                    padding: "10px 12px",
                    maxWidth: "80%",
                    lineHeight: 1.45,
                    fontSize: 15,
                    boxShadow:
                      m.role === "user"
                        ? "0 6px 16px rgba(89,50,234,.20)"
                        : "0 4px 10px rgba(0,0,0,.06)"
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          {/* Entrada com textarea maior */}
          <form
            onSubmit={sendMessage}
            style={{
              display: "flex",
              gap: 10,
              padding: 14,
              borderTop: "1px solid #e2e8f0",
              background: "white"
            }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              rows={3}                 // altura inicial maior
              style={{
                flex: 1,
                minHeight: 56,         // garante altura grande
                maxHeight: 140,        // evita crescer demais
                resize: "vertical",
                borderRadius: 10,
                border: "1px solid #cbd5e1",
                padding: "12px 14px",
                fontSize: 15,
                lineHeight: 1.4,
                outline: "none"
              }}
            />
            <button
              type="submit"
              style={{
                border: "none",
                borderRadius: 10,
                padding: "0 18px",
                minWidth: 96,
                background: "#5932ea",
                color: "white",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 20px rgba(89,50,234,.25)",
                transition: "filter .15s ease"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.02)")}
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
