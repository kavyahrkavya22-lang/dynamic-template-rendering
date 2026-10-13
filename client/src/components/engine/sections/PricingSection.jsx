import React from 'react';
import { Check, Zap } from 'lucide-react';

const PricingSection = ({ data = {}, theme = {}, isEditor = false }) => {
  const {
    tagline = 'PRICING PLANS',
    title = 'Simple, Transparent Pricing',
    subtitle = 'Choose the tier that best fits your workflow and ambitions.',
    plans = [
      { name: 'Starter', price: '$29', period: '/month', description: 'Great for solo developers and small teams.', isPopular: false, buttonText: 'Start Free Trial', features: 'Up to 3 members, 50k API calls, Standard support' },
      { name: 'Pro Scale', price: '$79', period: '/month', description: 'For scaling companies and high traffic.', isPopular: true, buttonText: 'Get Started', features: 'Up to 25 members, 1M API calls, 24/7 SLA support, Custom domains' },
      { name: 'Enterprise', price: '$249', period: '/month', description: 'Dedicated infrastructure and SLA.', isPopular: false, buttonText: 'Contact Sales', features: 'Unlimited seats, Dedicated VPC, Custom security audit' },
    ],
  } = data;

  const primaryColor = theme.primaryColor || '#6366f1';
  const radiusClass = theme.borderRadius || 'rounded-2xl';

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {Array.isArray(plans) &&
            plans.map((plan, idx) => {
              const featureList = typeof plan.features === 'string'
                ? plan.features.split(',').map((f) => f.trim())
                : Array.isArray(plan.features)
                ? plan.features
                : [];

              return (
                <div
                  key={idx}
                  className={`relative p-8 border flex flex-col justify-between transition-all duration-300 ${radiusClass} ${
                    plan.isPopular
                      ? 'border-2 shadow-2xl scale-[1.03] z-10 bg-black/10 dark:bg-white/10'
                      : 'border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 shadow-md'
                  }`}
                  style={plan.isPopular ? { borderColor: primaryColor } : {}}
                >
                  {plan.isPopular && (
                    <div
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white shadow-md flex items-center gap-1"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Zap className="w-3 h-3" /> Most Popular
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-xs opacity-75 mt-1">{plan.description}</p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold tracking-tight" style={{ color: primaryColor }}>
                        {plan.price}
                      </span>
                      <span className="text-xs opacity-75 font-medium">{plan.period}</span>
                    </div>

                    <div className="border-t border-black/10 dark:border-white/10 pt-6 space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider opacity-60">What's included</p>
                      <ul className="space-y-2.5">
                        {featureList.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm opacity-85">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8">
                    <button
                      type="button"
                      onClick={(e) => isEditor && e.preventDefault()}
                      style={plan.isPopular ? { backgroundColor: primaryColor, color: '#ffffff' } : {}}
                      className={`w-full py-3 px-4 font-semibold text-xs uppercase tracking-wider ${radiusClass} transition-all ${
                        plan.isPopular
                          ? 'shadow-lg hover:opacity-95'
                          : 'border border-current opacity-80 hover:opacity-100'
                      }`}
                    >
                      {plan.buttonText || 'Choose Plan'}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
