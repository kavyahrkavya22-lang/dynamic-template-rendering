const templatesData = [
  {
    name: 'Nova - SaaS & Cloud Platform',
    category: 'SaaS',
    description: 'Modern, high-converting landing page designed for SaaS products, AI startups, and cloud applications.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tags: ['SaaS', 'Startup', 'Software', 'AI', 'Cloud'],
    isFeatured: true,
    defaultTheme: {
      primaryColor: '#6366f1',
      secondaryColor: '#3b82f6',
      accentColor: '#10b981',
      backgroundColor: '#0f172a',
      textColor: '#f8fafc',
      fontFamily: 'Inter',
      borderRadius: 'rounded-2xl',
    },
    structure: [
      {
        sectionId: 'hero',
        sectionType: 'Hero',
        title: 'Hero Header',
        description: 'Main high-impact opening section with headline, CTA, and hero banner image.',
        editableFields: [
          { fieldName: 'badge', fieldLabel: 'Badge Text', fieldType: 'text', defaultValue: '🚀 Version 3.0 Released • Next-Gen AI Engine' },
          { fieldName: 'title', fieldLabel: 'Main Headline', fieldType: 'text', defaultValue: 'Build and Scale Intelligent Workflows in Minutes' },
          { fieldName: 'subtitle', fieldLabel: 'Subheading', fieldType: 'textarea', defaultValue: 'Empower your engineering team with automated pipelines, real-time analytics, and collaborative cloud tooling designed for modern hyper-growth.' },
          { fieldName: 'primaryCtaText', fieldLabel: 'Primary Button Text', fieldType: 'text', defaultValue: 'Start Free 14-Day Trial' },
          { fieldName: 'primaryCtaLink', fieldLabel: 'Primary Button Link', fieldType: 'text', defaultValue: '#pricing' },
          { fieldName: 'secondaryCtaText', fieldLabel: 'Secondary Button Text', fieldType: 'text', defaultValue: 'Watch Product Demo' },
          { fieldName: 'secondaryCtaLink', fieldLabel: 'Secondary Button Link', fieldType: 'text', defaultValue: '#features' },
          { fieldName: 'heroImage', fieldLabel: 'Hero Visual Image', fieldType: 'image', defaultValue: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80' },
          { fieldName: 'layoutStyle', fieldLabel: 'Hero Layout Style', fieldType: 'select', defaultValue: 'split', options: [{ label: 'Split (Text + Image)', value: 'split' }, { label: 'Centered Minimal', value: 'centered' }, { label: 'Dark Neon Banner', value: 'banner' }] },
        ],
      },
      {
        sectionId: 'features',
        sectionType: 'Features',
        title: 'Platform Capabilities',
        description: 'Highlight key features with icons, descriptions, and dynamic cards.',
        editableFields: [
          { fieldName: 'tagline', fieldLabel: 'Section Tagline', fieldType: 'text', defaultValue: 'WHY NOVA' },
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'Engineered for Performance and Enterprise Reliability' },
          { fieldName: 'subtitle', fieldLabel: 'Section Description', fieldType: 'textarea', defaultValue: 'Everything you need to automate workflows, monitor metrics in real time, and scale infrastructure without the headaches.' },
          {
            fieldName: 'items',
            fieldLabel: 'Feature Items',
            fieldType: 'list',
            defaultValue: [
              { title: 'Instant Microservices Orchestration', description: 'Deploy serverless compute clusters across multi-region edge locations with sub-millisecond response latency.', icon: 'Zap' },
              { title: 'Enterprise-Grade Security', description: 'End-to-end SOC2 Type II compliance, automated vulnerability scanning, and granular role-based access control.', icon: 'Shield' },
              { title: 'Real-Time Telemetry & Insights', description: 'Customizable dashboards with sub-second data streaming and proactive machine learning anomaly detection.', icon: 'BarChart' },
              { title: 'Zero-Config Team Collaboration', description: 'Collaborate with your team across shared workspaces, audit logs, and unified API keys in one dashboard.', icon: 'Users' },
            ],
          },
        ],
      },
      {
        sectionId: 'pricing',
        sectionType: 'Pricing',
        title: 'Pricing & Plans',
        description: 'Showcase clear subscription tiers with feature checklists and call-to-actions.',
        editableFields: [
          { fieldName: 'tagline', fieldLabel: 'Section Tagline', fieldType: 'text', defaultValue: 'FLEXIBLE PLANS' },
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'Simple, Transparent Pricing for Teams of All Sizes' },
          { fieldName: 'subtitle', fieldLabel: 'Section Description', fieldType: 'textarea', defaultValue: 'No hidden fees or surprise overages. Choose the plan that best fits your company trajectory.' },
          {
            fieldName: 'plans',
            fieldLabel: 'Pricing Tiers',
            fieldType: 'list',
            defaultValue: [
              { name: 'Starter', price: '$29', period: '/month', description: 'Ideal for solo founders and early MVP prototypes.', isPopular: false, buttonText: 'Start Free', features: 'Up to 3 team members, 50,000 monthly API calls, Standard community support, 7-day data retention' },
              { name: 'Pro Scale', price: '$79', period: '/month', description: 'Engineered for scaling startups and fast-moving teams.', isPopular: true, buttonText: 'Upgrade to Pro', features: 'Up to 25 team members, 1,000,000 monthly API calls, Priority 24/7 SLA support, Unlimited data retention, Custom webhooks & SSO' },
              { name: 'Enterprise', price: '$249', period: '/month', description: 'Dedicated infrastructure with custom compliance and support.', isPopular: false, buttonText: 'Contact Sales', features: 'Unlimited seats, Dedicated VPC deployment, Custom SLA guarantee, Assigned account architect, Custom security audit' },
            ],
          },
        ],
      },
      {
        sectionId: 'testimonials',
        sectionType: 'Testimonials',
        title: 'Customer Stories',
        description: 'Customer reviews with avatars, star ratings, and quotes.',
        editableFields: [
          { fieldName: 'tagline', fieldLabel: 'Section Tagline', fieldType: 'text', defaultValue: 'TRUSTED WORLDWIDE' },
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'Loved by Over 10,000+ Engineers and Founders' },
          {
            fieldName: 'items',
            fieldLabel: 'Testimonials',
            fieldType: 'list',
            defaultValue: [
              { name: 'Elena Rostova', role: 'CTO at CloudVantage', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', content: 'Nova slashed our deployment cycle from 3 hours to under 4 minutes. The developer velocity we gained is extraordinary.', rating: 5 },
              { name: 'Marcus Sterling', role: 'Head of Infra at Nexus AI', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', content: 'The dynamic schema engine and real-time dashboard analytics give our team complete peace of mind during heavy traffic spikes.', rating: 5 },
              { name: 'Sophia Chen', role: 'Principal Architect at FinPeak', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', content: 'Remarkably clean architecture and flawless uptime. Easily the highest ROI infrastructure investment we made this year.', rating: 5 },
            ],
          },
        ],
      },
      {
        sectionId: 'contact',
        sectionType: 'Contact',
        title: 'Get in Touch',
        description: 'Contact form, headquarters details, and support info.',
        editableFields: [
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'Ready to Accelerate Your Development?' },
          { fieldName: 'subtitle', fieldLabel: 'Subheading', fieldType: 'textarea', defaultValue: 'Have questions about integrations, security compliance, or custom plans? Our team is standing by to help.' },
          { fieldName: 'email', fieldLabel: 'Contact Email', fieldType: 'text', defaultValue: 'support@novacloud.io' },
          { fieldName: 'phone', fieldLabel: 'Support Phone', fieldType: 'text', defaultValue: '+1 (800) 555-0199' },
          { fieldName: 'address', fieldLabel: 'Office Location', fieldType: 'text', defaultValue: '500 Howard Street, Suite 400, San Francisco, CA' },
          { fieldName: 'buttonText', fieldLabel: 'Submit Button Label', fieldType: 'text', defaultValue: 'Send Message' },
        ],
      },
      {
        sectionId: 'footer',
        sectionType: 'Footer',
        title: 'Footer',
        description: 'Brand footer with links and social connections.',
        editableFields: [
          { fieldName: 'brandName', fieldLabel: 'Brand Name', fieldType: 'text', defaultValue: 'Nova Cloud' },
          { fieldName: 'brandBio', fieldLabel: 'Short Bio', fieldType: 'textarea', defaultValue: 'The developer-first infrastructure engine for modern hyper-growth teams worldwide.' },
          { fieldName: 'copyright', fieldLabel: 'Copyright Notice', fieldType: 'text', defaultValue: '© 2026 Nova Technologies Inc. All rights reserved.' },
          { fieldName: 'twitterUrl', fieldLabel: 'Twitter Link', fieldType: 'text', defaultValue: 'https://twitter.com' },
          { fieldName: 'githubUrl', fieldLabel: 'GitHub Link', fieldType: 'text', defaultValue: 'https://github.com' },
          { fieldName: 'linkedinUrl', fieldLabel: 'LinkedIn Link', fieldType: 'text', defaultValue: 'https://linkedin.com' },
        ],
      },
    ],
  },
  {
    name: 'Aura - Creative Portfolio & Studio',
    category: 'Portfolio',
    description: 'Clean, artistic showcase template crafted for designers, digital artists, full-stack engineers, and creative studios.',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    tags: ['Portfolio', 'Designer', 'Developer', 'Creative', 'Minimal'],
    isFeatured: true,
    defaultTheme: {
      primaryColor: '#0ea5e9',
      secondaryColor: '#8b5cf6',
      accentColor: '#f43f5e',
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      fontFamily: 'Outfit',
      borderRadius: 'rounded-3xl',
    },
    structure: [
      {
        sectionId: 'hero',
        sectionType: 'Hero',
        title: 'Portfolio Hero',
        description: 'Personal introduction, specialty headline, and profile avatar.',
        editableFields: [
          { fieldName: 'badge', fieldLabel: 'Status Badge', fieldType: 'text', defaultValue: '✨ Available for Select Client Projects' },
          { fieldName: 'title', fieldLabel: 'Your Headline', fieldType: 'text', defaultValue: 'Crafting Visually Stunning & High-Impact Digital Experiences' },
          { fieldName: 'subtitle', fieldLabel: 'Bio Overview', fieldType: 'textarea', defaultValue: 'Hi, I am Alexander Vance — Senior UI/UX Architect & Full-Stack Creative Developer with over 8 years of experience building award-winning web applications.' },
          { fieldName: 'primaryCtaText', fieldLabel: 'Primary Button', fieldType: 'text', defaultValue: 'View Featured Work' },
          { fieldName: 'primaryCtaLink', fieldLabel: 'Primary Link', fieldType: 'text', defaultValue: '#gallery' },
          { fieldName: 'secondaryCtaText', fieldLabel: 'Secondary Button', fieldType: 'text', defaultValue: 'Get in Touch' },
          { fieldName: 'secondaryCtaLink', fieldLabel: 'Secondary Link', fieldType: 'text', defaultValue: '#contact' },
          { fieldName: 'heroImage', fieldLabel: 'Profile / Hero Image', fieldType: 'image', defaultValue: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80' },
          { fieldName: 'layoutStyle', fieldLabel: 'Layout Style', fieldType: 'select', defaultValue: 'split', options: [{ label: 'Split (Text + Image)', value: 'split' }, { label: 'Centered Minimal', value: 'centered' }] },
        ],
      },
      {
        sectionId: 'about',
        sectionType: 'About',
        title: 'About Me & Skills',
        description: 'Story, experience timeline, and core competencies.',
        editableFields: [
          { fieldName: 'tagline', fieldLabel: 'Tagline', fieldType: 'text', defaultValue: 'MY BACKGROUND' },
          { fieldName: 'title', fieldLabel: 'About Title', fieldType: 'text', defaultValue: 'Bridging the Gap Between Engineering Precision and Design Aesthetics' },
          { fieldName: 'description', fieldLabel: 'Bio Paragraph', fieldType: 'textarea', defaultValue: 'I specialize in building performant, accessible, and delight-inducing web systems. From concept prototyping to production-scale full-stack architecture, I partner with forward-thinking teams to ship memorable products.' },
          { fieldName: 'experienceYears', fieldLabel: 'Years of Experience', fieldType: 'text', defaultValue: '8+' },
          { fieldName: 'projectsCompleted', fieldLabel: 'Projects Shipped', fieldType: 'text', defaultValue: '65+' },
          { fieldName: 'clientSatisfaction', fieldLabel: 'Client Satisfaction', fieldType: 'text', defaultValue: '99%' },
          { fieldName: 'aboutImage', fieldLabel: 'About Photo', fieldType: 'image', defaultValue: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80' },
        ],
      },
      {
        sectionId: 'gallery',
        sectionType: 'Gallery',
        title: 'Featured Projects',
        description: 'Showcase your best case studies with categories and images.',
        editableFields: [
          { fieldName: 'tagline', fieldLabel: 'Tagline', fieldType: 'text', defaultValue: 'PORTFOLIO' },
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'Selected Case Studies & Works' },
          {
            fieldName: 'items',
            fieldLabel: 'Projects',
            fieldType: 'list',
            defaultValue: [
              { title: 'Lumina Design System', category: 'UI/UX & Design Tokens', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', description: 'Comprehensive design system and React component library used by 40+ engineering squads.' },
              { title: 'FinFlow Crypto Terminal', category: 'Fintech Web App', image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80', description: 'High-frequency trading terminal with real-time WebSockets and sub-second chart rendering.' },
              { title: 'Studio Mono Brand Identity', category: 'Brand & 3D Art', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80', description: 'Complete rebrand, 3D product renders, and interactive web experience for an architectural firm.' },
              { title: 'Zenith Health Ecosystem', category: 'Mobile & Web Experience', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', description: 'Patient telehealth dashboard and connected wearable biometric sync engine.' },
            ],
          },
        ],
      },
      {
        sectionId: 'services',
        sectionType: 'Services',
        title: 'What I Offer',
        description: 'Services and offerings with descriptions.',
        editableFields: [
          { fieldName: 'tagline', fieldLabel: 'Tagline', fieldType: 'text', defaultValue: 'CAPABILITIES' },
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'Specialized Creative & Technical Services' },
          {
            fieldName: 'items',
            fieldLabel: 'Services List',
            fieldType: 'list',
            defaultValue: [
              { title: 'Full-Stack Web Development', description: 'Architecting fast, responsive, and robust web applications with React, Next.js, Node.js, and modern cloud stacks.', icon: 'Code' },
              { title: 'UI/UX Design & Prototyping', description: 'High-fidelity Figma wireframes, micro-interactions, responsive design systems, and rapid user testing prototypes.', icon: 'Layout' },
              { title: 'Performance Optimization & SEO', description: 'Auditing and tuning web vitals, bundle size optimization, and modern technical SEO architecture.', icon: 'Zap' },
            ],
          },
        ],
      },
      {
        sectionId: 'contact',
        sectionType: 'Contact',
        title: 'Contact Form',
        description: 'Get in touch for collaborations and opportunities.',
        editableFields: [
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'Let’s Build Something Remarkable Together' },
          { fieldName: 'subtitle', fieldLabel: 'Subheading', fieldType: 'textarea', defaultValue: 'Have a project in mind or want to discuss a new venture? Send a message and I’ll respond within 24 hours.' },
          { fieldName: 'email', fieldLabel: 'Email Address', fieldType: 'text', defaultValue: 'alexander@aurastudio.design' },
          { fieldName: 'phone', fieldLabel: 'Phone Number', fieldType: 'text', defaultValue: '+1 (415) 890-2341' },
          { fieldName: 'address', fieldLabel: 'Based in', fieldType: 'text', defaultValue: 'Brooklyn, New York (Open to Worldwide Remote)' },
          { fieldName: 'buttonText', fieldLabel: 'Button Label', fieldType: 'text', defaultValue: 'Send Inquiry' },
        ],
      },
      {
        sectionId: 'footer',
        sectionType: 'Footer',
        title: 'Footer',
        description: 'Personal copyright and social links.',
        editableFields: [
          { fieldName: 'brandName', fieldLabel: 'Brand Name', fieldType: 'text', defaultValue: 'Aura Studio' },
          { fieldName: 'brandBio', fieldLabel: 'Short Bio', fieldType: 'textarea', defaultValue: 'Crafting thoughtful digital interfaces and impactful web systems for forward-thinking clients.' },
          { fieldName: 'copyright', fieldLabel: 'Copyright Notice', fieldType: 'text', defaultValue: '© 2026 Alexander Vance. All rights reserved.' },
          { fieldName: 'twitterUrl', fieldLabel: 'Twitter', fieldType: 'text', defaultValue: 'https://twitter.com' },
          { fieldName: 'githubUrl', fieldLabel: 'GitHub', fieldType: 'text', defaultValue: 'https://github.com' },
          { fieldName: 'linkedinUrl', fieldLabel: 'LinkedIn', fieldType: 'text', defaultValue: 'https://linkedin.com' },
        ],
      },
    ],
  },
  {
    name: 'L’Ardoise - Gourmet Bistro & Dining',
    category: 'Restaurant',
    description: 'Sophisticated, mouth-watering restaurant template with seasonal menu highlights, chef story, reservation booking, and gallery.',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    tags: ['Restaurant', 'Bistro', 'Food', 'Culinary', 'Bar'],
    isFeatured: false,
    defaultTheme: {
      primaryColor: '#e11d48',
      secondaryColor: '#d97706',
      accentColor: '#10b981',
      backgroundColor: '#1c1917',
      textColor: '#fafaf9',
      fontFamily: 'Playfair Display',
      borderRadius: 'rounded-xl',
    },
    structure: [
      {
        sectionId: 'hero',
        sectionType: 'Hero',
        title: 'Restaurant Hero',
        description: 'Atmospheric headline, reservation CTA, and background imagery.',
        editableFields: [
          { fieldName: 'badge', fieldLabel: 'Badge', fieldType: 'text', defaultValue: '⭐ Michelin Guide Recommended 2025 & 2026' },
          { fieldName: 'title', fieldLabel: 'Headline', fieldType: 'text', defaultValue: 'An Unforgettable Culinary Journey in the Heart of the City' },
          { fieldName: 'subtitle', fieldLabel: 'Description', fieldType: 'textarea', defaultValue: 'Indulge in artisanal farm-to-table cuisine, masterfully paired organic wines, and an intimate candlelit ambiance.' },
          { fieldName: 'primaryCtaText', fieldLabel: 'Primary Button', fieldType: 'text', defaultValue: 'Reserve a Table' },
          { fieldName: 'primaryCtaLink', fieldLabel: 'Primary Link', fieldType: 'text', defaultValue: '#contact' },
          { fieldName: 'secondaryCtaText', fieldLabel: 'Secondary Button', fieldType: 'text', defaultValue: 'Explore Seasonal Menu' },
          { fieldName: 'secondaryCtaLink', fieldLabel: 'Secondary Link', fieldType: 'text', defaultValue: '#services' },
          { fieldName: 'heroImage', fieldLabel: 'Hero Background Image', fieldType: 'image', defaultValue: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80' },
          { fieldName: 'layoutStyle', fieldLabel: 'Layout Style', fieldType: 'select', defaultValue: 'banner', options: [{ label: 'Dark Atmospheric Banner', value: 'banner' }, { label: 'Split (Text + Image)', value: 'split' }] },
        ],
      },
      {
        sectionId: 'about',
        sectionType: 'About',
        title: 'Chef Story & Heritage',
        description: 'Culinary philosophy, local farm sourcing, and executive chef introduction.',
        editableFields: [
          { fieldName: 'tagline', fieldLabel: 'Tagline', fieldType: 'text', defaultValue: 'OUR HERITAGE' },
          { fieldName: 'title', fieldLabel: 'Story Title', fieldType: 'text', defaultValue: 'Passion for Authenticity, Seasonal Ingredients & Time-Honored Craft' },
          { fieldName: 'description', fieldLabel: 'Story Content', fieldType: 'textarea', defaultValue: 'Founded by Executive Chef Henri Dubois, L’Ardoise honors traditional European culinary techniques infused with vibrant coastal flavors. Every dish is a tribute to sustainable local farmers and small-batch vintners.' },
          { fieldName: 'experienceYears', fieldLabel: 'Years of Culinary Art', fieldType: 'text', defaultValue: '15' },
          { fieldName: 'projectsCompleted', fieldLabel: 'Signature Dishes', fieldType: 'text', defaultValue: '40+' },
          { fieldName: 'clientSatisfaction', fieldLabel: 'Guest Rating', fieldType: 'text', defaultValue: '4.9/5' },
          { fieldName: 'aboutImage', fieldLabel: 'Chef Photo', fieldType: 'image', defaultValue: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80' },
        ],
      },
      {
        sectionId: 'services',
        sectionType: 'Services',
        title: 'Seasonal Menu Highlights',
        description: 'Menu dishes, prices, descriptions, and dietary badges.',
        editableFields: [
          { fieldName: 'tagline', fieldLabel: 'Tagline', fieldType: 'text', defaultValue: 'CULINARY DELIGHTS' },
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'Chef Henri’s Signature Creations' },
          {
            fieldName: 'items',
            fieldLabel: 'Menu Items',
            fieldType: 'list',
            defaultValue: [
              { title: 'Pan-Seared Sea Scallops ($38)', description: 'Wild Atlantic scallops served over truffle parsnip purée, crispy pancetta chips, and micro chervil.', icon: 'Utensils' },
              { title: 'Dry-Aged Wagyu Ribeye ($64)', description: 'A5 Miyazaki Wagyu grilled over Japanese Binchotan charcoal, rosemary bone marrow emulsion, roasted heritage carrots.', icon: 'Flame' },
              { title: 'Wild Forest Mushroom Risotto ($32)', description: 'Carnaroli rice, foraged chanterelles and morels, 24-month aged Parmigiano Reggiano, black truffle drizzle.', icon: 'Sparkles' },
              { title: 'Grand Cru Valrhona Fondant ($18)', description: 'Warm molten 70% dark chocolate fondant, Madagascar vanilla bean gelato, candied hazelnut praline.', icon: 'Heart' },
            ],
          },
        ],
      },
      {
        sectionId: 'gallery',
        sectionType: 'Gallery',
        title: 'Ambiance & Dining Rooms',
        description: 'Interior architecture, wine cellar, and private dining space photos.',
        editableFields: [
          { fieldName: 'tagline', fieldLabel: 'Tagline', fieldType: 'text', defaultValue: 'THE EXPERIENCE' },
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'Intimate Dining & Private Cellar' },
          {
            fieldName: 'items',
            fieldLabel: 'Gallery Images',
            fieldType: 'list',
            defaultValue: [
              { title: 'Main Dining Hall', category: 'Ambiance', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', description: 'Candlelit dining tables overlooking the courtyard garden.' },
              { title: 'Private Wine Vault', category: 'Cellar', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80', description: 'Curated collection of over 800 vintage European wines.' },
              { title: 'Cocktail Lounge', category: 'Bar', image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=800&q=80', description: 'Artisanal cocktails crafted with house-made bitters and infusions.' },
              { title: 'Chef’s Table', category: 'Tasting', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80', description: 'Exclusive 7-course tasting counter directly in front of the hearth.' },
            ],
          },
        ],
      },
      {
        sectionId: 'contact',
        sectionType: 'Contact',
        title: 'Table Reservations & Hours',
        description: 'Reservation form, opening hours, and address.',
        editableFields: [
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'Reserve Your Table Tonight' },
          { fieldName: 'subtitle', fieldLabel: 'Subheading', fieldType: 'textarea', defaultValue: 'For parties of 6 or larger, or for private cellar dining inquiries, please contact our concierge directly.' },
          { fieldName: 'email', fieldLabel: 'Reservations Email', fieldType: 'text', defaultValue: 'reservations@lardoise-bistro.com' },
          { fieldName: 'phone', fieldLabel: 'Concierge Direct', fieldType: 'text', defaultValue: '+1 (212) 555-7823' },
          { fieldName: 'address', fieldLabel: 'Address & Hours', fieldType: 'text', defaultValue: '42 Bleeker Street, New York, NY • Tue-Sun 5:00 PM - 11:00 PM' },
          { fieldName: 'buttonText', fieldLabel: 'Button Label', fieldType: 'text', defaultValue: 'Request Reservation' },
        ],
      },
      {
        sectionId: 'footer',
        sectionType: 'Footer',
        title: 'Footer',
        description: 'Footer copyright and social links.',
        editableFields: [
          { fieldName: 'brandName', fieldLabel: 'Brand Name', fieldType: 'text', defaultValue: 'L’Ardoise Gourmet Bistro' },
          { fieldName: 'brandBio', fieldLabel: 'Short Bio', fieldType: 'textarea', defaultValue: 'An artisanal European dining destination celebrating seasonal farm harvests and fine vintage wines.' },
          { fieldName: 'copyright', fieldLabel: 'Copyright Notice', fieldType: 'text', defaultValue: '© 2026 L’Ardoise Hospitality Group. All rights reserved.' },
          { fieldName: 'twitterUrl', fieldLabel: 'Twitter', fieldType: 'text', defaultValue: 'https://instagram.com' },
          { fieldName: 'githubUrl', fieldLabel: 'OpenTable Link', fieldType: 'text', defaultValue: 'https://opentable.com' },
          { fieldName: 'linkedinUrl', fieldLabel: 'TripAdvisor Link', fieldType: 'text', defaultValue: 'https://tripadvisor.com' },
        ],
      },
    ],
  },
  {
    name: 'Apex - High-Performance Fitness & Gym',
    category: 'Fitness',
    description: 'Dynamic, high-energy fitness studio template with program schedules, certified trainer roster, and membership tiers.',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    tags: ['Fitness', 'Gym', 'Training', 'CrossFit', 'Health'],
    isFeatured: false,
    defaultTheme: {
      primaryColor: '#eab308',
      secondaryColor: '#ef4444',
      accentColor: '#06b6d4',
      backgroundColor: '#09090b',
      textColor: '#f4f4f5',
      fontFamily: 'Space Grotesk',
      borderRadius: 'rounded-xl',
    },
    structure: [
      {
        sectionId: 'hero',
        sectionType: 'Hero',
        title: 'Fitness Hero',
        description: 'Bold call to action with gym atmosphere imagery.',
        editableFields: [
          { fieldName: 'badge', fieldLabel: 'Badge', fieldType: 'text', defaultValue: '⚡ FREE 3-DAY VIP PASS AVAILABLE' },
          { fieldName: 'title', fieldLabel: 'Headline', fieldType: 'text', defaultValue: 'Unleash Your Ultimate Strength & Peak Athletic Performance' },
          { fieldName: 'subtitle', fieldLabel: 'Description', fieldType: 'textarea', defaultValue: 'State-of-the-art conditioning equipment, Olympic lifting platforms, recovery plunge zones, and world-class certified coaches.' },
          { fieldName: 'primaryCtaText', fieldLabel: 'Primary Button', fieldType: 'text', defaultValue: 'Claim Your Free Pass' },
          { fieldName: 'primaryCtaLink', fieldLabel: 'Primary Link', fieldType: 'text', defaultValue: '#pricing' },
          { fieldName: 'secondaryCtaText', fieldLabel: 'Secondary Button', fieldType: 'text', defaultValue: 'Explore Class Schedule' },
          { fieldName: 'secondaryCtaLink', fieldLabel: 'Secondary Link', fieldType: 'text', defaultValue: '#services' },
          { fieldName: 'heroImage', fieldLabel: 'Hero Visual Image', fieldType: 'image', defaultValue: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80' },
          { fieldName: 'layoutStyle', fieldLabel: 'Layout Style', fieldType: 'select', defaultValue: 'split', options: [{ label: 'Split (Text + Image)', value: 'split' }, { label: 'Dark Neon Banner', value: 'banner' }] },
        ],
      },
      {
        sectionId: 'features',
        sectionType: 'Features',
        title: 'The Apex Difference',
        description: 'Facility amenities and training advantages.',
        editableFields: [
          { fieldName: 'tagline', fieldLabel: 'Tagline', fieldType: 'text', defaultValue: 'WHY APEX ATHLETICS' },
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'Built for Serious Results & Longevity' },
          { fieldName: 'subtitle', fieldLabel: 'Section Description', fieldType: 'textarea', defaultValue: 'We combine evidence-based sports science with relentless motivation to help you crush every personal record.' },
          {
            fieldName: 'items',
            fieldLabel: 'Facility Features',
            fieldType: 'list',
            defaultValue: [
              { title: 'Olympic Lifting & Turf Zones', description: 'Over 12,000 sq ft of premium rubberized lifting platforms, bumper plates, and 40-yard sprint turf.', icon: 'Dumbbell' },
              { title: 'Hydrotherapy & Infrared Sauna', description: 'Speed up recovery with contrast therapy ice plunges, Finnish steam rooms, and medical-grade infrared saunas.', icon: 'Flame' },
              { title: 'Wearable Biometric Tracking', description: 'Live heart rate zones and power output telemetry broadcasted in real time on overhead displays.', icon: 'Activity' },
              { title: 'Nutrition & Macro Coaching', description: 'Personalized meal frameworks and body composition InBody scans updated monthly with your coach.', icon: 'Award' },
            ],
          },
        ],
      },
      {
        sectionId: 'services',
        sectionType: 'Services',
        title: 'Training Programs & Classes',
        description: 'Class descriptions and intensity ratings.',
        editableFields: [
          { fieldName: 'tagline', fieldLabel: 'Tagline', fieldType: 'text', defaultValue: 'OUR PROGRAMS' },
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'High-Intensity Group & Private Coaching' },
          {
            fieldName: 'items',
            fieldLabel: 'Classes',
            fieldType: 'list',
            defaultValue: [
              { title: 'Apex Hypertrophy & Power', description: 'Periodized barbell training designed to build lean contractile muscle mass and explosive force.', icon: 'Zap' },
              { title: 'Metabolic Conditioning (MetCon)', description: 'Heart-pumping functional fitness circuits combining rowers, kettlebells, and bodyweight plyometrics.', icon: 'Activity' },
              { title: 'Athletic Mobility & Flow', description: 'Joint decompression, dynamic yoga stretching, and mobility drills to eliminate pain and prevent injury.', icon: 'Shield' },
            ],
          },
        ],
      },
      {
        sectionId: 'pricing',
        sectionType: 'Pricing',
        title: 'Membership Tiers',
        description: 'Membership plans and pass options.',
        editableFields: [
          { fieldName: 'tagline', fieldLabel: 'Tagline', fieldType: 'text', defaultValue: 'MEMBERSHIPS' },
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'Flexible Plans. Zero Lock-In Contracts.' },
          {
            fieldName: 'plans',
            fieldLabel: 'Plans List',
            fieldType: 'list',
            defaultValue: [
              { name: 'Core Gym Access', price: '$59', period: '/month', description: '24/7 access to all open floor equipment and turf zones.', isPopular: false, buttonText: 'Join Core', features: '24/7 biometric gym access, Locker rooms & showers, 1 complimentary coach consult, Apex mobile training app' },
              { name: 'All-Access Performance', price: '$119', period: '/month', description: 'Unlimited high-intensity group classes and recovery suite access.', isPopular: true, buttonText: 'Get All-Access', features: 'Everything in Core, Unlimited group fitness classes, Cold plunge & sauna access, Monthly InBody body scans, 2 guest passes/month' },
              { name: 'Elite Private Coaching', price: '$249', period: '/month', description: 'Dedicated personal trainer with customized programming.', isPopular: false, buttonText: 'Book Consult', features: '4 one-on-one personal training sessions, Custom nutrition & macro roadmap, 100% priority class booking, Complete recovery suite VIP access' },
            ],
          },
        ],
      },
      {
        sectionId: 'contact',
        sectionType: 'Contact',
        title: 'Location & Visit Us',
        description: 'Gym address, hours, and pass claim form.',
        editableFields: [
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'Visit the Facility Today' },
          { fieldName: 'subtitle', fieldLabel: 'Subheading', fieldType: 'textarea', defaultValue: 'Stop by for a facility tour or drop us a line to activate your complimentary 3-day VIP trial pass.' },
          { fieldName: 'email', fieldLabel: 'Gym Email', fieldType: 'text', defaultValue: 'info@apexathletics.com' },
          { fieldName: 'phone', fieldLabel: 'Front Desk Phone', fieldType: 'text', defaultValue: '+1 (310) 555-8392' },
          { fieldName: 'address', fieldLabel: 'Location & Hours', fieldType: 'text', defaultValue: '1200 Olympic Blvd, Los Angeles, CA • Open 24/7 for Members' },
          { fieldName: 'buttonText', fieldLabel: 'Button Label', fieldType: 'text', defaultValue: 'Claim VIP Pass' },
        ],
      },
      {
        sectionId: 'footer',
        sectionType: 'Footer',
        title: 'Footer',
        description: 'Footer copyright and social links.',
        editableFields: [
          { fieldName: 'brandName', fieldLabel: 'Brand Name', fieldType: 'text', defaultValue: 'Apex Athletics Club' },
          { fieldName: 'brandBio', fieldLabel: 'Short Bio', fieldType: 'textarea', defaultValue: 'High-performance conditioning facility dedicated to athletic power, recovery, and strength.' },
          { fieldName: 'copyright', fieldLabel: 'Copyright Notice', fieldType: 'text', defaultValue: '© 2026 Apex Athletics LLC. All rights reserved.' },
          { fieldName: 'twitterUrl', fieldLabel: 'Instagram', fieldType: 'text', defaultValue: 'https://instagram.com' },
          { fieldName: 'githubUrl', fieldLabel: 'YouTube', fieldType: 'text', defaultValue: 'https://youtube.com' },
          { fieldName: 'linkedinUrl', fieldLabel: 'TikTok', fieldType: 'text', defaultValue: 'https://tiktok.com' },
        ],
      },
    ],
  },
  {
    name: 'Vanguard - Digital Agency & Studio',
    category: 'Agency',
    description: 'Sleek, bold agency template tailored for digital marketing firms, product incubators, and full-service brand agencies.',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    tags: ['Agency', 'Marketing', 'Creative', 'Business', 'Corporate'],
    isFeatured: false,
    defaultTheme: {
      primaryColor: '#2563eb',
      secondaryColor: '#7c3aed',
      accentColor: '#059669',
      backgroundColor: '#ffffff',
      textColor: '#1e293b',
      fontFamily: 'Plus Jakarta Sans',
      borderRadius: 'rounded-2xl',
    },
    structure: [
      {
        sectionId: 'hero',
        sectionType: 'Hero',
        title: 'Agency Hero',
        description: 'Catchy agency headline, client logos, and primary CTA.',
        editableFields: [
          { fieldName: 'badge', fieldLabel: 'Badge', fieldType: 'text', defaultValue: '🏆 Global Digital Agency of the Year 2025' },
          { fieldName: 'title', fieldLabel: 'Headline', fieldType: 'text', defaultValue: 'We Transform Ambitious Brands Through Digital Innovation' },
          { fieldName: 'subtitle', fieldLabel: 'Subheading', fieldType: 'textarea', defaultValue: 'We partner with Fortune 500 enterprises and hyper-growth venture-backed startups to create transformative brand strategies, digital products, and high-converting campaigns.' },
          { fieldName: 'primaryCtaText', fieldLabel: 'Primary CTA', fieldType: 'text', defaultValue: 'Start a Project With Us' },
          { fieldName: 'primaryCtaLink', fieldLabel: 'Primary Link', fieldType: 'text', defaultValue: '#contact' },
          { fieldName: 'secondaryCtaText', fieldLabel: 'Secondary CTA', fieldType: 'text', defaultValue: 'Explore Our Work' },
          { fieldName: 'secondaryCtaLink', fieldLabel: 'Secondary Link', fieldType: 'text', defaultValue: '#services' },
          { fieldName: 'heroImage', fieldLabel: 'Agency Hero Visual', fieldType: 'image', defaultValue: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80' },
          { fieldName: 'layoutStyle', fieldLabel: 'Layout Style', fieldType: 'select', defaultValue: 'split', options: [{ label: 'Split (Text + Image)', value: 'split' }, { label: 'Centered Minimal', value: 'centered' }] },
        ],
      },
      {
        sectionId: 'about',
        sectionType: 'About',
        title: 'About the Agency',
        description: 'Company stats, culture, and track record.',
        editableFields: [
          { fieldName: 'tagline', fieldLabel: 'Tagline', fieldType: 'text', defaultValue: 'OUR IMPACT' },
          { fieldName: 'title', fieldLabel: 'About Title', fieldType: 'text', defaultValue: 'Over a Decade of Delivering Measurable Business Growth' },
          { fieldName: 'description', fieldLabel: 'Description', fieldType: 'textarea', defaultValue: 'Our multidisciplinary team of 45+ strategists, product designers, and full-stack software architects operate as an extension of your leadership team.' },
          { fieldName: 'experienceYears', fieldLabel: 'Years in Business', fieldType: 'text', defaultValue: '12+' },
          { fieldName: 'projectsCompleted', fieldLabel: 'Global Awards Won', fieldType: 'text', defaultValue: '80+' },
          { fieldName: 'clientSatisfaction', fieldLabel: 'Client Retention Rate', fieldType: 'text', defaultValue: '94%' },
          { fieldName: 'aboutImage', fieldLabel: 'Team Office Photo', fieldType: 'image', defaultValue: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80' },
        ],
      },
      {
        sectionId: 'services',
        sectionType: 'Services',
        title: 'Core Agency Capabilities',
        description: 'List of strategic services.',
        editableFields: [
          { fieldName: 'tagline', fieldLabel: 'Tagline', fieldType: 'text', defaultValue: 'OUR SERVICES' },
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'End-to-End Strategic & Digital Capabilities' },
          {
            fieldName: 'items',
            fieldLabel: 'Services',
            fieldType: 'list',
            defaultValue: [
              { title: 'Brand Identity & Narrative', description: 'Positioning frameworks, tone of voice, visual identity systems, and omni-channel brand guideline toolkits.', icon: 'Sparkles' },
              { title: 'Custom Web & Mobile Engineering', description: 'High-performance React/Node web platforms, iOS/Android apps, and scalable headless commerce architectures.', icon: 'Code' },
              { title: 'Growth Marketing & Paid Acquisition', description: 'Data-driven funnel optimization, multi-channel performance marketing, and predictive conversion rate experiments.', icon: 'BarChart' },
            ],
          },
        ],
      },
      {
        sectionId: 'testimonials',
        sectionType: 'Testimonials',
        title: 'Client Endorsements',
        description: 'Client quotes and feedback.',
        editableFields: [
          { fieldName: 'tagline', fieldLabel: 'Tagline', fieldType: 'text', defaultValue: 'CLIENT REVIEWS' },
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'What Global Leaders Say About Working With Vanguard' },
          {
            fieldName: 'items',
            fieldLabel: 'Reviews',
            fieldType: 'list',
            defaultValue: [
              { name: 'Jonathan Pierce', role: 'VP Marketing at Hyperion Corp', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', content: 'Vanguard revamped our entire corporate identity and web infrastructure in 90 days. Our organic inbound pipeline jumped by 240%.', rating: 5 },
              { name: 'Claire Dubois', role: 'Chief Product Officer at Solaris Health', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80', content: 'Their strategic rigor and execution speed are unmatched. Easily the best agency collaboration in my 15-year career.', rating: 5 },
            ],
          },
        ],
      },
      {
        sectionId: 'contact',
        sectionType: 'Contact',
        title: 'Project Inquiry',
        description: 'Agency project inquiry form and locations.',
        editableFields: [
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'Have an Ambitious Project in Mind?' },
          { fieldName: 'subtitle', fieldLabel: 'Subheading', fieldType: 'textarea', defaultValue: 'Tell us about your objectives, timeline, and budget. Our partner team will connect within 1 business day.' },
          { fieldName: 'email', fieldLabel: 'Inquiries Email', fieldType: 'text', defaultValue: 'hello@vanguardstudio.com' },
          { fieldName: 'phone', fieldLabel: 'Direct Line', fieldType: 'text', defaultValue: '+1 (212) 899-4400' },
          { fieldName: 'address', fieldLabel: 'Studios', fieldType: 'text', defaultValue: 'New York • London • Singapore' },
          { fieldName: 'buttonText', fieldLabel: 'Button Label', fieldType: 'text', defaultValue: 'Request Proposal' },
        ],
      },
      {
        sectionId: 'footer',
        sectionType: 'Footer',
        title: 'Footer',
        description: 'Agency footer and socials.',
        editableFields: [
          { fieldName: 'brandName', fieldLabel: 'Brand Name', fieldType: 'text', defaultValue: 'Vanguard Digital Agency' },
          { fieldName: 'brandBio', fieldLabel: 'Short Bio', fieldType: 'textarea', defaultValue: 'Strategic brand consultancy and digital product studio engineering growth for modern leaders.' },
          { fieldName: 'copyright', fieldLabel: 'Copyright Notice', fieldType: 'text', defaultValue: '© 2026 Vanguard Agency Group. All rights reserved.' },
          { fieldName: 'twitterUrl', fieldLabel: 'Twitter', fieldType: 'text', defaultValue: 'https://twitter.com' },
          { fieldName: 'githubUrl', fieldLabel: 'GitHub', fieldType: 'text', defaultValue: 'https://github.com' },
          { fieldName: 'linkedinUrl', fieldLabel: 'LinkedIn', fieldType: 'text', defaultValue: 'https://linkedin.com' },
        ],
      },
    ],
  },
  {
    name: 'NextSummit - Tech Conference & Summit',
    category: 'Event',
    description: 'Electrifying conference and event template with keynote speaker lineups, multi-track agenda schedules, and ticket passes.',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    tags: ['Event', 'Conference', 'Tech', 'Summit', 'Keynote'],
    isFeatured: false,
    defaultTheme: {
      primaryColor: '#ec4899',
      secondaryColor: '#8b5cf6',
      accentColor: '#3b82f6',
      backgroundColor: '#030712',
      textColor: '#f9fafb',
      fontFamily: 'Montserrat',
      borderRadius: 'rounded-2xl',
    },
    structure: [
      {
        sectionId: 'hero',
        sectionType: 'Hero',
        title: 'Event Hero Banner',
        description: 'Event dates, headline, and ticket registration CTA.',
        editableFields: [
          { fieldName: 'badge', fieldLabel: 'Date & Location Badge', fieldType: 'text', defaultValue: '📅 OCTOBER 14-16, 2026 • SAN FRANCISCO & VIRTUAL' },
          { fieldName: 'title', fieldLabel: 'Event Headline', fieldType: 'text', defaultValue: 'The World’s Premier Summit on Frontier AI & Web Architecture' },
          { fieldName: 'subtitle', fieldLabel: 'Event Description', fieldType: 'textarea', defaultValue: 'Join 3,500+ technology leaders, principal architects, and visionary venture capitalists for 3 days of deep-dive keynotes, hands-on workshops, and networking.' },
          { fieldName: 'primaryCtaText', fieldLabel: 'Primary Button', fieldType: 'text', defaultValue: 'Register for Tickets' },
          { fieldName: 'primaryCtaLink', fieldLabel: 'Primary Link', fieldType: 'text', defaultValue: '#pricing' },
          { fieldName: 'secondaryCtaText', fieldLabel: 'Secondary Button', fieldType: 'text', defaultValue: 'View Conference Agenda' },
          { fieldName: 'secondaryCtaLink', fieldLabel: 'Secondary Link', fieldType: 'text', defaultValue: '#features' },
          { fieldName: 'heroImage', fieldLabel: 'Event Photo', fieldType: 'image', defaultValue: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80' },
          { fieldName: 'layoutStyle', fieldLabel: 'Hero Layout Style', fieldType: 'select', defaultValue: 'banner', options: [{ label: 'Dark Neon Banner', value: 'banner' }, { label: 'Split (Text + Image)', value: 'split' }] },
        ],
      },
      {
        sectionId: 'features',
        sectionType: 'Features',
        title: 'Conference Tracks & Highlights',
        description: 'Key session topics and keynote highlights.',
        editableFields: [
          { fieldName: 'tagline', fieldLabel: 'Tagline', fieldType: 'text', defaultValue: 'WHAT TO EXPECT' },
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: '3 Days of Unfiltered Technical Deep Dives' },
          { fieldName: 'subtitle', fieldLabel: 'Section Description', fieldType: 'textarea', defaultValue: 'Curated sessions by leading practitioners building the next generation of computing.' },
          {
            fieldName: 'items',
            fieldLabel: 'Tracks',
            fieldType: 'list',
            defaultValue: [
              { title: 'Generative AI & Agentic Systems', description: 'Autonomous agent architectures, LLM fine-tuning pipelines, and real-time reasoning models.', icon: 'Sparkles' },
              { title: 'Next-Gen Cloud & Distributed Systems', description: 'Edge computing meshes, multi-tenant stateful databases, and serverless scalability.', icon: 'Zap' },
              { title: 'Security & Zero-Trust Infrastructure', description: 'Post-quantum cryptography, hardware enclaves, and automated supply chain defense.', icon: 'Shield' },
              { title: 'Founder & VC Executive Roundtables', description: 'Private closed-door sessions on venture fundraising, product market fit, and global expansion.', icon: 'Users' },
            ],
          },
        ],
      },
      {
        sectionId: 'pricing',
        sectionType: 'Pricing',
        title: 'Pass Options & Tickets',
        description: 'Conference ticket tiers.',
        editableFields: [
          { fieldName: 'tagline', fieldLabel: 'Tagline', fieldType: 'text', defaultValue: 'GET TICKETS' },
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'Early Bird Passes Available Now' },
          {
            fieldName: 'plans',
            fieldLabel: 'Passes',
            fieldType: 'list',
            defaultValue: [
              { name: 'Virtual Live Stream', price: '$99', period: '/pass', description: 'Full access to all live streamed stages and recorded replays.', isPopular: false, buttonText: 'Buy Virtual Pass', features: 'Access to all 4 live stages, 1-year recording replay library, Virtual networking chat, Digital conference swag pack' },
              { name: 'In-Person All-Access', price: '$499', period: '/pass', description: 'Complete 3-day access to Moscone Center venue in SF.', isPopular: true, buttonText: 'Buy All-Access Pass', features: 'Full venue badge, Access to all workshops & tracks, Daily catered breakfast & lunch, Official opening night mixer party, Exhibition floor pass' },
              { name: 'VIP Executive Pass', price: '$999', period: '/pass', description: 'Exclusive VIP lounge and Speaker dinner access.', isPopular: false, buttonText: 'Buy VIP Pass', features: 'Everything in All-Access, VIP lounge with barista service, Reserved front-row seating, Private Speaker & Founder gala dinner, Fast-track registration' },
            ],
          },
        ],
      },
      {
        sectionId: 'contact',
        sectionType: 'Contact',
        title: 'Venue & Sponsor Inquiries',
        description: 'Sponsor registration and venue details.',
        editableFields: [
          { fieldName: 'title', fieldLabel: 'Section Title', fieldType: 'text', defaultValue: 'Have Questions or Want to Sponsor?' },
          { fieldName: 'subtitle', fieldLabel: 'Subheading', fieldType: 'textarea', defaultValue: 'Get in touch for group ticket discounts, student scholarships, or booth sponsorships.' },
          { fieldName: 'email', fieldLabel: 'Inquiries Email', fieldType: 'text', defaultValue: 'organizers@nextsummit.tech' },
          { fieldName: 'phone', fieldLabel: 'Event Hotline', fieldType: 'text', defaultValue: '+1 (415) 777-2026' },
          { fieldName: 'address', fieldLabel: 'Venue Location', fieldType: 'text', defaultValue: 'Moscone Center, 747 Howard St, San Francisco, CA' },
          { fieldName: 'buttonText', fieldLabel: 'Button Label', fieldType: 'text', defaultValue: 'Contact Organizers' },
        ],
      },
      {
        sectionId: 'footer',
        sectionType: 'Footer',
        title: 'Footer',
        description: 'Conference copyright and social links.',
        editableFields: [
          { fieldName: 'brandName', fieldLabel: 'Brand Name', fieldType: 'text', defaultValue: 'NextSummit 2026' },
          { fieldName: 'brandBio', fieldLabel: 'Short Bio', fieldType: 'textarea', defaultValue: 'The premier international gathering for technology visionaries, systems architects, and engineering pioneers.' },
          { fieldName: 'copyright', fieldLabel: 'Copyright Notice', fieldType: 'text', defaultValue: '© 2026 NextSummit Media Group. All rights reserved.' },
          { fieldName: 'twitterUrl', fieldLabel: 'Twitter', fieldType: 'text', defaultValue: 'https://twitter.com' },
          { fieldName: 'githubUrl', fieldLabel: 'Discord', fieldType: 'text', defaultValue: 'https://discord.com' },
          { fieldName: 'linkedinUrl', fieldLabel: 'LinkedIn', fieldType: 'text', defaultValue: 'https://linkedin.com' },
        ],
      },
    ],
  },
];

const seedTemplates = async () => {
  const Template = require('../models/Template');
  const User = require('../models/User');

  try {
    const count = await Template.countDocuments();
    if (count === 0) {
      console.log('Database empty: Seeding preset templates...');
      await Template.insertMany(templatesData);
      console.log(`Successfully seeded ${templatesData.length} templates.`);
    } else {
      console.log(`Templates collection already populated (${count} templates found).`);
    }

    // Seed Demo User
    const demoUser = await User.findOne({ email: 'demo@example.com' });
    if (!demoUser) {
      console.log('Creating default demo user (demo@example.com / password123)...');
      await User.create({
        name: 'Demo Creator',
        email: 'demo@example.com',
        password: 'password123',
        role: 'user',
      });
      console.log('Demo user created successfully.');
    }

    // Seed Admin User
    const adminUser = await User.findOne({ email: 'admin@example.com' });
    if (!adminUser) {
      console.log('Creating default admin user (admin@example.com / admin123)...');
      await User.create({
        name: 'System Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user created successfully.');
    }
  } catch (error) {
    console.error('Seeding Error:', error.message);
  }
};

module.exports = { templatesData, seedTemplates };
