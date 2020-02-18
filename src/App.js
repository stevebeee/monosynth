import React from "react";
import * as Tone from "tone";
import Keyboard from "./Keyboard";
import Envelope from "./Envelope";

function App() {
  const synth = new Tone.Synth().toMaster();

  return (
    <div>
      <Envelope env={synth.envelope} />
      <Keyboard synth={synth} />
    </div>
  );
}

export default App;
