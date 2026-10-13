import React, { useState } from 'react';
import Modal from '../common/Modal';
import { Copy, Check, Download, FileCode, CheckCircle2 } from 'lucide-react';

const JsonInspectorModal = ({ isOpen, onClose, data }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('full'); // 'full' | 'customizations' | 'theme' | 'schema'

  const getExportData = () => {
    if (activeTab === 'customizations') return data.customizations;
    if (activeTab === 'theme') return data.theme;
    if (activeTab === 'schema') return data.template?.structure;
    return {
      templateName: data.template?.name,
      siteName: data.siteName,
      slug: data.slug,
      theme: data.theme,
      customizations: data.customizations,
      sectionOrder: data.sectionOrder,
      sectionVisibility: data.sectionVisibility,
      templateStructure: data.template?.structure,
    };
  };

  const jsonString = JSON.stringify(getExportData(), null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.slug || 'site-config'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Live JSON Architecture & Schema Inspector" maxWidth="max-w-3xl">
      <div className="space-y-4">
        <p className="text-xs text-slate-400">
          This live JSON object drives the dynamic rendering engine in real time. Everything you customize updates this underlying state with zero hardcoded pages.
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('full')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'full' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Full Payload
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('customizations')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'customizations' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Customizations Data
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('theme')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'theme' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Theme Settings
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('schema')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'schema' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Template Schema
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy JSON'}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Download .json
            </button>
          </div>
        </div>

        {/* JSON Code Viewer */}
        <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
          <pre className="p-4 text-xs font-mono text-cyan-300 max-h-96 overflow-y-auto leading-relaxed">
            {jsonString}
          </pre>
        </div>
      </div>
    </Modal>
  );
};

export default JsonInspectorModal;
