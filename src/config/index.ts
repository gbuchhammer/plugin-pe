import type { CountryConfig } from '@buchorg/plugin-sdk';

export const peConfig: CountryConfig = {
  countryCode:    'PE',
  locale:         'es-PE',
  currency:       'PEN',
  currencySymbol: 'S/',
  timezone:       'America/Lima',
  displayName:    'Perú',
  taxLabel:       'IGV',
  taxRate:        18,
  theme: {
    themeName:       'peru',
    primaryColor:    '#C8102E',
    accentColor:     '#FFFFFF',
    backgroundColor: '#FDF8F5',
    surfaceColor:    '#FFFFFF',
    textColor:       '#1A0A0A',
    textSecondary:   '#6B4C4C',
    borderColor:     'rgba(200,16,46,0.15)',
    countrySymbol:   '🇵🇪',
    flagColors:      ['#C8102E', '#FFFFFF', '#C8102E'],
    flagWeights:     [33, 34, 33],
    fontFamily:      "'Georgia', 'Times New Roman', serif",
  },
};
