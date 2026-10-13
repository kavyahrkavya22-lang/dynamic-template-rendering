export const AVAILABLE_FONTS = [
  { name: 'Inter', family: "'Inter', sans-serif", category: 'Clean Sans-Serif' },
  { name: 'Plus Jakarta Sans', family: "'Plus Jakarta Sans', sans-serif", category: 'Modern Geometric' },
  { name: 'Outfit', family: "'Outfit', sans-serif", category: 'Futuristic Rounded' },
  { name: 'Poppins', family: "'Poppins', sans-serif", category: 'Friendly Geometric' },
  { name: 'Space Grotesk', family: "'Space Grotesk', sans-serif", category: 'Tech & Brutalist' },
  { name: 'Montserrat', family: "'Montserrat', sans-serif", category: 'Punchy & Bold' },
  { name: 'Playfair Display', family: "'Playfair Display', serif", category: 'Luxury & Editorial Serif' },
  { name: 'Merriweather', family: "'Merriweather', serif", category: 'Classic Literary Serif' },
  { name: 'Roboto', family: "'Roboto', sans-serif", category: 'Neutral Sans' },
  { name: 'Fira Code', family: "'Fira Code', monospace", category: 'Developer Monospace' },
];

export const AVAILABLE_RADIUS_OPTIONS = [
  { label: 'Sharp Corners', value: 'rounded-none', preview: '0px' },
  { label: 'Subtle Rounded (8px)', value: 'rounded-lg', preview: '8px' },
  { label: 'Modern Smooth (16px)', value: 'rounded-2xl', preview: '16px' },
  { label: 'Extra Soft (24px)', value: 'rounded-3xl', preview: '24px' },
  { label: 'Full Pill (Pill)', value: 'rounded-full', preview: '999px' },
];

export const THEME_PRESETS = [
  {
    name: 'Electric Indigo',
    primaryColor: '#6366f1',
    secondaryColor: '#3b82f6',
    accentColor: '#10b981',
    backgroundColor: '#0f172a',
    textColor: '#f8fafc',
    fontFamily: 'Inter',
    borderRadius: 'rounded-2xl',
  },
  {
    name: 'Neon Cyberpunk',
    primaryColor: '#ec4899',
    secondaryColor: '#8b5cf6',
    accentColor: '#06b6d4',
    backgroundColor: '#030712',
    textColor: '#f9fafb',
    fontFamily: 'Space Grotesk',
    borderRadius: 'rounded-xl',
  },
  {
    name: 'Clean Minimalist',
    primaryColor: '#0ea5e9',
    secondaryColor: '#6366f1',
    accentColor: '#f43f5e',
    backgroundColor: '#ffffff',
    textColor: '#0f172a',
    fontFamily: 'Outfit',
    borderRadius: 'rounded-3xl',
  },
  {
    name: 'Gourmet Gold & Noir',
    primaryColor: '#e11d48',
    secondaryColor: '#d97706',
    accentColor: '#10b981',
    backgroundColor: '#1c1917',
    textColor: '#fafaf9',
    fontFamily: 'Playfair Display',
    borderRadius: 'rounded-xl',
  },
  {
    name: 'High-Impact Gold & Dark',
    primaryColor: '#eab308',
    secondaryColor: '#ef4444',
    accentColor: '#06b6d4',
    backgroundColor: '#09090b',
    textColor: '#f4f4f5',
    fontFamily: 'Space Grotesk',
    borderRadius: 'rounded-xl',
  },
  {
    name: 'Emerald Corporate',
    primaryColor: '#059669',
    secondaryColor: '#0284c7',
    accentColor: '#d97706',
    backgroundColor: '#ffffff',
    textColor: '#1e293b',
    fontFamily: 'Plus Jakarta Sans',
    borderRadius: 'rounded-2xl',
  },
];

export const loadGoogleFont = (fontName) => {
  if (!fontName) return;
  const formattedFont = fontName.replace(/ /g, '+');
  const linkId = `google-font-${formattedFont}`;

  if (!document.getElementById(linkId)) {
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${formattedFont}:wght@300;400;500;600;700;800&display=swap`;
    document.head.appendChild(link);
  }
};
