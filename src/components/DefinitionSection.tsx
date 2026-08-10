import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Server, Cpu, ShieldCheck, Zap, WifiOff, Lock, HelpCircle, Layers } from 'lucide-react';

interface DefinitionSectionProps {
  language: Language;
}

export const DefinitionSection: React.FC<DefinitionSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].definition;
  const [selectedFlow, setSelectedFlow] = useState<'cloud' | 'onDevice' | 'hybrid'>('onDevice');

  return (
    <section id="definition" className="py-16 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em]">
            01. DEFINITION & ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            {t.title}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
            {t.subtitle}
          </p>
        </div>

        {/* 3 Architecture Cards (Cloud AI vs On-Device AI vs Hybrid AI) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cloud AI Card */}
          <div
            onClick={() => setSelectedFlow('cloud')}
            className={`p-6 rounded-sm border transition-all cursor-pointer ${
              selectedFlow === 'cloud'
                ? 'bg-slate-900 border-amber-500/80 shadow-lg'
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-sm bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Server className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-sm bg-amber-500/20 text-amber-300 uppercase tracking-widest">
                Traditional
              </span>
            </div>
            <h3 className="text-base font-bold text-white uppercase mb-2">{t.cloudAi}</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {language === 'kr'
                ? '사용자 요청을 클라우드 데이터센터의 대형 GPU 서버로 송신하여 연산 후 결과를 반환받는 방식 (예: GPT-4o, Claude 3.5).'
                : 'User requests are transmitted to remote data centers for processing and returned over the internet (e.g. GPT-4o, Claude 3.5).'}
            </p>
            <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
              <div className="flex justify-between text-slate-400">
                <span>{t.latency}:</span>
                <span className="text-amber-400 font-semibold">{t.cloudLatencyVal}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{t.privacy}:</span>
                <span className="text-amber-400 font-semibold">{t.cloudPrivacyVal}</span>
              </div>
            </div>
          </div>

          {/* On-Device AI Card (Highlighted) */}
          <div
            onClick={() => setSelectedFlow('onDevice')}
            className={`p-6 rounded-sm border-l-4 transition-all cursor-pointer relative overflow-hidden ${
              selectedFlow === 'onDevice'
                ? 'bg-slate-900 border-indigo-500 border-y-slate-800 border-r-slate-800 shadow-xl'
                : 'bg-slate-900/80 border-indigo-500/50 border-y-slate-800 border-r-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-sm bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-sm bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase tracking-widest">
                Next-Gen Edge
              </span>
            </div>
            <h3 className="text-base font-bold text-white uppercase mb-2 flex items-center space-x-2">
              <span>{t.onDeviceAi}</span>
              <Zap className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {language === 'kr'
                ? '네트워크 통신 없이 스마트폰, PC, IoT 기기 내부의 NPU/GPU와 경량 모델(SLM, Vision)로 100% 오프라인 실시간 처리.'
                : 'Performs 100% offline real-time inference directly on mobile and PC NPUs/GPUs using quantized Edge AI models.'}
            </p>
            <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
              <div className="flex justify-between text-slate-400">
                <span>{t.latency}:</span>
                <span className="text-indigo-300 font-bold">{t.onDeviceLatencyVal}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{t.privacy}:</span>
                <span className="text-emerald-400 font-bold">{t.onDevicePrivacyVal}</span>
              </div>
            </div>
          </div>

          {/* Hybrid AI Card */}
          <div
            onClick={() => setSelectedFlow('hybrid')}
            className={`p-6 rounded-sm border transition-all cursor-pointer ${
              selectedFlow === 'hybrid'
                ? 'bg-slate-900 border-indigo-500/80 shadow-lg'
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-sm bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                <Layers className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-sm bg-indigo-500/20 text-indigo-300 uppercase tracking-widest">
                Balanced
              </span>
            </div>
            <h3 className="text-base font-bold text-white uppercase mb-2">{t.hybridAi}</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {language === 'kr'
                ? '단순 민감 작업(요약, 오디오 인식)은 온디바이스에서, 초대형 복잡 추론은 클라우드 서버로 유연하게 라우팅하는 유합형 방식.'
                : 'Routes simple/private tasks to On-Device NPU and delegates mega reasoning tasks to cloud servers dynamically.'}
            </p>
            <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
              <div className="flex justify-between text-slate-400">
                <span>{t.latency}:</span>
                <span className="text-indigo-300 font-semibold">Adaptive Routing</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{t.privacy}:</span>
                <span className="text-indigo-300 font-semibold">Local Privacy First</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Data Flow Architecture Visual */}
        <div className="bg-slate-900 border border-slate-800 rounded-sm p-6 lg:p-8 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white uppercase">{t.flowTitle}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'kr'
                  ? '클라우드 연산과 온디바이스 연산 간의 데이터 이동 경로 및 가용성 비교'
                  : 'Compare data path, security vectors, and network requirements'}
              </p>
            </div>
            <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-sm text-xs font-semibold">
              <button
                onClick={() => setSelectedFlow('cloud')}
                className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedFlow === 'cloud' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Cloud AI Flow
              </button>
              <button
                onClick={() => setSelectedFlow('onDevice')}
                className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedFlow === 'onDevice' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                On-Device AI Flow
              </button>
            </div>
          </div>

          {/* Flow Diagram Rendering */}
          <div className="p-6 rounded-sm bg-slate-950 border border-slate-800">
            {selectedFlow === 'cloud' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
                <div className="p-4 rounded-sm bg-slate-900 border border-amber-500/30">
                  <div className="text-xs font-bold text-amber-400 uppercase mb-1">1. User Device</div>
                  <p className="text-[11px] text-slate-400">Captures voice/text data</p>
                </div>
                <div className="flex flex-col items-center justify-center my-2 md:my-0">
                  <div className="text-[10px] text-amber-400 font-mono mb-1">🌐 Cell / Wi-Fi Internet (100ms+)</div>
                  <div className="w-full h-1 bg-amber-500/40 rounded-full animate-pulse" />
                  <div className="text-[10px] text-red-400 mt-1 flex items-center space-x-1">
                    <HelpCircle className="w-3 h-3" />
                    <span>Cloud Interception Risk</span>
                  </div>
                </div>
                <div className="p-4 rounded-sm bg-slate-900 border border-amber-500/30">
                  <div className="text-xs font-bold text-amber-400 uppercase mb-1">3. Remote Server GPU</div>
                  <p className="text-[11px] text-slate-400">Data Center Processing</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
                <div className="p-4 rounded-sm bg-slate-900 border border-indigo-500/40">
                  <div className="text-xs font-bold text-indigo-300 uppercase mb-1">1. User Sensor / Mic / Camera</div>
                  <p className="text-[11px] text-slate-400">Captures raw local signal</p>
                </div>
                <div className="flex flex-col items-center justify-center my-2 md:my-0">
                  <div className="text-[10px] text-emerald-400 font-mono mb-1">🔒 Local System Bus (0ms RTT)</div>
                  <div className="w-full h-1.5 bg-indigo-500 rounded-full" />
                  <div className="text-[10px] text-emerald-300 mt-1 flex items-center space-x-1">
                    <Lock className="w-3 h-3" />
                    <span>100% Zero External Leak</span>
                  </div>
                </div>
                <div className="p-4 rounded-sm bg-slate-900 border border-indigo-500/40">
                  <div className="text-xs font-bold text-indigo-300 uppercase mb-1">3. Local NPU / GPU Core</div>
                  <p className="text-[11px] text-slate-400">Quantized Model Execution</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Privacy & Hardware Illustration Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-900 p-6 sm:p-8 rounded-sm border border-slate-800">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center space-x-2 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero Cloud Breach Guarantee</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white uppercase">
              {language === 'kr'
                ? '왜 거대 기업과 의료기관이 온디바이스 AI로 전환할까요?'
                : 'Why Global Enterprises & Healthcare Leaders are Switching to On-Device AI'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'kr'
                ? '민감한 개인 생체 정보, 특허 소스코드, 금융 거래 및 대화 기록이 외부 서버로 절대로 전송되지 않습니다. 해킹이나 서버 마비 시에도 기기 자체의 독립적인 연산 능력으로 서비스 가용성을 100% 보장합니다.'
                : 'Confidential trade secrets, medical records, and financial biometric data are processed locally. Your application remains 100% available even during cloud network outages or server security breaches.'}
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3 bg-slate-950 rounded-sm border-l-2 border-emerald-500">
                <div className="font-bold text-emerald-300 uppercase">HIPAA & GDPR</div>
                <div className="text-slate-400 text-[11px]">개인정보보호 규제 완전 충족</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-sm border-l-2 border-indigo-500">
                <div className="font-bold text-indigo-300 uppercase">0.01s Sub-Latency</div>
                <div className="text-slate-400 text-[11px]">네트워크 대기시간 소멸</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 relative rounded-sm overflow-hidden border border-slate-800">
            <img
              src="/src/assets/images/privacy_shield_ai_1786333668587.jpg"
              alt="Local AI Hardware Privacy Shield"
              className="w-full h-auto object-cover opacity-90"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
