import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home',        path: '/' },
  { label: 'About',       path: '/about' },
  { label: 'Collections', path: '/collections' },
  { label: 'Services',    path: '/services' },
  { label: 'Careers',     path: '/careers' },
  { label: 'Contact',     path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Transparent only on hero (home page at top)
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [location.pathname]);

  const solid = scrolled || open;

  return (
    <motion.header
      initial={isHome ? { y: -80, opacity: 0 } : false}
      animate={isHome ? { y: 0, opacity: 1 } : false}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-[#0e0e0e]/96 backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 lg:px-4 flex items-center justify-between h-20">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-5 cursor-pointer"
        >
          {/* Logo Image */}
          <img
            src='./logo.png'
            alt="Royal Designs"
            className="h-15 w-auto object-contain"
          />

          {/* Text */}
          <div className="flex flex-col items-start leading-none">
            <span className="font-mono text-xl md:text-2xl font-light tracking-[0.2em] text-white">
              RoyalDesigns
            </span>
            <span className="text-[10px] tracking-[0.35em] text-[#c9a84c] uppercase font-sans mt-0.5">
              Luxury Attire
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {links.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                `nav-link text-sm tracking-widest uppercase font-sans font-light transition-colors ${
                  isActive ? 'text-[#c9a84c] active' : 'text-white/80 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => navigate('/login')}
          className="hidden lg:block btn-gold text-xs tracking-[0.2em] uppercase text-amber-50 px-6 py-2.5 font-sans cursor-pointer"
        >
          login
        </button>

        {/* Hamburger */}
        <button
          className="lg:hidden text-white p-2 transition-all duration-300"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:hidden bg-[#0e0e0e]/98 backdrop-blur-md border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col items-center px-6 py-6 gap-5">
              {links.map(({ label, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === '/'}
                  className="w-full max-w-md"
                >
                  {({ isActive }) => (
                    <div className="flex items-center w-full">
                      <span
                        className={`text-xs transition-colors duration-300 ${
                          isActive ? 'text-[#c9a84c]' : 'text-white/40'
                        }`}
                      >
                        ✦
                      </span>

                      <div
                        className={`flex-1 h-px mx-3 transition-all duration-300 ${
                          isActive
                            ? 'bg-linear-to-r from-[#c9a84c]/10 via-[#c9a84c] to-[#c9a84c]/10'
                            : 'bg-linear-to-r from-transparent via-white/20 to-transparent'
                        }`}
                      />

                      <span
                        className={`text-center text-sm tracking-[0.25em] uppercase font-sans whitespace-nowrap transition-colors duration-300 ${
                          isActive ? 'text-[#c9a84c]' : 'text-white/80'
                        }`}
                      >
                        {label}
                      </span>

                      <div
                        className={`flex-1 h-px mx-3 transition-all duration-300 ${
                          isActive
                            ? 'bg-linear-to-r from-[#c9a84c]/10 via-[#c9a84c] to-[#c9a84c]/10'
                            : 'bg-linear-to-r from-transparent via-white/20 to-transparent'
                        }`}
                      />

                      <span
                        className={`text-xs transition-colors duration-300 ${
                          isActive ? 'text-[#c9a84c]' : 'text-white/40'
                        }`}
                      >
                        ✦
                      </span>
                    </div>
                  )}
                </NavLink>
              ))}
              <div className="flex gap-3 mt-2 max-w-96 w-full">
                <button
                  onClick={() => navigate('/login')}
                  className="flex-1 border border-white/20 text-white text-xs tracking-[0.2em] uppercase px-4 py-3 font-sans hover:bg-white/10 transition-colors"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate('/contact')}
                  className="flex-1 btn-gold text-xs tracking-[0.2em] uppercase px-4 py-3 font-sans"
                >
                  Get a Quote
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
