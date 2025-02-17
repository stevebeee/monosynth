import { Provider } from 'react-redux';
import { store } from '../store/store';
import Controls from '@/components/Controls';
import Keyboard from '@/components/Keyboard';
import WaveformDisplay from '@/components/WaveformDisplay';

export default function Home() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Web Synthesizer</h1>
            <p className="text-muted-foreground">
              Use your keyboard or click the keys to play. Press A-K for white keys, W,E,T,Y,U for black keys.
            </p>
          </div>

          <div className="space-y-6">
            <WaveformDisplay />
            <Controls />
            <Keyboard />
          </div>
        </div>
      </div>
    </Provider>
  );
}