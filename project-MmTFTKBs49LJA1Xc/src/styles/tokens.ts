export const tokens = {
  colors: {
    dark: '#1B1B1D',
    light: '#FDFBFF',
    red: '#D81921',
    'secondary-light': '#ABABAF',
    'secondary-dark': '#5E5E62',
  },
  spacing: {
    0: 0,
    px: 1,
    '0.5': 2,
    1: 4,
    '1.5': 6,
    2: 8,
    '2.5': 10,
    3: 12,
    '3.5': 14,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
    36: 144,
    40: 160,
    44: 176,
    48: 192,
    52: 208,
    56: 224,
    60: 240,
    64: 256,
    72: 288,
    80: 320,
    96: 384,
  },
  borderRadius: {
    none: 0,
    xs: 1,
    sm: 2,
    base: 3,
    md: 4,
    lg: 6,
    xl: 8,
    '2xl': 10,
    '3xl': 12,
    '4xl': 16,
    full: 9999,
  },
  borderWidth: {
    0: 0,
    1: 1,
    2: 2,
    4: 4,
    8: 8,
  },
  textStyles: {
    // Inter-based styles
    bodyMedium: {
      fontFamily: 'Inter',
      fontSize: 14,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 21, // 150% of 14px
    },
    bodySmall: {
      fontFamily: 'Inter',
      fontSize: 12,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 16.8, // 140% of 12px
    },
    labelMedium: {
      fontFamily: 'Inter',
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: 0,
      lineHeight: 15.6, // 130% of 12px
    },
    labelSmall: {
      fontFamily: 'Inter',
      fontSize: 11,
      fontWeight: '500',
      letterSpacing: 0,
      lineHeight: 14.3, // 130% of 11px
    },
    labelUppercasedMedium: {
      fontFamily: 'Inter',
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: 1.2, // 10% of 12px
      lineHeight: 16.8, // 140% of 12px
      textTransform: 'uppercase',
    },
    labelUppercasedSmall: {
      fontFamily: 'Inter',
      fontSize: 11,
      fontWeight: '500',
      letterSpacing: 1.1, // 10% of 11px
      lineHeight: 15.4, // 140% of 11px
      textTransform: 'uppercase',
    },
    // Ndot-based styles
    decorativeXL: {
      fontFamily: 'ndot',
      fontSize: 56,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 56,
      textTransform: 'uppercase',
    },
    ndotHeadlineMedium: {
      fontFamily: 'ndot',
      fontSize: 32,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 32,
      textTransform: 'uppercase',
    },
    ndotHeadlineXSmall: {
      fontFamily: 'ndot',
      fontSize: 20,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 20,
      textTransform: 'uppercase',
    },
    // NType82-based styles
    displayLarge: {
      fontFamily: 'NType82',
      fontSize: 56,
      fontWeight: '100',
      letterSpacing: -0.84, // -1.5% of 56px
      lineHeight: 56, // 100% of 56px
    },
  },
} as const;
