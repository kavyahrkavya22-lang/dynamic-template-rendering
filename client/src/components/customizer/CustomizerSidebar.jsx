import React, { useState } from 'react';
import { useCustomizer } from '../../context/CustomizerContext';
import DynamicFieldRenderer from './DynamicFieldRenderer';
import ThemeSettingsPanel from './ThemeSettingsPanel';
import SectionManager from './SectionManager';
import {
  FileText,
  Palette,
  Layers,
  Settings,
  ChevronDown,
  Globe,
  Sparkles,
  Link2,
} from 'lucide-react';

const CustomizerSidebar = () => {
  const {
    template,
    siteName,
    setSiteName,
    slug,
    setSlug,
    description,
    setDescription,
    customizations,
    activeSection,
    setActiveSection,
    sectionOrder,
    sectionVisibility,
    updateField,
    updateListItem,
    addListItem,
    removeListItem,
  } = useCustomizer();

  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'theme' | 'structure' | 'settings'

  if (!template || !template.structure) {
    return (
      <aside className="w-80 lg:w-96 border-r border-slate-800 bg-slate-950 p-6 text-center text-slate-400 text-xs">
        Loading editor configuration...
      </aside>
    );
  }

  // Active section data
  const currentSectionSchema = template.structure.find((s) => s.sectionId === activeSection) || template.structure[0];
  const sectionCustomizations = customizations[currentSectionSchema?.sectionId] || {};

  return (
    <aside className="w-full lg:w-96 border-r border-slate-800 bg-slate-950 flex flex-col h-full overflow-hidden shrink-0">
      {/* Top Tab Switcher */}
      <div className="grid grid-cols-4 border-b border-slate-800 bg-slate-900/50 p-1.5 gap-1 shrink-0 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
            activeTab === 'content'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span className="text-[10px]">Content</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('theme')}
          className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
            activeTab === 'theme'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span className="text-[10px]">Theme</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('structure')}
          className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
            activeTab === 'structure'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px]">Sections</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
            activeTab === 'settings'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span className="text-[10px]">Settings</span>
        </button>
      </div>

      {/* Scrollable Editor Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* TAB 1: SECTION CONTENT */}
        {activeTab === 'content' && (
          <div className="space-y-5">
            {/* Section Picker Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Editing Section
              </label>
              <div className="relative">
                <select
                  value={activeSection || ''}
                  onChange={(e) => setActiveSection(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 rounded-xl bg-slate-900 border border-indigo-500/50 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                >
                  {template.structure.map((sec) => (
                    <option key={sec.sectionId} value={sec.sectionId}>
                      {sec.title} ({sec.sectionType})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Section Info Card */}
            {currentSectionSchema && (
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{currentSectionSchema.title}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 font-mono">
                    {currentSectionSchema.sectionType}
                  </span>
                </div>
                {currentSectionSchema.description && (
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {currentSectionSchema.description}
                  </p>
                )}
              </div>
            )}

            {/* Dynamic Fields List generated from Template Schema */}
            <div className="space-y-4 pt-2">
              {currentSectionSchema?.editableFields?.map((field) => (
                <DynamicFieldRenderer
                  key={field.fieldName}
                  field={field}
                  value={sectionCustomizations[field.fieldName] ?? field.defaultValue}
                  onChange={(val) => updateField(currentSectionSchema.sectionId, field.fieldName, val)}
                  onListItemChange={updateListItem}
                  onAddListItem={addListItem}
                  onRemoveListItem={removeListItem}
                  sectionId={currentSectionSchema.sectionId}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: THEME & STYLES */}
        {activeTab === 'theme' && <ThemeSettingsPanel />}

        {/* TAB 3: SECTIONS STRUCTURE */}
        {activeTab === 'structure' && <SectionManager />}

        {/* TAB 4: SITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Site Name</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="My Awesome Website"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <p className="text-[11px] text-slate-500">Internal name displayed on your dashboard</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Custom URL Slug</label>
              <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 focus-within:border-indigo-500">
                <span className="text-xs text-slate-500 font-mono">/site/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                  placeholder="my-cool-site"
                  className="w-full bg-transparent text-xs text-indigo-300 font-mono focus:outline-none pl-1"
                />
              </div>
              <p className="text-[11px] text-slate-500">This determines your public shareable web address</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Meta Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of your site for search engines..."
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-y"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <Globe className="w-4 h-4 text-emerald-400" />
                Live Standalone URL
              </div>
              <p className="text-[11px] font-mono text-indigo-300 truncate">
                {window.location.origin}/site/{slug}
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default CustomizerSidebar;
