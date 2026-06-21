import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Filter } from 'lucide-react';
import FadeUp from '../HomeComponents/FadeUp';
import Navbar from '../HomeComponents/Navbar';
import Footer from '../HomeComponents/Footer';

const categories = ['All', 'Luxury', 'Standard', 'Spa & Wellness', 'Dining', 'Housekeeping', 'Executive'];

const items = [
  { id: 1,  category: 'Luxury', title: 'Grand Suite Linen Set', subtitle: 'Egyptian cotton · 1000TC', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', tag: null, detail: 'Hand-finished with RoyalDesigns monogram embroidery. Our most premium linen design — engineered for the best room in the house. Custom thread counts and weave patterns available.' },
  { id: 2,  category: 'Luxury',        title: 'Concierge Formal Blazer',      subtitle: 'Premium Italian wool blend',          img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', tag: null,  detail: 'Structured silhouette with hand-stitched lapels. Fully lined with moisture-wicking interior fabric. Colour and button detail entirely customisable to your brand palette.' },
  { id: 3,  category: 'Dining',        title: 'Restaurant Server Uniform',    subtitle: 'Wrinkle-resistant poly-cotton',       img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', tag: null,  detail: 'Designed for elegance under pressure. This uniform moves with the body, resists spills, and maintains a sharp silhouette through a full service shift.' },
  { id: 4,  category: 'Spa & Wellness',title: 'Spa Robe Design',              subtitle: 'Turkish terry · Ultra-soft 700GSM',   img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', tag: null,  detail: 'Deep-pile Turkish terry on the exterior, silky-smooth lining inside. The kind of robe guests remember — and sometimes try to take home. Available in any colour.' },
  { id: 5,  category: 'Housekeeping',  title: 'Housekeeping Uniform',         subtitle: 'Durable daily-wear stretch blend',    img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80', tag: null,  detail: 'Built for long shifts. Four-way stretch, reinforced seams, hidden pockets — designed to look sharp while standing up to the demands of daily hotel operations.' },
  { id: 6,  category: 'Standard',      title: 'Front Desk Executive Set',     subtitle: 'Classic corporate tailoring',         img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', tag: null,  detail: 'A coordinated set — blazer, trousers or skirt, and shirt — designed for maximum visual coherence across your front-desk team. Every detail aligned to your brand.' },
  { id: 7,  category: 'Luxury',        title: 'Presidential Bedroom Linens',  subtitle: 'Jacquard weave · Silk-finish',        img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80', tag: null,  detail: 'Jacquard-woven patterns unique to your brand, finished with silk trim on pillowcases and duvet edges. The pinnacle of our linen work — made entirely to specification.' },
  { id: 8,  category: 'Spa & Wellness',title: 'Premium Bath Towel Set',       subtitle: 'Zero-twist cotton · 700 GSM',         img: 'https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=800&q=80', tag: null,  detail: 'Zero-twist construction creates ultra-soft loops that stay fluffy wash after wash. Custom embroidery and brand monogramming available on all sizes.' },
  { id: 9,  category: 'Dining',        title: 'Executive Chef Uniform',       subtitle: 'Breathable ventilated fabric',        img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80', tag: null,  detail: 'Double-breasted coat with ventilated side panels and custom embroidery. Designed to be both functional in a working kitchen and visually commanding in an open-kitchen setting.' },
  { id: 10, category: 'Executive',     title: 'GM Signature Blazer',          subtitle: 'Bespoke fine-wool tailoring',         img: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800&q=80', tag: null,  detail: 'For the people who set the tone. A hand-finished blazer in fine wool with your brand details woven into the lining — understated authority, unmistakable quality.' },
  { id: 11, category: 'Standard',      title: 'Valet & Bell Staff Uniform',   subtitle: 'Smart casual workwear',               img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80', tag: null,  detail: 'Polished but approachable — tailored trousers, collared shirt, and a coordinated vest. Designed to look immaculate while being practical for an active, guest-facing role.' },
  { id: 12, category: 'Luxury',        title: 'Bespoke Pillow Collection',    subtitle: 'Custom cover · fill · presentation',  img: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80', tag: null,  detail: 'A fully branded pillow programme — custom covers, fill specifications, and presentation cards. A considered detail that elevates the in-room experience.' },
];

/* ── highlights — honest scope indicators ── */
const highlights = [
  { num: '12',   label: 'Design Categories' },
  { num: '8',    label: 'Fabric Families' },
  { num: '100%', label: 'Custom per Order' },
  { num: '0',    label: 'Off-the-Shelf Items' },
];

export default function Collections() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected]             = useState(null);
  const navigate = useNavigate();

  const filtered = activeCategory === 'All' ? items : items.filter((i) => i.category === activeCategory);

  return (
    <>
    <Navbar/>
      {/* ═══ PAGE HERO ═══ */}
      <section className="relative h-[60vh] min-h-105 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-4 font-sans">Our Portfolio</p>
            <h1 className="font-serif text-white text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
              Signature<br /><em className="text-gold-gradient not-italic">Collections</em>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ═══ HIGHLIGHTS ═══ */}
      <section className="bg-[#0e0e0e] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8">
            {highlights.map(({ num, label }) => (
              <FadeUp key={label}>
                <div className="bg-[#0e0e0e] py-10 px-8 text-center">
                  <p className="font-serif text-4xl text-[#c9a84c] font-light mb-1">{num}</p>
                  <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-sans">{label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FILTER + GRID ═══ */}
      <section className="bg-[#faf8f3] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <FadeUp>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-px bg-[#c9a84c]" />
                  <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Browse All</span>
                </div>
                <h2 className="font-serif text-[#0e0e0e] text-4xl lg:text-5xl font-light">
                  Shop by <em className="text-gold-gradient not-italic">Category</em>
                </h2>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="flex items-center gap-2 text-[#6b6b6b] text-xs font-sans">
                <Filter size={14} />
                <span className="tracking-widest uppercase">Filter</span>
              </div>
            </FadeUp>
          </div>

          {/* Category pills */}
          <FadeUp delay={0.2}>
            <div className="flex flex-wrap gap-2 mb-12">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 text-xs tracking-[0.2em] uppercase font-sans transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-[#0e0e0e] text-white'
                      : 'border border-[#0e0e0e]/20 text-[#0e0e0e]/60 hover:border-[#c9a84c] hover:text-[#c9a84c]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeUp>

          {/* Product grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.article key={item.id} layout
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }} transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="card-luxury cursor-pointer group bg-white overflow-hidden"
                  onClick={() => setSelected(item)}
                >
                  <div className="overflow-hidden h-64 relative">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover img-zoom" />
                    {item.tag && (
                      <span className="absolute top-4 left-4 bg-[#c9a84c] text-white text-[10px] tracking-widest uppercase px-3 py-1 font-sans">{item.tag}</span>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                      <span className="text-white text-xs tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans">View Details</span>
                    </div>
                  </div>
                  <div className="p-6 border-b border-l border-r border-[#0e0e0e]/8">
                    <span className="text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase font-sans">{item.category}</span>
                    <h3 className="font-serif text-[#0e0e0e] text-xl mt-1 mb-1">{item.title}</h3>
                    <p className="text-[#6b6b6b] text-xs font-sans font-light">{item.subtitle}</p>
                    <div className="flex items-center gap-2 mt-4 text-[#c9a84c] text-xs tracking-widest uppercase font-sans">
                      Enquire <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          <FadeUp delay={0.3}>
            <div className="text-center mt-14">
              <button onClick={() => navigate('/contact')} className="btn-outline-gold px-10 py-4 text-xs tracking-[0.25em] uppercase font-sans">
                Request Custom Order
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ HOW WE CRAFT ═══ */}
      <section className="bg-[#0e0e0e] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Craftsmanship</span>
            </div>
            <h2 className="font-serif text-white text-4xl lg:text-5xl font-light leading-tight mb-16">
              How Every Piece<br /><em className="text-gold-gradient not-italic">Is Made</em>
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Fabric Sourcing',    desc: 'We work with quality mills across Egypt, Turkey, Italy, and Japan — selecting the right material based on environment, use-case, and brand feel.',  img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&q=80' },
              { title: 'Pattern Cutting',    desc: 'Digital pattern cutting for precision and consistency. Every silhouette is developed specifically for the role it is designed for — not adapted from something else.',       img: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=700&q=80' },
              { title: 'Quality Review',     desc: 'Every piece goes through a thorough review before it leaves — stitching, colour consistency, fit, and finish. Nothing ships that we would not wear ourselves.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80' },
            ].map(({ title, desc, img }, i) => (
              <FadeUp key={title} delay={i * 0.1}>
                <div className="card-luxury group bg-[#161616] overflow-hidden">
                  <div className="overflow-hidden h-48">
                    <img src={img} alt={title} className="w-full h-full object-cover img-zoom" />
                  </div>
                  <div className="p-8">
                    <div className="w-6 h-px bg-[#c9a84c] mb-4 group-hover:w-12 transition-all duration-500" />
                    <h3 className="font-serif text-white text-xl mb-3">{title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed font-sans font-light">{desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FABRIC FAMILIES ═══ */}
      <section className="bg-[#faf8f3] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Materials</span>
                <div className="w-12 h-px bg-[#c9a84c]" />
              </div>
              <h2 className="font-serif text-[#0e0e0e] text-4xl lg:text-5xl font-light">
                Our <em className="text-gold-gradient not-italic">Fabric Families</em>
              </h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#0e0e0e]/8">
            {[
              { name: 'Egyptian Cotton',   note: 'Thread counts 400–1200 · Ultra-long staple · Cool to touch' },
              { name: 'Turkish Terry',     note: 'Zero-twist loops · 550–700 GSM · High absorption' },
              { name: 'Italian Wool',      note: 'Merino & worsted · Year-round weight · Crease-resistant' },
              { name: 'Organic Linen',     note: 'GOTS certified · Breathable · Gets softer over time' },
              { name: 'Performance Poly',  note: 'Wrinkle-free · Quick-dry · Colour-fast to 60°C wash' },
              { name: 'Silk-Cotton Blend', note: 'Drapes beautifully · Skin-soft · Premium lustre' },
              { name: 'Bamboo Viscose',    note: 'Hypoallergenic · Antimicrobial · Eco-conscious choice' },
              { name: 'Jacquard Weave',    note: 'Custom patterns · Structural elegance · Brand-specific' },
            ].map(({ name, note }, i) => (
              <FadeUp key={name} delay={i * 0.06}>
                <div className="bg-[#faf8f3] hover:bg-white p-8 transition-colors duration-300 h-full">
                  <div className="w-4 h-4 rounded-full border-2 border-[#c9a84c] mb-4" />
                  <h4 className="font-serif text-[#0e0e0e] text-base mb-2">{name}</h4>
                  <p className="text-[#6b6b6b] text-xs leading-relaxed font-sans font-light">{note}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden h-72 lg:h-96">
        <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <FadeUp>
            <p className="text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-4 font-sans">Bespoke Orders Welcome</p>
            <h3 className="font-serif text-white text-3xl md:text-5xl font-light mb-8">
              Don't See What You Need?
            </h3>
            <button onClick={() => navigate('/contact')} className="btn-gold px-10 py-4 text-xs tracking-[0.25em] uppercase font-sans">
              Request a Custom Design
            </button>
          </FadeUp>
        </div>
      </section>

      {/* ═══ LIGHTBOX ═══ */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }} transition={{ duration: 0.35 }}
              className="bg-white max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}>
              <div className="relative h-72 md:h-96">
                <img src={selected.img} alt={selected.title} className="w-full h-full object-cover" />
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 bg-white/90 p-2 hover:bg-white transition-colors"><X size={18} /></button>
              </div>
              <div className="p-8">
                <span className="text-[#c9a84c] text-[10px] tracking-[0.35em] uppercase font-sans">{selected.category}</span>
                <h3 className="font-serif text-3xl text-[#0e0e0e] mt-2 mb-1">{selected.title}</h3>
                <p className="text-[#6b6b6b] text-xs font-sans mb-5">{selected.subtitle}</p>
                <p className="text-[#6b6b6b] text-sm leading-relaxed font-sans font-light mb-8">{selected.detail}</p>
                <button onClick={() => { setSelected(null); navigate('/contact'); }}
                  className="btn-gold px-8 py-3 text-xs tracking-[0.2em] uppercase font-sans">
                  Request a Sample
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer/>
    
    </>
  );
}
