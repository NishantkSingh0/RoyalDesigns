import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scissors, Palette, Package, RefreshCw, HeadphonesIcon, Truck, Check } from 'lucide-react';
import FadeUp from '../HomeComponents/FadeUp';
import Navbar from '../HomeComponents/Navbar';
import Footer from '../HomeComponents/Footer';

/* ── core services ── */
const services = [
  {
    icon: Scissors, title: 'Bespoke Tailoring',
    tagline: 'Every thread placed with intent.',
    img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80',
    desc: 'Our flagship service. We design and manufacture custom attire from scratch for every department in your hotel — all unified under a single brand language.',
    includes: ['Full design consultation', 'Mood boards & fabric samples', 'Staff fitting sessions', 'Unlimited revisions until perfection', 'Branded packaging & delivery'],
  },
  {
    icon: Palette, title: 'Brand Identity Design',
    tagline: 'Your brand, wearable.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    desc: 'We translate your hotel\'s visual identity — logo, colour palette, architectural DNA — into a coherent attire system that speaks your brand even in silence.',
    includes: ['Brand audit & identity analysis', 'Colour story development', 'Typography & embroidery design', 'Cross-department consistency guide', 'Style manual document'],
  },
  {
    icon: Package, title: 'Bulk Supply',
    tagline: 'Scale without compromise.',
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80',
    desc: 'Whether you\'re outfitting a 50-room boutique or a 1,200-room resort chain, our production scales without cutting corners. Same quality from piece one to piece ten thousand.',
    includes: ['MOQ from 50 units', 'Chain & franchise pricing', 'Central storage & regional dispatch', 'Reorder management system', 'Dedicated logistics partner'],
  },
  {
    icon: RefreshCw, title: 'Seasonal Refresh',
    tagline: 'Stay current, always.',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80',
    desc: 'Two collections per year — Summer and Winter — aligned to your seasonal marketing, refreshing staff attire in sync with your hotel\'s evolving aesthetic.',
    includes: ['Bi-annual design preview', 'Seasonal colour updates', 'Existing design evolution', 'Phased rollout support', 'Inventory buyback option'],
  },
  {
    icon: HeadphonesIcon, title: 'Ongoing Support',
    tagline: 'We stay involved.',
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80',
    desc: 'After delivery, we remain available for alterations, reorders, and adjustments. We want the attire to keep working well — and that means staying in the picture after handover.',
    includes: ['Post-delivery alterations', 'Reorder management', 'Fit adjustments as staff changes', 'Ongoing design consultation', 'Direct contact — no ticketing systems'],
  },
  {
    icon: Truck, title: 'Delivery & Logistics',
    tagline: 'Handled with care.',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80',
    desc: 'We coordinate delivery carefully — whether local or international. Proper packaging, clear communication, and involvement through handover to make sure everything arrives as expected.',
    includes: ['Coordinated delivery timeline', 'Careful protective packaging', 'Tracking and communication', 'Handover support', 'Issue resolution if anything goes wrong'],
  },
];

/* ── add-ons ── */
const addons = [
  { title: 'Embroidery & Monogramming', desc: 'Staff name tags, hotel logo, and position titles embroidered with precision.' },
  { title: 'Rush Production',           desc: 'Pre-opening rush orders fulfilled in as little as 10 business days.' },
  { title: 'Fitting Clinic',            desc: 'Our mobile fitting team visits your property for on-site measurements and adjustments.' },
  { title: 'Alterations Programme',     desc: 'Ongoing alterations plan — keep every uniform fitting perfectly as staff changes.' },
  { title: 'Photography Styling',       desc: 'Pre-shoot styling and dressing for hotel brand photography campaigns.' },
  { title: 'Wardrobe Audit',            desc: 'Full assessment of existing attire with upgrade recommendations and ROI analysis.' },
];

/* ── departments served ── */
const depts = [
  { name: 'Front Office',       img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80' },
  { name: 'Housekeeping',       img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80' },
  { name: 'Food & Beverage',    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80' },
  { name: 'Spa & Wellness',     img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80' },
  { name: 'Management',         img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
  { name: 'Security & Valet',   img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80' },
];

/* ── marquee brands ── */
const brands = ['Bespoke Tailoring', 'Luxury Linen', 'Hotel Uniforms', 'Spa Attire', 'Brand Design', 'RoyalDesigns Studio', 'Five-Star Quality', 'Global Delivery'];

export default function Services() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar/>
      {/* ═══ HERO ═══ */}
      <section className="relative h-[60vh] min-h-105 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1800&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-4 font-sans">What We Do</p>
            <h1 className="font-serif text-white text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
              End-to-End<br /><em className="text-gold-gradient not-italic">Service Excellence</em>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="overflow-hidden bg-[#c9a84c] py-4">
        <div className="marquee-track flex whitespace-nowrap">
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className="mx-8 text-white text-sm tracking-[0.3em] uppercase font-sans font-light">
              {b} <span className="mx-4 opacity-60">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ INTRO ═══ */}
      <section className="bg-[#faf8f3] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Our Approach</span>
              </div>
              <h2 className="font-serif text-[#0e0e0e] text-4xl lg:text-5xl font-light leading-tight mb-6">
                More Than Just<br /><em className="text-gold-gradient not-italic">Uniforms</em>
              </h2>
              <p className="text-[#6b6b6b] leading-relaxed font-sans font-light text-base mb-5">
                We do not supply uniforms off a catalogue. We design and produce attire built around
                your brand — so your team looks like they belong to a considered, intentional property,
                not just any hotel.
              </p>
              <p className="text-[#6b6b6b] leading-relaxed font-sans font-light text-base mb-5">
                From the first conversation to the final fitting, the process is collaborative and
                transparent. You know what is happening, when, and why.
              </p>
              <p className="text-[#6b6b6b] leading-relaxed font-sans font-light text-base">
                We are an early-stage studio — which means every client gets genuine focus, not
                a junior account manager and a template response.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80" alt="" className="w-full h-120 object-cover img-zoom overflow-hidden" />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ CORE SERVICES ═══ */}
      <section className="bg-[#0e0e0e] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Core Services</span>
            </div>
            <h2 className="font-serif text-white text-4xl lg:text-5xl font-light mb-16">
              Six Ways We<br /><em className="text-gold-gradient not-italic">Serve You</em>
            </h2>
          </FadeUp>
          <div className="space-y-6">
            {services.map(({ icon: Icon, title, tagline, img, desc, includes }, i) => (
              <FadeUp key={title} delay={i * 0.07}>
                <div className="card-luxury bg-[#161616] overflow-hidden group">
                  <div className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    {/* Image */}
                    <div className="lg:w-2/5 h-64 lg:h-auto overflow-hidden relative shrink-0">
                      <img src={img} alt={title} className="w-full h-full object-cover img-zoom" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                    </div>
                    {/* Content */}
                    <div className="lg:w-3/5 p-10 lg:p-14 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 border border-[#c9a84c]/30 flex items-center justify-center group-hover:border-[#c9a84c] transition-all duration-300">
                          <Icon size={18} className="text-[#c9a84c]" />
                        </div>
                        <p className="text-[#c9a84c] text-xs tracking-[0.35em] uppercase font-sans">{tagline}</p>
                      </div>
                      <h3 className="font-serif text-white text-3xl mb-4">{title}</h3>
                      <p className="text-white/55 text-sm leading-relaxed font-sans font-light mb-6">{desc}</p>
                      <ul className="space-y-2">
                        {includes.map((item) => (
                          <li key={item} className="flex items-center gap-3 text-white/60 text-xs font-sans">
                            <Check size={12} className="text-[#c9a84c] shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DEPARTMENTS SERVED ═══ */}
      <section className="bg-[#faf8f3] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Departments</span>
                <div className="w-12 h-px bg-[#c9a84c]" />
              </div>
              <h2 className="font-serif text-[#0e0e0e] text-4xl lg:text-5xl font-light">
                Every Department,<br /><em className="text-gold-gradient not-italic">Dressed to Impress</em>
              </h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {depts.map(({ name, img }, i) => (
              <FadeUp key={name} delay={i * 0.08}>
                <div className="group relative overflow-hidden aspect-4/3 cursor-default">
                  <img src={img} alt={name} className="w-full h-full object-cover img-zoom" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/55 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="w-6 h-px bg-[#c9a84c] mb-2 group-hover:w-12 transition-all duration-400" />
                    <p className="text-white font-serif text-lg font-light">{name}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ADD-ONS ═══ */}
      <section className="bg-[#0e0e0e] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Add-On Services</span>
            </div>
            <h2 className="font-serif text-white text-4xl lg:text-5xl font-light mb-16">
              The Extras That Make<br /><em className="text-gold-gradient not-italic">All the Difference</em>
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8">
            {addons.map(({ title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.07}>
                <div className="bg-[#0e0e0e] hover:bg-[#161616] p-10 transition-colors duration-300 h-full group">
                  <div className="w-8 h-px bg-[#c9a84c] mb-6 group-hover:w-16 transition-all duration-500" />
                  <h3 className="font-serif text-white text-xl mb-3">{title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed font-sans font-light">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING TIERS ═══ */}
      <section className="bg-[#faf8f3] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Service Tiers</span>
                <div className="w-12 h-px bg-[#c9a84c]" />
              </div>
              <h2 className="font-serif text-[#0e0e0e] text-4xl lg:text-5xl font-light">
                Find Your<br /><em className="text-gold-gradient not-italic">Right Tier</em>
              </h2>
              <p className="text-[#6b6b6b] max-w-lg mx-auto mt-4 text-sm font-sans font-light">
                All pricing is custom-quoted based on your property and requirements. These tiers give
                a sense of scope — reach out and we will put together a proposal that makes sense for you.
              </p>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tier: 'Essentials', tag: null, best: false,
                desc: 'For smaller properties or a single department — a focused starting point.',
                includes: ['Single-department design', 'Standard fabric selection', 'Digital design mockups', 'Two revision rounds', 'Coordinated delivery'],
              },
              {
                tier: 'Prestige', tag: null, best: true,
                desc: 'For properties wanting cohesive attire across multiple departments.',
                includes: ['Multi-department design', 'Premium fabric selection', 'Physical samples before production', 'Iterative revision process', 'Fitting coordination', 'Post-delivery support'],
              },
              {
                tier: 'Grand', tag: null, best: false,
                desc: 'For hotels wanting a complete, end-to-end attire programme.',
                includes: ['Full hotel attire system', 'Full fabric library access', 'In-depth brand identity work', 'Brand style document', 'Seasonal refresh consultation', 'Long-term partnership model'],
              },
            ].map(({ tier, tag, best, desc, includes: inc }) => (
              <FadeUp key={tier}>
                <div className={`h-full p-10 border transition-all duration-300 ${
                  best
                    ? 'bg-[#0e0e0e] border-[#c9a84c] shadow-lg shadow-[#c9a84c]/10'
                    : 'bg-white border-[#0e0e0e]/8 hover:border-[#c9a84c]/40'
                }`}>
                  {tag && <span className="inline-block bg-[#c9a84c] text-white text-[10px] tracking-[0.3em] uppercase px-3 py-1 mb-6 font-sans">{tag}</span>}
                  {!tag && <div className="h-7 mb-6" />}
                  <h3 className={`font-serif text-3xl mb-3 ${best ? 'text-white' : 'text-[#0e0e0e]'}`}>{tier}</h3>
                  <p className={`text-sm font-sans font-light leading-relaxed mb-8 ${best ? 'text-white/60' : 'text-[#6b6b6b]'}`}>{desc}</p>
                  <ul className="space-y-3 mb-10">
                    {inc.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check size={13} className="text-[#c9a84c] shrink-0 mt-0.5" />
                        <span className={`text-xs font-sans ${best ? 'text-white/65' : 'text-[#6b6b6b]'}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => navigate('/contact')} className={`w-full py-3 text-xs tracking-[0.2em] uppercase font-sans ${best ? 'btn-gold' : 'btn-outline-gold'}`}>
                    Get a Quote
                  </button>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden h-72 lg:h-96">
        <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <FadeUp>
            <p className="text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-4 font-sans">Let's Talk</p>
            <h3 className="font-serif text-white text-3xl md:text-5xl font-light mb-8">
              Ready to Transform Your Team's Look?
            </h3>
            <button onClick={() => navigate('/contact')} className="btn-gold px-10 py-4 text-xs tracking-[0.25em] uppercase font-sans">
              Start a Conversation
            </button>
          </FadeUp>
        </div>
      </section>
      <Footer/>
    </>
  );
}
