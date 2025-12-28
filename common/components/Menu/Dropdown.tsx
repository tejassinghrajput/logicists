import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MenuList, DropdownItem } from './MenuList';

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  width?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ trigger, items, align = 'right', width = 'w-48' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left?: number; right?: number }>({ top: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => { if(isOpen) setIsOpen(false); };
    const handleResize = () => { if(isOpen) setIsOpen(false); };
    if (isOpen) {
        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', handleResize);
    }
    return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current && 
        !triggerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
          setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleDropdown = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isOpen && triggerRef.current) {
          const rect = triggerRef.current.getBoundingClientRect();
          if (align === 'right') {
              setPosition({
                  top: rect.bottom + 8,
                  right: window.innerWidth - rect.right
              });
          } else {
              setPosition({
                  top: rect.bottom + 8,
                  left: rect.left
              });
          }
      }
      setIsOpen(!isOpen);
  };

  const triggerElement = React.isValidElement(trigger) 
      ? React.cloneElement(trigger as React.ReactElement<any>, { onClick: toggleDropdown })
      : <div onClick={toggleDropdown} className="cursor-pointer">{trigger}</div>;

  return (
    <div className="relative inline-block text-left" ref={triggerRef}>
      {triggerElement}
      {isOpen && createPortal(
        <div 
          ref={dropdownRef}
          className={`fixed ${width} bg-white rounded-xl shadow-card border border-slate-100 ring-1 ring-slate-900/5 z-[9999] animate-scale-in ${align === 'right' ? 'origin-top-right' : 'origin-top-left'}`}
          style={{ 
              top: position.top, 
              left: position.left, 
              right: position.right
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <MenuList items={items} onClose={() => setIsOpen(false)} />
        </div>,
        document.body
      )}
    </div>
  );
};