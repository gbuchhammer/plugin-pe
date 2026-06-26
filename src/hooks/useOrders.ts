// ============================================================
// hooks/useOrders.ts
//
// Hook que encapsula el ciclo de vida completo de la consulta:
// loading mientras pide, error si falla, datos cuando resuelve,
// y una función retry() para reintentar manualmente.
// ============================================================
import { useState, useEffect, useCallback } from 'react';
import { fetchOrders, OrdersApiError } from '../services/ordersApi';
import type { ApiOrder } from '../services/types';

export type OrdersState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; orders: ApiOrder[] };

export function useOrders(limit = 5) {
  const [state, setState] = useState<OrdersState>({ status: 'loading' });

  // useCallback para que la misma función de carga pueda
  // reutilizarse tanto en el efecto inicial como en retry()
  const load = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const orders = await fetchOrders(limit);
      setState({ status: 'success', orders });
    } catch (err) {
      const message = err instanceof OrdersApiError
        ? err.message
        : 'Ocurrió un error inesperado al cargar los pedidos';
      setState({ status: 'error', message });
    }
  }, [limit]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    ...state,
    retry: load,
  };
}
