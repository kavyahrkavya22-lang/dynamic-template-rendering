import React from 'react';
import { useCustomizer } from '../../context/CustomizerContext';
import { ChevronUp, ChevronDown, Eye, EyeOff, Edit3, Layers } from 'lucide-react';

const SectionManager = () => {
  const {
    template,
    sectionOrder,
    sectionVisibility,
    activeSection,
    setActiveSection,
    moveSection,
    toggleSectionVisibility,
  } = useCustomizer();

  if (!template || !template.structure) return null;

  // Build ordered list
  const orderedSections = sectionOrder
    .map((id) => template.structure.find((s) => s.sectionId === id))
    .filter(Boolean);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300 uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          Page Sections Order & Visibility
        </div>
        <span className="text-[11px] text-slate-500">{orderedSections.length} Sections</span>
      </div>

      <div className="space-y-2">
        {orderedSections.map((section, idx) => {
          const isVisible = sectionVisibility[section.sectionId] ?? true;
          const isActive = activeSection === section.sectionId;

          return (
            <div
              key={section.sectionId}
              className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                isActive
                  ? 'border-indigo-500 bg-indigo-950/40 shadow-sm'
                  : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
              } ${!isVisible ? 'opacity-50' : ''}`}
            >
              {/* Left: Section Details */}
              <div
                onClick={() => setActiveSection(section.sectionId)}
                className="cursor-pointer flex-1 flex items-center gap-2.5"
              >
                <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white leading-tight">{section.title}</h4>
                  <span className="text-[10px] text-indigo-400 font-mono">
                    {section.sectionType}
                  </span>
                </div>
              </div>

              {/* Right: Controls (Visibility + Move Up/Down) */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => toggleSectionVisibility(section.sectionId)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isVisible
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                      : 'text-rose-400 bg-rose-500/10'
                  }`}
                  title={isVisible ? 'Hide Section' : 'Show Section'}
                >
                  {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>

                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveSection(section.sectionId, 'up')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  title="Move Up"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  disabled={idx === orderedSections.length - 1}
                  onClick={() => moveSection(section.sectionId, 'down')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  title="Move Down"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionManager;
