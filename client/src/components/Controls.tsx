import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  setMainVolume,
  setOscillatorVolume,
  setOscillatorWaveform,
  toggleOscillator,
  togglePlay,
  setFilterFrequency,
  setFilterResonance,
  setDelayTime,
  setDelayFeedback,
  setReverbMix,
  WaveformType
} from '../store/synthSlice';
import { synth } from '../lib/synth';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { PlayCircle, PauseCircle, Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";


export default function Controls() {
  const dispatch = useDispatch();
  const { isPlaying, mainVolume, oscillators, effects } = useSelector((state: RootState) => state.synth);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    oscillators.forEach(osc => {
      if (osc.enabled) {
        synth.addOscillator(osc.id, osc.waveform, osc.volume);
      }
    });

    // Resume audio context since we start in play mode
    synth.togglePlayback(true);
  }, []);

  const handleMainVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    dispatch(setMainVolume(newVolume));
    synth.setMainVolume(newVolume);
  };

  const handleOscillatorVolumeChange = (id: number, value: number[]) => {
    const newVolume = value[0];
    dispatch(setOscillatorVolume({ id, volume: newVolume }));
    synth.setOscillatorVolume(id, newVolume);
  };

  const handleOscillatorWaveformChange = (id: number, value: string) => {
    const newWaveform = value as WaveformType;
    dispatch(setOscillatorWaveform({ id, waveform: newWaveform }));
    synth.setOscillatorWaveform(id, newWaveform);
  };

  const handleOscillatorToggle = (id: number) => {
    const oscillator = oscillators.find(osc => osc.id === id);
    if (oscillator) {
      dispatch(toggleOscillator(id));
      if (!oscillator.enabled) {
        synth.addOscillator(id, oscillator.waveform, oscillator.volume);
      } else {
        synth.removeOscillator(id);
      }
    }
  };

  const handleFilterFrequencyChange = (value: number[]) => {
    const newFreq = value[0];
    dispatch(setFilterFrequency(newFreq));
    synth.setFilterFrequency(newFreq);
  };

  const handleFilterResonanceChange = (value: number[]) => {
    const newRes = value[0];
    dispatch(setFilterResonance(newRes));
    synth.setFilterResonance(newRes);
  };

  const handleDelayTimeChange = (value: number[]) => {
    const newTime = value[0];
    dispatch(setDelayTime(newTime));
    synth.setDelayTime(newTime);
  };

  const handleDelayFeedbackChange = (value: number[]) => {
    const newFeedback = value[0];
    dispatch(setDelayFeedback(newFeedback));
    synth.setDelayFeedback(newFeedback);
  };

  const handleReverbMixChange = (value: number[]) => {
    const newMix = value[0];
    dispatch(setReverbMix(newMix));
    synth.setReverbMix(newMix);
  };

  const handlePlayToggle = async () => {
    dispatch(togglePlay());
    await synth.togglePlayback(!isPlaying);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex flex-col gap-6 p-6 bg-card rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="flex items-center justify-between border-b pb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePlayToggle}
          className="w-12 h-12"
        >
          {isPlaying ? (
            <PauseCircle className="w-8 h-8" />
          ) : (
            <PlayCircle className="w-8 h-8" />
          )}
        </Button>

        <div className="flex items-center gap-4">
          <Volume2 className="w-6 h-6" />
          <Slider
            value={[mainVolume]}
            onValueChange={handleMainVolumeChange}
            max={1}
            step={0.01}
            className="w-32"
          />
        </div>

        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle controls</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Oscillators</h3>
            {oscillators.map((osc) => (
              <div
                key={osc.id}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-md transition-opacity",
                  !osc.enabled && "opacity-50"
                )}
              >
                <Switch
                  checked={osc.enabled}
                  onCheckedChange={() => handleOscillatorToggle(osc.id)}
                />

                <Select
                  value={osc.waveform}
                  onValueChange={(value) => handleOscillatorWaveformChange(osc.id, value)}
                  disabled={!osc.enabled}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Waveform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sine">Sine</SelectItem>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="sawtooth">Sawtooth</SelectItem>
                    <SelectItem value="triangle">Triangle</SelectItem>
                  </SelectContent>
                </Select>

                <Slider
                  value={[osc.volume]}
                  onValueChange={(value) => handleOscillatorVolumeChange(osc.id, value)}
                  max={1}
                  step={0.01}
                  className="flex-1"
                  disabled={!osc.enabled}
                />
              </div>
            ))}
          </div>

          <div className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Effects</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Filter</h4>
                <div className="flex items-center gap-4">
                  <span className="text-sm w-24">Frequency</span>
                  <Slider
                    value={[effects.filter.frequency]}
                    onValueChange={handleFilterFrequencyChange}
                    min={20}
                    max={20000}
                    step={1}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm w-24">Resonance</span>
                  <Slider
                    value={[effects.filter.resonance]}
                    onValueChange={handleFilterResonanceChange}
                    min={0}
                    max={20}
                    step={0.1}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Delay</h4>
                <div className="flex items-center gap-4">
                  <span className="text-sm w-24">Time</span>
                  <Slider
                    value={[effects.delay.time]}
                    onValueChange={handleDelayTimeChange}
                    min={0}
                    max={1}
                    step={0.01}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm w-24">Feedback</span>
                  <Slider
                    value={[effects.delay.feedback]}
                    onValueChange={handleDelayFeedbackChange}
                    min={0}
                    max={0.9}
                    step={0.01}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Reverb</h4>
                <div className="flex items-center gap-4">
                  <span className="text-sm w-24">Mix</span>
                  <Slider
                    value={[effects.reverb.mix]}
                    onValueChange={handleReverbMixChange}
                    min={0}
                    max={1}
                    step={0.01}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}