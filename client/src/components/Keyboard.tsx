import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setNoteActive } from '../store/synthSlice';
import { synth } from '../lib/synth';
import { cn } from '@/lib/utils';

const keyboardMap: { [key: string]: string } = {
  'a': 'C4', 'w': 'C#4', 's': 'D4', 'e': 'D#4',
  'd': 'E4', 'f': 'F4', 't': 'F#4', 'g': 'G4',
  'y': 'G#4', 'h': 'A4', 'u': 'A#4', 'j': 'B4',
  'k': 'C5'
};

export default function Keyboard() {
  const dispatch = useDispatch();
  const activeNotes = useSelector((state: RootState) => state.synth.activeNotes);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const note = keyboardMap[e.key];
      if (note && !activeNotes[note]) {
        dispatch(setNoteActive({ note, active: true }));
        synth.playNote(note);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const note = keyboardMap[e.key];
      if (note) {
        dispatch(setNoteActive({ note, active: false }));
        synth.stopNote();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [dispatch, activeNotes]);

  const keys = Object.entries(keyboardMap);

  return (
    <div className="flex justify-center gap-1 p-4">
      {keys.map(([key, note]) => (
        <div
          key={note}
          className={cn(
            "w-12 h-40 border rounded-md flex items-end justify-center pb-2 select-none cursor-pointer",
            note.includes('#') 
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white border-gray-300",
            activeNotes[note] && "bg-primary"
          )}
          onMouseDown={() => {
            dispatch(setNoteActive({ note, active: true }));
            synth.playNote(note);
          }}
          onMouseUp={() => {
            dispatch(setNoteActive({ note, active: false }));
            synth.stopNote();
          }}
          onMouseLeave={() => {
            if (activeNotes[note]) {
              dispatch(setNoteActive({ note, active: false }));
              synth.stopNote();
            }
          }}
        >
          {key.toUpperCase()}
        </div>
      ))}
    </div>
  );
}
