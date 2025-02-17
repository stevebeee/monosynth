import { useEffect, useRef } from 'react';
import { synth } from '../lib/synth';

export default function WaveformDisplay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Only proceed if analyser exists
    if (!synth.analyser) return;

    const dataArray = new Uint8Array(synth.analyser.frequencyBinCount);
    
    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Only proceed if analyser exists
      if (!synth.analyser) return;
      
      // Get waveform data
      synth.analyser.getByteTimeDomainData(dataArray);

      // Clear canvas
      ctx.fillStyle = 'rgb(20, 20, 20)';
      ctx.fillRect(0, 0, width, height);

      // Draw waveform
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgb(0, 200, 200)';
      ctx.beginPath();

      const sliceWidth = width / dataArray.length;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * height / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Schedule next frame
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={200}
      className="w-full bg-black rounded-lg"
    />
  );
}
