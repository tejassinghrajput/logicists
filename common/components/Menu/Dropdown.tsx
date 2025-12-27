
import React, { useState, useRef, useEffect } from 'react';
import { MenuList, DropdownItem } from './MenuList';

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  width?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ trigger, items, align = 'right', width = 'w-48' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleDropdown = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsOpen(!isOpen);
  };

  const triggerElement = React.isValidElement(trigger) 
      ? React.cloneElement(trigger as React.ReactElement<any>, { onClick: toggleDropdown })
      : <div onClick={toggleDropdown} className="cursor-pointer">{trigger}</div>;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {triggerElement}
      {isOpen && (
        <div 
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 ${width} bg-white rounded-xl shadow-card border border-slate-100 ring-1 ring-slate-900/5 z-50 animate-scale-in origin-top-right`}
          onClick={(e) => e.stopPropagation()}
        >
          <MenuList items={items} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
};
