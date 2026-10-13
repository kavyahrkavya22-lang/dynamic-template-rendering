import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Sparkles, ArrowRight, Layers } from 'lucide-react';

const TemplateCard = ({ template, onPreview, onUse }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 shadow-xl overflow-hidden flex flex-col justify-between transition-all"
    >
      {/* Thumbnail Container */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-950">
        <img
          src={template.thumbnail}
          alt={template.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-950/80 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
            {template.category}
          </span>
          {template.isFeatured && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 backdrop-blur-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => onPreview(template)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 shadow-lg transition-all flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
          <button
            type="button"
            onClick={() => onUse(template)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
          >
            Use Template <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
            {template.name}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {template.description}
          </p>
        </div>

        {/* Section Tags */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>{template.structure?.length || 0} Dynamic Sections</span>
          </div>

          <button
            type="button"
            onClick={() => onUse(template)}
            className="text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1"
          >
            Customize <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateCard;
