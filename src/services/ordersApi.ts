// ============================================================
// services/ordersApi.ts
//
// Cliente HTTP para el servicio de pedidos.
// Apunta a un proyecto de mockapi.io — reemplaza MOCKAPI_BASE_URL
// por tu propia URL de proyecto una vez creado.
//
// Cómo crear el mock en mockapi.io:
//   1. Crear cuenta en https://mockapi.io
//   2. New Project → nombrarlo "yopen-orders-pe"
//   3. Crear un recurso "orders" con el schema de ApiOrder
//   4. mockapi.io genera la URL base automáticamente, ej:
//      https://6614abcd1234567890abcd.mockapi.io/api/v1
// ============================================================

import type { ApiOrder } from './types';

// Reemplazar con la URL real de tu proyecto en mockapi.io
const MOCKAPI_BASE_URL = 'https://6a3ebcfe0443193a1a0c41b2.mockapi.io/orders-pe/api/v1';

export class OrdersApiError extends Error {
  constructor(message: string, public readonly statusCode?: number) {
    super(message);
    this.name = 'OrdersApiError';
  }
}

/**
 * Obtiene los pedidos recientes de Perú desde el servicio mock.
 *
 * @param limit - cantidad máxima de pedidos a traer (default 5)
 * @throws {OrdersApiError} si la respuesta no es exitosa o el JSON es inválido
 */
export async function fetchOrders(limit = 5): Promise<ApiOrder[]> {
  const url = `${MOCKAPI_BASE_URL}/orders?limit=${limit}&sortBy=createdAt&order=desc`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch (networkError) {
    throw new OrdersApiError(
      'No se pudo conectar con el servicio de pedidos. Verifica tu conexión.'
    );
  }

  if (!response.ok) {
    throw new OrdersApiError(
      `El servicio de pedidos respondió con error (${response.status})`,
      response.status
    );
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new OrdersApiError('La respuesta del servicio de pedidos no es JSON válido');
  }

  if (!Array.isArray(data)) {
    throw new OrdersApiError('Formato de respuesta inesperado: se esperaba un array');
  }

  return data as ApiOrder[];
}
