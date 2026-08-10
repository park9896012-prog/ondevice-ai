import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';

interface FooterProps {
  language: Language;
  onNavigateToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigateToSection }) => {
  const t = TRANSLATIONS[language].nav;

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-3 text-white font-extrabold text-base uppercase">
              <div className="w-5 h-5 bg-indigo-500 rotate-45 flex items-center justify-center rounded-xs">
                <div className="w-2 h-2 bg-slate-950 -rotate-45"></div>
              </div>
              <span>ON-DEVICE AI NEXUS</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              {language === 'kr'
                ? '스마트폰, PC, IoT 기기의 하드웨어 연산 자원을 활용하여 100% 로컬 오프라인에서 구동되는 차세대 온디바이스 AI 종합 가이드 및 모델 추천 플랫폼입니다.'
                : 'Empowering edge hardware across smartphones, PCs, and IoT devices with 100% local, offline, zero-latency On-Device AI models.'}
            </p>
            <div className="flex items-center space-x-4 text-[11px] text-slate-500 pt-2">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Cloud Leak</span>
              </span>
              <span className="flex items-center space-x-1">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                <span>Sub-10ms Latency</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-2">
            <div className="font-bold text-white text-xs uppercase tracking-wider mb-2">
              Navigation
            </div>
            <ul className="space-y-1.5">
              {['definition', 'models', 'recommender', 'domains', 'developer', 'techInfo'].map(
                (secId) => (
                  <li key={secId}>
                    <button
                      onClick={() => onNavigateToSection(secId)}
                      className="hover:text-indigo-400 transition-colors text-left uppercase text-[11px] font-bold"
                    >
                      {(t as any)[secId]}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Supported Frameworks */}
          <div className="space-y-2">
            <div className="font-bold text-white text-xs uppercase tracking-wider mb-2">
              Supported Engines
            </div>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-sm">WebGPU</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-sm">Transformers.js</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-sm">WebLLM</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-sm">MediaPipe</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-sm">CoreML</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-sm">Ollama</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-sm">ONNX Runtime</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>© 2026 OnDevice AI Explorer & Recommender Platform. All rights reserved.</div>
          <div className="flex space-x-4">
            <a href="/privacy-policy.html" className="hover:text-slate-300 transition-colors">
              {language === 'kr' ? '개인정보처리방침' : 'Privacy Policy'}
            </a>
            <a href="/terms-of-service.html" className="hover:text-slate-300 transition-colors">
              {language === 'kr' ? '이용약관' : 'Terms of Service'}
            </a>
            <a
              href="mailto:ju9896012@gmail.com"
              className="hover:text-slate-300 transition-colors"
            >
              {language === 'kr' ? '문의하기' : 'Contact'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
