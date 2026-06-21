import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

const categories = ['All', 'Luxury', 'Standard', 'Spa & Wellness', 'Dining', 'Housekeeping'];

const items = [
  {
    id: 1, category: 'Luxury',
    title: 'Grand Suite Linen Set',
    subtitle: 'Egyptian cotton · 1000TC',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    tag: 'Bestseller',
  },
  {
    id: 2, category: 'Luxury',
    title: 'Concierge Formal Attire',
    subtitle: 'Premium wool blend',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    tag: 'New',
  },
  {
    id: 3, category: 'Dining',
    title: 'Restaurant Server Uniform',
    subtitle: 'Wrinkle-resistant poly-cotton',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    tag: null,
  },
  {
    id: 4, category: 'Spa & Wellness',
    title: 'Spa Robe Collection',
    subtitle: 'Turkish terry · Ultra-soft',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    tag: 'Popular',
  },
  {
    id: 5, category: 'Housekeeping',
    title: 'Housekeeping Uniform',
    subtitle: 'Durable daily-wear blend',
    img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80',
    tag: null,
  },
  {
    id: 6, category: 'Standard',
    title: 'Front Desk Executive Set',
    subtitle: 'Classic corporate look',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    tag: 'New',
  },
  {
    id: 7, category: 'Luxury',
    title: 'Presidential Bedroom Linens',
    subtitle: 'Jacquard weave · Silk-finish',
    img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
    tag: null,
  },
  {
    id: 8, category: 'Spa & Wellness',
    title: 'Premium Bath Towel Set',
    subtitle: 'Zero-twist cotton · 700 GSM',
    img: 'https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=800&q=80',
    tag: 'Bestseller',
  },
  {
    id: 9, category: 'Dining',
    title: 'Chef Uniform — Executive',
    subtitle: 'Breathable comfort fabric',
    img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80',
    tag: null,
  },
];

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function Collections() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered =
    activeCategory === 'All' ? items : items.filter((i) => i.category === activeCategory);

  return (
    <section id="collections" className="bg-[#faf8f3] py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Collections</span>
          </div>
        </FadeUp>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-[#0e0e0e] text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              Our Signature
              <br />
              <em className="text-gold-gradient not-italic">Collections</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-[#6b6b6b] max-w-sm text-sm leading-relaxed font-sans font-light">
              Each collection is thoughtfully curated for specific hotel environments — delivering
              consistent luxury from lobbies to laundry rooms.
            </p>
          </FadeUp>
        </div>

        {/* Filter tabs */}
        <FadeUp delay={0.25}>
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
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

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card-luxury cursor-pointer group bg-white overflow-hidden"
                onClick={() => setSelected(item)}
              >
                <div className="overflow-hidden h-64 relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover img-zoom"
                  />
                  {item.tag && (
                    <span className="absolute top-4 left-4 bg-[#c9a84c] text-white text-[10px] tracking-widest uppercase px-3 py-1 font-sans">
                      {item.tag}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                    <span className="text-white text-xs tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-6 border-b border-l border-r border-[#0e0e0e]/8">
                  <span className="text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase font-sans">
                    {item.category}
                  </span>
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
            <button className="btn-outline-gold px-10 py-4 text-xs tracking-[0.25em] uppercase font-sans">
              View Full Catalogue
            </button>
          </div>
        </FadeUp>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="bg-white max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-72 md:h-96">
                <img src={selected.img} alt={selected.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 bg-white/90 p-2 hover:bg-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-8">
                <span className="text-[#c9a84c] text-[10px] tracking-[0.35em] uppercase font-sans">
                  {selected.category}
                </span>
                <h3 className="font-serif text-3xl text-[#0e0e0e] mt-2 mb-2">{selected.title}</h3>
                <p className="text-[#6b6b6b] text-sm font-sans mb-6">{selected.subtitle}</p>
                <p className="text-[#6b6b6b] text-sm leading-relaxed font-sans font-light mb-8">
                  This collection represents the pinnacle of RoyalDesigns design philosophy — combining
                  durability with elegance. Ideal for properties that demand nothing short of perfection
                  in every guest touchpoint.
                </p>
                <button
                  onClick={() => {
                    setSelected(null);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-gold px-8 py-3 text-xs tracking-[0.2em] uppercase font-sans"
                >
                  Request a Sample
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
