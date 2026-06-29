export const Theme = {
  colors: {
    primary: '#1E40AF',
    secondary: '#D97706',
    background: '#F3F4F6',
    surface: '#FFFFFF',
    text: '#111827',
    textSecondary: '#4B5563',
    border: '#E5E7EB',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: { fontSize: 24, fontWeight: '700' as const },
    h2: { fontSize: 20, fontWeight: '600' as const },
    body: { fontSize: 16, fontWeight: '400' as const },
    caption: { fontSize: 14, fontWeight: '400' as const, color: '#4B5563' },
  }
};
