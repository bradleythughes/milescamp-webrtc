import React from "react";
import RemoteMedia from "../RemoteMedia";
import UserMedia from "../UserMedia";
import "./App.css";

function App() {
  const { hash } = window.location;
  return (
    <div className="App">
      {!hash && (
        <div className="App-message">
          <h1>No #hash in URL</h1>
          <p>To connect to another client, both should have the same #hash in the URL.</p>
        </div>
      )}
      <RemoteMedia />
      <UserMedia />
    </div>
  );
}

export default App;
