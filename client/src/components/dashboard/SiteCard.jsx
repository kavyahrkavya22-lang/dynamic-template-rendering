import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Edit3,
  ExternalLink,
  Copy,
  Check,
  QrCode,
  CopyPlus,
  Trash2,
  Globe,
  Clock,
  MoreVertical,
} from 'lucide-react';

const SiteCard = ({ site, onDuplicate, onDelete, onOpenQr }) => {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const publicUrl = `${window.location.origin}/site/${site.slug}`;
  const isPublished = site.status === 'published';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = new Date(site.updatedAt || site.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-xl overflow-hidden flex flex-col justify-between transition-all group">
      {/* Thumbnail Header */}
      <div className="relative h-44 overflow-hidden bg-slate-950">
        <img
          src={site.thumbnail || site.templateId?.thumbnail || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'}
          alt={site.siteName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border ${
              isPublished
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
            }`}
          >
            {isPublished ? '● Published' : '○ Draft'}
          </span>
        </div>

        {/* Quick Menu Dropdown */}
        <div className="absolute top-3 right-3">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div
              onMouseLeave={() => setMenuOpen(false)}
              className="absolute right-0 mt-1 w-44 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100"
            >
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onDuplicate(site._id || site.id);
                }}
                className="w-full px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2 text-left"
              >
                <CopyPlus className="w-3.5 h-3.5 text-indigo-400" /> Duplicate Site
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenQr(site);
                }}
                className="w-full px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2 text-left"
              >
                <QrCode className="w-3.5 h-3.5 text-cyan-400" /> Mobile QR Code
              </button>
              <div className="border-t border-slate-800 my-1" />
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(site._id || site.id, site.siteName);
                }}
                className="w-full px-3.5 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 text-left"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Site
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors truncate">
              {site.siteName}
            </h3>
          </div>
          <p className="text-xs font-mono text-indigo-400 truncate">
            /site/{site.slug}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
            <Clock className="w-3 h-3" />
            <span>Updated {formattedDate}</span>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
          <Link
            to={`/builder/site/${site._id || site.id}`}
            className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Site
          </Link>

          <a
            href={publicUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700/80"
            title="View Live Public Site"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={handleCopyLink}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700/80"
            title="Copy Public Link"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SiteCard;
