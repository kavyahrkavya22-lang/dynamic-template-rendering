import React, { useState } from 'react';
import { Check, Palette } from 'lucide-react';

const PRESET_SWATCHES = [
  '#6366f1', // Indigo
  '#3b82f6', // Blue
  '#0ea5e9', // Sky
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#84cc16', // Lime
  '#eab308', // Amber / Gold
  '#f97316', // Orange
  '#ef4444', // Red
  '#ec4899', // Pink
  '#8b5cf6', // Purple
  '#1e293b', // Slate Dark
  '#0f172a', // Midnight
  '#ffffff', // Pure White
];

const ColorPicker = ({ label, value, onChange, helperText }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-1.5">
      {label && (
        <div className="flex items-center justify-between text-xs">
          <label className="font-medium text-slate-300">{label}</label>
          <span className="font-mono text-[11px] text-slate-400 uppercase">{value}</span>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Color preview square / click to open popup */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 rounded-xl border border-slate-700 shadow-inner flex items-center justify-center transition-transform hover:scale-105"
            style={{ backgroundColor: value || '#6366f1' }}
          >
            <span className="sr-only">Choose color</span>
          </button>

          {isOpen && (
            <div
              onMouseLeave={() => setIsOpen(false)}
              className="absolute left-0 top-11 z-50 p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl w-64 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                Preset Palette
              </div>
              <div className="grid grid-cols-7 gap-1.5 mb-3">
                {PRESET_SWATCHES.map((swatch) => (
                  <button
                    key={swatch}
                    type="button"
                    onClick={() => {
                      onChange(swatch);
                      setIsOpen(false);
                    }}
                    className="w-7 h-7 rounded-lg border border-slate-700/60 shadow-sm flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ backgroundColor: swatch }}
                  >
                    {value?.toLowerCase() === swatch.toLowerCase() && (
                      <Check className={`w-3.5 h-3.5 ${swatch === '#ffffff' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="color"
                  value={value || '#6366f1'}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
                />
                <span className="text-xs text-slate-400">Custom Color Picker</span>
              </div>
            </div>
          )}
        </div>

        {/* Text Input for HEX */}
        <div className="relative flex-1">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#6366f1"
            className="w-full pl-3 pr-8 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-white font-mono placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
          <Palette className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-2.5 pointer-events-none" />
        </div>
      </div>

      {helperText && <p className="text-[11px] text-slate-500 leading-tight">{helperText}</p>}
    </div>
  );
};

export default ColorPicker;
