import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const IMAGES = [
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1800&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1800&q=80',
];

// Rotating words for animated headline
const words = ['Royalty', 'Elegance', 'Prestige', 'Excellence', 'Perfection', 'Dreams', 'Legacy', 'Vision'];

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const wordRef = useRef(null);
  const wordIndexRef = useRef(0);

  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;
    let frame;
    const cycle = () => {
      wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
      el.textContent = words[wordIndexRef.current];
      el.classList.remove('word-enter');
      void el.offsetWidth; // reflow
      el.classList.add('word-enter');
    };
    const id = setInterval(cycle, 2800);
    el.classList.add('word-enter');
    return () => clearInterval(id);
  }, []);

  const scroll = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen min-h-170 overflow-hidden flex items-center">
      {/* Parallax background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src={IMAGES[0]}
          alt="Luxury hotel attire"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/80" />
      </motion.div>

      {/* Decorative side line */}
      <div className="absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-3">
        <div className="w-px h-24 bg-linear-to-b from-transparent to-[#c9a84c]" />
        <span className="text-[10px] tracking-[0.4em] text-[#c9a84c] uppercase [writing-mode:vertical-rl]">
          Since 2010
        </span>
        <div className="w-px h-24 bg-linear-to-b from-[#c9a84c] to-transparent" />
      </div>

      {/* Hero content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-24 w-full"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="inline-block text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-4 font-sans"
        >
          Premium Hotel Attire
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
          className="font-serif text-white text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-6"
        >
          Crafted For
          <br />
          <span
            ref={wordRef}
            className="text-gold-gradient inline-block"
          >
            Elegance
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="text-white/70 max-w-xl text-base lg:text-lg font-light leading-relaxed mb-10 font-sans"
        >
          Designing world-class hotel attire, from grand luxury suites to everyday
          hospitality wear, with precision, quality, and timeless style.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold px-8 py-4 text-sm tracking-[0.2em] uppercase"
          >
            Explore Collections
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline-gold px-8 py-4 text-sm tracking-[0.2em] uppercase"
          >
            Get a Quote
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex gap-12 mt-16"
        >
          {[
            { num: '500+', label: 'Hotels Served' },
            { num: '15+', label: 'Years Experience' },
            { num: '50K+', label: 'Items Delivered' },
          ].map(({ num, label }) => (
            <div key={label}>
              <p className="font-serif text-3xl text-[#c9a84c] font-light">{num}</p>
              <p className="text-white/50 text-xs tracking-widest uppercase mt-1 font-sans">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={scroll}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-[#c9a84c] transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </motion.button>

      {/* Word-enter keyframes injected via style tag */}
      <style>{`
        @keyframes wordIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .word-enter { animation: wordIn 0.5s ease forwards; }
      `}</style>
    </section>
  );
}
