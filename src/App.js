import React, { useEffect } from "react";
import "./App.scss";
import Main from "./containers/Main";
import ChatWidget from "./components/ChatWidget";
import { setupMock } from "./mockServer";

function App() {
  // If no backend URL is set, enable a local mock so the chat UI works out of the box.
  useEffect(() => {
    if (!process.env.REACT_APP_CHAT_API_URL) {
      setupMock();
    }
  }, []);

  return (
    <>
      <Main />
      <ChatWidget />
    </>
  );
}

export default App;
