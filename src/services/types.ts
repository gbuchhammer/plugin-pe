// ============================================================
// services/types.ts
//
// Contrato de datos exactamente como lo devuelve mockapi.io.
// Esto es independiente de OrderRow (que es el tipo visual
// de @buchorg/ui-core) — aquí está el dato "crudo" del backend.
// ============================================================

export interface ApiOrder {
  id: string;
  orderCode: string;       // ej: "PE-00142"
  customerName: string;    // ej: "María Quispe Torres"
  amount: number;          // monto sin formatear, ej: 1250
  status: 'delivered' | 'in_transit' | 'returned' | 'processing' | 'true' | 'false';
  documentType: 'boleta' | 'factura';
  createdAt: string;       // ISO date string
}

export interface ApiOrdersResponse {
  orders: ApiOrder[];
}
