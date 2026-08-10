import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Zap, ShieldCheck, DollarSign, ArrowRight, Cpu, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  language: Language;
  onNavigateToRecommender: () => void;
  onNavigateToModels: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onNavigateToRecommender,
  onNavigateToModels,
}) => {
  const t = TRANSLATIONS[language].hero;

  return (
    <section id="hero" className="relative overflow-hidden bg-slate-950 pt-10 pb-16 border-b border-slate-800">
      {/* Geometric background grid lines & accent glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>01. OVERVIEW • EDGE INTELLIGENCE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-[1.1]">
              {t.title}{' '}
              <span className="block mt-2 text-indigo-400 font-extrabold">
                {t.titleAccent}
              </span>
            </h1>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
              {t.desc}
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={onNavigateToRecommender}
                className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest rounded-sm transition-all cursor-pointer shadow-md shadow-indigo-500/20"
              >
                <Cpu className="w-4 h-4 text-white" />
                <span>{t.btnRecommend}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateToModels}
                className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-slate-900 border border-slate-700 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-slate-800 transition-all cursor-pointer"
              >
                <span>{t.btnExploreModels}</span>
              </button>
            </div>

            {/* Metric Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800">
              <div className="bg-slate-900/80 border-l-2 border-indigo-500 p-3 rounded-sm">
                <div className="flex items-center space-x-1.5 text-indigo-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Ultra Latency</span>
                </div>
                <div className="text-white font-bold text-xs sm:text-sm">{t.statLatency}</div>
              </div>

              <div className="bg-slate-900/80 border-l-2 border-emerald-500 p-3 rounded-sm">
                <div className="flex items-center space-x-1.5 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Zero Cloud Cost</span>
                </div>
                <div className="text-white font-bold text-xs sm:text-sm">{t.statCost}</div>
              </div>

              <div className="bg-slate-900/80 border-l-2 border-indigo-400 p-3 rounded-sm">
                <div className="flex items-center space-x-1.5 text-indigo-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Privacy</span>
                </div>
                <div className="text-white font-bold text-xs sm:text-sm">{t.statPrivacy}</div>
              </div>
            </div>
          </div>

          {/* Right Visual Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-sm overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              <img
                src="/src/assets/images/hero_ondevice_ai_1786333653054.jpg"
                alt="On-Device AI NPU Neural Processing Visual"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-sm bg-slate-950/90 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-indigo-300 uppercase tracking-wide">NPU / WebGPU Local Acceleration</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Gemini Nano • Llama 3.2 • Whisper • YOLOv11</div>
                </div>
                <div className="px-2.5 py-1 rounded-sm bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[9px] font-bold uppercase tracking-widest">
                  Active Edge Node
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
