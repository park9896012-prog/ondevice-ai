import React from 'react';
import { Language, SystemHardwareInfo } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Cpu, Globe, Sparkles, Zap, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  hardware: SystemHardwareInfo | null;
  onOpenAdvisor: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  hardware,
  onOpenAdvisor,
  activeSection,
  setActiveSection,
}) => {
  const t = TRANSLATIONS[language].nav;

  const navItems = [
    { id: 'definition', label: t.definition },
    { id: 'models', label: t.models },
    { id: 'recommender', label: t.recommender },
    { id: 'domains', label: t.domains },
    { id: 'developer', label: t.developer },
    { id: 'techInfo', label: t.techInfo },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo - Geometric Balance Rotated Diamond */}
        <div
          onClick={() => scrollToSection('hero')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-indigo-500 rounded-sm rotate-45 flex items-center justify-center overflow-hidden shrink-0 group-hover:bg-indigo-400 transition-colors">
            <div className="w-full h-full border-2 border-white/30 flex items-center justify-center -rotate-45">
              <Cpu className="w-4 h-4 text-white" />
            </div>
          </div>
          <div>
            <div className="text-lg font-black tracking-tighter uppercase text-white flex items-center space-x-1">
              <span>EdgeNode</span>
              <span className="text-indigo-400">AI</span>
            </div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest -mt-1">
              On-Device Hardware Hub
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`pb-1 transition-all border-b-2 ${
                activeSection === item.id
                  ? 'text-indigo-400 border-indigo-400'
                  : 'text-slate-300 hover:text-white border-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Hardware status badge */}
          {hardware && (
            <div
              onClick={() => scrollToSection('recommender')}
              className={`hidden md:flex items-center space-x-1.5 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                hardware.webGpuSupported
                  ? 'bg-emerald-950/50 border-emerald-800/80 text-emerald-400 hover:bg-emerald-900/60'
                  : 'bg-amber-950/50 border-amber-800/80 text-amber-400 hover:bg-amber-900/60'
              }`}
            >
              {hardware.webGpuSupported ? (
                <Zap className="w-3 h-3 text-emerald-400" />
              ) : (
                <ShieldAlert className="w-3 h-3 text-amber-400" />
              )}
              <span>
                {hardware.webGpuSupported ? 'WebGPU Ready' : 'CPU Mode'} ({hardware.ramGB}GB)
              </span>
            </div>
          )}

          {/* AI Advisor Button */}
          <button
            onClick={onOpenAdvisor}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider bg-indigo-500 hover:bg-indigo-600 text-white transition-all shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.aiAdvisor}</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-800 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-slate-700">
            <button
              onClick={() => setLanguage('kr')}
              className={`px-1.5 py-0.5 rounded transition-all ${
                language === 'kr' ? 'text-indigo-400 font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              KR
            </button>
            <span className="text-slate-600 mx-0.5">|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded transition-all ${
                language === 'en' ? 'text-indigo-400 font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
