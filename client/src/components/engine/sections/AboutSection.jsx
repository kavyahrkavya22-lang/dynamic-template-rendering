import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, TrendingUp } from 'lucide-react';

const AboutSection = ({ data = {}, theme = {} }) => {
  const {
    tagline = 'ABOUT US',
    title = 'Delivering Purpose-Driven Innovation',
    description = 'We blend strategic rigor, human-centered design, and robust engineering to create world-class experiences that drive real business growth.',
    experienceYears = '10+',
    projectsCompleted = '50+',
    clientSatisfaction = '99%',
    aboutImage = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
  } = data;

  const primaryColor = theme.primaryColor || '#6366f1';
  const radiusClass = theme.borderRadius || 'rounded-2xl';

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Image with Stat Overlay */}
        <div className="lg:col-span-6 relative">
          <div className={`relative overflow-hidden shadow-2xl ${radiusClass}`}>
            <img
              src={aboutImage}
              alt="About illustration"
              className="w-full h-[400px] lg:h-[480px] object-cover"
            />
          </div>

          {/* Floating Stat Badge */}
          <div
            className={`absolute -bottom-6 -right-2 sm:right-6 p-4 rounded-2xl shadow-xl bg-slate-900/90 border border-slate-800 text-white backdrop-blur-md flex items-center gap-3`}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white"
              style={{ backgroundColor: primaryColor }}
            >
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xl font-bold">{experienceYears}</p>
              <p className="text-xs text-slate-400 font-medium">Years of Excellence</p>
            </div>
          </div>
        </div>

        {/* Right: Text Content and Metric Cards */}
        <div className="lg:col-span-6 space-y-6">
          {tagline && (
            <span
              className="text-xs font-bold uppercase tracking-widest block"
              style={{ color: primaryColor }}
            >
              {tagline}
            </span>
          )}

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {title}
          </h2>

          <p className="text-base opacity-80 leading-relaxed">
            {description}
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
            <div className={`p-4 rounded-xl border border-black/5 bg-black/5 dark:bg-white/5 space-y-1 ${radiusClass}`}>
              <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: primaryColor }}>
                {experienceYears}
              </div>
              <div className="text-xs font-medium opacity-70">Experience</div>
            </div>

            <div className={`p-4 rounded-xl border border-black/5 bg-black/5 dark:bg-white/5 space-y-1 ${radiusClass}`}>
              <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: primaryColor }}>
                {projectsCompleted}
              </div>
              <div className="text-xs font-medium opacity-70">Shipped</div>
            </div>

            <div className={`p-4 rounded-xl border border-black/5 bg-black/5 dark:bg-white/5 space-y-1 ${radiusClass} col-span-2 sm:col-span-1`}>
              <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: primaryColor }}>
                {clientSatisfaction}
              </div>
              <div className="text-xs font-medium opacity-70">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
