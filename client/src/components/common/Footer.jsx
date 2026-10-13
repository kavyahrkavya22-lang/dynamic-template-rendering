import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Sparkles, Heart, Code2, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center shadow-md">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Dynamic<span className="text-indigo-400">Engine</span>
              </span>
            </Link>
            <p className="text-slate-400 max-w-md leading-relaxed text-xs sm:text-sm">
              A modern schema-driven full-stack website generation platform. One dynamic React engine renders any customizable website from pure JSON data.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All API services operational • Built with MERN, Tailwind & Framer Motion
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/templates" className="hover:text-indigo-400 transition-colors">
                  Template Gallery
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-indigo-400 transition-colors">
                  My Websites Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/templates" className="hover:text-indigo-400 transition-colors">
                  Admin Schema Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Architecture Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Key Architecture</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Schema-Driven Fields
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                Standalone /site/:slug
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                Zero Hardcoded Pages
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Dynamic Template Rendering Engine. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for web architecture demos.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
