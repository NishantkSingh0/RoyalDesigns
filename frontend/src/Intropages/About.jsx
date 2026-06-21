import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Layers, Globe, Clock, Leaf, Users, Eye, Heart } from 'lucide-react';
import FadeUp from '../HomeComponents/FadeUp';
import Navbar from '../HomeComponents/Navbar';
import Footer from '../HomeComponents/Footer';

/* ── values ── */
const values = [
  { icon: Eye,    title: 'Design First',           desc: 'Every decision we make starts with how it will look, feel, and communicate your brand. Aesthetics are not decoration — they are the point.' },
  { icon: Award,  title: 'Quality Without Compromise', desc: 'We will not produce anything we are not proud of. If a piece is not right, we redo it. Full stop.' },
  { icon: Layers, title: 'Bespoke by Default',     desc: 'We do not do off-the-shelf. Every project starts with your brief and ends with something uniquely yours.' },
  { icon: Heart,  title: 'Genuine Collaboration',  desc: 'You are part of the process — not just an approver at the end. We build things together.' },
  { icon: Leaf,   title: 'Considered Materials',   desc: 'We take fabric sourcing seriously — choosing materials that are durable, comfortable, and responsibly made where possible.' },
  { icon: Users,  title: 'Small Team, Full Focus',  desc: 'We are a small studio on purpose. Every client gets real attention — not a junior account executive.' },
];

/* ── capabilities ── */
const capabilities = [
  { icon: Layers, title: 'Full-Property Attire',     desc: 'From front desk to spa treatment rooms — we can design and produce attire for every department under one consistent vision.' },
  { icon: Eye,    title: 'Visual Identity in Fabric', desc: 'We translate your brand colours, typography, and aesthetic into wearable identity that communicates your hotel without a word.' },
  { icon: Globe,  title: 'Adaptable for Any Context', desc: 'Tropical resort, alpine lodge, urban boutique — our designs are sensitive to climate, culture, and setting.' },
  { icon: Clock,  title: 'Flexible Scale',            desc: 'Whether you need 30 uniforms or 300, we work with your actual size — not a minimum order minimum that does not make sense for you.' },
];

/* ── what we offer ── */
const offerList = [
  'Front office & concierge uniforms',
  'Housekeeping & maintenance wear',
  'Chef whites & F&B staff attire',
  'Spa robes, towels & wellness wear',
  'Executive & management blazers',
  'Premium bedding & linen sets',
  'Seasonal & event-specific attire',
  'Brand identity–integrated accessories',
];

export default function About() {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
      {/* ═══ PAGE HERO ═══ */}
      <section className="relative h-[60vh] min-h-105 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1800&q=80"
            alt="" className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-4 font-sans">About RoyalDesigns</p>
            <h1 className="font-serif text-white text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
              A Studio Built<br />on <em className="text-gold-gradient not-italic">Intention</em>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ═══ ORIGIN STORY ═══ */}
      <section className="bg-[#faf8f3] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeUp>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Our Story</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-serif text-[#0e0e0e] text-4xl lg:text-5xl font-light leading-tight mb-6">
                Started With a<br /><em className="text-gold-gradient not-italic">Frustration</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-[#6b6b6b] leading-relaxed font-sans font-light text-base mb-5">
                RoyalDesigns started because we kept looking at hotel attire and thinking the same thing:
                why does it all look identical? Hotels spend enormous energy building a brand — architecture,
                interiors, menus, playlists — and then hand their staff uniforms from a catalogue.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-[#6b6b6b] leading-relaxed font-sans font-light text-base mb-5">
                That disconnect bothered us enough to do something about it. So we built a studio focused
                entirely on this one problem: making hotel attire feel as deliberate as everything else
                in a well-designed property.
              </p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <p className="text-[#6b6b6b] leading-relaxed font-sans font-light text-base">
                We are at the beginning of that journey. We do not have a long client list or decades of
                history. What we have is genuine conviction, a clear design philosophy, and the drive to
                prove it through the work.
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80"
                alt="" className="w-full h-130 object-cover img-zoom overflow-hidden"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ THE PROBLEM WE'RE SOLVING ═══ */}
      <section className="bg-[#0e0e0e] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                <img src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80" alt="" className="w-full h-60 object-cover img-zoom overflow-hidden" />
                <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80" alt="" className="w-full h-60 object-cover img-zoom overflow-hidden mt-8" />
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" alt="" className="w-full h-48 object-cover img-zoom overflow-hidden" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" alt="" className="w-full h-48 object-cover img-zoom overflow-hidden mt-4" />
              </div>
            </FadeUp>
            <FadeUp>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">The Gap We Saw</span>
              </div>
              <h2 className="font-serif text-white text-4xl lg:text-5xl font-light leading-tight mb-8">
                Attire as a<br /><em className="text-gold-gradient not-italic">Brand Statement</em>
              </h2>
              <p className="text-white/60 text-base font-sans font-light leading-relaxed mb-5">
                A guest forms an impression of your hotel the moment they encounter your staff. That first
                visual — before a word is spoken — is entirely determined by what your team is wearing.
              </p>
              <p className="text-white/60 text-base font-sans font-light leading-relaxed mb-5">
                Yet most hotels treat attire as an operational necessity rather than a brand opportunity.
                Generic cuts, uninspired colours, forgettable details.
              </p>
              <p className="text-white/60 text-base font-sans font-light leading-relaxed">
                We think attire deserves the same level of design intention as your lobby, your restaurant,
                or your room. That is the gap RoyalDesigns is here to fill.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ CAPABILITIES ═══ */}
      <section className="bg-[#faf8f3] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Capabilities</span>
                <div className="w-12 h-px bg-[#c9a84c]" />
              </div>
              <h2 className="font-serif text-[#0e0e0e] text-4xl lg:text-5xl font-light">
                What We <em className="text-gold-gradient not-italic">Bring to the Table</em>
              </h2>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-6">
            {capabilities.map(({ icon: Icon, title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.1}>
                <div className="card-luxury bg-white p-10 flex gap-6 items-start border border-[#0e0e0e]/6">
                  <div className="w-12 h-12 border border-[#c9a84c]/30 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-[#0e0e0e] text-xl mb-2">{title}</h3>
                    <p className="text-[#6b6b6b] text-sm leading-relaxed font-sans font-light">{desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT WE OFFER ═══ */}
      <section className="bg-[#0e0e0e] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Scope of Work</span>
              </div>
              <h2 className="font-serif text-white text-4xl lg:text-5xl font-light leading-tight mb-8">
                What We<br /><em className="text-gold-gradient not-italic">Design & Produce</em>
              </h2>
              <p className="text-white/55 text-sm font-sans font-light leading-relaxed mb-8">
                We cover the full spectrum of hotel attire — so your property can present a unified
                visual identity across every team and every touchpoint.
              </p>
              <ul className="space-y-4">
                {offerList.map((item) => (
                  <li key={item} className="flex items-center gap-4 text-white/70 font-sans text-sm font-light">
                    <div className="w-1.5 h-1.5 bg-[#c9a84c] shrink-0 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('/services')} className="btn-gold mt-10 px-8 py-3 text-xs tracking-[0.25em] uppercase font-sans">
                Explore Services
              </button>
            </FadeUp>
            <FadeUp delay={0.2}>
              <img
                src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80"
                alt="" className="w-full h-130 object-cover img-zoom overflow-hidden"
              />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="bg-[#faf8f3] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">What We Stand For</span>
                <div className="w-12 h-px bg-[#c9a84c]" />
              </div>
              <h2 className="font-serif text-[#0e0e0e] text-4xl lg:text-5xl font-light">
                The Principles We<br /><em className="text-gold-gradient not-italic">Work By</em>
              </h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0e0e0e]/8">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.08}>
                <div className="bg-[#faf8f3] p-10 group hover:bg-white transition-colors duration-300 h-full">
                  <Icon size={24} className="text-[#c9a84c] mb-5 group-hover:scale-110 transition-transform" />
                  <h3 className="font-serif text-[#0e0e0e] text-xl mb-3">{title}</h3>
                  <p className="text-[#6b6b6b] text-sm leading-relaxed font-sans font-light">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VISION ═══ */}
      <section className="bg-[#0e0e0e] py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Where We Are Going</span>
              <div className="w-12 h-px bg-[#c9a84c]" />
            </div>
            <h2 className="font-serif text-white text-4xl lg:text-5xl font-light mb-8">
              Building Towards<br /><em className="text-gold-gradient not-italic">Something Lasting</em>
            </h2>
            <p className="text-white/60 text-base font-sans font-light leading-relaxed mb-6 max-w-2xl mx-auto">
              We are not trying to be the biggest studio. We want to be the most considered one —
              the team that hotels come to when they want attire that actually means something.
            </p>
            <p className="text-white/60 text-base font-sans font-light leading-relaxed mb-6 max-w-2xl mx-auto">
              Right now, we are early. We are building our portfolio, refining our process, and
              looking for our first clients who share this belief: that detail is the difference.
            </p>
            <p className="text-white/60 text-base font-sans font-light leading-relaxed max-w-2xl mx-auto">
              If that resonates, we would love to hear from you — whether you have a project ready
              or just want to explore what is possible.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden h-72 lg:h-96">
        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <FadeUp>
            <p className="text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-4 font-sans">Work With Us</p>
            <h3 className="font-serif text-white text-3xl md:text-5xl font-light mb-8">
              Interested? Let&apos;s Talk.
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/contact')} className="btn-gold px-10 py-4 text-xs tracking-[0.25em] uppercase font-sans">
                Get in Touch
              </button>
              <button onClick={() => navigate('/collections')} className="btn-outline-gold px-10 py-4 text-xs tracking-[0.25em] uppercase font-sans">
                View Collections
              </button>
            </div>
          </FadeUp>
        </div>
      </section>
      <Footer/>

    </>
  );
}
