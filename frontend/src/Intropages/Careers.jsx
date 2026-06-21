import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Briefcase, X, Send, CheckCircle, ChevronDown, ChevronUp, Upload } from 'lucide-react';
import FadeUp from '../HomeComponents/FadeUp';
import Navbar from '../HomeComponents/Navbar';
import Footer from '../HomeComponents/Footer';

/* ══════════════════════════════════════════════════════
   OPENINGS LIST
   Add / remove objects here to manage live job listings.
   Leave the array empty [] to show "No openings" state.
══════════════════════════════════════════════════════ */
const OPENINGS = [
  {
    id: 1,
    title: 'Fashion / Textile Designer',
    skills: ['Fabric knowledge', 'Adobe Illustrator', 'Pattern making', 'Colour theory', 'Attention to detail'],
    assignedWork: 'Designing hotel uniform concepts, linen sets, and spa attire collections from brief to production-ready files.',
    description:
      'We are looking for a designer who thinks in texture and silhouette as naturally as they think in colour. You will work directly with our founding team to develop attire concepts for hospitality clients — translating brand identities into wearable, considered designs. No prior hospitality experience needed; curiosity and craft matter more.',
  },
  {
    id: 2,
    title: 'Brand & Visual Identity Designer',
    skills: ['Brand strategy', 'Typography', 'Logo design', 'Figma / Illustrator', 'Presentation design'],
    assignedWork: 'Developing brand attire guidelines, style manuals, and visual identity systems for hotel clients.',
    description:
      'RoyalDesigns sits at the intersection of fashion and brand. We need someone who can take a hotel brand — its architecture, its palette, its tone — and express it through an attire system. You will create the visual frameworks that guide every design decision. If you have worked on brand identity and have an eye for the details that make things feel premium, we want to talk.',
  },
  {
    id: 3,
    title: 'Client Relations & Project Coordinator',
    skills: ['Clear communication', 'Project management basics', 'Google Workspace', 'Organised mindset', 'Hospitality awareness'],
    assignedWork: 'Managing client briefs, timelines, and coordination between the design team and clients from first contact through delivery.',
    description:
      'As we grow, we need someone who keeps everything running clearly. You will be the bridge between clients and our studio — making sure briefs are understood, timelines are respected, and clients always know where their project stands. No design background required, but you must care deeply about quality and communication.',
  },
];

/* ══════════════════════════════════════════════════
   APPLY MODAL
══════════════════════════════════════════════════ */
function ApplyModal({ job, onClose }) {
  const [form, setForm]   = useState({ name: '', email: '', resume: null, note: '' });
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName]   = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setForm({ ...form, resume: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: when backend is ready, POST form data here.
    // For now, just discard and show success state.
    setForm({ name: '', email: '', resume: null, note: '' });
    setFileName('');
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#0e0e0e] border border-white/10 max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-start justify-between p-8 border-b border-white/8">
          <div>
            <p className="text-[#c9a84c] text-[10px] tracking-[0.4em] uppercase font-sans mb-1">Apply Now</p>
            <h3 className="font-serif text-white text-xl leading-snug">{job.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors mt-1 shrink-0 ml-4"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-8"
            >
              <CheckCircle size={48} className="text-[#c9a84c] mb-5" />
              <h4 className="font-serif text-white text-2xl mb-3">Application Received</h4>
              <p className="text-white/50 text-sm font-sans font-light leading-relaxed max-w-xs">
                Thanks for your interest. We have noted your application and will be in touch
                when the time is right.
              </p>
              <button
                onClick={onClose}
                className="mt-8 text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-sans hover:underline"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-white/60 text-[10px] tracking-[0.3em] uppercase font-sans block mb-2">
                  Full Name *
                </label>
                <input
                  type="text" name="name" required
                  value={form.name} onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-[#161616] border border-white/10 text-white text-sm font-sans font-light px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder-white/20"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-white/60 text-[10px] tracking-[0.3em] uppercase font-sans block mb-2">
                  Email Address *
                </label>
                <input
                  type="email" name="email" required
                  value={form.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-[#161616] border border-white/10 text-white text-sm font-sans font-light px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder-white/20"
                />
              </div>

              {/* Resume */}
              <div>
                <label className="text-white/60 text-[10px] tracking-[0.3em] uppercase font-sans block mb-2">
                  Resume / CV *
                </label>
                <label className="flex items-center gap-4 w-full bg-[#161616] border border-white/10 px-4 py-3 cursor-pointer hover:border-[#c9a84c] transition-colors group">
                  <Upload size={16} className="text-[#c9a84c] shrink-0" />
                  <span className="text-sm font-sans font-light text-white/50 group-hover:text-white/80 transition-colors truncate">
                    {fileName || 'Upload PDF or DOC'}
                  </span>
                  <input
                    type="file" accept=".pdf,.doc,.docx" required
                    onChange={handleFile}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Optional note */}
              <div>
                <label className="text-white/60 text-[10px] tracking-[0.3em] uppercase font-sans block mb-2">
                  Anything Else? <span className="normal-case tracking-normal opacity-60">(optional)</span>
                </label>
                <textarea
                  name="note" rows={3}
                  value={form.note} onChange={handleChange}
                  placeholder="A short note, portfolio link, or anything you want us to know..."
                  className="w-full bg-[#161616] border border-white/10 text-white text-sm font-sans font-light px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder-white/20 resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-gold w-full py-3.5 text-xs tracking-[0.2em] uppercase font-sans flex items-center justify-center gap-3"
              >
                <Send size={14} />
                Submit Application
              </button>

              <p className="text-white/60 text-[10px] text-center font-sans leading-relaxed">
                Your details are kept private and used only for this application.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   SINGLE JOB CARD
══════════════════════════════════════════════════ */
function JobCard({ job, index, onApply }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <FadeUp delay={index * 0.1}>
      <div className="border border-white/8 bg-[#161616] hover:border-[#c9a84c]/30 transition-all duration-400 group overflow-hidden">
        {/* Card header — always visible */}
        <div className="p-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-[10px] tracking-[0.35em] uppercase font-sans">Open Role</span>
              </div>
              <h3 className="font-serif text-white text-2xl font-light">{job.title}</h3>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setExpanded(!expanded)}
                className="border border-white/15 text-white/50 hover:border-white/40 hover:text-white transition-all duration-300 px-4 py-2 text-xs tracking-[0.2em] uppercase font-sans flex items-center gap-2"
              >
                {expanded ? 'Less' : 'Details'}
                {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>
              <button
                onClick={() => onApply(job)}
                className="btn-gold px-5 py-2 text-xs tracking-[0.2em] uppercase font-sans"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Skills pills */}
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="border border-white/10 text-white/50 text-[10px] tracking-[0.15em] uppercase font-sans px-3 py-1 group-hover:border-[#c9a84c]/25 group-hover:text-white/65 transition-all duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Expandable detail */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-white/8 px-8 py-7 grid md:grid-cols-2 gap-8">
                {/* Assigned work */}
                <div>
                  <p className="text-[#c9a84c] text-[10px] tracking-[0.35em] uppercase font-sans mb-3">
                    What You Will Work On
                  </p>
                  <p className="text-white/60 text-sm font-sans font-light leading-relaxed">
                    {job.assignedWork}
                  </p>
                </div>
                {/* Description */}
                <div>
                  <p className="text-[#c9a84c] text-[10px] tracking-[0.35em] uppercase font-sans mb-3">
                    About This Role
                  </p>
                  <p className="text-white/60 text-sm font-sans font-light leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </div>
              <div className="px-8 pb-7">
                <button
                  onClick={() => onApply(job)}
                  className="btn-outline-gold px-8 py-3 text-xs tracking-[0.2em] uppercase font-sans"
                >
                  Apply for This Role
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeUp>
  );
}

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function Careers() {
  const navigate     = useNavigate();
  const [activeJob, setActiveJob] = useState(null);

  return (
    <>
    <Navbar/>
      {/* ═══ HERO ═══ */}
      <section className="relative h-[55vh] min-h-95 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=80"
            alt="" className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/40 to-black/90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-4 font-sans">Join Us</p>
            <h1 className="font-serif text-white text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
              Build Something<br /><em className="text-gold-gradient not-italic">From the Ground Up</em>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ═══ INTRO ═══ */}
      <section className="bg-[#0e0e0e] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Why Join RoyalDesigns</span>
              </div>
              <h2 className="font-serif text-white text-4xl lg:text-5xl font-light leading-tight mb-6">
                Early Stage Means<br /><em className="text-gold-gradient not-italic">Your Work Matters</em>
              </h2>
              <p className="text-white/55 text-base font-sans font-light leading-relaxed mb-5">
                We are a small team at the start of something deliberate. There is no layer of middle
                management, no legacy way of doing things, no compromises already baked in.
              </p>
              <p className="text-white/55 text-base font-sans font-light leading-relaxed mb-5">
                If you join now, your decisions shape what RoyalDesigns becomes, how it works, what it
                stands for, and what it looks like to the world.
              </p>
              <p className="text-white/55 text-base font-sans font-light leading-relaxed">
                We are looking for people who care about craft, move with intention, and want to
                build something they are proud of.
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="grid grid-cols-2 gap-px bg-white/8">
                {[
                  { label: 'Direct Impact',       desc: 'Every person here shapes the product and the company.' },
                  { label: 'Craft-First Culture',  desc: 'We do not cut corners. Quality is not a talking point.' },
                  { label: 'Honest Environment',   desc: 'No politics, no performance reviews for show.' },
                  { label: 'Room to Grow',          desc: 'We are building this together — your role grows with us.' },
                ].map(({ label, desc }) => (
                  <div key={label} className="bg-[#0e0e0e] hover:bg-[#161616] transition-colors duration-300 p-8">
                    <div className="w-5 h-px bg-[#c9a84c] mb-3" />
                    <p className="text-white font-sans text-sm font-medium mb-2">{label}</p>
                    <p className="text-white/40 text-xs font-sans font-light leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ OPENINGS ═══ */}
      <section className="bg-[#faf8f3] py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <FadeUp>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">
                {OPENINGS.length > 0 ? `${OPENINGS.length} Open Role${OPENINGS.length > 1 ? 's' : ''}` : 'Openings'}
              </span>
            </div>
            <h2 className="font-serif text-[#0e0e0e] text-4xl lg:text-5xl font-light mb-4">
              Current <em className="text-gold-gradient not-italic">Openings</em>
            </h2>
          </FadeUp>

          {OPENINGS.length === 0 ? (
            /* ── Empty state ── */
            <FadeUp delay={0.1}>
              <div className="border border-[#0e0e0e]/10 bg-white py-20 flex flex-col items-center text-center px-6">
                <div className="w-16 h-16 border border-[#c9a84c]/20 flex items-center justify-center mb-6">
                  <Briefcase size={24} className="text-[#c9a84c]/50" />
                </div>
                <h3 className="font-serif text-[#0e0e0e] text-2xl mb-3">No Openings Listed Right Now</h3>
                <p className="text-[#6b6b6b] text-sm font-sans font-light max-w-xs leading-relaxed mb-8">
                  We do not have any open roles at the moment — but if you think you belong here,
                  send us a note anyway. We read everything.
                </p>
                <button
                  onClick={() => navigate('/contact')}
                  className="btn-outline-gold px-8 py-3 text-xs tracking-[0.25em] uppercase font-sans"
                >
                  Reach Out Anyway
                </button>
              </div>
            </FadeUp>
          ) : (
            /* ── Job list ── */
            <div className="space-y-4">
              {OPENINGS.map((job, i) => (
                <JobCard
                  key={job.id}
                  job={job}
                  index={i}
                  onApply={(j) => setActiveJob(j)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ OPEN APPLICATION ═══ */}
      <section className="bg-[#0e0e0e] py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-sans">Don&apos;t See Your Role?</span>
              <div className="w-12 h-px bg-[#c9a84c]" />
            </div>
            <h3 className="font-serif text-white text-3xl lg:text-4xl font-light mb-5">
              Send an Open Application
            </h3>
            <p className="text-white/50 text-sm font-sans font-light leading-relaxed max-w-md mx-auto mb-10">
              If you believe you would add something to RoyalDesigns — even if there is no listed role that
              fits — write to us. Tell us who you are and what you do.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="btn-gold px-10 py-4 text-xs tracking-[0.25em] uppercase font-sans"
            >
              Get in Touch
            </button>
          </FadeUp>
        </div>
      </section>

      {/* ═══ APPLY MODAL ═══ */}
      <AnimatePresence>
        {activeJob && (
          <ApplyModal job={activeJob} onClose={() => setActiveJob(null)} />
        )}
      </AnimatePresence>
      <Footer/>

    </>
  );
}
