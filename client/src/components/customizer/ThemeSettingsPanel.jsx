import React from 'react';
import ColorPicker from '../common/ColorPicker';
import { useCustomizer } from '../../context/CustomizerContext';
import {
  AVAILABLE_FONTS,
  AVAILABLE_RADIUS_OPTIONS,
  THEME_PRESETS,
} from '../../utils/fontLoader';
import { Sparkles, Palette, Type, Square } from 'lucide-react';

const ThemeSettingsPanel = () => {
  const { theme, updateThemeProperty, applyThemePreset } = useCustomizer();

  return (
    <div className="space-y-6">
      {/* 1. Theme Presets */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          One-Click Color Presets
        </div>
        <div className="grid grid-cols-2 gap-2">
          {THEME_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyThemePreset(preset)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/60 text-left transition-all group"
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: preset.primaryColor }} />
                <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: preset.secondaryColor }} />
                <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: preset.backgroundColor }} />
              </div>
              <p className="text-[11px] font-semibold text-white group-hover:text-indigo-300 truncate">
                {preset.name}
              </p>
              <span className="text-[10px] text-slate-500">{preset.fontFamily}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Custom Color Palette */}
      <div className="space-y-4 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 uppercase tracking-wider">
          <Palette className="w-3.5 h-3.5 text-indigo-400" />
          Global Color Palette
        </div>

        <ColorPicker
          label="Primary Brand Color"
          value={theme?.primaryColor || '#6366f1'}
          onChange={(val) => updateThemeProperty('primaryColor', val)}
          helperText="Buttons, hero highlights, badges, active tabs"
        />

        <ColorPicker
          label="Secondary Color"
          value={theme?.secondaryColor || '#3b82f6'}
          onChange={(val) => updateThemeProperty('secondaryColor', val)}
          helperText="Gradient accents and secondary indicators"
        />

        <ColorPicker
          label="Accent Highlight"
          value={theme?.accentColor || '#10b981'}
          onChange={(val) => updateThemeProperty('accentColor', val)}
          helperText="Badges, tags, and special callout highlights"
        />

        <ColorPicker
          label="Canvas Background Color"
          value={theme?.backgroundColor || '#ffffff'}
          onChange={(val) => updateThemeProperty('backgroundColor', val)}
          helperText="Main background tone for the entire generated site"
        />

        <ColorPicker
          label="Default Text Color"
          value={theme?.textColor || '#1e293b'}
          onChange={(val) => updateThemeProperty('textColor', val)}
          helperText="Body text and headings contrast tone"
        />
      </div>

      {/* 3. Typography Selection */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 uppercase tracking-wider">
          <Type className="w-3.5 h-3.5 text-cyan-400" />
          Google Fonts Typography
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">Selected Font Family</label>
          <select
            value={theme?.fontFamily || 'Inter'}
            onChange={(e) => updateThemeProperty('fontFamily', e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {AVAILABLE_FONTS.map((font) => (
              <option key={font.name} value={font.name}>
                {font.name} — {font.category}
              </option>
            ))}
          </select>
        </div>

        {/* Live Font Sample Preview */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <p className="text-[11px] text-slate-400 font-mono">Type Preview ({theme?.fontFamily}):</p>
          <p
            className="text-base font-bold text-white tracking-tight"
            style={{ fontFamily: `'${theme?.fontFamily}', sans-serif` }}
          >
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      </div>

      {/* 4. Corner Radius Styles */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 uppercase tracking-wider">
          <Square className="w-3.5 h-3.5 text-pink-400" />
          Card & Button Corner Radius
        </div>

        <div className="grid grid-cols-2 gap-2">
          {AVAILABLE_RADIUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateThemeProperty('borderRadius', opt.value)}
              className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                theme?.borderRadius === opt.value
                  ? 'border-indigo-500 bg-indigo-950/40 text-white font-bold'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <div className={`w-8 h-4 border border-indigo-400 bg-indigo-500/20 mb-1.5 ${opt.value}`} />
              <span className="block truncate">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSettingsPanel;
