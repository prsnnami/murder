import React, { useState, useContext } from "react";
import { AppContext } from "./App";

export default function SetupPage() {
  const [form, setForm] = useState({
    numberOfPlayers: 6,
    discussionTime: 5,
    defenseTime: 2
  });

  const { socket } = useContext(AppContext);

  function handleForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function submit() {
    socket.emit("setup_values", form);
  }

  return (
    <div>
      <h1>This is the setup page</h1>
      <div>
        <label htmlFor="numberOfPlayers">Number Of Players</label>
        <br />
        <input
          type="number"
          name="numberOfPlayers"
          value={form.numberOfPlayers}
          onChange={handleForm}
          placeholder="Number Of Players"
        />
      </div>
      <div>
        <label htmlFor="discussionTime">Discussion Time</label>
        <br />
        <input
          type="number"
          name="discussionTime"
          value={form.discussionTime}
          onChange={handleForm}
          placeholder="Discussion Time"
        />
      </div>
      <div>
        <label htmlFor="defenseTime">Defense time</label>
        <br />
        <input
          type="number"
          name="defenseTime"
          value={form.defenseTime}
          onChange={handleForm}
          placeholder="Defense Time"
        />
      </div>
      <button onClick={submit}>Submit</button>
    </div>
  );
}
