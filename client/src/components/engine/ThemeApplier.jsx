import React, { useEffect } from 'react';
import { loadGoogleFont, AVAILABLE_FONTS } from '../../utils/fontLoader';

const ThemeApplier = ({ theme, children, className = '' }) => {
  const primaryColor = theme?.primaryColor || '#6366f1';
  const secondaryColor = theme?.secondaryColor || '#3b82f6';
  const accentColor = theme?.accentColor || '#10b981';
  const backgroundColor = theme?.backgroundColor || '#ffffff';
  const textColor = theme?.textColor || '#1e293b';
  const fontFamily = theme?.fontFamily || 'Inter';
  const borderRadius = theme?.borderRadius || 'rounded-2xl';

  useEffect(() => {
    loadGoogleFont(fontFamily);
  }, [fontFamily]);

  const matchedFont = AVAILABLE_FONTS.find((f) => f.name === fontFamily)?.family || `'${fontFamily}', sans-serif`;

  const dynamicStyles = {
    '--primary-color': primaryColor,
    '--secondary-color': secondaryColor,
    '--accent-color': accentColor,
    '--bg-color': backgroundColor,
    '--text-color': textColor,
    fontFamily: matchedFont,
    backgroundColor: backgroundColor,
    color: textColor,
  };

  return (
    <div
      style={dynamicStyles}
      className={`dynamic-site-wrapper min-h-screen w-full transition-colors duration-300 ${className}`}
      data-theme-font={fontFamily}
      data-theme-radius={borderRadius}
    >
      {children}
    </div>
  );
};

export default ThemeApplier;
