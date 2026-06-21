import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import FadeUp from '../HomeComponents/FadeUp';
import Navbar from '../HomeComponents/Navbar';
import Footer from '../HomeComponents/Footer';

const words = ['Royalty', 'Elegance', 'Prestige', 'Excellence', 'Perfection', 'Dreams', 'Legacy', 'Vision'];
const cats = [
  { label: 'Luxury Linen',   img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80', path: '/collections' },
  { label: 'Staff Uniforms', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80', path: '/collections' },
  { label: 'Spa Attire',     img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=700&q=80', path: '/collections' },
  { label: 'Dining Wear',    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80', path: '/collections' },
];

export default function Home() {
  const navigate     = useNavigate();
  const containerRef = useRef(null);
  const wordRef      = useRef(null);
  const wordIdx      = useRef(0);
  const { scrollY }  = useScroll();
  const bgY    = useTransform(scrollY, [0, 600], [0, 200]);
  const heroOp = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;
    el.classList.add('word-enter');
    const id = setInterval(() => {
      wordIdx.current = (wordIdx.current + 1) % words.length;
      el.textContent = words[wordIdx.current];
      el.classList.remove('word-enter');
      void el.offsetWidth;
      el.classList.add('word-enter');
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <>
    <Navbar/>
      {/* ═══ HERO ═══ */}
      <section className="relative h-screen min-h-170 overflow-hidden flex items-center">
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1800&q=80"
            alt="Luxury hotel" className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/80" />
        </motion.div>

        <motion.div style={{ opacity: heroOp }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-24 w-full">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="inline-block text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-4 font-sans"
          >
            Hotel Attire Studio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
            className="font-serif text-white text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-6"
          >
            Crafted For<br />
            <span ref={wordRef} className="text-gold-gradient inline-block">Elegance</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }}
            className="text-white/70 max-w-xl text-base lg:text-lg font-light leading-relaxed mb-10 font-sans"
          >
            A fresh design studio with a single obsession, creating hotel attire that looks different,
            feels exceptional, and speaks the language of your brand.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button onClick={() => navigate('/collections')} className="btn-gold px-8 py-4 text-sm tracking-[0.2em] uppercase font-sans">
              Explore Collections
            </button>
            <button onClick={() => navigate('/contact')} className="btn-outline-gold px-8 py-4 text-sm tracking-[0.2em] uppercase font-sans">
              Start a Conversation
            </button>
          </motion.div>
        </motion.div>

        <motion.button
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-[#c9a84c] transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </motion.button>

        <style>{`
          @keyframes wordIn { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
          .word-enter{animation:wordIn 0.5s ease forwards}
        `}</style>
      </section>

      {/* ═══ MARQUEE — design values, not brand names ═══ */}
      <div className="overflow-hidden bg-[#c9a84c] py-4">
        <div className="marquee-track flex whitespace-nowrap">
          {[
            'Bespoke Design', 'Luxury Attire', 'Hotel Uniforms', 'Spa Wear',
            'Premium Linen', 'Brand Identity', 'RoyalDesigns Studio', 'Hospitality Wear',
            'Bespoke Design', 'Luxury Attire', 'Hotel Uniforms', 'Spa Wear',
            'Premium Linen', 'Brand Identity', 'RoyalDesigns Studio', 'Hospitality Wear',
          ].map((b, i) => (
            <span key={i} className="mx-8 text-white text-sm tracking-[0.3em] uppercase font-sans font-light">
              {b} <span className="mx-4 opacity-60">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ WHO WE ARE ═══ */}
      <section className="bg-[#faf8f3] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeUp>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Who We Are</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-serif text-[#0e0e0e] text-4xl lg:text-5xl font-light leading-tight mb-6">
                Where Craft Meets<br /><em className="text-gold-gradient not-italic">Hospitality</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-[#6b6b6b] leading-relaxed font-sans font-light text-base mb-5">
                RoyalDesigns is a new hotel attire design studio built on one conviction — that what your staff
                wears is the silent language of your brand. We started this because we saw a gap: most hotel
                attire looks the same, feels forgettable, and communicates nothing about the property behind it.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-[#6b6b6b] leading-relaxed font-sans font-light text-base mb-10">
                We want to change that. Our focus is on designing attire that is unmistakably yours — from the
                crispness of a front-desk blazer to the softness of a spa robe. Every detail considered,
                every thread intentional.
              </p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <button
                onClick={() => navigate('/about')}
                className="btn-outline-gold px-8 py-3 text-xs tracking-[0.25em] uppercase font-sans flex items-center gap-3"
              >
                Our Story <ArrowRight size={14} />
              </button>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <div className="grid grid-cols-2 gap-3">
              <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80" alt="" className="w-full h-64 object-cover img-zoom overflow-hidden" />
              <img src="https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&q=80" alt="" className="w-full h-64 object-cover img-zoom overflow-hidden mt-8" />
              <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80" alt="" className="w-full h-48 object-cover img-zoom overflow-hidden" />
              <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80" alt="" className="w-full h-48 object-cover img-zoom overflow-hidden mt-4" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ FEATURED CATEGORIES ═══ */}
      <section className="bg-[#0e0e0e] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Featured</span>
            </div>
          </FadeUp>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <FadeUp delay={0.1}>
              <h2 className="font-serif text-white text-4xl lg:text-5xl font-light">
                Browse by<br /><em className="text-gold-gradient not-italic">Category</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <button
                onClick={() => navigate('/collections')}
                className="btn-outline-gold px-8 py-3 text-xs tracking-[0.25em] uppercase font-sans flex items-center gap-3"
              >
                All Collections <ArrowRight size={14} />
              </button>
            </FadeUp>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cats.map(({ label, img, path }, i) => (
              <FadeUp key={label} delay={i * 0.08}>
                <button onClick={() => navigate(path)} className="group relative overflow-hidden w-full aspect-3/4 cursor-pointer">
                  <img src={img} alt={label} className="w-full h-full object-cover img-zoom" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="w-6 h-px bg-[#c9a84c] mb-3 group-hover:w-12 transition-all duration-400" />
                    <p className="text-white font-serif text-lg font-light">{label}</p>
                  </div>
                </button>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OUR APPROACH ═══ */}
      <section className="bg-[#faf8f3] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">How We Work</span>
                <div className="w-12 h-px bg-[#c9a84c]" />
              </div>
              <h2 className="font-serif text-[#0e0e0e] text-4xl lg:text-5xl font-light">
                A Process Built Around <em className="text-gold-gradient not-italic">You</em>
              </h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {[
              { step: '01', label: 'Understand', desc: 'We start by learning your brand, your property, and what you want guests to feel when they walk in.' },
              { step: '02', label: 'Design',     desc: 'Our studio creates mood boards, fabric options, and sketches tailored to your identity — nothing generic.' },
              { step: '03', label: 'Refine',     desc: 'We iterate together. Samples, tweaks, fits — until every piece is exactly right.' },
              { step: '04', label: 'Deliver',    desc: 'Careful production and delivery. We stay involved through handover so nothing is left to chance.' },
            ].map(({ step, label, desc }, i) => (
              <FadeUp key={step} delay={i * 0.1}>
                <div>
                  <p className="font-serif text-6xl text-[#c9a84c]/15 font-light leading-none mb-4">{step}</p>
                  <div className="w-8 h-px bg-[#c9a84c] mb-4" />
                  <h4 className="text-[#0e0e0e] font-sans text-sm tracking-[0.15em] uppercase mb-3 font-medium">{label}</h4>
                  <p className="text-[#6b6b6b] text-sm leading-relaxed font-sans font-light">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY DIFFERENT ═══ */}
      <section className="bg-[#0e0e0e] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Why RoyalDesigns</span>
              </div>
              <h2 className="font-serif text-white text-4xl lg:text-5xl font-light leading-tight mb-8">
                We Started Because<br /><em className="text-gold-gradient not-italic">Nothing Was Good Enough</em>
              </h2>
              <p className="text-white/60 text-base font-sans font-light leading-relaxed mb-6">
                Hotel attire has always been an afterthought — ordered from catalogues, identical across
                properties, replaced without ceremony. We think that is a missed opportunity.
              </p>
              <p className="text-white/60 text-base font-sans font-light leading-relaxed mb-6">
                Every hotel has a personality. A story. An aesthetic it has spent years and significant
                investment building. Your attire should reflect that — not contradict it.
              </p>
              <p className="text-white/60 text-base font-sans font-light leading-relaxed">
                RoyalDesigns exists to bring that level of intention to every thread.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="space-y-4">
                {[
                  { title: 'Designed from Scratch',       desc: 'Nothing off a shelf. Every piece starts with your brief and ends with your brand.' },
                  { title: 'Obsessive Attention to Detail', desc: 'Fabric weight, button placement, silhouette — we sweat the small things so you never have to.' },
                  { title: 'Collaborative by Nature',     desc: 'You are involved at every stage. This is your attire, and it should feel like it.' },
                  { title: 'Built for the Long Term',     desc: 'We want to be your studio for years — growing and evolving your attire as your brand does.' },
                ].map(({ title, desc }, i) => (
                  <FadeUp key={title} delay={i * 0.08}>
                    <div className="flex items-start gap-5 p-6 bg-[#161616] border border-white/5 hover:border-[#c9a84c]/20 transition-colors duration-300">
                      <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full shrink-0 mt-2" />
                      <div>
                        <p className="text-white font-sans text-sm font-medium mb-1">{title}</p>
                        <p className="text-white/50 text-xs font-sans font-light leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section ref={containerRef} className="relative overflow-hidden h-80 lg:h-120">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=80"
          alt="" className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <FadeUp>
            <p className="text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-4 font-sans">Ready to Stand Out?</p>
            <h3 className="font-serif text-white text-3xl md:text-5xl font-light mb-8">
              Let&apos;s Design Something Different
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
