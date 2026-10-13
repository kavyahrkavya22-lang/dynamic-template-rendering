import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, Sparkles, X, Check, Loader2 } from 'lucide-react';
import { api } from '../../utils/api';

const CURATED_IMAGES = [
  { label: 'SaaS Dashboard', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Cloud Architecture', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Creative Studio Office', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Modern Portrait', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Gourmet Culinary', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Fine Restaurant Ambiance', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Athletic Gym Training', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Fitness Conditioning', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Conference Keynote', url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Abstract 3D Art', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
];

const ImageUploader = ({ label, value, onChange, helperText }) => {
  const [tab, setTab] = useState('url'); // 'url' | 'upload' | 'curated'
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const res = await api.uploadImage(file);
      if (res.success && res.url) {
        onChange(res.url);
      } else {
        setUploadError(res.message || 'Upload failed');
      }
    } catch (err) {
      console.error('File upload error:', err);
      // If server upload fails, fallback to local FileReader data URI so the preview works seamlessly
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange(event.target.result);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between text-xs">
          <label className="font-medium text-slate-300">{label}</label>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
      )}

      {/* Mode Tabs */}
      <div className="grid grid-cols-3 gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800 text-[11px] font-medium text-slate-400">
        <button
          type="button"
          onClick={() => setTab('url')}
          className={`py-1 rounded flex items-center justify-center gap-1 transition-colors ${
            tab === 'url' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:text-slate-200'
          }`}
        >
          <LinkIcon className="w-3 h-3" /> URL
        </button>
        <button
          type="button"
          onClick={() => setTab('upload')}
          className={`py-1 rounded flex items-center justify-center gap-1 transition-colors ${
            tab === 'upload' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:text-slate-200'
          }`}
        >
          <UploadCloud className="w-3 h-3" /> Upload
        </button>
        <button
          type="button"
          onClick={() => setTab('curated')}
          className={`py-1 rounded flex items-center justify-center gap-1 transition-colors ${
            tab === 'curated' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3 h-3 text-amber-300" /> Presets
        </button>
      </div>

      {/* Tab 1: URL Input */}
      {tab === 'url' && (
        <div className="relative">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full pl-3 pr-8 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <ImageIcon className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-2.5 pointer-events-none" />
        </div>
      )}

      {/* Tab 2: File Upload */}
      {tab === 'upload' && (
        <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-xl p-3 text-center bg-slate-900/40 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id={`file-upload-${label?.replace(/\s+/g, '-') || 'default'}`}
          />
          <label
            htmlFor={`file-upload-${label?.replace(/\s+/g, '-') || 'default'}`}
            className="cursor-pointer flex flex-col items-center gap-1.5"
          >
            {isUploading ? (
              <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
            ) : (
              <UploadCloud className="w-5 h-5 text-indigo-400" />
            )}
            <span className="text-xs font-medium text-slate-300">
              {isUploading ? 'Uploading file...' : 'Choose image from computer'}
            </span>
            <span className="text-[10px] text-slate-500">PNG, JPG, WebP, SVG up to 5MB</span>
          </label>
          {uploadError && <p className="text-[11px] text-rose-400 mt-1">{uploadError}</p>}
        </div>
      )}

      {/* Tab 3: Curated Gallery */}
      {tab === 'curated' && (
        <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
          <div className="grid grid-cols-2 gap-1.5">
            {CURATED_IMAGES.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChange(item.url)}
                className={`relative group rounded-lg overflow-hidden border text-left transition-all ${
                  value === item.url ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <img src={item.url} alt={item.label} className="w-full h-14 object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-slate-950/50 group-hover:bg-slate-950/30 flex items-end p-1">
                  <span className="text-[9px] font-medium text-white truncate drop-shadow">{item.label}</span>
                </div>
                {value === item.url && (
                  <div className="absolute top-1 right-1 bg-indigo-600 rounded-full p-0.5 shadow">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview Thumbnail */}
      {value && (
        <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-950 max-h-24">
          <img
            src={value}
            alt="Preview"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
            }}
            className="w-full h-24 object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 px-2 py-0.5 text-[10px] text-slate-400 truncate">
            {value}
          </div>
        </div>
      )}

      {helperText && <p className="text-[11px] text-slate-500 leading-tight">{helperText}</p>}
    </div>
  );
};

export default ImageUploader;
