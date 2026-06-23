import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        market: {
          ink: '#191919',
          muted: '#6B7280',
          line: '#E5E7EB',
          canvas: '#F6F7F9',
          surface: '#FFFFFF',
          red: '#F23D4F',
          orange: '#FF7A1A',
          green: '#079669',
          amber: '#F59E0B',
        },
      },
      boxShadow: {
        market: '0 18px 45px rgba(17, 24, 39, 0.08)',
        'market-soft': '0 10px 24px rgba(17, 24, 39, 0.06)',
      },
    },
  },
}
