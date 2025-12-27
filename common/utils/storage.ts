
import { MOCK_KPI_DATA } from '../../mockData/kpis';
import { MOCK_SHIPMENTS } from '../../mockData/shipments';
import { MOCK_TRANSACTIONS } from '../../mockData/transactions';
import { MOCK_INVOICES } from '../../mockData/invoices';
import { Shipment, KPI, Transaction, Invoice, ApiResponse } from '../types';

const KEYS = {
  SHIPMENTS: 'logiflow_shipments', KPI: 'logiflow_kpi',
  TRANSACTIONS: 'logiflow_transactions', INVOICES: 'logiflow_invoices',
  INIT: 'logiflow_initialized', CHANNELS: 'logiflow_channels'
};

const createResponse = <T>(data: T, msg: string = 'Success', status: number = 200): ApiResponse<T> => 
  ({ status, message: msg, data, errors: null });

export const initializeStorage = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(KEYS.INIT)) {
    localStorage.setItem(KEYS.SHIPMENTS, JSON.stringify(MOCK_SHIPMENTS));
    localStorage.setItem(KEYS.KPI, JSON.stringify(MOCK_KPI_DATA));
    localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(MOCK_TRANSACTIONS));
    localStorage.setItem(KEYS.INVOICES, JSON.stringify(MOCK_INVOICES));
    localStorage.setItem(KEYS.CHANNELS, JSON.stringify({ shopify: true }));
    localStorage.setItem(KEYS.INIT, 'true');
  }
};

export const getConnectedApps = (): Record<string, boolean> => {
    if (typeof window === 'undefined') return {};
    return JSON.parse(localStorage.getItem(KEYS.CHANNELS) || '{}');
};

export const toggleConnectedApp = (id: string): Record<string, boolean> => {
    const current = getConnectedApps();
    const newState = { ...current, [id]: !current[id] };
    localStorage.setItem(KEYS.CHANNELS, JSON.stringify(newState));
    return newState;
};

export const getShipments = (): ApiResponse<Shipment[]> => 
  createResponse(JSON.parse(localStorage.getItem(KEYS.SHIPMENTS) || '[]'));

export const getKPIs = (): ApiResponse<KPI[]> => 
  createResponse(JSON.parse(localStorage.getItem(KEYS.KPI) || '[]'));

export const getTransactions = (): ApiResponse<Transaction[]> => 
  createResponse(JSON.parse(localStorage.getItem(KEYS.TRANSACTIONS) || '[]'));

export const getInvoices = (): ApiResponse<Invoice[]> => 
  createResponse(JSON.parse(localStorage.getItem(KEYS.INVOICES) || '[]'));
