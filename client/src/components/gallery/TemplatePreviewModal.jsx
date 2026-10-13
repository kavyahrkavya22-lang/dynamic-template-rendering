import React from 'react';
import { X, ArrowRight, Sparkles, Layers } from 'lucide-react';
import DynamicSiteRenderer from '../engine/DynamicSiteRenderer';

const TemplatePreviewModal = ({ template, isOpen, onClose, onUse }) => {
  if (!isOpen || !template) return null;

  // Build default customizations from schema
  const defaultCustomizations = {};
  template.structure?.forEach((section) => {
    defaultCustomizations[section.sectionId] = {};
    section.editableFields?.forEach((field) => {
      defaultCustomizations[section.sectionId][field.fieldName] = field.defaultValue;
    });
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Top Modal Navigation Bar */}
      <header className="h-16 px-6 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-950 text-indigo-300 border border-indigo-500/30">
            {template.category}
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white leading-tight">{template.name}</h3>
            <p className="text-[11px] text-slate-400 hidden sm:block">Live Interactive Preview</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onUse(template);
            }}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
          >
            Use This Template <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Preview Canvas Body */}
      <div className="flex-1 overflow-y-auto">
        <DynamicSiteRenderer
          templateStructure={template.structure}
          customizations={defaultCustomizations}
          theme={template.defaultTheme}
          mode="preview"
        />
      </div>
    </div>
  );
};

export default TemplatePreviewModal;
