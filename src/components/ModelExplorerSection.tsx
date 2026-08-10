import React, { useState } from 'react';
import { Language, ModelCategory, ModelSpec } from '../types';
import { ON_DEVICE_MODELS } from '../data/modelsData';
import { TRANSLATIONS } from '../data/translations';
import {
  MessageSquareText,
  Eye,
  Mic,
  Image as ImageIcon,
  Cpu,
  CheckCircle2,
  XCircle,
  HardDrive,
  Code,
  Zap,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ModelExplorerSectionProps {
  language: Language;
}

export const ModelExplorerSection: React.FC<ModelExplorerSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].models;
  const [activeCategory, setActiveCategory] = useState<ModelCategory | 'all'>('all');
  const [selectedQuant, setSelectedQuant] = useState<'INT4' | 'INT8' | 'FP16'>('INT4');
  const [expandedCodeId, setExpandedCodeId] = useState<string | null>(null);
  const [codePlatform, setCodePlatform] = useState<'web' | 'android' | 'ios' | 'python'>('web');

  const filteredModels = ON_DEVICE_MODELS.filter(
    (m) => activeCategory === 'all' || m.category === activeCategory
  );

  const getCategoryIcon = (category: ModelCategory) => {
    switch (category) {
      case 'text':
        return <MessageSquareText className="w-4 h-4 text-indigo-400" />;
      case 'vision':
        return <Eye className="w-4 h-4 text-emerald-400" />;
      case 'audio':
        return <Mic className="w-4 h-4 text-purple-400" />;
      case 'image':
        return <ImageIcon className="w-4 h-4 text-pink-400" />;
    }
  };

  return (
    <section id="models" className="py-16 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em]">
            02. MODEL SPECS & SPECS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            {t.title}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
            {t.subtitle}
          </p>
        </div>

        {/* Filter Bar & Quantization Selector */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900 p-3 rounded-sm border border-slate-800">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase transition-all ${
                activeCategory === 'all'
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t.filterAll}
            </button>
            <button
              onClick={() => setActiveCategory('text')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase transition-all ${
                activeCategory === 'text'
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MessageSquareText className="w-3.5 h-3.5" />
              <span>{t.filterText}</span>
            </button>
            <button
              onClick={() => setActiveCategory('vision')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase transition-all ${
                activeCategory === 'vision'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t.filterVision}</span>
            </button>
            <button
              onClick={() => setActiveCategory('audio')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase transition-all ${
                activeCategory === 'audio'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>{t.filterAudio}</span>
            </button>
            <button
              onClick={() => setActiveCategory('image')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase transition-all ${
                activeCategory === 'image'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{t.filterImage}</span>
            </button>
          </div>

          {/* Global Quantization Picker */}
          <div className="flex items-center space-x-2 text-xs font-bold uppercase text-slate-300 w-full md:w-auto justify-end">
            <span>{t.quantSelect}</span>
            <div className="flex bg-slate-950 p-1 rounded-sm border border-slate-700">
              {(['INT4', 'INT8', 'FP16'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => setSelectedQuant(q)}
                  className={`px-2.5 py-1 rounded-sm font-bold transition-all ${
                    selectedQuant === q
                      ? 'bg-indigo-500 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredModels.map((model) => {
            const currentSize = model.sizeMB[selectedQuant] || model.sizeMB[model.defaultQuant];

            return (
              <div
                key={model.id}
                className="bg-slate-900 border border-slate-800 rounded-sm p-6 hover:border-slate-700 transition-all space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Bar: Developer & Category Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="p-2 rounded-sm bg-slate-950 border border-slate-800">
                        {getCategoryIcon(model.category)}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-white uppercase flex items-center space-x-2">
                          <span>{model.name}</span>
                        </h3>
                        <div className="text-[10px] text-slate-400">{model.developer} • {model.license}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                      {model.primaryFramework.split('/')[0]}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {model.description[language]}
                  </p>

                  {/* Spec Meters */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-sm border border-slate-800 text-center">
                    <div>
                      <div className="text-[9px] font-bold uppercase text-slate-400">{t.params}</div>
                      <div className="text-xs font-bold text-indigo-300">{model.parameters}</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold uppercase text-slate-400">{t.ramReq}</div>
                      <div className="text-xs font-bold text-indigo-300">{model.recommendedRam} GB</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold uppercase text-slate-400">{t.size} ({selectedQuant})</div>
                      <div className="text-xs font-bold text-emerald-400">
                        {currentSize >= 1000 ? `${(currentSize / 1000).toFixed(1)} GB` : `${currentSize} MB`}
                      </div>
                    </div>
                  </div>

                  {/* Pros & Cons Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Pros */}
                    <div className="p-3 rounded-sm bg-emerald-950/20 border-l-2 border-emerald-500 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase text-emerald-400 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t.pros}</span>
                      </div>
                      <ul className="space-y-1 text-[11px] text-slate-300">
                        {model.pros[language].map((pro, idx) => (
                          <li key={idx} className="flex items-start space-x-1">
                            <span className="text-emerald-400">•</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cons */}
                    <div className="p-3 rounded-sm bg-rose-950/20 border-l-2 border-rose-500 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase text-rose-400 flex items-center space-x-1">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{t.cons}</span>
                      </div>
                      <ul className="space-y-1 text-[11px] text-slate-300">
                        {model.cons[language].map((con, idx) => (
                          <li key={idx} className="flex items-start space-x-1">
                            <span className="text-rose-400">•</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions & Code Drawer Toggle */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-[11px] text-slate-400">
                    <Zap className="w-3.5 h-3.5 text-indigo-400" />
                    <span>NPU: ~{model.estimatedTokensPerSec.npu} t/s</span>
                  </div>

                  <button
                    onClick={() =>
                      setExpandedCodeId(expandedCodeId === model.id ? null : model.id)
                    }
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sm bg-slate-800 hover:bg-slate-700 text-xs font-bold uppercase text-slate-200 transition-all cursor-pointer"
                  >
                    <Code className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{t.codeBtn}</span>
                    {expandedCodeId === model.id ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Expandable Integration Code Drawer */}
                {expandedCodeId === model.id && (
                  <div className="pt-4 border-t border-slate-800 space-y-3 bg-slate-950 p-4 rounded-sm">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold uppercase text-indigo-300">
                        {model.name} Code Integration
                      </div>
                      <div className="flex space-x-1 bg-slate-900 p-1 rounded-sm text-[9px] font-bold">
                        {(['web', 'android', 'ios', 'python'] as const).map((platform) => (
                          <button
                            key={platform}
                            onClick={() => setCodePlatform(platform)}
                            className={`px-2 py-0.5 rounded-sm uppercase ${
                              codePlatform === platform
                                ? 'bg-indigo-500 text-white font-bold'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {platform}
                          </button>
                        ))}
                      </div>
                    </div>

                    <pre className="p-3 bg-slate-900 border border-slate-800 rounded-sm text-[11px] font-mono text-emerald-300 overflow-x-auto whitespace-pre">
                      {model.codeSnippets[codePlatform]}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
