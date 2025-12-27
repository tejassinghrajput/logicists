
import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
                <div 
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fade-in" 
                    onClick={onClose} 
                    aria-hidden="true"
                ></div>

                <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-slate-100 animate-scale-in">
                    <div className="flex items-center justify-between border-b border-slate-50 px-6 py-4 bg-slate-50/50">
                        <h3 className="text-lg font-bold leading-6 text-slate-900 tracking-tight">{title}</h3>
                        <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-slate-600 hover:shadow-sm transition-all">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="px-6 py-6">{children}</div>
                    {footer && (
                        <div className="bg-slate-50/50 px-6 py-4 flex justify-end gap-3 border-t border-slate-50">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
