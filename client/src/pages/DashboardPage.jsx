import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import SiteCard from '../components/dashboard/SiteCard';
import QrCodeModal from '../components/dashboard/QrCodeModal';
import {
  FolderHeart,
  Plus,
  Rocket,
  FileEdit,
  Sparkles,
  Loader2,
  Layers,
  LayoutGrid,
} from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrModalSite, setQrModalSite] = useState(null);

  const fetchSites = async () => {
    setLoading(true);
    try {
      const res = await api.get('/sites');
      if (res.success && res.sites) {
        setSites(res.sites);
      }
    } catch (err) {
      console.error('Error fetching user sites:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const handleDuplicate = async (siteId) => {
    try {
      const res = await api.post(`/sites/${siteId}/duplicate`);
      if (res.success && res.site) {
        setSites([res.site, ...sites]);
      }
    } catch (err) {
      alert(`Duplicate failed: ${err.message}`);
    }
  };

  const handleDelete = async (siteId, siteName) => {
    if (!window.confirm(`Are you sure you want to delete "${siteName}"? This cannot be undone.`)) {
      return;
    }
    try {
      const res = await api.delete(`/sites/${siteId}`);
      if (res.success) {
        setSites(sites.filter((s) => (s._id || s.id) !== siteId));
      }
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const totalPublished = sites.filter((s) => s.status === 'published').length;
  const totalDrafts = sites.filter((s) => s.status === 'draft').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 border border-indigo-500/40 text-indigo-300">
            <FolderHeart className="w-3.5 h-3.5 text-pink-400" />
            Website Dashboard
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            My Generated Websites
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Manage your customizable sites, duplicate layouts, and share live standalone URLs.
          </p>
        </div>

        <Link
          to="/templates"
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create New Site
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
            <span>Total Projects</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{sites.length}</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
            <span>Published Live</span>
            <Rocket className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-400">{totalPublished}</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
            <span>Drafts in Progress</span>
            <FileEdit className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-amber-400">{totalDrafts}</p>
        </div>
      </div>

      {/* Sites Grid */}
      {loading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <p className="text-xs text-slate-400 font-medium">Fetching your websites...</p>
        </div>
      ) : sites.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-10 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <LayoutGrid className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No websites created yet</h3>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            Select one of our pre-built templates to start customizing your first live dynamic website.
          </p>
          <Link
            to="/templates"
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all"
          >
            Browse Template Gallery
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <SiteCard
              key={site._id || site.id}
              site={site}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
              onOpenQr={(s) => setQrModalSite(s)}
            />
          ))}
        </div>
      )}

      {/* QR Code Modal */}
      <QrCodeModal
        isOpen={Boolean(qrModalSite)}
        onClose={() => setQrModalSite(null)}
        site={qrModalSite}
      />
    </div>
  );
};

export default DashboardPage;
