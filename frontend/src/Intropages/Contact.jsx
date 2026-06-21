import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle, Clock, MessageSquare, Globe, Layers } from 'lucide-react';
import FadeUp from '../HomeComponents/FadeUp';
import Navbar from '../HomeComponents/Navbar';
import Footer from '../HomeComponents/Footer';

const faqs = [
  { q: 'Do you take on new clients right now?',           a: 'Yes — we are actively looking for our first projects. If you have an attire requirement, reach out and we will have a real conversation about it.' },
  { q: 'What does the process look like from the start?', a: 'We start with a discovery conversation to understand your property, brand, and needs. From there we put together a proposal and, if you are happy, move into the design phase.' },
  { q: 'How long does a typical project take?',           a: 'It depends on scope. A single department could be 4–6 weeks. A full property attire programme would take longer — we will give you a realistic timeline upfront.' },
  { q: 'Can you match our existing brand colours?',       a: 'Yes. Colour accuracy is important to us. We work from your brand guidelines and produce samples for approval before moving to full production.' },
  { q: 'Do you offer samples before a full order?',       a: 'Absolutely. We will not ask you to commit to a full order without seeing and approving physical samples first.' },
  { q: 'What if we are not sure exactly what we need?',   a: "That is fine — it is actually a good place to start. A first conversation does not require a precise brief. We can help you figure out what makes sense." },
];

export default function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', hotel: '', country: '', staff: '', service: '', message: '' });
  const [sent, setSent]   = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setTimeout(() => setSent(true), 500); };

  return (
    <>
    <Navbar/>
      {/* ═══ HERO ═══ */}
      <section className="relative h-[55vh] min-h-95 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1800&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-4 font-sans">Reach Us</p>
            <h1 className="font-serif text-white text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
              Let's Build<br /><em className="text-gold-gradient not-italic">Something Together</em>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ═══ QUICK INFO STRIP ═══ */}
      <section className="bg-[#0e0e0e] py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8">
            {[
              { icon: Mail,  label: 'Email',         value: 'hello@royaldesigns.com' },
              { icon: Phone, label: 'Phone',         value: 'Share your number' },
              { icon: Clock, label: 'Response Time', value: 'Within 24 Hours' },
              { icon: Globe, label: 'Location',      value: 'India · Open to all properties' },
            ].map(({ icon: Icon, label, value }) => (
              <FadeUp key={label}>
                <div className="bg-[#0e0e0e] py-10 px-8 flex items-center gap-4">
                  <Icon size={20} className="text-[#c9a84c] shrink-0" />
                  <div>
                    <p className="text-white/35 text-[10px] tracking-[0.25em] uppercase font-sans">{label}</p>
                    <p className="text-white text-sm font-sans font-light mt-0.5">{value}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAIN FORM + INFO ═══ */}
      <section className="bg-[#faf8f3] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left */}
            <FadeUp>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Start a Project</span>
              </div>
              <h2 className="font-serif text-[#0e0e0e] text-4xl lg:text-5xl font-light leading-tight mb-6">
                Tell Us About<br /><em className="text-gold-gradient not-italic">Your Property</em>
              </h2>
              <p className="text-[#6b6b6b] leading-relaxed font-sans font-light text-base mb-8">
                Tell us about your property and what you are looking for. There is no pressure and no
                commitment — just a conversation to see if we are the right fit for each other.
              </p>

              {/* What to expect */}
              <div className="space-y-4 mb-8">
                {[
                  { icon: MessageSquare, title: 'A Real Conversation',    desc: 'We will get on a call to understand your property, brand, and what you actually need — before talking about anything else.' },
                  { icon: Layers,        title: 'A Tailored Proposal',    desc: 'Based on that conversation, we will put together a proposal specific to your situation — not a template.' },
                  { icon: CheckCircle,   title: 'Samples Before Commitment', desc: 'You will see and approve physical samples before we move to full production. No surprises.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 items-start">
                    <div className="w-9 h-9 border border-[#c9a84c]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={15} className="text-[#c9a84c]" />
                    </div>
                    <div>
                      <p className="text-[#0e0e0e] font-sans text-sm font-medium mb-0.5">{title}</p>
                      <p className="text-[#6b6b6b] text-xs font-sans font-light leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Right — Form */}
            <FadeUp delay={0.2}>
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-20">
                  <CheckCircle size={56} className="text-[#c9a84c] mb-6" />
                  <h3 className="font-serif text-[#0e0e0e] text-3xl mb-3">Message Received</h3>
                  <p className="text-[#6b6b6b] font-sans font-light text-sm max-w-xs">
                    Thank you for reaching out. We will get back to you within 24 hours.
                  </p>
                  <button onClick={() => setSent(false)} className="mt-8 text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-sans hover:underline">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[#0e0e0e]/50 text-[10px] tracking-[0.3em] uppercase font-sans block mb-2">Full Name *</label>
                      <input type="text" name="name" required value={form.name} onChange={handleChange}
                        className="w-full bg-white border border-[#0e0e0e]/15 text-[#0e0e0e] text-sm font-sans font-light px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder-[#0e0e0e]/20"
                        placeholder="XYZ" />
                    </div>
                    <div>
                      <label className="text-[#0e0e0e]/50 text-[10px] tracking-[0.3em] uppercase font-sans block mb-2">Email *</label>
                      <input type="email" name="email" required value={form.email} onChange={handleChange}
                        className="w-full bg-white border border-[#0e0e0e]/15 text-[#0e0e0e] text-sm font-sans font-light px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder-[#0e0e0e]/20"
                        placeholder="xyz@hotel.com" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[#0e0e0e]/50 text-[10px] tracking-[0.3em] uppercase font-sans block mb-2">Hotel / Brand Name</label>
                      <input type="text" name="hotel" value={form.hotel} onChange={handleChange}
                        className="w-full bg-white border border-[#0e0e0e]/15 text-[#0e0e0e] text-sm font-sans font-light px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder-[#0e0e0e]/20"
                        placeholder="The Grand Palace" />
                    </div>
                    <div>
                      <label className="text-[#0e0e0e]/50 text-[10px] tracking-[0.3em] uppercase font-sans block mb-2">Country</label>
                      <input type="text" name="country" value={form.country} onChange={handleChange}
                        className="w-full bg-white border border-[#0e0e0e]/15 text-[#0e0e0e] text-sm font-sans font-light px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder-[#0e0e0e]/20"
                        placeholder="India" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[#0e0e0e]/50 text-[10px] tracking-[0.3em] uppercase font-sans block mb-2">Staff Count</label>
                      <select name="staff" value={form.staff} onChange={handleChange}
                        className="w-full bg-white border border-[#0e0e0e]/15 text-[#0e0e0e]/70 text-sm font-sans font-light px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors">
                        <option value="">Select range</option>
                        <option>1–50 staff</option>
                        <option>50–200 staff</option>
                        <option>200–500 staff</option>
                        <option>500–1000 staff</option>
                        <option>1000+ staff</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[#0e0e0e]/50 text-[10px] tracking-[0.3em] uppercase font-sans block mb-2">Service Required</label>
                      <select name="service" value={form.service} onChange={handleChange}
                        className="w-full bg-white border border-[#0e0e0e]/15 text-[#0e0e0e]/70 text-sm font-sans font-light px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors">
                        <option value="">Select a service</option>
                        <option>Bespoke Tailoring</option>
                        <option>Brand Identity Design</option>
                        <option>Bulk Supply</option>
                        <option>Seasonal Refresh</option>
                        <option>Full Hotel Outfit</option>
                        <option>Linen & Bedding</option>
                        <option>Spa & Wellness Attire</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[#0e0e0e]/50 text-[10px] tracking-[0.3em] uppercase font-sans block mb-2">Message *</label>
                    <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                      className="w-full bg-white border border-[#0e0e0e]/15 text-[#0e0e0e] text-sm font-sans font-light px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder-[#0e0e0e]/20 resize-none"
                      placeholder="Tell us about your property, requirements, and any specific design ideas..." />
                  </div>
                  <button type="submit" className="btn-gold w-full py-4 text-sm tracking-[0.2em] uppercase font-sans flex items-center justify-center gap-3">
                    <Send size={16} /> Send Enquiry
                  </button>
                </form>
              )}
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ WHERE WE ARE ═══ */}
      <section className="bg-[#0e0e0e] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Where We Are</span>
              </div>
              <h2 className="font-serif text-white text-4xl lg:text-5xl font-light mb-8">
                Based in India,<br /><em className="text-gold-gradient not-italic">Open to Everyone</em>
              </h2>
              <p className="text-white/55 text-sm font-sans font-light leading-relaxed mb-8">
                We are currently based in India. Whether your property is local or international,
                we are happy to work with you — we will sort out logistics as part of the project conversation.
              </p>
              <div className="space-y-5">
                {[
                  { icon: Mail,  label: 'Email',         value: 'hello@royaldesigns.com' },
                  { icon: Clock, label: 'Response Time', value: 'We aim to respond within 24 hours' },
                  { icon: Globe, label: 'Location',      value: 'India — available for projects anywhere' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-5">
                    <div className="w-10 h-10 border border-[#c9a84c]/30 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-[#c9a84c]" />
                    </div>
                    <div>
                      <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-sans">{label}</p>
                      <p className="text-white text-sm font-sans font-light mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <img
                src="https://images.unsplash.com/photo-1567239323990-3c1e4acb7ed8?w=900&q=80"
                alt="India skyline" className="w-full h-96 object-cover img-zoom overflow-hidden"
              />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-[#faf8f3] py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">FAQ</span>
                <div className="w-12 h-px bg-[#c9a84c]" />
              </div>
              <h2 className="font-serif text-[#0e0e0e] text-4xl lg:text-5xl font-light">
                Common <em className="text-gold-gradient not-italic">Questions</em>
              </h2>
            </div>
          </FadeUp>
          <div className="space-y-2">
            {faqs.map(({ q, a }, i) => (
              <FadeUp key={q} delay={i * 0.06}>
                <div className="border border-[#0e0e0e]/10 overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full text-left flex items-center justify-between gap-4 px-8 py-6 bg-white hover:bg-[#faf8f3] transition-colors duration-200"
                  >
                    <span className="font-sans text-sm font-medium text-[#0e0e0e] pr-4">{q}</span>
                    <span className={`text-[#c9a84c] text-lg leading-none shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: activeFaq === i ? 'auto' : 0, opacity: activeFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-8 pb-6 text-[#6b6b6b] text-sm font-sans font-light leading-relaxed bg-white border-t border-[#0e0e0e]/6">
                      {a}
                    </p>
                  </motion.div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="bg-[#0e0e0e] py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <p className="text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-6 font-sans">Still Deciding?</p>
            <h3 className="font-serif text-white text-4xl lg:text-5xl font-light mb-6">
              Book a Free 30-Min<br /><em className="text-gold-gradient not-italic">Discovery Call</em>
            </h3>
            <p className="text-white/50 text-sm font-sans font-light leading-relaxed max-w-md mx-auto mb-10">
              No pitch, no pressure. Just a conversation about your property and whether
              we are the right studio for what you have in mind.
            </p>
            <button onClick={() => window.scrollTo({ top: document.querySelector('form')?.offsetTop - 100, behavior: 'smooth' })}
              className="btn-gold px-12 py-4 text-sm tracking-[0.2em] uppercase font-sans">
              Schedule a Call
            </button>
          </FadeUp>
        </div>
      </section>
      <Footer/>

    </>
  );
}
