export function setupMock() {
  // Apenas intercepta o fetch a "/api/mock" e responde com eco.
  const originalFetch = window.fetch;
  window.fetch = async (input, init) => {
    if (typeof input === "string" && input.includes("/api/mock")) {
      const body = init?.body ? JSON.parse(init.body) : {};
      const reply = `Recebi: ${body.message}`;
      return new Response(JSON.stringify({ reply }), { headers: { "Content-Type": "application/json" } });
    }
    return originalFetch(input, init);
  };
}
