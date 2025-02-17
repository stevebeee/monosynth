import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WaveformType = 'sine' | 'square' | 'sawtooth' | 'triangle';

interface Oscillator {
  id: number;
  volume: number;
  waveform: WaveformType;
  enabled: boolean;
}

interface Effects {
  filter: {
    frequency: number;
    resonance: number;
  };
  delay: {
    time: number;
    feedback: number;
  };
  reverb: {
    mix: number;
  };
}

interface SynthState {
  isPlaying: boolean;
  mainVolume: number;
  oscillators: Oscillator[];
  effects: Effects;
  activeNotes: { [key: string]: boolean };
}

const initialState: SynthState = {
  isPlaying: true, // Changed from false to true
  mainVolume: 0.5,
  oscillators: [
    { id: 1, volume: 0.5, waveform: 'sine', enabled: true },
    { id: 2, volume: 0.5, waveform: 'square', enabled: false },
    { id: 3, volume: 0.5, waveform: 'sawtooth', enabled: false },
  ],
  effects: {
    filter: {
      frequency: 1000,
      resonance: 1,
    },
    delay: {
      time: 0.3,
      feedback: 0.4,
    },
    reverb: {
      mix: 0.3,
    },
  },
  activeNotes: {},
};

const synthSlice = createSlice({
  name: 'synth',
  initialState,
  reducers: {
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setMainVolume: (state, action: PayloadAction<number>) => {
      state.mainVolume = action.payload;
    },
    setOscillatorVolume: (state, action: PayloadAction<{ id: number; volume: number }>) => {
      const oscillator = state.oscillators.find(osc => osc.id === action.payload.id);
      if (oscillator) {
        oscillator.volume = action.payload.volume;
      }
    },
    setOscillatorWaveform: (state, action: PayloadAction<{ id: number; waveform: WaveformType }>) => {
      const oscillator = state.oscillators.find(osc => osc.id === action.payload.id);
      if (oscillator) {
        oscillator.waveform = action.payload.waveform;
      }
    },
    toggleOscillator: (state, action: PayloadAction<number>) => {
      const oscillator = state.oscillators.find(osc => osc.id === action.payload);
      if (oscillator) {
        oscillator.enabled = !oscillator.enabled;
      }
    },
    setFilterFrequency: (state, action: PayloadAction<number>) => {
      state.effects.filter.frequency = action.payload;
    },
    setFilterResonance: (state, action: PayloadAction<number>) => {
      state.effects.filter.resonance = action.payload;
    },
    setDelayTime: (state, action: PayloadAction<number>) => {
      state.effects.delay.time = action.payload;
    },
    setDelayFeedback: (state, action: PayloadAction<number>) => {
      state.effects.delay.feedback = action.payload;
    },
    setReverbMix: (state, action: PayloadAction<number>) => {
      state.effects.reverb.mix = action.payload;
    },
    setNoteActive: (state, action: PayloadAction<{ note: string; active: boolean }>) => {
      state.activeNotes[action.payload.note] = action.payload.active;
    },
  },
});

export const {
  togglePlay,
  setMainVolume,
  setOscillatorVolume,
  setOscillatorWaveform,
  toggleOscillator,
  setFilterFrequency,
  setFilterResonance,
  setDelayTime,
  setDelayFeedback,
  setReverbMix,
  setNoteActive,
} = synthSlice.actions;

export default synthSlice.reducer;