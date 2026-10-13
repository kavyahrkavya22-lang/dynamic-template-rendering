import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import DynamicSiteRenderer from '../components/engine/DynamicSiteRenderer';
import {
  Shield,
  Plus,
  RefreshCw,
  Trash2,
  Edit3,
  Eye,
  FileCode,
  Check,
  Loader2,
  Sparkles,
  Layers,
} from 'lucide-react';

const AdminTemplatesPage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReseeding, setIsReseeding] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [showJsonEditor, setShowJsonEditor] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [jsonError, setJsonError] = useState(null);
  const [previewActive, setPreviewActive] = useState(false);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await api.get('/templates');
      if (res.success && res.templates) {
        setTemplates(res.templates);
      }
    } catch (err) {
      console.error('Error fetching admin templates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleReseed = async () => {
    if (!window.confirm('Reset database and re-seed all 6 production templates?')) return;
    setIsReseeding(true);
    try {
      const res = await api.post('/templates/seed', {});
      if (res.success) {
        alert('Templates successfully re-seeded!');
        fetchTemplates();
      }
    } catch (err) {
      alert(`Reseed failed: ${err.message}`);
    } finally {
      setIsReseeding(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete template "${name}"?`)) return;
    try {
      const res = await api.delete(`/templates/${id}`);
      if (res.success) {
        setTemplates(templates.filter((t) => (t._id || t.id) !== id));
      }
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handleOpenJsonEditor = (template = null) => {
    if (template) {
      setEditingTemplate(template);
      setJsonText(JSON.stringify(template, null, 2));
    } else {
      // New template template
      const newTemplateSample = {
        name: 'New Custom Template',
        category: 'Business',
        description: 'A brand new dynamic website template.',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        tags: ['Business', 'Custom'],
        isFeatured: false,
        defaultTheme: {
          primaryColor: '#6366f1',
          secondaryColor: '#3b82f6',
          accentColor: '#10b981',
          backgroundColor: '#ffffff',
          textColor: '#1e293b',
          fontFamily: 'Inter',
          borderRadius: 'rounded-2xl',
        },
        structure: [
          {
            sectionId: 'hero',
            sectionType: 'Hero',
            title: 'Main Hero',
            description: 'Top introductory banner',
            editableFields: [
              { fieldName: 'badge', fieldLabel: 'Badge', fieldType: 'text', defaultValue: '✨ New Release' },
              { fieldName: 'title', fieldLabel: 'Headline', fieldType: 'text', defaultValue: 'Welcome to Our New Website' },
              { fieldName: 'subtitle', fieldLabel: 'Subtitle', fieldType: 'textarea', defaultValue: 'Experience high-impact performance and seamless design.' },
              { fieldName: 'primaryCtaText', fieldLabel: 'Button', fieldType: 'text', defaultValue: 'Get Started' },
              { fieldName: 'primaryCtaLink', fieldLabel: 'Link', fieldType: 'text', defaultValue: '#contact' },
              { fieldName: 'heroImage', fieldLabel: 'Hero Photo', fieldType: 'image', defaultValue: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
              { fieldName: 'layoutStyle', fieldLabel: 'Layout', fieldType: 'select', defaultValue: 'split', options: [{ label: 'Split', value: 'split' }, { label: 'Centered', value: 'centered' }] },
            ],
          },
          {
            sectionId: 'contact',
            sectionType: 'Contact',
            title: 'Contact Us',
            editableFields: [
              { fieldName: 'title', fieldLabel: 'Title', fieldType: 'text', defaultValue: 'Get In Touch' },
              { fieldName: 'email', fieldLabel: 'Email', fieldType: 'text', defaultValue: 'support@example.com' },
              { fieldName: 'buttonText', fieldLabel: 'Button', fieldType: 'text', defaultValue: 'Send' },
            ],
          },
          {
            sectionId: 'footer',
            sectionType: 'Footer',
            title: 'Footer',
            editableFields: [
              { fieldName: 'brandName', fieldLabel: 'Brand', fieldType: 'text', defaultValue: 'My Brand' },
              { fieldName: 'copyright', fieldLabel: 'Copyright', fieldType: 'text', defaultValue: '© 2026 All rights reserved.' },
            ],
          },
        ],
      };
      setEditingTemplate(null);
      setJsonText(JSON.stringify(newTemplateSample, null, 2));
    }
    setJsonError(null);
    setShowJsonEditor(true);
  };

  const handleSaveJson = async () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonError(null);

      if (editingTemplate && (editingTemplate._id || editingTemplate.id)) {
        const id = editingTemplate._id || editingTemplate.id;
        const res = await api.put(`/templates/${id}`, parsed);
        if (res.success) {
          alert('Template updated successfully!');
          setShowJsonEditor(false);
          fetchTemplates();
        }
      } else {
        const res = await api.post('/templates', parsed);
        if (res.success) {
          alert('Template created successfully!');
          setShowJsonEditor(false);
          fetchTemplates();
        }
      }
    } catch (err) {
      setJsonError(`JSON Syntax Error: ${err.message}`);
    }
  };

  let parsedForPreview = null;
  try {
    parsedForPreview = JSON.parse(jsonText);
  } catch (e) {}

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
            <Shield className="w-3.5 h-3.5" />
            Admin Template Studio
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Template Architecture & Schemas
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Define dynamic section types, editable field schemas, and default JSON values.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={isReseeding}
            onClick={handleReseed}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isReseeding ? 'animate-spin' : ''}`} />
            {isReseeding ? 'Reseeding...' : 'Reset Default Templates'}
          </button>
          <button
            type="button"
            onClick={() => handleOpenJsonEditor(null)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Create Template Schema
          </button>
        </div>
      </div>

      {/* JSON Schema Modal Editor */}
      {showJsonEditor && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">
                {editingTemplate ? `Edit Schema: ${editingTemplate.name}` : 'New Dynamic Template Schema'}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewActive(!previewActive)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
                  previewActive
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                {previewActive ? 'Hide Live Preview' : 'Live Preview'}
              </button>
              <button
                type="button"
                onClick={() => setShowJsonEditor(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveJson}
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> Save to Database
              </button>
            </div>
          </div>

          {jsonError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
              {jsonError}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <textarea
              rows={22}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed resize-y"
            />

            {previewActive && parsedForPreview && (
              <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden max-h-[500px] overflow-y-auto shadow-inner">
                <DynamicSiteRenderer
                  templateStructure={parsedForPreview.structure || []}
                  customizations={{}}
                  theme={parsedForPreview.defaultTheme || {}}
                  mode="preview"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Templates Table List */}
      {loading ? (
        <div className="min-h-[30vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <p className="text-xs text-slate-400">Loading templates...</p>
        </div>
      ) : (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Installed Schemas ({templates.length})
            </span>
          </div>

          <div className="divide-y divide-slate-800">
            {templates.map((t) => (
              <div
                key={t._id || t.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={t.thumbnail}
                    alt={t.name}
                    className="w-16 h-12 rounded-lg object-cover border border-slate-800 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{t.name}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                        {t.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 max-w-xl line-clamp-1">{t.description}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <Layers className="w-3 h-3 text-indigo-400" />
                      <span>{t.structure?.length || 0} Sections Defined</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleOpenJsonEditor(t)}
                    className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-indigo-400" /> Edit JSON
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(t._id || t.id, t.name)}
                    className="p-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                    title="Delete Template"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTemplatesPage;
