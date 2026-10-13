import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, PlayCircle } from 'lucide-react';

const HeroSection = ({ data = {}, theme = {}, isEditor = false }) => {
  const {
    badge = '🚀 Launching Version 3.0',
    title = 'Transform Your Digital Presence',
    subtitle = 'Build, scale, and automate your online presence with our next-generation architecture.',
    primaryCtaText = 'Get Started Now',
    primaryCtaLink = '#contact',
    secondaryCtaText = 'Learn More',
    secondaryCtaLink = '#features',
    heroImage = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    layoutStyle = 'split', // 'split' | 'centered' | 'banner'
  } = data;

  const primaryColor = theme.primaryColor || '#6366f1';
  const secondaryColor = theme.secondaryColor || '#3b82f6';
  const accentColor = theme.accentColor || '#10b981';
  const radiusClass = theme.borderRadius || 'rounded-2xl';

  // Centered Minimalist Layout
  if (layoutStyle === 'centered') {
    return (
      <section className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
        {/* Subtle background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${primaryColor}, ${secondaryColor})` }}
        />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm border"
              style={{
                backgroundColor: `${primaryColor}15`,
                borderColor: `${primaryColor}40`,
                color: primaryColor,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {badge}
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-4"
          >
            {primaryCtaText && (
              <a
                href={isEditor ? '#!' : primaryCtaLink}
                onClick={(e) => isEditor && e.preventDefault()}
                style={{ backgroundColor: primaryColor }}
                className={`px-6 py-3 text-white font-semibold text-sm ${radiusClass} shadow-lg hover:opacity-95 transition-all inline-flex items-center gap-2`}
              >
                {primaryCtaText}
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
            {secondaryCtaText && (
              <a
                href={isEditor ? '#!' : secondaryCtaLink}
                onClick={(e) => isEditor && e.preventDefault()}
                className={`px-6 py-3 font-semibold text-sm ${radiusClass} border border-current opacity-80 hover:opacity-100 transition-all inline-flex items-center gap-2`}
              >
                {secondaryCtaText}
              </a>
            )}
          </motion.div>

          {heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className={`mt-12 overflow-hidden shadow-2xl border border-black/10 ${radiusClass}`}
            >
              <img src={heroImage} alt="Hero preview" className="w-full max-h-[480px] object-cover" />
            </motion.div>
          )}
        </div>
      </section>
    );
  }

  // Dark Atmospheric Banner Layout
  if (layoutStyle === 'banner') {
    return (
      <section className="relative min-h-[550px] lg:min-h-[620px] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden text-white">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Hero banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 py-20 space-y-6">
          {badge && (
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md border"
              style={{
                backgroundColor: `${primaryColor}30`,
                borderColor: `${primaryColor}60`,
                color: '#ffffff',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
              {badge}
            </div>
          )}

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            {title}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {primaryCtaText && (
              <a
                href={isEditor ? '#!' : primaryCtaLink}
                onClick={(e) => isEditor && e.preventDefault()}
                style={{ backgroundColor: primaryColor }}
                className={`px-8 py-3.5 text-white font-bold text-sm ${radiusClass} shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2`}
              >
                {primaryCtaText}
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
            {secondaryCtaText && (
              <a
                href={isEditor ? '#!' : secondaryCtaLink}
                onClick={(e) => isEditor && e.preventDefault()}
                className={`px-8 py-3.5 text-white font-medium text-sm ${radiusClass} bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all inline-flex items-center gap-2`}
              >
                <PlayCircle className="w-4 h-4" />
                {secondaryCtaText}
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Default Split Layout (Text Left / Image Right)
  return (
    <section className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Content */}
        <div className="lg:col-span-7 space-y-6">
          {badge && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border shadow-sm"
              style={{
                backgroundColor: `${primaryColor}15`,
                borderColor: `${primaryColor}35`,
                color: primaryColor,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {badge}
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg opacity-80 max-w-xl leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            {primaryCtaText && (
              <a
                href={isEditor ? '#!' : primaryCtaLink}
                onClick={(e) => isEditor && e.preventDefault()}
                style={{ backgroundColor: primaryColor }}
                className={`px-6 py-3.5 text-white font-semibold text-sm ${radiusClass} shadow-lg hover:shadow-xl hover:opacity-95 transition-all inline-flex items-center gap-2`}
              >
                {primaryCtaText}
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
            {secondaryCtaText && (
              <a
                href={isEditor ? '#!' : secondaryCtaLink}
                onClick={(e) => isEditor && e.preventDefault()}
                className={`px-6 py-3.5 font-semibold text-sm ${radiusClass} border border-current opacity-80 hover:opacity-100 transition-all inline-flex items-center gap-2`}
              >
                {secondaryCtaText}
              </a>
            )}
          </motion.div>
        </div>

        {/* Right Column: Hero Visual */}
        <div className="lg:col-span-5 relative">
          <div
            className="absolute inset-0 rounded-3xl blur-2xl opacity-30 transform rotate-3 scale-95"
            style={{ backgroundColor: primaryColor }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`relative overflow-hidden shadow-2xl border border-black/10 ${radiusClass}`}
          >
            <img
              src={heroImage}
              alt="Hero Illustration"
              className="w-full h-auto max-h-[460px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
