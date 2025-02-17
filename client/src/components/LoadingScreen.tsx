import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const frequency = 0.05;
    const amplitude = 50;
    const speed = 0.05;

    const draw = () => {
      ctx.fillStyle = 'rgb(20, 20, 20)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.strokeStyle = 'rgb(0, 200, 200)';
      ctx.lineWidth = 3;

      // Draw synth wave
      for (let x = 0; x < canvas.width; x++) {
        const y = amplitude * Math.sin(x * frequency + phase) + canvas.height / 2;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      phase += speed;

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-background"
    >
      <motion.h2 
        className="text-2xl font-bold mb-8"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        Initializing Synthesizer
      </motion.h2>
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        className="w-full max-w-2xl bg-black rounded-lg"
      />
    </motion.div>
  );
}
