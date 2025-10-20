import React from "react";
import "./App.scss";
import Main from "./containers/Main";
import ChatWidget from "./components/ChatWidget";
// Remova qualquer import { setupMock } ... e useEffect que o aciona

function App() {
  return (
    <>
      <Main />
      <ChatWidget />
    </>
  );
}
export default App;
