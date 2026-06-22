// ============================================================
// @country/pe — Dashboard.tsx
// Página Vista 360 con identidad visual peruana.
// Usa componentes de @yopen/ui-core + estilos PE específicos.
// ============================================================
import React from 'react';
import type { CountryPageProps } from '@yopen/plugin-sdk';
import {
  StatCard, SectionTitle, FlagBar, TaxInfoBox,
  OrdersTable, type OrderRow,
} from '@yopen/ui-core';
import { peConfig } from '../config';

// -----------------------------------------------------------
// Datos de ejemplo — en producción vendrían de una API
// -----------------------------------------------------------
function buildStats(formatCurrency: (n: number) => string, t: (k: string) => string) {
  return [
    { icon: '🛒', title: t('dashboard.recentOrders'), value: '142', subtitle: '+12% vs mes anterior', accent: true },
    { icon: '👥', title: t('dashboard.newCustomers'), value: '38',  subtitle: 'Lima: 24 · Provincias: 14' },
    { icon: '💰', title: t('dashboard.revenue'),      value: formatCurrency(284_750), subtitle: 'IGV incluido (18%)' },
    { icon: '⏳', title: t('dashboard.pending'),       value: '7',   subtitle: 'Requieren atención hoy' },
  ] as const;
}

function buildOrders(formatCurrency: (n: number) => string): OrderRow[] {
  return [
    { id: 'PE-00142', customer: 'María Quispe Torres',  amount: formatCurrency(1_250), status: 'success', statusText: 'Entregado',  docType: 'Boleta'  },
    { id: 'PE-00141', customer: 'Carlos Mamani Huanca', amount: formatCurrency(4_800), status: 'warning', statusText: 'En tránsito',docType: 'Factura' },
    { id: 'PE-00140', customer: 'Rosa Flores Condori',  amount: formatCurrency(320),   status: 'success', statusText: 'Entregado',  docType: 'Boleta'  },
    { id: 'PE-00139', customer: 'Luis Ccahuana Apaza',  amount: formatCurrency(9_600), status: 'danger',  statusText: 'Devuelto',   docType: 'Factura' },
    { id: 'PE-00138', customer: 'Ana Huamán Paredes',   amount: formatCurrency(680),   status: 'neutral', statusText: 'Procesando', docType: 'Boleta'  },
  ];
}

// -----------------------------------------------------------
// Component
// -----------------------------------------------------------
export default function DashboardPE({ t, formatCurrency }: CountryPageProps) {
  const { theme } = peConfig;
  const stats  = buildStats(formatCurrency, t);
  const orders = buildOrders(formatCurrency);

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
          <OrdersTable
            rows={orders}
            headerBg={theme.primaryColor}
            idColor={theme.primaryColor}
            docBg={`rgba(200,16,46,.1)`}
            docColor={theme.primaryColor}
            docBorder={`rgba(200,16,46,.25)`}
          />

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
