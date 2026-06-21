import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const info = [
  { icon: Mail,    label: 'Email',    value: 'hello@royaldesigns.com',     href: 'mailto:hello@royaldesigns.com' },
  { icon: Phone,   label: 'Phone',    value: '+91 98765 43210',        href: 'tel:+919876543210' },
  { icon: MapPin,  label: 'Studio',   value: 'Mumbai, India · Dubai, UAE', href: '#' },
];

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', hotel: '', message: '', service: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => setSent(true), 500);
  };

  return (
    <section id="contact" className="bg-[#0e0e0e] py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Get In Touch</span>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-16">
            Let's Build Something
            <br />
            <em className="text-gold-gradient not-italic">Exceptional Together</em>
          </h2>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left — info + image */}
          <FadeUp delay={0.15}>
            <div>
              <p className="text-white/60 leading-relaxed mb-10 font-sans font-light text-base max-w-md">
                Ready to outfit your property with world-class attire? Share your requirements and our
                team will get back to you within 24 hours with a personalised proposal.
              </p>

              {/* Contact info */}
              <div className="space-y-6 mb-12">
                {info.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-5 group"
                  >
                    <div className="w-10 h-10 border border-[#c9a84c]/30 flex items-center justify-center group-hover:border-[#c9a84c] group-hover:bg-[#c9a84c]/10 transition-all duration-300 shrink-0">
                      <Icon size={16} className="text-[#c9a84c]" />
                    </div>
                    <div>
                      <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-sans">{label}</p>
                      <p className="text-white text-sm font-sans font-light mt-0.5 group-hover:text-[#c9a84c] transition-colors">
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Hotel image */}
              <div className="relative overflow-hidden h-52">
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80"
                  alt="Luxury hotel corridor"
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-[#c9a84c] text-xs tracking-widest uppercase font-sans">Available Globally</p>
                  <p className="text-white font-serif text-lg">Serving 30+ Countries</p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Right — form */}
          <FadeUp delay={0.25}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-20"
              >
                <CheckCircle size={56} className="text-[#c9a84c] mb-6" />
                <h3 className="font-serif text-white text-3xl mb-3">Message Received</h3>
                <p className="text-white/50 font-sans font-light text-sm">
                  Thank you! Our team will reach out within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-sans hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-sans block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text" name="name" required
                      value={form.name} onChange={handleChange}
                      className="w-full bg-transparent border border-white/15 text-white text-sm font-sans font-light px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder-white/20"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-sans block mb-2">
                      Email *
                    </label>
                    <input
                      type="email" name="email" required
                      value={form.email} onChange={handleChange}
                      className="w-full bg-transparent border border-white/15 text-white text-sm font-sans font-light px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder-white/20"
                      placeholder="john@hotel.com"
                    />
                  </div>
                </div>

                {/* Hotel name */}
                <div>
                  <label className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-sans block mb-2">
                    Hotel / Brand Name
                  </label>
                  <input
                    type="text" name="hotel"
                    value={form.hotel} onChange={handleChange}
                    className="w-full bg-transparent border border-white/15 text-white text-sm font-sans font-light px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder-white/20"
                    placeholder="The Grand Palace Hotel"
                  />
                </div>

                {/* Service type */}
                <div>
                  <label className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-sans block mb-2">
                    Service Required
                  </label>
                  <select
                    name="service"
                    value={form.service} onChange={handleChange}
                    className="w-full bg-[#1a1a1a] border border-white/15 text-white/70 text-sm font-sans font-light px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option>Bespoke Tailoring</option>
                    <option>Brand Identity Design</option>
                    <option>Bulk Supply</option>
                    <option>Seasonal Refresh</option>
                    <option>Full Hotel Outfit</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-sans block mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message" required rows={5}
                    value={form.message} onChange={handleChange}
                    className="w-full bg-transparent border border-white/15 text-white text-sm font-sans font-light px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder-white/20 resize-none"
                    placeholder="Tell us about your property, number of staff, and attire requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full py-4 text-sm tracking-[0.2em] uppercase font-sans flex items-center justify-center gap-3"
                >
                  <Send size={16} />
                  Send Enquiry
                </button>
              </form>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
