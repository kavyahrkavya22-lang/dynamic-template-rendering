import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';
import DynamicSiteRenderer from '../components/engine/DynamicSiteRenderer';
import { Loader2, Layers, AlertTriangle, ArrowRight } from 'lucide-react';

const PublicSiteViewerPage = () => {
  const { slug } = useParams();
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicSite = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/sites/public/${slug}`);
        if (res.success && res.site) {
          setSiteData(res.site);
          document.title = res.site.siteName || 'Dynamic Live Site';
        } else {
          setError(res.message || 'Website not found');
        }
      } catch (err) {
        console.error('Error loading public site:', err);
        setError(err.message || 'Website not found at this address');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPublicSite();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-9 h-9 text-indigo-500 animate-spin" />
        <p className="text-xs text-slate-400 font-medium tracking-wide">Rendering Live Website...</p>
      </div>
    );
  }

  if (error || !siteData) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-white">404 - Website Not Found</h1>
        <p className="text-xs text-slate-400 max-w-sm">
          No published dynamic website exists at the URL slug <span className="font-mono text-indigo-400 font-semibold">/site/{slug}</span>.
        </p>
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors inline-flex items-center gap-2"
        >
          Create Your Own Website <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const { template, customizations, theme, sectionOrder, sectionVisibility } = siteData;

  return (
    <div className="min-h-screen w-full relative">
      {/* Standalone Dynamic Engine Render */}
      <DynamicSiteRenderer
        templateStructure={template?.structure || []}
        customizations={customizations || {}}
        theme={theme || {}}
        sectionOrder={sectionOrder || []}
        sectionVisibility={sectionVisibility || {}}
        mode="public"
      />

      {/* Floating Discreet Branding Badge */}
      <div className="fixed bottom-4 right-4 z-40">
        <Link
          to="/"
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 hover:bg-slate-900 border border-slate-800/80 shadow-2xl text-[11px] font-medium text-slate-300 backdrop-blur-md transition-all hover:scale-105"
        >
          <div className="w-4 h-4 rounded-md bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center">
            <Layers className="w-2.5 h-2.5 text-white" />
          </div>
          <span>Built with <span className="text-indigo-400 font-semibold">Dynamic Engine</span></span>
        </Link>
      </div>
    </div>
  );
};

export default PublicSiteViewerPage;
