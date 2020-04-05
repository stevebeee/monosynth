import React from "react";
import * as Tone from "tone";
import Keyboard from "./Keyboard";
import Envelope from "./Envelope";
import Oscillator from "./Oscillator";

const containerStyles = {
  textAlign: "center"
};

function App() {
  const synth = new Tone.Synth().toMaster();

  return (
    <div style={containerStyles}>
      <Oscillator osc={synth.oscillator} />
      <Envelope env={synth.envelope} />
      <Keyboard synth={synth} />
    </div>
  );
}

export default App;
