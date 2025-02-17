import { Provider } from 'react-redux';
import { store } from '../store/store';
import Controls from '@/components/Controls';
import Keyboard from '@/components/Keyboard';
import WaveformDisplay from '@/components/WaveformDisplay';
import LoadingScreen from '@/components/LoadingScreen';
import { synth } from '../lib/synth';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInitialize = async () => {
    setIsLoading(true);
    // Add a small delay to show the loading animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    await synth.initialize();
    setIsLoading(false);
    setIsInitialized(true);
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-background p-8">
        <AnimatePresence>
          {isLoading && <LoadingScreen />}
        </AnimatePresence>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Web Synthesizer</h1>
            {!isInitialized && !isLoading && (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Click the button below to start the synthesizer
                </p>
                <Button 
                  size="lg"
                  onClick={handleInitialize}
                  className="bg-primary hover:bg-primary/90"
                >
                  Initialize Synthesizer
                </Button>
              </div>
            )}
            {isInitialized && (
              <p className="text-muted-foreground">
                Use your keyboard or click the keys to play. Press A-K for white keys, W,E,T,Y,U for black keys.
              </p>
            )}
          </div>

          {isInitialized && (
            <div className="space-y-6">
              <WaveformDisplay />
              <Controls />
              <Keyboard />
            </div>
          )}
        </div>
      </div>
    </Provider>
  );
}