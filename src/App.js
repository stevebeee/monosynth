import React from "react";
import * as Tone from "tone";
import Keyboard from "./Keyboard";
import Envelope from "./Envelope";
import Oscillator from "./Oscillator";
import './App.css';

function App() {
  const synth = new Tone.Synth().toMaster();

  return (
    <div>
    <p id="widthMessage">Please use a desktop browser with a minimum width of 1000 pixels</p>
    <div id="container">
      <Oscillator osc={synth.oscillator} />
      <Envelope env={synth.envelope} />
      <Keyboard synth={synth} />
    </div>
    </div>
  );
}

export default App;
