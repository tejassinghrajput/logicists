
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const TooltipContent: React.FC<{ content: string, coords: any, position: string }> = ({ content, coords, position }) => {
    let style: React.CSSProperties = { position: 'fixed', zIndex: 10000 };
    const GAP = 8;
    
    // Position logic simplified for brevity
    const pos: any = {
        top: { top: coords.y - GAP, left: coords.x + coords.width / 2, transform: 'translate(-50%, -100%)' },
        bottom: { top: coords.y + coords.height + GAP, left: coords.x + coords.width / 2, transform: 'translate(-50%, 0)' },
        right: { top: coords.y + coords.height / 2, left: coords.x + coords.width + GAP, transform: 'translate(0, -50%)' },
        left: { top: coords.y + coords.height / 2, left: coords.x - GAP, transform: 'translate(-100%, -50%)' }
    };

    return (
        <div style={{ ...style, ...pos[position] }} className="pointer-events-none animate-fade-in">
            <div className="bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                {content}
            </div>
        </div>
    );
};

export const Tooltip: React.FC<{ content: string; children: React.ReactElement; position?: 'top' | 'right' | 'bottom' | 'left' }> = ({ content, children, position = 'top' }) => {
  const [coords, setCoords] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<any>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setCoords(rect);
            setIsVisible(true);
        }
    }, 100); 
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useEffect(() => () => timeoutRef.current && clearTimeout(timeoutRef.current), []);

  return (
    <>
        <div ref={triggerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="inline-flex">
            {children}
        </div>
        {isVisible && coords && createPortal(<TooltipContent content={content} coords={coords} position={position} />, document.body)}
    </>
  );
};
