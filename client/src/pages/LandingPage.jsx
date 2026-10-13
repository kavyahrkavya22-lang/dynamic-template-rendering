import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Layers,
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Globe,
  Sliders,
  Palette,
  Smartphone,
  CheckCircle2,
  Star,
  Play,
  Zap,
} from 'lucide-react';
import { api } from '../utils/api';
import DynamicSiteRenderer from '../components/engine/DynamicSiteRenderer';

const LandingPage = () => {
  const navigate = useNavigate();
  const [featuredTemplates, setFeaturedTemplates] = useState([]);
  const [sandboxThemeColor, setSandboxThemeColor] = useState('#6366f1');
  const [sandboxHeadline, setSandboxHeadline] = useState('Next-Generation Intelligent Cloud Infrastructure');
  const [sandboxFont, setSandboxFont] = useState('Inter');

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await api.get('/templates');
        if (res.success && res.templates) {
          setFeaturedTemplates(res.templates.slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to load templates for landing page:', err);
      }
    };
    fetchTemplates();
  }, []);

  // Sandbox demo schema
  const sandboxSchema = [
    {
      sectionId: 'sandbox-hero',
      sectionType: 'Hero',
      title: 'Hero Preview',
      editableFields: [],
    },
    {
      sectionId: 'sandbox-features',
      sectionType: 'Features',
      title: 'Features Preview',
      editableFields: [],
    },
  ];

  const sandboxCustomizations = {
    'sandbox-hero': {
      badge: '⚡ Real-Time Engine Active',
      title: sandboxHeadline,
      subtitle: 'Change colors, typography, or content below to see the dynamic rendering engine update instantly with zero page reloads.',
      primaryCtaText: 'Test Action Button',
      secondaryCtaText: 'Explore More',
      heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      layoutStyle: 'split',
    },
    'sandbox-features': {
      tagline: 'INSTANT ARCHITECTURE',
      title: 'Powered by Dynamic JSON Schemas',
      subtitle: 'One unified engine renders every page component effortlessly.',
      items: [
        { title: 'Sub-second Speed', description: 'Zero page compilation lag.', icon: 'Zap' },
        { title: 'Full Customization', description: 'Modify any field dynamically.', icon: 'Sliders' },
      ],
    },
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 sm:pt-24 px-4 sm:px-6 lg:px-8 text-center">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/25 via-cyan-500/20 to-purple-600/25 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 backdrop-blur-md shadow-lg shadow-indigo-500/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Next-Gen MERN Architecture • Zero Hardcoded Pages</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            Turn <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">JSON Schemas</span> Into Live Websites in Seconds
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Browse production-ready templates, customize typography, colors, layout, and content through a real-time live editor, and publish standalone shareable websites on the fly.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Link
              to="/templates"
              className="px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 flex items-center gap-2"
            >
              Browse Template Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. INTERACTIVE LIVE SANDBOX TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                <Sliders className="w-4 h-4" />
                Interactive Live Preview Sandbox
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Experience the Dynamic Engine in Real Time
              </h3>
            </div>

            {/* Micro Controls */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[11px] font-medium pl-1">Color:</span>
                {['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setSandboxThemeColor(c)}
                    className={`w-6 h-6 rounded-lg transition-transform ${
                      sandboxThemeColor === c ? 'scale-110 ring-2 ring-white' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[11px] font-medium pl-1">Font:</span>
                <select
                  value={sandboxFont}
                  onChange={(e) => setSandboxFont(e.target.value)}
                  className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="Inter" className="bg-slate-900">Inter</option>
                  <option value="Outfit" className="bg-slate-900">Outfit</option>
                  <option value="Playfair Display" className="bg-slate-900">Playfair Display</option>
                  <option value="Space Grotesk" className="bg-slate-900">Space Grotesk</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sandbox Canvas */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-inner max-h-[440px] overflow-y-auto">
            <DynamicSiteRenderer
              templateStructure={sandboxSchema}
              customizations={sandboxCustomizations}
              theme={{
                primaryColor: sandboxThemeColor,
                secondaryColor: '#3b82f6',
                accentColor: '#10b981',
                backgroundColor: '#0f172a',
                textColor: '#f8fafc',
                fontFamily: sandboxFont,
                borderRadius: 'rounded-2xl',
              }}
              mode="preview"
            />
          </div>
        </div>
      </section>

      {/* 3. FEATURE HIGHLIGHTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            WHY DYNAMIC ENGINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Architected for Modern Flexibility & Speed
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Everything is driven by pure schema contracts rather than inflexible static code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Schema-Driven Customizer',
              description: 'Form fields generate dynamically based on the selected template schema with zero manual wiring.',
              icon: Sliders,
              color: 'text-indigo-400',
              bg: 'bg-indigo-950/60 border-indigo-800/40',
            },
            {
              title: 'Single Unified Engine',
              description: 'One React rendering engine resolves and renders any section type (Hero, Services, Pricing, Contact).',
              icon: Cpu,
              color: 'text-cyan-400',
              bg: 'bg-cyan-950/60 border-cyan-800/40',
            },
            {
              title: 'Real-Time Live Canvas',
              description: 'Updates reflect in real time across Desktop, Tablet, and Mobile device preview mockups.',
              icon: Smartphone,
              color: 'text-pink-400',
              bg: 'bg-pink-950/60 border-pink-800/40',
            },
            {
              title: 'Standalone Live Sites',
              description: 'Instant /site/:slug deployment ready for sharing with custom QR code generator.',
              icon: Globe,
              color: 'text-emerald-400',
              bg: 'bg-emerald-950/60 border-emerald-800/40',
            },
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-xl space-y-4 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm ${feat.bg}`}>
                  <Icon className={`w-6 h-6 ${feat.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. TEMPLATE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              POPULAR TEMPLATES
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              Curated for Modern Businesses & Creators
            </h2>
          </div>
          <Link
            to="/templates"
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 shrink-0"
          >
            View All Templates ({featuredTemplates.length}+) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTemplates.map((t) => (
            <div
              key={t._id || t.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 shadow-xl overflow-hidden group transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={t.thumbnail}
                  alt={t.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-950/80 text-indigo-300 border border-indigo-500/30">
                  {t.category}
                </div>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-base font-bold text-white">{t.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{t.description}</p>
                <Link
                  to={`/builder/${t._id || t.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 pt-2"
                >
                  Use this template <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 3-STEP "HOW IT WORKS" PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            SIMPLE WORKFLOW
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            How It Works in 3 Quick Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Pick a Template',
              desc: 'Select from our catalog of responsive SaaS, Portfolio, Restaurant, Fitness, or Agency templates.',
            },
            {
              step: '02',
              title: 'Customize Live',
              desc: 'Tweak copy, upload images, switch color palettes, and change Google Fonts with real-time preview.',
            },
            {
              step: '03',
              title: 'Publish & Share',
              desc: 'Save your site to your dashboard and instantly share the standalone URL or QR code with anyone.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 relative"
            >
              <div className="text-4xl font-extrabold text-indigo-500/30 font-mono">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900/60 via-indigo-950/80 to-purple-950/60 border border-indigo-500/30 p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Generate Your Custom Website?
          </h2>
          <p className="text-sm sm:text-base text-indigo-200 max-w-xl mx-auto">
            Experience the power of JSON-driven architecture today. No credit card required.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/40 transition-all hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link
              to="/templates"
              className="px-8 py-3.5 rounded-xl text-sm font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 transition-all"
            >
              Explore Templates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
