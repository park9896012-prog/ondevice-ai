import React, { useState } from 'react';
import { Language } from '../types';
import { DOMAIN_USE_CASES } from '../data/domainsData';
import { TRANSLATIONS } from '../data/translations';
import {
  Smartphone,
  Home,
  Car,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Layers
} from 'lucide-react';

interface ApplicationsSectionProps {
  language: Language;
}

export const ApplicationsSection: React.FC<ApplicationsSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].domains;
  const [selectedDomainId, setSelectedDomainId] = useState<string>('mobile-wearables');

  const selectedDomain =
    DOMAIN_USE_CASES.find((d) => d.id === selectedDomainId) || DOMAIN_USE_CASES[0];

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-indigo-400" />;
      case 'Home':
        return <Home className="w-5 h-5 text-emerald-400" />;
      case 'Car':
        return <Car className="w-5 h-5 text-purple-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-indigo-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-pink-400" />;
      default:
        return <Layers className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section id="domains" className="py-16 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em]">
            04. DOMAINS & REAL-WORLD APPLICATIONS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            {t.title}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
            {t.subtitle}
          </p>
        </div>

        {/* Domain Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {DOMAIN_USE_CASES.map((domain) => (
            <button
              key={domain.id}
              onClick={() => setSelectedDomainId(domain.id)}
              className={`p-4 rounded-sm border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                selectedDomainId === domain.id
                  ? 'bg-slate-900 border-indigo-500 shadow-md'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="p-2.5 rounded-sm bg-slate-950 border border-slate-800 w-fit">
                {getDomainIcon(domain.iconName)}
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase">{domain.title[language]}</h3>
                <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">
                  {domain.shortDesc[language]}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Domain Detailed Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-sm p-6 lg:p-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-sm bg-slate-950 border border-slate-800">
                {getDomainIcon(selectedDomain.iconName)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white uppercase">
                  {selectedDomain.title[language]}
                </h3>
                <p className="text-xs text-slate-400">{selectedDomain.fullDesc[language]}</p>
              </div>
            </div>

            {/* Suitable Model Tags */}
            <div className="flex flex-wrap gap-1.5">
              {selectedDomain.suitableModels.map((mId) => (
                <span
                  key={mId}
                  className="px-2.5 py-1 rounded-sm text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase tracking-wider"
                >
                  {mId}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits & Implementation Roadmap */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Core Benefits */}
            <div className="md:col-span-5 space-y-4 bg-slate-950 p-6 rounded-sm border-l-2 border-indigo-500">
              <h4 className="text-xs font-bold text-indigo-300 uppercase flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>{t.benefitsTitle}</span>
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                {selectedDomain.benefits[language].map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-start space-x-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Implementation Pipeline Roadmap */}
            <div className="md:col-span-7 space-y-4">
              <h4 className="text-xs font-bold text-emerald-400 uppercase flex items-center space-x-2">
                <ArrowRight className="w-4 h-4 text-emerald-400" />
                <span>{t.guideTitle}</span>
              </h4>

              <div className="space-y-3">
                {selectedDomain.implementationSteps.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-sm bg-slate-950 border-l-2 border-emerald-500 space-y-1 relative"
                  >
                    <div className="text-xs font-bold text-white uppercase">
                      {step.title[language]}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.desc[language]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
