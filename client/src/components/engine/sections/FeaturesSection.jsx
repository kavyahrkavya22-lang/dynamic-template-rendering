import React from 'react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';

const renderIcon = (iconName, className = 'w-5 h-5') => {
  const IconComponent = LucideIcons[iconName] || LucideIcons.Zap;
  return <IconComponent className={className} />;
};

const FeaturesSection = ({ data = {}, theme = {} }) => {
  const {
    tagline = 'POWERFUL CAPABILITIES',
    title = 'Engineered from the Ground Up for Hyper-Growth',
    subtitle = 'Experience modern architecture designed to scale seamlessly with your highest ambitions.',
    items = [
      { title: 'Sub-Millisecond Response', description: 'Deploy serverless compute clusters across multi-region edge locations worldwide.', icon: 'Zap' },
      { title: 'Zero-Trust Security', description: 'Continuous compliance, automated scanning, and robust granular access control.', icon: 'Shield' },
      { title: 'Real-Time Insights', description: 'Stream metrics in real-time with sub-second precision and anomaly detection.', icon: 'BarChart' },
      { title: 'Team Collaboration', description: 'Shared workspaces, synchronized drafts, and unified developer tooling.', icon: 'Users' },
    ],
  } = data;

  const primaryColor = theme.primaryColor || '#6366f1';
  const radiusClass = theme.borderRadius || 'rounded-2xl';

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
          {subtitle && (
            <p className="text-base opacity-75 max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(items) &&
            items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 border border-black/10 bg-black/5 dark:bg-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all group flex flex-col justify-between shadow-sm ${radiusClass}`}
              >
                <div className="space-y-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {renderIcon(item.icon, 'w-5 h-5 text-white')}
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-75 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
