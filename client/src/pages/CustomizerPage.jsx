import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useCustomizer } from '../context/CustomizerContext';
import CustomizerSidebar from '../components/customizer/CustomizerSidebar';
import DeviceViewportFrame from '../components/customizer/DeviceViewportFrame';
import DynamicSiteRenderer from '../components/engine/DynamicSiteRenderer';
import JsonInspectorModal from '../components/customizer/JsonInspectorModal';
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  Undo,
  Redo,
  FileCode,
  Eye,
  EyeOff,
  Save,
  Rocket,
  Check,
  Loader2,
  ExternalLink,
  Globe,
} from 'lucide-react';

const CustomizerPage = () => {
  const { templateId, siteId: paramSiteId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {
    template,
    siteId,
    siteName,
    setSiteName,
    slug,
    status,
    customizations,
    theme,
    sectionOrder,
    sectionVisibility,
    activeSection,
    setActiveSection,
    viewport,
    setViewport,
    previewMode,
    setPreviewMode,
    isDirty,
    isSaving,
    lastSaved,
    initializeFromTemplate,
    saveSite,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useCustomizer();

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [jsonModalOpen, setJsonModalOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(null);

  useEffect(() => {
    const loadEditorData = async () => {
      setLoading(true);
      setErrorMessage(null);
      try {
        if (paramSiteId) {
          // Editing existing user site
          const res = await api.get(`/sites/${paramSiteId}`);
          if (res.success && res.site) {
            initializeFromTemplate(res.site.templateId, res.site);
          }
        } else if (templateId) {
          // Creating new site from template
          const res = await api.get(`/templates/${templateId}`);
          if (res.success && res.template) {
            initializeFromTemplate(res.template);
          }
        }
      } catch (err) {
        console.error('Failed to load customizer data:', err);
        setErrorMessage(err.message || 'Failed to load template data');
      } finally {
        setLoading(false);
      }
    };

    loadEditorData();
  }, [templateId, paramSiteId]);

  const handleSave = async (publishStatus = null) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnUrl: window.location.pathname } });
      return;
    }

    try {
      const saved = await saveSite(publishStatus);
      setSaveToast(publishStatus === 'published' ? 'Site published live!' : 'Draft changes saved!');
      setTimeout(() => setSaveToast(null), 3500);
    } catch (err) {
      alert(`Save error: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-9 h-9 text-indigo-500 animate-spin" />
        <p className="text-sm text-slate-400 font-medium">Initializing Dynamic Live Studio...</p>
      </div>
    );
  }

  if (errorMessage || !template) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-center p-6">
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 max-w-md">
          <p className="text-sm font-semibold">{errorMessage || 'Template could not be loaded'}</p>
        </div>
        <Link
          to="/templates"
          className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500"
        >
          Back to Template Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* 1. TOP STUDIO HEADER BAR */}
      <header className="h-14 border-b border-slate-800 bg-slate-950 px-4 flex items-center justify-between gap-3 shrink-0 z-30">
        {/* Left: Back Link & Site Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(siteId ? '/dashboard' : '/templates')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            title="Return to previous page"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="bg-transparent text-sm font-bold text-white hover:bg-slate-900/60 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-2 py-0.5 max-w-[200px] sm:max-w-[260px] truncate"
            />
            <span
              className={`hidden sm:inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                status === 'published'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-950 text-amber-400 border border-amber-500/30'
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Center: Device Viewport Switcher & Undo/Redo */}
        <div className="flex items-center gap-2">
          {/* Viewport Selector */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewport === 'desktop' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop View (100%)"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('tablet')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewport === 'tablet' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewport === 'mobile' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile View (375px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Undo / Redo */}
          <div className="hidden sm:flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              disabled={!canUndo}
              onClick={undo}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Undo"
            >
              <Undo className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              disabled={!canRedo}
              onClick={redo}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Redo"
            >
              <Redo className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Inspection, Preview Toggle, Save & Publish Actions */}
        <div className="flex items-center gap-2">
          {/* JSON Inspector Button */}
          <button
            type="button"
            onClick={() => setJsonModalOpen(true)}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors hidden sm:flex items-center gap-1.5 text-xs font-semibold"
            title="Inspect Live Schema JSON"
          >
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">Inspect JSON</span>
          </button>

          {/* Full Preview Toggle */}
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
              previewMode
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
            title={previewMode ? 'Exit Full Preview' : 'Fullscreen Preview'}
          >
            {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span className="hidden md:inline">{previewMode ? 'Edit Mode' : 'Preview'}</span>
          </button>

          {/* Save Draft */}
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave('draft')}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all flex items-center gap-1.5"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Save Draft</span>
          </button>

          {/* Publish Site */}
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave('published')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Publish</span>
          </button>
        </div>
      </header>

      {/* 2. TOAST NOTIFICATION */}
      {saveToast && (
        <div className="fixed top-16 right-6 z-50 p-3 rounded-xl bg-slate-900 border border-emerald-500/50 shadow-2xl text-xs font-semibold text-emerald-300 flex items-center gap-2 backdrop-blur-xl animate-in slide-in-from-top-4">
          <Check className="w-4 h-4 text-emerald-400" />
          {saveToast}
          {status === 'published' && (
            <a
              href={`/site/${slug}`}
              target="_blank"
              rel="noreferrer"
              className="ml-2 text-indigo-400 underline hover:text-indigo-300 flex items-center gap-1"
            >
              View Live <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}

      {/* 3. MAIN WORKSPACE: 30/70 SPLIT */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (30% width, hidden in preview mode) */}
        {!previewMode && <CustomizerSidebar />}

        {/* Right Live Preview Canvas (70% width) */}
        <main className="flex-1 overflow-y-auto bg-slate-950/60 relative flex flex-col">
          <DeviceViewportFrame viewport={viewport}>
            <DynamicSiteRenderer
              templateStructure={template.structure}
              customizations={customizations}
              theme={theme}
              sectionOrder={sectionOrder}
              sectionVisibility={sectionVisibility}
              mode={previewMode ? 'preview' : 'editor'}
              activeSection={activeSection}
              onSelectSection={(id) => setActiveSection(id)}
            />
          </DeviceViewportFrame>
        </main>
      </div>

      {/* 4. JSON SCHEMA INSPECTOR MODAL */}
      <JsonInspectorModal
        isOpen={jsonModalOpen}
        onClose={() => setJsonModalOpen(false)}
        data={{
          template,
          siteName,
          slug,
          theme,
          customizations,
          sectionOrder,
          sectionVisibility,
        }}
      />
    </div>
  );
};

export default CustomizerPage;
