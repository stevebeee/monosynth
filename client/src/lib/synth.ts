import { WaveformType } from '../store/synthSlice';

interface Oscillator {
  oscillator: OscillatorNode;
  gain: GainNode;
  isPlaying: boolean;
}

interface Effects {
  filter: BiquadFilterNode;
  delay: DelayNode;
  delayFeedback: GainNode;
  reverb: ConvolverNode;
  reverbGain: GainNode;
}

class SynthEngine {
  private audioContext: AudioContext | null = null;
  private oscillators: Map<number, Oscillator> = new Map();
  private mainGain: GainNode | null = null;
  private frequency: number = 440;
  private effects: Effects | null = null;
  public analyser: AnalyserNode | null = null;

  async initialize() {
    if (this.audioContext) return; // Already initialized

    this.audioContext = new AudioContext();
    this.mainGain = this.audioContext.createGain();
    this.analyser = this.audioContext.createAnalyser();

    // Configure analyzer
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.85;

    // Create effects
    this.effects = {
      filter: this.audioContext.createBiquadFilter(),
      delay: this.audioContext.createDelay(),
      delayFeedback: this.audioContext.createGain(),
      reverb: this.audioContext.createConvolver(),
      reverbGain: this.audioContext.createGain()
    };

    // Set up filter
    this.effects.filter.type = 'lowpass';
    this.effects.filter.frequency.value = 1000;
    this.effects.filter.Q.value = 1;

    // Set up delay
    this.effects.delay.delayTime.value = 0.3;
    this.effects.delayFeedback.gain.value = 0.4;

    // Set up reverb
    const buffer = await this.createReverb();
    this.effects.reverb.buffer = buffer;
    this.effects.reverbGain.gain.value = 0.3;

    // Connect effects chain
    this.mainGain.connect(this.effects.filter);
    this.effects.filter.connect(this.effects.delay);
    this.effects.delay.connect(this.effects.delayFeedback);
    this.effects.delayFeedback.connect(this.effects.delay);
    this.effects.delay.connect(this.effects.reverb);
    this.effects.reverb.connect(this.effects.reverbGain);
    this.effects.reverbGain.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    // Direct signal path
    this.effects.filter.connect(this.analyser);
  }

  private async createReverb(): Promise<AudioBuffer> {
    if (!this.audioContext) throw new Error('AudioContext not initialized');

    const length = 2;
    const decay = 2;
    const sampleRate = this.audioContext.sampleRate;
    const bufferLength = length * sampleRate;
    const buffer = this.audioContext.createBuffer(2, bufferLength, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < bufferLength; i++) {
        const t = i / sampleRate;
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - t / length, decay);
      }
    }

    return buffer;
  }

  setMainVolume(volume: number) {
    if (!this.mainGain) return;
    this.mainGain.gain.value = volume;
  }

  setFilterFrequency(frequency: number) {
    if (!this.effects) return;
    this.effects.filter.frequency.value = frequency;
  }

  setFilterResonance(resonance: number) {
    if (!this.effects) return;
    this.effects.filter.Q.value = resonance;
  }

  setDelayTime(time: number) {
    if (!this.effects) return;
    this.effects.delay.delayTime.value = time;
  }

  setDelayFeedback(feedback: number) {
    if (!this.effects) return;
    this.effects.delayFeedback.gain.value = feedback;
  }

  setReverbMix(mix: number) {
    if (!this.effects) return;
    this.effects.reverbGain.gain.value = mix;
  }

  addOscillator(id: number, waveform: WaveformType, volume: number) {
    if (!this.audioContext || !this.mainGain) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = waveform;
    gainNode.gain.value = volume;

    oscillator.connect(gainNode);
    gainNode.connect(this.mainGain);

    this.oscillators.set(id, { oscillator, gain: gainNode, isPlaying: false });
  }

  removeOscillator(id: number) {
    const osc = this.oscillators.get(id);
    if (osc) {
      if (osc.isPlaying) {
        osc.oscillator.stop();
      }
      osc.oscillator.disconnect();
      osc.gain.disconnect();
      this.oscillators.delete(id);
    }
  }

  setOscillatorVolume(id: number, volume: number) {
    const osc = this.oscillators.get(id);
    if (osc) {
      osc.gain.gain.value = volume;
    }
  }

  setOscillatorWaveform(id: number, waveform: WaveformType) {
    if (!this.audioContext) return;

    const osc = this.oscillators.get(id);
    if (osc) {
      const newOscillator = this.audioContext.createOscillator();
      newOscillator.type = waveform;
      newOscillator.connect(osc.gain);

      if (osc.isPlaying) {
        osc.oscillator.stop();
        newOscillator.frequency.setValueAtTime(this.frequency, this.audioContext.currentTime);
        newOscillator.start();
      }

      osc.oscillator.disconnect();
      osc.oscillator = newOscillator;
    }
  }

  noteToFrequency(note: string): number {
    const A4 = 440;
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = parseInt(note.slice(-1));
    const semitone = notes.indexOf(note.slice(0, -1));
    return A4 * Math.pow(2, (octave - 4) + (semitone - 9) / 12);
  }

  async playNote(note: string) {
    if (!this.audioContext) {
      await this.initialize();
    }

    this.stopNote();

    this.frequency = this.noteToFrequency(note);
    this.oscillators.forEach((osc) => {
      osc.oscillator.frequency.setValueAtTime(this.frequency, this.audioContext!.currentTime);
      osc.oscillator.start();
      osc.isPlaying = true;
    });
  }

  stopNote() {
    if (!this.audioContext) return;

    this.oscillators.forEach((osc) => {
      if (osc.isPlaying) {
        osc.oscillator.stop();

        // Create a new oscillator for next note
        const newOscillator = this.audioContext!.createOscillator();
        newOscillator.type = osc.oscillator.type;
        newOscillator.connect(osc.gain);

        osc.oscillator.disconnect();
        osc.oscillator = newOscillator;
        osc.isPlaying = false;
      }
    });
  }

  async togglePlayback(isPlaying: boolean) {
    if (isPlaying) {
      await this.initialize();
      await this.audioContext?.resume();
    } else {
      await this.audioContext?.suspend();
    }
  }
}

export const synth = new SynthEngine();