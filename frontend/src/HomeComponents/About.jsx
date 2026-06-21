import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Layers, Globe, Clock } from 'lucide-react';

const values = [
  { icon: Award,  title: 'Premium Quality',   desc: 'Every piece is crafted from the finest fabrics, inspected for perfection before delivery.' },
  { icon: Layers, title: 'Custom Design',     desc: 'Bespoke attire tailored to your brand identity, color palette, and hotel aesthetic.' },
  { icon: Globe,  title: 'Global Delivery',   desc: 'Reliable worldwide shipping to luxury resorts, boutique hotels, and hospitality chains.' },
  { icon: Clock,  title: 'Timely Excellence', desc: 'On-time delivery guaranteed, with bulk fulfilment capabilities for large properties.' },
];

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const imgRef = useRef(null);
  const imgInView = useInView(imgRef, { once: true, margin: '-80px' });

  return (
    <section id="about" className="bg-[#0e0e0e] py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section label */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Our Story</span>
          </div>
        </FadeUp>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>
            <FadeUp delay={0.1}>
              <h2 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
                Dressing Hotels
                <br />
                <em className="text-gold-gradient not-italic">With Purpose</em>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-white/60 leading-relaxed mb-6 font-sans font-light text-base">
                RoyalDesigns was founded with a singular vision: to bring couture-level craftsmanship to
                the hospitality industry. From the crisp precision of front-desk uniforms to the soft
                luxury of premium bedding, we design attire that communicates your hotel's soul.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-white/60 leading-relaxed mb-10 font-sans font-light text-base">
                Our in-house design team works closely with each property — understanding color
                language, fabric behavior in high-usage environments, and the silent storytelling
                that uniforms perform every single day.
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline-gold text-xs tracking-[0.25em] uppercase px-8 py-3 font-sans"
              >
                Our Services
              </button>
            </FadeUp>
          </div>

          {/* Right — image collage */}
          <motion.div
            ref={imgRef}
            initial={{ opacity: 0, x: 80 }}
            animate={imgInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3">
              <img
                src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80"
                alt="Hotel uniform design"
                className="w-full h-64 object-cover img-zoom overflow-hidden rounded-sm"
              />
              <img
                src="https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&q=80"
                alt="Luxury hotel bedroom linen"
                className="w-full h-64 object-cover img-zoom overflow-hidden rounded-sm mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80"
                alt="Hotel attendant attire"
                className="w-full h-48 object-cover img-zoom overflow-hidden rounded-sm"
              />
              <img
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80"
                alt="Premium towel set"
                className="w-full h-48 object-cover img-zoom overflow-hidden rounded-sm mt-4"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#c9a84c] text-black px-6 py-4 hidden lg:block">
              <p className="font-serif text-3xl font-light leading-none">15+</p>
              <p className="text-[10px] tracking-[0.3em] uppercase mt-1 font-sans">Years of craft</p>
            </div>
          </motion.div>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 mt-24 border border-white/10">
          {values.map(({ icon: Icon, title, desc }, i) => (
            <FadeUp key={title} delay={i * 0.12}>
              <div className="bg-[#0e0e0e] p-8 h-full group hover:bg-[#161616] transition-colors duration-300">
                <Icon size={28} className="text-[#c9a84c] mb-5 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-white text-xl mb-3">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-sans font-light">{desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
