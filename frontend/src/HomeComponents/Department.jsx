import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const departments = [
  {
    name: 'Front Office',
    role: 'Concierge · Receptionists · Bell Staff',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80',
    desc: 'Sharp, professional attire that sets the first impression — tailored blazers, formal shirts, and coordinated accessories.',
    color: '#c9a84c',
  },
  {
    name: 'Housekeeping',
    role: 'Room Attendants · Supervisors · Laundry',
    img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=900&q=80',
    desc: 'Durable, comfortable workwear designed for all-day performance without compromising on a polished hotel appearance.',
    color: '#8b7355',
  },
  {
    name: 'Food & Beverage',
    role: 'Chefs · Servers · Bartenders · Baristas',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80',
    desc: 'From executive chef whites to elegant server ensembles — attire that performs in the kitchen and dazzles in the dining room.',
    color: '#c9a84c',
  },
  {
    name: 'Spa & Wellness',
    role: 'Therapists · Yoga Instructors · Lounge Staff',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80',
    desc: 'Soft, breathable, and serene — robes, wraps, and therapist attire that echo the tranquillity of your wellness spaces.',
    color: '#7a9b8a',
  },
  {
    name: 'Security & Valet',
    role: 'Security Officers · Valet Attendants',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80',
    desc: 'Authority meets elegance. Structured uniforms that communicate both trustworthiness and brand alignment.',
    color: '#8b7355',
  },
  {
    name: 'Management',
    role: 'General Managers · HODs · Executives',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80',
    desc: 'Distinguished leadership attire — bespoke suits and blazers that reflect authority, sophistication, and brand leadership.',
    color: '#c9a84c',
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

export default function Department() {
  return (
    <section id="department" className="bg-[#faf8f3] py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Departments</span>
          </div>
        </FadeUp>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-[#0e0e0e] text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              Every Department,
              <br />
              <em className="text-gold-gradient not-italic">Dressed to Impress</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-[#6b6b6b] max-w-sm text-sm leading-relaxed font-sans font-light">
              Cohesive attire across all hotel departments creates a unified brand experience that
              guests feel — even when they can't quite explain why.
            </p>
          </FadeUp>
        </div>

        {/* Department cards — horizontal scroll on mobile, grid on desktop */}
        <div className="overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0 pb-4 lg:pb-0">
          <div className="flex flex-wrap lg:grid lg:grid-cols-3 gap-5 min-w-225 lg:min-w-0">
            {departments.map((dept, i) => (
              <FadeUp key={dept.name} delay={i * 0.08}>
                <div className="card-luxury group relative overflow-hidden min-w-70 lg:min-w-0 shrink-0">
                  {/* Image */}
                  <div className="overflow-hidden h-56 relative">
                    <img
                      src={dept.img}
                      alt={dept.name}
                      className="w-full h-full object-cover img-zoom"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      style={{ background: `linear-gradient(to top, ${dept.color}, transparent)` }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-white border border-[#0e0e0e]/8">
                    <span
                      className="text-[10px] tracking-[0.35em] uppercase font-sans block mb-1"
                      style={{ color: dept.color }}
                    >
                      {dept.role}
                    </span>
                    <h3 className="font-serif text-[#0e0e0e] text-xl mb-3">{dept.name}</h3>
                    <p className="text-[#6b6b6b] text-xs leading-relaxed font-sans font-light">{dept.desc}</p>
                  </div>

                  {/* Bottom accent bar */}
                  <div
                    className="h-0.5 w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: dept.color }}
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Process steps */}
        <FadeUp delay={0.1}>
          <div className="mt-24 bg-[#0e0e0e] p-10 lg:p-16">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans mb-6 text-center">Our Process</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { step: '01', label: 'Consultation', desc: 'Understand your hotel brand and departmental needs.' },
                { step: '02', label: 'Design Draft',  desc: 'Sketch, sample, and iterate with your team.' },
                { step: '03', label: 'Production',    desc: 'Precision manufacturing at scale with quality audits.' },
                { step: '04', label: 'Delivery',      desc: 'Global logistics with white-glove handling.' },
              ].map(({ step, label, desc }) => (
                <div key={step} className="text-center">
                  <p className="font-serif text-5xl text-[#c9a84c]/30 font-light">{step}</p>
                  <div className="w-8 h-px bg-[#c9a84c] mx-auto my-3" />
                  <h4 className="text-white font-sans text-sm tracking-[0.15em] uppercase mb-2">{label}</h4>
                  <p className="text-white/40 text-xs leading-relaxed font-sans font-light">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
