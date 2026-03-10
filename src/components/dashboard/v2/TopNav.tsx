import { Search, Bell, Globe, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const TopNav = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState('English');
  const [showLang, setShowLang] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const translations: any = {
    'English': { dashboard: 'Dashboard', path: 'Learning Path', courses: 'Courses', skills: 'Skills', insights: 'Career Insights', search: 'Search courses, skills...', pro: 'Pro Learner' },
    'Tamil': { dashboard: 'டாஷ்போர்டு', path: 'கற்றல் பாதை', courses: 'பாடங்கள்', skills: 'திறன்கள்', insights: 'தொழில் நுண்ணறிவு', search: 'பாடங்களைத் தேடுங்கள்...', pro: 'சார்பு கற்றவர்' },
    'Hindi': { dashboard: 'डैशबोर्ड', path: 'सीखने का पथ', courses: 'पाठ्यक्रम', skills: 'कौशल', insights: 'कैरियर अंतर्दृष्टि', search: 'पाठ्यक्रम खोजें...', pro: 'प्रो लर्नर' }
  };

  const t = translations[lang];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-secondary/20 bg-neutral-bg/80 backdrop-blur-xl">
      <div className="w-full px-6 md:px-10 h-16 flex items-center justify-between gap-8 md:gap-12">
        {/* Logo - Start */}
        <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="w-9 h-9 bg-neutral-accent rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-xl">N</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-neutral-text hidden sm:block">
            NCVET<span className="text-neutral-accent">.AI</span>
          </span>
        </div>

        {/* Middle Group: Links & Search */}
        <div className="hidden lg:flex items-center flex-1 justify-center gap-12">
          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {[
              { id: 'Dashboard', label: t.dashboard, path: '/dashboard' },
              { id: 'Path', label: t.path, path: '/dashboard/path' },
              { id: 'Courses', label: t.courses, path: '/dashboard/courses' },
              { id: 'Skills', label: t.skills, path: '/dashboard/assessment' },
              { id: 'Insights', label: t.insights, path: '/dashboard/insights' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="text-xs font-black uppercase tracking-widest text-neutral-muted hover:text-neutral-accent transition-all relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neutral-accent transition-all group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-xs w-full hidden xl:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-muted group-focus-within:text-neutral-accent transition-colors" size={14} />
              <input
                type="text"
                placeholder={t.search}
                className="w-full bg-neutral-bg border border-neutral-secondary/20 rounded-xl py-2 pl-9 pr-4 text-xs text-neutral-text placeholder:text-neutral-muted focus:outline-none focus:ring-4 focus:ring-neutral-accent/5 focus:border-neutral-accent/20 transition-all font-bold"
              />
            </div>
          </div>
        </div>

        {/* Right Group: Icons & Profile */}
        <div className="flex items-center gap-4 sm:gap-8 flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-4 border-r border-neutral-secondary/20 pr-4 sm:pr-8">
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setShowLang(!showLang)}
                className="flex items-center gap-2 p-2 text-neutral-muted hover:text-neutral-accent hover:bg-neutral-bg rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest"
              >
                <Globe size={16} />
                <span className="hidden sm:inline">{lang}</span>
                <ChevronDown size={12} className={`transition-transform ${showLang ? 'rotate-180' : ''}`} />
              </button>
              {showLang && (
                <div className="absolute top-full mt-2 right-0 w-32 bg-white border border-neutral-secondary/20 rounded-xl shadow-xl overflow-hidden py-1 z-50">
                  {['English', 'Tamil', 'Hindi'].map(l => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setShowLang(false); }}
                      className={`w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-neutral-bg transition-colors ${lang === l ? 'text-neutral-accent' : 'text-neutral-muted'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-neutral-muted hover:text-neutral-accent hover:bg-neutral-bg rounded-xl transition-all">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-neutral-accent rounded-full border border-white" />
            </button>

            {/* Logout */}
            <button 
              onClick={handleLogout}
              className="p-2 text-neutral-muted hover:text-neutral-accent hover:bg-neutral-bg rounded-xl transition-all"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            <div className="hidden xl:block text-right">
              <p className="text-sm font-black text-neutral-text leading-none uppercase tracking-tight">Alex Rivera</p>
              <p className="text-[10px] text-neutral-muted font-bold uppercase tracking-widest mt-1">{t.pro}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-neutral-bg p-0.5 border border-neutral-secondary/20 hover:border-neutral-accent/40 shadow-sm transition-all cursor-pointer overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
                alt="Profile"
                className="w-full h-full object-cover rounded-[10px] group-hover:scale-110 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
