import { KPIS } from '../../mockData/kpis';
import { SHIPMENTS } from '../../mockData/shipments';
import { TRANSACTIONS } from '../../mockData/transactions';
import { INVOICES } from '../../mockData/invoices';
import { Shipment, KPI, Transaction, Invoice, ApiResponse } from '../types';

const KEYS = {
  S: 'lf_s', K: 'lf_k', T: 'lf_t', I: 'lf_i', INIT: 'lf_init', C: 'lf_ch'
};

const createRes = <T>(data: T): ApiResponse<T> => 
  ({ status: 200, message: 'OK', data, errors: null });

export const initializeStorage = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(KEYS.INIT)) {
    localStorage.setItem(KEYS.S, JSON.stringify(SHIPMENTS));
    localStorage.setItem(KEYS.K, JSON.stringify(KPIS));
    localStorage.setItem(KEYS.T, JSON.stringify(TRANSACTIONS));
    localStorage.setItem(KEYS.I, JSON.stringify(INVOICES));
    localStorage.setItem(KEYS.INIT, 'true');
  }
};

export const getShipments = (): ApiResponse<Shipment[]> => 
  createRes(JSON.parse(localStorage.getItem(KEYS.S) || '[]'));

export const getKPIs = (): ApiResponse<KPI[]> => 
  createRes(JSON.parse(localStorage.getItem(KEYS.K) || '[]'));

export const getTransactions = (): ApiResponse<Transaction[]> => 
  createRes(JSON.parse(localStorage.getItem(KEYS.T) || '[]'));

export const getInvoices = (): ApiResponse<Invoice[]> => 
  createRes(JSON.parse(localStorage.getItem(KEYS.I) || '[]'));

export const getConnectedApps = (): Record<string, boolean> => 
  JSON.parse(localStorage.getItem(KEYS.C) || '{}');

export const toggleConnectedApp = (id: string): Record<string, boolean> => {
  const current = getConnectedApps();
  const next = { ...current, [id]: !current[id] };
  localStorage.setItem(KEYS.C, JSON.stringify(next));
  return next;
};