import { useEffect, useRef, useState } from 'react';
import { Sparkles, HelpCircle, Smile, Info, Award, CheckCircle } from 'lucide-react';
import { CanvasData } from '../types';
import { CANVAS_BLOCKS } from '../data';

interface ClipInnoProps {
  activeBlock: string | null;
  canvasData: CanvasData;
  onLoadCrazyIdea: () => void;
  onValidate: () => void;
  validationMessage: { title: string; text: string; type: 'info' | 'success' | 'warning' } | null;
}

export default function ClipInno({
  activeBlock,
  canvasData,
  onLoadCrazyIdea,
  onValidate,
  validationMessage
}: ClipInnoProps) {
  const [bubbleText, setBubbleText] = useState<string>(
    '¡Hola emprendedor! Soy <strong>Clip-Inno</strong>, tu consejero personal. Haz clic en cualquier recuadro del lienzo para guiarte paso a paso con tips y humor.'
  );
  const [bubbleTitle, setBubbleTitle] = useState<string>('Clip-Inno');
  const [faceState, setFaceState] = useState<'normal' | 'happy' | 'thinking' | 'excited' | 'focus'>('normal');
  const [bounce, setBounce] = useState(false);

  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);

  // Update bubble text when active block changes
  useEffect(() => {
    if (activeBlock) {
      const block = CANVAS_BLOCKS.find((b) => b.id === activeBlock);
      if (block) {
        setBubbleTitle(`Tip para ${block.title}`);
        // Pick a random tip
        const randomTip = block.tips[Math.floor(Math.random() * block.tips.length)];
        setBubbleText(randomTip);

        // Adjust face state depending on the block
        if (block.id === 'propositions') {
          setFaceState('happy');
        } else if (block.id === 'costs') {
          setFaceState('thinking');
        } else if (block.id === 'revenues') {
          setFaceState('excited');
        } else {
          setFaceState('focus');
        }
      }
    } else if (validationMessage) {
      setBubbleTitle(validationMessage.title);
      setBubbleText(validationMessage.text);
      setFaceState(validationMessage.type === 'success' ? 'happy' : 'thinking');
    } else {
      setBubbleTitle('Clip-Inno');
      setBubbleText(
        '¡Excelente progreso! Recuerda que un modelo de negocio de éxito se valida conversando con clientes reales. ¡No te detengas!'
      );
      setFaceState('normal');
    }
  }, [activeBlock, validationMessage]);

  // Mouse tracking eyes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const movePupil = (pupil: HTMLDivElement | null) => {
        if (!pupil) return;
        const rect = pupil.parentElement?.getBoundingClientRect();
        if (!rect) return;
        
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const distance = Math.min(2.5, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 100);
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        pupil.style.transform = `translate(${x}px, ${y}px)`;
      };

      movePupil(leftPupilRef.current);
      movePupil(rightPupilRef.current);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMascotClick = () => {
    setBounce(true);
    setTimeout(() => setBounce(false), 600);

    const quotes = [
      "¡Ouch! Jaja, me encanta que hagas clic sobre mí. ¡Sigue concentrado en tu propuesta de valor!",
      "¿Sabías que soy primo lejano de Clippy? Pero yo obtuve una beca y completé un MBA en Silicon Valley.",
      "Consejo pro: No te enamores de tu primera idea. Enamórate del problema del cliente.",
      "Un modelo de negocio en una servilleta es infinitamente mejor que un plan de negocios de 80 páginas sin leer.",
      "¡Puedes descargar este lienzo como un archivo HTML autónomo para usarlo sin conexión!"
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setBubbleTitle('Clip-Inno dice');
    setBubbleText(randomQuote);
    setFaceState('excited');
  };

  // Define eyebrow tilt depending on face state
  const getEyebrowStyle = (side: 'left' | 'right') => {
    if (faceState === 'happy') {
      return side === 'left'
        ? 'translate-y-[-2px] rotate-[-12deg]'
        : 'translate-y-[-2px] rotate-[12deg]';
    }
    if (faceState === 'thinking') {
      return side === 'left'
        ? 'translate-y-[1px] rotate-[8deg]'
        : 'translate-y-[-1px] rotate-[5deg]';
    }
    if (faceState === 'excited') {
      return side === 'left'
        ? 'translate-y-[-3px] rotate-[-15deg] scale-y-110'
        : 'translate-y-[-1px] rotate-[5deg]';
    }
    if (faceState === 'focus') {
      return side === 'left'
        ? 'translate-y-[-1px] rotate-[-6deg]'
        : 'translate-y-[-1px] rotate-[6deg]';
    }
    return side === 'left' ? 'rotate-[-4deg]' : 'rotate-[4deg]';
  };

  // Mouth style depending on face state
  const getMouthStyle = () => {
    if (faceState === 'happy') {
      return 'h-2 w-3.5 bg-slate-800 rounded-b-full mt-1.5 border-none';
    }
    if (faceState === 'thinking') {
      return 'h-0.75 w-3 bg-slate-800 rounded-full mt-2 border-none';
    }
    if (faceState === 'excited') {
      return 'h-3 w-3 bg-slate-800 rounded-full mt-1 border-none';
    }
    // Default smile curve
    return 'h-2 w-2.5 bg-transparent border-b-2 border-slate-800 rounded-full mt-1.5';
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-50 pointer-events-none select-none">
      {/* Speech Bubble */}
      <div className="bubble-pulse pointer-events-auto bg-ink text-white rounded-2xl p-4 shadow-xl max-w-[280px] md:max-w-sm mb-4 border border-[#4E4B49] relative transition-all duration-300 text-xs leading-relaxed opacity-100 translate-y-0">
        {/* Triangle pointer */}
        <div className="absolute bottom-[-6px] right-7 w-3 h-3 bg-ink transform rotate-45 border-r border-b border-[#4E4B49]"></div>

        {/* Bubble Header */}
        <div className="flex items-center gap-1.5 mb-1.5 font-display font-bold text-sand">
          {faceState === 'happy' || faceState === 'excited' ? (
            <Sparkles className="w-3.5 h-3.5 text-sand" />
          ) : (
            <HelpCircle className="w-3.5 h-3.5 text-sand" />
          )}
          <span>{bubbleTitle}</span>
        </div>

        {/* Bubble Text */}
        <p
          className="text-[#E5E0D8] font-sans"
          dangerouslySetInnerHTML={{ __html: bubbleText }}
        ></p>

        {/* Quick Bubble Action buttons */}
        <div className="mt-3 pt-2.5 border-t border-[#4E4B49] flex items-center justify-between gap-1.5">
          <button
            onClick={onValidate}
            className="text-[10px] bg-clay hover:bg-clay/90 text-white font-bold font-mono px-2.5 py-1 rounded-lg transition-all cursor-pointer shadow-sm active:scale-95 border border-[#9E6C53]"
          >
            🔍 Validar Modelo
          </button>
          <button
            onClick={onLoadCrazyIdea}
            className="text-[10px] text-[#AFA9A5] hover:text-white hover:bg-white/10 px-2 py-1 rounded-md transition-all cursor-pointer"
          >
            🎲 Idea Loca Express
          </button>
        </div>
      </div>

      {/* Pure CSS Animated paperclip Mascot with bouncy effects */}
      <div
        onClick={handleMascotClick}
        className={`pointer-events-auto cursor-pointer mr-5 flex flex-col items-center justify-center transition-transform duration-300 ${
          bounce ? 'animate-bounce' : 'hover:scale-110 active:scale-95'
        }`}
        style={{
          height: '100px',
          width: '60px',
          animation: bounce ? undefined : 'float 4.5s ease-in-out infinite',
        }}
      >
        <div className="relative w-11 h-20 bg-transparent">
          {/* Concentric paperclip metal wire paths in CSS */}
          {/* Outer wire loop */}
          <div className="absolute inset-0 border-[3.5px] border-ink rounded-[22px] bg-bg shadow-inner flex flex-col justify-between p-1.5"></div>

          {/* Inner wire loop 1 (curving up) */}
          <div className="absolute top-3.5 bottom-3.5 left-2 right-2 border-[3.5px] border-ink rounded-[14px] border-b-0"></div>

          {/* Inner wire loop 2 (curving down) */}
          <div className="absolute top-6 bottom-3 left-3.5 right-3.5 border-[3.5px] border-ink rounded-[10px] border-t-0"></div>

          {/* Face layout positioned atop wire loops */}
          <div className="absolute top-4 left-0 right-0 flex flex-col items-center justify-start z-10">
            {/* Eyebrows */}
            <div className="flex justify-between w-6 mb-0.5">
              <div
                className={`w-2.5 h-[3px] bg-slate-800 rounded-full transition-transform duration-300 ${getEyebrowStyle(
                  'left'
                )}`}
              ></div>
              <div
                className={`w-2.5 h-[3px] bg-slate-800 rounded-full transition-transform duration-300 ${getEyebrowStyle(
                  'right'
                )}`}
              ></div>
            </div>

            {/* Eyes */}
            <div className="flex justify-between w-6.5">
              {/* Left Eye */}
              <div className="w-2.5 h-2.5 bg-white border border-slate-800 rounded-full flex items-center justify-center relative overflow-hidden">
                <div
                  ref={leftPupilRef}
                  className="absolute w-1 h-1 bg-slate-900 rounded-full"
                  style={{ top: '25%', left: '25%', transition: 'transform 0.05s ease-out' }}
                ></div>
              </div>
              {/* Right Eye */}
              <div className="w-2.5 h-2.5 bg-white border border-slate-800 rounded-full flex items-center justify-center relative overflow-hidden">
                <div
                  ref={rightPupilRef}
                  className="absolute w-1 h-1 bg-slate-900 rounded-full"
                  style={{ top: '25%', left: '25%', transition: 'transform 0.05s ease-out' }}
                ></div>
              </div>
            </div>

            {/* Mouth */}
            <div
              className={`transition-all duration-300 ${getMouthStyle()}`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
