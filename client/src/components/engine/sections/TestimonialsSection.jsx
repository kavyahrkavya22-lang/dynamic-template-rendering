import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = ({ data = {}, theme = {} }) => {
  const {
    tagline = 'TESTIMONIALS',
    title = 'Loved by Leading Teams Worldwide',
    items = [
      { name: 'Elena Rostova', role: 'CTO at CloudVantage', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', content: 'Our development velocity tripled after moving to this platform. Remarkable reliability.', rating: 5 },
      { name: 'Marcus Sterling', role: 'Head of Product', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', content: 'The dynamic rendering speed and schema customization flexibility are unlike anything on the market.', rating: 5 },
      { name: 'Sophia Chen', role: 'Lead Architect', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', content: 'Incredible developer experience. Highly recommended for any serious web engineering team.', rating: 5 },
    ],
  } = data;

  const primaryColor = theme.primaryColor || '#6366f1';
  const radiusClass = theme.borderRadius || 'rounded-2xl';

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.isArray(items) &&
            items.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-8 border border-black/10 bg-black/5 dark:bg-white/5 flex flex-col justify-between shadow-sm relative overflow-hidden ${radiusClass}`}
              >
                <Quote className="w-8 h-8 opacity-10 absolute top-4 right-4" />

                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-sm opacity-85 leading-relaxed italic">
                    "{item.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-black/10 dark:border-white/10 mt-6">
                  {item.avatar && (
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border border-black/10"
                    />
                  )}
                  <div>
                    <h4 className="text-sm font-bold">{item.name}</h4>
                    <p className="text-xs opacity-60">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
