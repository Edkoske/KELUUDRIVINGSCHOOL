// Tailwind CDN reads `tailwind.config` from the page.
// We guard access so this file can load even if Tailwind hasn't initialized yet.
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: '#F97316',
        brandDark: '#EA580C',
        teal: '#0D9488',
        dark: '#1A1A2E',
        darkCard: '#16213E'
      }
    }
  }
};
