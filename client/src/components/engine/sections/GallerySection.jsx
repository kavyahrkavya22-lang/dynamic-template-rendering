import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Eye, X } from 'lucide-react';

const GallerySection = ({ data = {}, theme = {} }) => {
  const {
    tagline = 'PORTFOLIO & SHOWCASE',
    title = 'Selected Works & Case Studies',
    items = [
      { title: 'Design System', category: 'UI/UX', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', description: 'Comprehensive design system and component library.' },
      { title: 'Trading Terminal', category: 'Fintech', image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80', description: 'Real-time cryptocurrency analytics terminal.' },
      { title: 'Brand Identity', category: 'Branding', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80', description: 'Visual rebranding for architectural firm.' },
      { title: 'Health App', category: 'Mobile', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', description: 'Telehealth patient management platform.' },
    ],
  } = data;

  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const primaryColor = theme.primaryColor || '#6366f1';
  const radiusClass = theme.borderRadius || 'rounded-2xl';

  // Extract unique categories
  const categories = ['All', ...new Set((items || []).map((item) => item.category).filter(Boolean))];

  const filteredItems = activeFilter === 'All'
    ? items
    : (items || []).filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
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

        {/* Category Pills */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === cat
                    ? 'text-white shadow-md'
                    : 'border border-black/10 dark:border-white/10 opacity-70 hover:opacity-100'
                }`}
                style={activeFilter === cat ? { backgroundColor: primaryColor } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {Array.isArray(filteredItems) &&
              filteredItems.map((item, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={idx}
                  className={`group relative overflow-hidden border border-black/10 dark:border-white/10 shadow-lg bg-black/5 dark:bg-white/5 ${radiusClass}`}
                >
                  <div className="relative h-72 sm:h-80 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                    {/* Quick Lightbox Action */}
                    <button
                      onClick={() => setSelectedImage(item)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Content in bottom of card */}
                    <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-2">
                      {item.category && (
                        <span
                          className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-md"
                          style={{ backgroundColor: `${primaryColor}CC` }}
                        >
                          {item.category}
                        </span>
                      )}
                      <h3 className="text-xl font-bold tracking-tight text-white">{item.title}</h3>
                      {item.description && (
                        <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={selectedImage.image} alt={selectedImage.title} className="w-full max-h-[70vh] object-cover" />
            <div className="p-6 space-y-1">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                {selectedImage.category}
              </span>
              <h3 className="text-xl font-bold text-white">{selectedImage.title}</h3>
              <p className="text-sm text-slate-300">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
