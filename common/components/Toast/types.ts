
import React from 'react';

export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  type: ToastType;
  duration?: number;
  action?: ToastAction;
}

export interface ToastOptions {
  description?: string;
  duration?: number;
  action?: ToastAction;
}
