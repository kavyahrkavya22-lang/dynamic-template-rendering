import React from 'react';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, Sparkles } from 'lucide-react';

// Safe icon resolver helper
const renderIcon = (iconName, className = 'w-6 h-6') => {
  const IconComponent = LucideIcons[iconName] || LucideIcons.Sparkles;
  return <IconComponent className={className} />;
};

const ServicesSection = ({ data = {}, theme = {} }) => {
  const {
    tagline = 'SERVICES & OFFERINGS',
    title = 'Engineered for Performance and Reliability',
    items = [
      { title: 'Full-Stack Architecture', description: 'Modern React, Next.js, and Node.js solutions built for hyperscale.', icon: 'Code' },
      { title: 'UI/UX Design Systems', description: 'Accessible, scalable component ecosystems tailored for speed.', icon: 'Layout' },
      { title: 'Performance Tuning', description: 'Sub-second page speeds, Web Vital audits, and edge CDN deployments.', icon: 'Zap' },
    ],
  } = data;

  const primaryColor = theme.primaryColor || '#6366f1';
  const radiusClass = theme.borderRadius || 'rounded-2xl';

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          {tagline && (
            <span
              className="text-xs font-bold uppercase tracking-widest block"
              style={{ color: primaryColor }}
            >
              {tagline}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Array.isArray(items) &&
            items.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-8 border border-black/10 bg-black/5 dark:bg-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 group hover:-translate-y-1 shadow-sm ${radiusClass}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white shadow-md transition-transform group-hover:scale-110"
                  style={{ backgroundColor: primaryColor }}
                >
                  {renderIcon(item.icon, 'w-6 h-6 text-white')}
                </div>

                <h3 className="text-xl font-bold tracking-tight mb-2">
                  {item.title}
                </h3>

                <p className="text-sm opacity-75 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
