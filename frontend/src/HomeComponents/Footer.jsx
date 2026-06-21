import { Link } from 'react-router-dom';
import { Share2, Link as LinkIcon, Globe, Play } from 'lucide-react';

const nav = {
  Company:     [{ label: 'About Us', to: '/about' }, { label: 'Our Story', to: '/about' }, { label: 'Careers', to: '/careers' }, { label: 'Contact', to: '/contact' }],
  Collections: [{ label: 'Luxury Line', to: '/collections' }, { label: 'Standard Series', to: '/collections' }, { label: 'Spa & Wellness', to: '/collections' }, { label: 'F&B Uniforms', to: '/collections' }],
  Services:    [{ label: 'Bespoke Tailoring', to: '/services' }, { label: 'Bulk Supply', to: '/services' }, { label: 'Brand Design', to: '/services' }, { label: 'Logistics', to: '/services' }],
  Contact:     [{ label: 'Get a Quote', to: '/contact' }, { label: 'Open Roles', to: '/careers' }, { label: 'FAQs', to: '/contact' }, { label: 'Support', to: '/contact' }],
};

const socials = [
  { icon: Share2,    label: 'Instagram' },
  { icon: LinkIcon,  label: 'LinkedIn' },
  { icon: Globe,     label: 'Twitter' },
  { icon: Play,      label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-[#060606] pt-20 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Top grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10 border-b border-white/8 pb-16">
          {/* Brand */}
          <div className="col-span-2">
            <div className="mb-6">
              <p className="font-serif text-2xl text-white tracking-[0.2em]">ROYALDESIGNS</p>
              <p className="text-[#c9a84c] text-[10px] tracking-[0.4em] uppercase mt-1 font-sans">Luxury Attire</p>
            </div>
            <p className="text-white/40 text-xs leading-relaxed font-sans font-light max-w-xs">
              A new hotel attire design studio building things that look different, feel intentional,
              and speak the language of your brand.
            </p>            <div className="flex gap-3 mt-8">
              {socials.map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/40 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(nav).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white text-xs tracking-[0.3em] uppercase font-sans mb-5">{heading}</h4>
              <ul className="space-y-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="text-white/40 text-xs font-sans font-light hover:text-[#c9a84c] transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-10 border-b border-white/8">
          <p className="text-white/50 text-xs tracking-[0.2em] uppercase font-sans">
            Subscribe for seasonal lookbooks &amp; updates
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full md:w-auto">
            <input
              type="email" placeholder="your@email.com"
              className="bg-transparent border border-white/15 text-white text-xs font-sans px-5 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder-white/25 w-full md:w-64"
            />
            <button type="submit" className="btn-gold px-6 py-3 text-xs tracking-[0.2em] uppercase font-sans shrink-0">
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-white/25 text-xs font-sans font-light">
            © {new Date().getFullYear()} RoyalDesigns. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((t) => (
              <a key={t} href="#" className="text-white/25 text-xs font-sans hover:text-[#c9a84c] transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
