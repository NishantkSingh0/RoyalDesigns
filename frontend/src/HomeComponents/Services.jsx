import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Scissors, Palette, Package, RefreshCw, HeadphonesIcon, Truck } from 'lucide-react';

const services = [
  {
    icon: Scissors,
    title: 'Bespoke Tailoring',
    desc: 'Custom-fit uniforms and attire designed from scratch to your exact specifications — brand-compliant and staff-comfortable.',
    img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&q=80',
  },
  {
    icon: Palette,
    title: 'Brand Identity Design',
    desc: 'Our design team translates your hotel brand into wearable identity — colour palettes, embroidery, and silhouettes.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    icon: Package,
    title: 'Bulk Supply',
    desc: 'Reliable large-scale production with consistent quality for entire hotel chains, resorts, and franchise groups.',
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80',
  },
  {
    icon: RefreshCw,
    title: 'Seasonal Refresh',
    desc: "Keep attire current with bi-annual refreshes aligned to your hotel's seasonal campaigns and aesthetic evolution.",
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=80',
  },
  {
    icon: HeadphonesIcon,
    title: 'Dedicated Support',
    desc: 'A personal account manager for ongoing orders, alterations, re-stocks, and priority consultations.',
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=80',
  },
  {
    icon: Truck,
    title: 'Express Logistics',
    desc: 'Fast-track delivery options for urgent orders — door-to-door globally, with real-time shipment tracking.',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80',
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
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// Full-bleed parallax marquee banner
function MarqueeBanner() {
  const brands = [
    'Luxury Collection', 'Five-Star Quality', 'Hotel Uniforms', 'Premium Linen',
    'Spa Attire', 'Bespoke Design', 'RoyalDesigns', 'Hospitality Wear',
  ];
  const doubled = [...brands, ...brands];
  return (
    <div className="overflow-hidden bg-[#c9a84c] py-4 my-20">
      <div className="marquee-track flex whitespace-nowrap">
        {doubled.map((b, i) => (
          <span key={i} className="mx-8 text-white text-sm tracking-[0.3em] uppercase font-sans font-light">
            {b} <span className="mx-4 opacity-60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section id="services" className="bg-[#0e0e0e] py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">What We Offer</span>
          </div>
        </FadeUp>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              End-to-End
              <br />
              <em className="text-gold-gradient not-italic">Service Excellence</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-white/50 max-w-sm text-sm leading-relaxed font-sans font-light">
              From first sketch to final delivery, every step is handled with the same
              meticulous attention that your guests deserve.
            </p>
          </FadeUp>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc, img }, i) => (
            <FadeUp key={title} delay={i * 0.1}>
              <div className="card-luxury group relative overflow-hidden bg-[#161616] h-full">
                {/* Background image on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 p-8">
                  <div className="w-12 h-12 border border-[#c9a84c]/30 flex items-center justify-center mb-6 group-hover:border-[#c9a84c] group-hover:bg-[#c9a84c]/10 transition-all duration-300">
                    <Icon size={20} className="text-[#c9a84c]" />
                  </div>
                  <h3 className="font-serif text-white text-xl mb-3">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed font-sans font-light">{desc}</p>
                  <div className="w-8 h-px bg-[#c9a84c] mt-6 group-hover:w-16 transition-all duration-500" />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Marquee band */}
      <MarqueeBanner />

      {/* CTA banner with parallax */}
      <div ref={containerRef} className="relative overflow-hidden mx-6 lg:mx-12 h-72 lg:h-96">
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80"
            alt="Luxury hotel lobby"
            className="w-full h-[120%] object-cover mt-[-10%]"
          />
          <div className="absolute inset-0 bg-black/65" />
        </motion.div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-4 font-sans">Ready to Elevate?</p>
          <h3 className="font-serif text-white text-3xl md:text-5xl font-light mb-8">
            Let's Design Your Hotel's Story
          </h3>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold px-10 py-4 text-xs tracking-[0.25em] uppercase font-sans"
          >
            Start a Project
          </button>
        </div>
      </div>
    </section>
  );
}
