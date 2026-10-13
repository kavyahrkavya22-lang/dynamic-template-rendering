import React from 'react';

const TeamSection = ({ data = {}, theme = {} }) => {
  const {
    tagline = 'OUR TEAM',
    title = 'World-Class Domain Experts',
    items = [
      { name: 'Dr. Sarah Jenkins', role: 'Head of AI Research', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', bio: 'Former MIT CSAIL fellow specializing in distributed deep learning pipelines.' },
      { name: 'Alex Rivera', role: 'Chief Systems Architect', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', bio: 'Pioneered low-latency edge caching and event-driven microservices.' },
      { name: 'Maya Lin', role: 'VP Product Experience', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', bio: 'Passionate about accessible UI systems and generative creator tooling.' },
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
            items.map((member, idx) => (
              <div
                key={idx}
                className={`p-6 border border-black/10 bg-black/5 dark:bg-white/5 flex flex-col items-center text-center space-y-4 shadow-sm ${radiusClass}`}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover shadow-md border-2"
                  style={{ borderColor: primaryColor }}
                />
                <div>
                  <h4 className="text-lg font-bold">{member.name}</h4>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: primaryColor }}>
                    {member.role}
                  </p>
                </div>
                {member.bio && (
                  <p className="text-xs opacity-75 leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
