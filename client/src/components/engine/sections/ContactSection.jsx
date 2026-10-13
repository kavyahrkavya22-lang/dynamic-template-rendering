import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const ContactSection = ({ data = {}, theme = {}, isEditor = false }) => {
  const {
    title = 'Let’s Start a Conversation',
    subtitle = 'Reach out to our team for partnerships, enterprise solutions, or support inquiries.',
    email = 'hello@example.com',
    phone = '+1 (800) 555-0199',
    address = '100 Market St, San Francisco, CA',
    buttonText = 'Send Message',
  } = data;

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const primaryColor = theme.primaryColor || '#6366f1';
  const radiusClass = theme.borderRadius || 'rounded-2xl';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditor) return;
    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Contact Info & Value Prop */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {title}
            </h2>
            <p className="text-base opacity-75 leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="space-y-5">
            {email && (
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs opacity-60 font-semibold uppercase">Email Us</p>
                  <p className="text-sm font-bold">{email}</p>
                </div>
              </div>
            )}

            {phone && (
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs opacity-60 font-semibold uppercase">Call Us</p>
                  <p className="text-sm font-bold">{phone}</p>
                </div>
              </div>
            )}

            {address && (
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs opacity-60 font-semibold uppercase">Location</p>
                  <p className="text-sm font-bold">{address}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <div className={`p-8 sm:p-10 border border-black/10 bg-black/5 dark:bg-white/5 shadow-xl ${radiusClass}`}>
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Message Sent!</h3>
                <p className="text-xs opacity-75">Thank you for reaching out. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold opacity-80">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold opacity-80">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold opacity-80">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your project or inquiry..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor, color: '#ffffff' }}
                  className={`w-full py-3.5 px-6 font-bold text-sm ${radiusClass} shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2`}
                >
                  <Send className="w-4 h-4" />
                  {buttonText}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
