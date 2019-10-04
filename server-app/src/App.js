import React, { useEffect, useState, useContext } from "react";
import useSocket from "./utils/useSocket";
import SetupPage from "./SetupPage";

export const AppContext = React.createContext();

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

  function renderRoutes() {
    switch (appState) {
      case "setup":
        return <SetupPage />;
      case "wait":
        return <WaitPage />;
      default:
        return null;
    }
  }

  if (appState === null) return <h1>Loading</h1>;

  return (
    <div>
      <h1>Welcome to murder game</h1>
      <h2>State {appState}</h2>

      <button onClick={() => socket.emit("appState_change_manual")}>
        Test
      </button>
      <AppContext.Provider value={{ socket }}>
        {renderRoutes()}
      </AppContext.Provider>
    </div>
  );
}

export default App;

function WaitPage() {
  return (
    <div>
      <h1>Waiting for players Connect</h1>
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
