import React, { useEffect, useState } from "react";
import useSocket from "./utils/useSocket";

function App() {
  const [appState, setAppState] = useState(null);
  let socket = useSocket("http://localhost:3000", {
    connection: data => {
      setAppState(data.state.appState);
    },
    appState_change: data => {
      setAppState(data);
    }
  });

  if (appState === null) return <h1>Loading</h1>;

  return (
    <div>
      <h1>Welcome to murder game</h1>
      <h2>State {appState}</h2>

      <button onClick={() => socket.emit("appState_change_manual")}>
        Test
      </button>
    </div>
  );
}

export default App;

function SetupPage() {
  return (
    <div>
      <h1>This is the setup page</h1>
    </div>
  );
}

function WaitPage() {
  return (
    <div>
      <h1>Waiting for players to Ready</h1>
    </div>
  );
}

function DiscussPage() {
  return (
    <div>
      <h1>Discuss about whi the murderer is</h1>
    </div>
  );
}

function VotingPage() {
  return (
    <div>
      <h1>Vote for who you think is the murderer</h1>
    </div>
  );
}

function DefensePage() {
  return (
    <div>
      <h1>This is your last chance to defend yourself, do it wisely</h1>
    </div>
  );
}

function EliminationPage() {
  return (
    <div>
      <h1>
        XXXXX has been kicked out
        <br />
        He was ...... Murderer/Person
      </h1>
    </div>
  );
}
