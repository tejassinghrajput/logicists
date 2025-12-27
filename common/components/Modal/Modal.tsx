import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: ModalSize;
    noPadding?: boolean;
    className?: string;
}

export const Modal: React.FC<ModalProps> = ({ 
    isOpen, onClose, title, children, footer, 
    size = 'md', noPadding = false, className = '' 
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 200);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        '2xl': 'max-w-6xl',
        full: 'max-w-[95vw]'
    };

    return createPortal(
        <div className="fixed inset-0 z-[10050] overflow-y-auto" role="dialog" aria-modal="true">
            <div 
                className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
                onClick={onClose}
                aria-hidden="true" 
            />

            <div className="flex min-h-full items-center justify-center p-4 text-center">
                <div 
                    className={`
                        relative w-full transform rounded-2xl bg-white text-left shadow-2xl transition-all duration-200
                        ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}
                        ${sizeClasses[size]}
                        ${className}
                    `}
                    onClick={e => e.stopPropagation()}
                >
                    {(title || onClose) && (
                        <div className="flex items-center justify-between border-b border-slate-50 px-6 py-4">
                            <div className="text-lg font-bold leading-6 text-slate-900 tracking-tight flex-1 mr-4">
                                {title}
                            </div>
                            <button 
                                onClick={onClose} 
                                className="flex-shrink-0 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    <div className={`overflow-y-auto custom-scrollbar ${noPadding ? '' : 'px-6 py-6'}`} style={{ maxHeight: 'calc(100vh - 180px)' }}>
                        {children}
                    </div>

                    {footer && (
                        <div className="bg-slate-50/50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-slate-50 rounded-b-2xl">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};