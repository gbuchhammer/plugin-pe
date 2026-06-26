// ============================================================
// @country/pe — Dashboard.tsx
// Página Vista 360 con identidad visual peruana.
// Usa componentes de @buchorg/ui-core + estilos PE específicos.
// ============================================================
import React from 'react';
import type { CountryPageProps } from '@buchorg/plugin-sdk';
import {
  StatCard, SectionTitle, FlagBar, TaxInfoBox,
  OrdersTable, type OrderRow,
} from '@buchorg/ui-core';
import { peConfig } from '../config';
import { useOrders } from '../hooks/useOrders';
import type { ApiOrder } from '../services/types';

// -----------------------------------------------------------
// Mapea el dato crudo de la API al formato visual de la tabla
// -----------------------------------------------------------
const STATUS_MAP: Record<ApiOrder['status'], { variant: OrderRow['status']; label: string }> = {
  delivered:   { variant: 'success', label: 'Entregado'   },
  in_transit:  { variant: 'warning', label: 'En tránsito' },
  returned:    { variant: 'danger',  label: 'Devuelto'    },
  processing:  { variant: 'neutral', label: 'Procesando'  },
  true:   { variant: 'success', label: 'Entregado'   },
  false:  { variant: 'warning', label: 'En tránsito' },
};

const DOC_LABEL: Record<ApiOrder['documentType'], string> = {
  boleta:  'Boleta',
  factura: 'Factura',
};

function mapApiOrderToRow(order: ApiOrder, formatCurrency: (n: number) => string): OrderRow {
  const status = STATUS_MAP[order.status];
  return {
    id: order.orderCode,
    customer: order.customerName,
    amount: formatCurrency(order.amount),
    status: status.variant,
    statusText: status.label,
    docType: DOC_LABEL[order.documentType],
  };
}

// -----------------------------------------------------------
// Stats — siguen siendo locales por ahora (no forman parte
// del alcance de este cambio); el array de pedidos sí
// viene del servicio.
// -----------------------------------------------------------
function buildStats(formatCurrency: (n: number) => string, t: (k: string) => string) {
  return [
    { icon: '🛒', title: t('dashboard.recentOrders'), value: '142', subtitle: '+12% vs mes anterior', accent: true },
    { icon: '👥', title: t('dashboard.newCustomers'), value: '38',  subtitle: 'Lima: 24 · Provincias: 14' },
    { icon: '💰', title: t('dashboard.revenue'),      value: formatCurrency(284_750), subtitle: 'IGV incluido (18%)' },
    { icon: '⏳', title: t('dashboard.pending'),       value: '7',   subtitle: 'Requieren atención hoy' },
  ] as const;
}

// -----------------------------------------------------------
// Component
// -----------------------------------------------------------
export default function DashboardPE({ t, formatCurrency }: CountryPageProps) {
  const { theme } = peConfig;
  const stats = buildStats(formatCurrency, t);
  const { status, orders, message, retry } = useOrders(5);

  return (
    <>
      {/* Estilos PE scoped */}
      <style>{`
        .pe-header {
          background: ${theme.primaryColor};
          padding: 20px 32px;
          display: flex; align-items: center; justify-content: space-between;
          position: relative; overflow: hidden;
          font-family: ${theme.fontFamily};
        }
        .pe-header::before {
          content: ''; position: absolute; right: -40px; top: -40px;
          width: 180px; height: 180px; border-radius: 50%;
          background: rgba(255,255,255,.07);
        }
        .pe-header::after {
          content: ''; position: absolute; right: 40px; bottom: -60px;
          width: 120px; height: 120px; border-radius: 50%;
          background: rgba(255,255,255,.05);
        }
        .pe-ornament {
          text-align: center; padding: 9px;
          background: rgba(200,16,46,.06);
          border-bottom: 1px solid rgba(200,16,46,.15);
          font-size: 11px; color: ${theme.primaryColor};
          letter-spacing: .15em; font-weight: 600; text-transform: uppercase;
          font-family: ${theme.fontFamily};
        }
        .pe-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px; margin-bottom: 32px;
        }
        @keyframes skeleton-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes pe-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{ minHeight: '100%', background: 'var(--country-bg)', fontFamily: theme.fontFamily }}>

        {/* Franja de bandera peruana: Rojo–Blanco–Rojo */}
        <FlagBar colors={theme.flagColors} weights={theme.flagWeights} height={6} />

        {/* Header rojo con círculos decorativos */}
        <div className="pe-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, zIndex: 1 }}>
            <span style={{ fontSize: 38 }}>🇵🇪</span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>
                {t('dashboard.title')}
              </div>
              <div style={{ fontSize: 12, opacity: .8, color: '#fff', marginTop: 2, fontStyle: 'italic' }}>
                {t('dashboard.subtitle')}
              </div>
            </div>
          </div>
          <span style={{
            background: 'rgba(255,255,255,.2)', border: '1px solid rgba(255,255,255,.3)',
            padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
            color: '#fff', zIndex: 1, backdropFilter: 'blur(4px)',
          }}>
            🏛 {t('tax.authority')} · {t('tax.label')} {t('tax.rate')}
          </span>
        </div>

        {/* Ornamento inca */}
        <div className="pe-ornament">❖ Sistema de Gestión Comercial — Perú ❖</div>

        {/* Contenido */}
        <div style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>

          <SectionTitle>📊 {t('dashboard.statsTitle')}</SectionTitle>
          <div className="pe-stats-grid">
            {stats.map(s => <StatCard key={s.title} {...s} />)}
          </div>

          <SectionTitle>📋 {t('dashboard.recentOrders')}</SectionTitle>

          {status === 'loading' && (
            <div style={{
              padding: '40px 20px', textAlign: 'center',
              background: 'var(--country-surface)', borderRadius: 12,
              border: '1px solid var(--country-border)',
            }}>
              <div style={{
                width: 28, height: 28, margin: '0 auto 12px',
                border: `3px solid color-mix(in srgb, ${theme.primaryColor} 20%, transparent)`,
                borderTopColor: theme.primaryColor,
                borderRadius: '50%', animation: 'pe-spin .7s linear infinite',
              }} />
              <span style={{ fontSize: 13, color: 'var(--country-text-secondary)' }}>
                Cargando pedidos…
              </span>
            </div>
          )}

          {status === 'error' && (
            <div style={{
              padding: '24px 20px', textAlign: 'center',
              background: 'rgba(200,16,46,.05)', borderRadius: 12,
              border: '1px solid rgba(200,16,46,.2)',
            }}>
              <div style={{ fontSize: 14, color: theme.primaryColor, marginBottom: 4, fontWeight: 600 }}>
                No se pudieron cargar los pedidos
              </div>
              <div style={{ fontSize: 12, color: 'var(--country-text-secondary)', marginBottom: 14 }}>
                {message}
              </div>
              <button
                onClick={retry}
                style={{
                  background: theme.primaryColor, color: '#fff', border: 'none',
                  padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Reintentar
              </button>
            </div>
          )}

          {status === 'success' && (
            <OrdersTable
              rows={orders.map(o => mapApiOrderToRow(o, formatCurrency))}
              headerBg={theme.primaryColor}
              idColor={theme.primaryColor}
              docBg={`rgba(200,16,46,.1)`}
              docColor={theme.primaryColor}
              docBorder={`rgba(200,16,46,.25)`}
            />
          )}

          <TaxInfoBox
            icon="🧾"
            label={t('pe.igvInfo')}
            value={`${t('tax.rate')} · Régimen tributario ${t('tax.authority')}`}
            borderColor={theme.primaryColor}
            bgColor="rgba(200,16,46,.06)"
          />
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 32px', textAlign: 'center', fontSize: 11,
          color: 'var(--country-text-secondary)', fontStyle: 'italic',
          borderTop: '1px solid rgba(0,0,0,.08)',
          background: 'rgba(200,16,46,.03)',
        }}>
          YOpen Framework · Plugin @country/pe v1.0.0 · Timezone: America/Lima
        </div>

      </div>
    </>
  );
}
