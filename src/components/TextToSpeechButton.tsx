import React, { useEffect, useState } from 'react';
import { Volume2, Pause, Square } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

interface Props {
  textToRead?: string;
  elementId?: string;
  className?: string;
}

export default function TextToSpeechButton({ textToRead, elementId, className = "" }: Props) {
  const { speak, stop, pause, resume, isSpeaking, isPaused, supported } = useTextToSpeech();
  const [text, setText] = useState(textToRead || "");

  useEffect(() => {
    if (textToRead) {
      setText(textToRead);
      return;
    }
    if (elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        setText(el.innerText || el.textContent || "");
      }
    }
  }, [textToRead, elementId]);

  if (!supported) return null;

  const handleToggle = () => {
    if (isSpeaking) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      let currentText = text;
      if (elementId) {
        const el = document.getElementById(elementId);
        if (el) {
          currentText = el.innerText || el.textContent || "";
          setText(currentText);
        }
      }
      if (currentText.trim()) {
        speak(currentText);
      }
    }
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    stop();
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleToggle();
        }}
        aria-label={isSpeaking ? (isPaused ? "Retomar leitura em áudio" : "Pausar leitura em áudio") : "Ouvir texto em voz alta"}
        title={isSpeaking ? (isPaused ? "Retomar" : "Pausar") : "Ouvir em voz alta"}
        className="flex items-center justify-center p-2 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 transition-colors focus:ring-2 focus:ring-pink-400 focus:outline-none flex-shrink-0"
      >
        {isSpeaking && !isPaused ? <Pause className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      {isSpeaking && (
        <button
          onClick={handleStop}
          aria-label="Parar leitura definitivamente"
          title="Parar áudio"
          className="flex items-center justify-center p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-colors focus:ring-2 focus:ring-red-400 focus:outline-none flex-shrink-0"
        >
          <Square className="w-4 h-4 fill-current" />
        </button>
      )}
    </div>
  );
}
