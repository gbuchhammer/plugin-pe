import type { CountryTranslations } from '@buchorg/plugin-sdk';

export const peI18n: CountryTranslations = {
  common: {
    welcome: 'Bienvenido', loading: 'Cargando...', error: 'Ocurrió un error',
    save: 'Guardar', cancel: 'Cancelar', search: 'Buscar',
    customer: 'Cliente', orders: 'Pedidos', total: 'Total', back: 'Volver',
  },
  dashboard: {
    title: 'Vista 360° del Cliente', subtitle: 'Panel de gestión — Perú',
    statsTitle: 'Resumen de actividad', recentOrders: 'Pedidos recientes',
    newCustomers: 'Nuevos clientes', revenue: 'Ingresos del mes',
    pending: 'Pendientes de atención',
  },
  tax: {
    label: 'IGV', included: 'IGV incluido', excluded: 'Sin IGV',
    rate: '18%', authority: 'SUNAT',
  },
  orders: {
    id: 'N° Pedido', customer: 'Cliente', amount: 'Monto', status: 'Estado',
    docType: 'Comprobante', delivered: 'Entregado', inTransit: 'En tránsito',
    returned: 'Devuelto', processing: 'Procesando',
  },
  pe: {
    dni: 'DNI', ruc: 'RUC', boleta: 'Boleta de Venta', factura: 'Factura',
    region: 'Departamento', sunatPortal: 'Portal SUNAT',
    igvInfo: 'Impuesto General a las Ventas (IGV) — Régimen SUNAT',
  },
};
