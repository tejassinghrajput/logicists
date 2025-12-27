
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from './Toast';
import { ToastData, ToastOptions, ToastType } from './types';

interface ToastContextValue {
  toast: {
    (message: string, options?: ToastOptions): void;
    success: (message: string, options?: ToastOptions) => void;
    error: (message: string, options?: ToastOptions) => void;
    warning: (message: string, options?: ToastOptions) => void;
    info: (message: string, options?: ToastOptions) => void;
  };
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((title: string, type: ToastType, options?: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastData = {
      id,
      title,
      description: options?.description,
      type,
      duration: options?.duration || 4000,
      action: options?.action,
    };
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toastHelpers = {
    default: (msg: string, opts?: ToastOptions) => addToast(msg, 'default', opts),
    success: (msg: string, opts?: ToastOptions) => addToast(msg, 'success', opts),
    error: (msg: string, opts?: ToastOptions) => addToast(msg, 'error', opts),
    warning: (msg: string, opts?: ToastOptions) => addToast(msg, 'warning', opts),
    info: (msg: string, opts?: ToastOptions) => addToast(msg, 'info', opts),
  };

  const toastFn = Object.assign(toastHelpers.default, toastHelpers);

  return (
    <ToastContext.Provider value={{ toast: toastFn }}>
      {children}
      <div className="fixed bottom-0 right-0 z-[100] p-4 sm:p-6 md:max-w-[420px] w-full flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onDismiss={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
