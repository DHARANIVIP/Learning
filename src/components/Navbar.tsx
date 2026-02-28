import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onLoginClick: () => void;
}

export const Navbar = ({ onLoginClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent'
      }`}>
      <div className="container mx-auto flex items-center justify-between">
        <div
          className="text-2xl font-bold tracking-tighter uppercase cursor-pointer text-white flex items-center"
          onClick={() => navigate('/')}
        >
          NCVET<span className="text-sunset">.AI</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Testimonials', 'About'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-silver/60 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLoginClick}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold transition-all bg-sunset text-midnight rounded-full hover:shadow-[0_0_30px_rgba(255,147,85,0.4)]"
          >
            <User size={16} />
            <span>Login</span>
          </motion.button>
        </div>

        <button className="md:hidden text-white">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

