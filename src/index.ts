// ============================================================
// @country/pe — Plugin principal de Perú
// Entry point: exporta el CountryPlugin completo.
// ============================================================
import type { CountryPlugin } from '@buchorg/plugin-sdk';
import { peConfig } from './config';
import { peI18n }   from './config/i18n';

const PEPlugin: CountryPlugin = {
  meta: {
    id:          'country-pe',
    name:        'Perú Shell',
    version:     '1.0.0',
    description: 'Plugin de país para Perú — Vista 360 Zendesk',
  },
  config:  peConfig,
  i18n:    peI18n,
  modules: [
    {
      id:    'pe-dashboard',
      name:  'Dashboard Vista 360',
      route: '/dashboard',
      // Lazy load — solo se descarga cuando se activa PE
      load: () => import('./pages/Dashboard'),
    },
    // Aquí se registran nuevos módulos: /customers, /orders, etc.
  ],
  onRegister(ctx) {
    ctx.logger.info(`Plugin PE registrado · locale=${peConfig.locale} · IGV=${peConfig.taxRate}%`);
  },
  onActivate(ctx) {
    ctx.logger.info(`Tema PE activo · primaryColor=${peConfig.theme.primaryColor}`);
  },
};

export default PEPlugin;
