import React from 'react';
import ThemeApplier from './ThemeApplier';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import FeaturesSection from './sections/FeaturesSection';
import GallerySection from './sections/GallerySection';
import PricingSection from './sections/PricingSection';
import TestimonialsSection from './sections/TestimonialsSection';
import TeamSection from './sections/TeamSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';
import { Edit3 } from 'lucide-react';

const SECTION_COMPONENTS = {
  Hero: HeroSection,
  About: AboutSection,
  Services: ServicesSection,
  Features: FeaturesSection,
  Gallery: GallerySection,
  Pricing: PricingSection,
  Testimonials: TestimonialsSection,
  Team: TeamSection,
  Contact: ContactSection,
  Footer: FooterSection,
};

const DynamicSiteRenderer = ({
  templateStructure = [],
  customizations = {},
  theme = {},
  sectionOrder = [],
  sectionVisibility = {},
  mode = 'preview', // 'editor' | 'preview' | 'public'
  activeSection = null,
  onSelectSection = () => {},
  className = '',
}) => {
  const isEditor = mode === 'editor';

  // Determine section display order
  let orderedSections = [];
  if (Array.isArray(sectionOrder) && sectionOrder.length > 0) {
    orderedSections = sectionOrder
      .map((id) => templateStructure.find((s) => s.sectionId === id))
      .filter(Boolean);
  } else {
    orderedSections = templateStructure;
  }

  return (
    <ThemeApplier theme={theme} className={className}>
      <div className="dynamic-site-canvas relative min-h-screen">
        {orderedSections.map((section) => {
          const isVisible = sectionVisibility[section.sectionId] ?? true;
          if (!isVisible && !isEditor) return null;

          const Component = SECTION_COMPONENTS[section.sectionType];
          if (!Component) {
            return (
              <div key={section.sectionId} className="p-8 text-center text-rose-500 bg-rose-500/10">
                Unknown section type: {section.sectionType}
              </div>
            );
          }

          const sectionData = customizations[section.sectionId] || {};
          const isSelected = isEditor && activeSection === section.sectionId;

          return (
            <div
              key={section.sectionId}
              id={section.sectionId}
              onClick={() => isEditor && onSelectSection(section.sectionId)}
              className={`relative transition-all ${
                isEditor
                  ? `cursor-pointer group ${
                      isSelected
                        ? 'editor-section-active ring-2 ring-indigo-500'
                        : 'hover:ring-1 hover:ring-indigo-400/50'
                    }`
                  : ''
              } ${!isVisible && isEditor ? 'opacity-40 grayscale' : ''}`}
            >
              {/* Editor Overlay Badge on Hover / Active */}
              {isEditor && (
                <div
                  className={`absolute top-3 left-3 z-30 px-3 py-1 rounded-lg text-xs font-semibold shadow-lg backdrop-blur-md transition-opacity flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white opacity-100'
                      : 'bg-slate-900/80 text-slate-300 opacity-0 group-hover:opacity-100 border border-slate-700'
                  }`}
                >
                  <Edit3 className="w-3 h-3" />
                  <span>{section.title} ({section.sectionType})</span>
                  {!isVisible && <span className="text-[10px] text-rose-300 ml-1">[Hidden]</span>}
                </div>
              )}

              {/* Render Section Component */}
              <Component
                data={sectionData}
                theme={theme}
                isEditor={isEditor}
                sectionId={section.sectionId}
              />
            </div>
          );
        })}
      </div>
    </ThemeApplier>
  );
};

export default DynamicSiteRenderer;
