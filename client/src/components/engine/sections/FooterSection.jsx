import React from 'react';
import { Twitter, Github, Linkedin, Globe, Sparkles } from 'lucide-react';

const FooterSection = ({ data = {}, theme = {} }) => {
  const {
    brandName = 'Company Brand',
    brandBio = 'Empowering businesses with intelligent dynamic systems.',
    copyright = '© 2026 All rights reserved.',
    twitterUrl = 'https://twitter.com',
    githubUrl = 'https://github.com',
    linkedinUrl = 'https://linkedin.com',
  } = data;

  const primaryColor = theme.primaryColor || '#6366f1';

  return (
    <footer className="border-t border-black/10 dark:border-white/10 py-12 px-4 sm:px-6 lg:px-8 opacity-90">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-2">
          <h4 className="text-lg font-bold tracking-tight">{brandName}</h4>
          {brandBio && <p className="text-xs opacity-75 max-w-sm">{brandBio}</p>}
        </div>

        <div className="flex items-center gap-4">
          {twitterUrl && (
            <a
              href={twitterUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg border border-black/10 dark:border-white/10 hover:opacity-100 opacity-70 transition-all hover:scale-110"
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg border border-black/10 dark:border-white/10 hover:opacity-100 opacity-70 transition-all hover:scale-110"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg border border-black/10 dark:border-white/10 hover:opacity-100 opacity-70 transition-all hover:scale-110"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-black/5 dark:border-white/5 text-center text-xs opacity-60">
        {copyright}
      </div>
    </footer>
  );
};

export default FooterSection;
