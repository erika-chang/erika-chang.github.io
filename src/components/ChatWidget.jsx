import React, { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    try {
      const res = await fetch(
        process.env.REACT_APP_CHAT_API_URL || "/api/mock",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMsg.content })
        }
      );
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply || "(sem resposta)" }]);
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", content: "Erro ao conectar ao chat." }]);
    }
  }

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir chat"
        style={{
          position: "fixed", right: 24, bottom: 24, zIndex: 1000,
          borderRadius: "9999px", padding: "12px 16px", boxShadow: "0 4px 16px rgba(0,0,0,.2)",
          border: "none", cursor: "pointer", background: "#5932ea", color: "white", fontWeight: 600
        }}
      >
        Chat
      </button>

      {/* Janela do chat */}
      {open && (
        <div
          role="dialog" aria-modal="true"
          style={{
            position: "fixed", right: 24, bottom: 88, width: 360, maxHeight: "70vh",
            background: "white", borderRadius: 16, boxShadow: "0 20px 40px rgba(0,0,0,.25)",
            display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 1000
          }}
        >
          <div style={{ padding: "12px 16px", background: "#1f6feb", color: "white", fontWeight: 700 }}>
            Assistente • Portfolio
            <button onClick={() => setOpen(false)} aria-label="Fechar"
              style={{ float: "right", background: "transparent", border: "none", color: "white", fontSize: 18, cursor: "pointer" }}>×</button>
          </div>

          <div style={{ padding: 12, overflowY: "auto", flex: 1 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ margin: "8px 0", textAlign: m.role === "user" ? "right" : "left" }}>
                <div style={{
                  display: "inline-block",
                  background: m.role === "user" ? "#5932ea" : "#f1f5f9",
                  color: m.role === "user" ? "white" : "#0f172a",
                  borderRadius: 12, padding: "8px 10px", maxWidth: "85%"
                }}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid #e2e8f0" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escreva sua mensagem…"
              style={{ flex: 1, borderRadius: 8, border: "1px solid #cbd5e1", padding: "10px 12px" }}
            />
            <button type="submit" style={{
              border: "none", borderRadius: 8, padding: "10px 14px",
              background: "#5932ea", color: "white", fontWeight: 600, cursor: "pointer"
            }}>Enviar</button>
          </form>
        </div>
      )}
    </>
  );
}
