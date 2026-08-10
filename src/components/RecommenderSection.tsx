import React, { useState, useEffect } from 'react';
import {
  Language,
  SystemHardwareInfo,
  UserSpecInput,
  RecommendationResult
} from '../types';
import { ON_DEVICE_MODELS } from '../data/modelsData';
import { TRANSLATIONS } from '../data/translations';
import { detectSystemHardware } from '../utils/hardwareDetector';
import {
  Cpu,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Download,
  Sliders,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  HardDrive
} from 'lucide-react';

interface RecommenderSectionProps {
  language: Language;
  hardware: SystemHardwareInfo | null;
  setHardware: (hw: SystemHardwareInfo) => void;
}

export const RecommenderSection: React.FC<RecommenderSectionProps> = ({
  language,
  hardware,
  setHardware,
}) => {
  const t = TRANSLATIONS[language].recommender;
  const [activeTab, setActiveTab] = useState<'auto' | 'manual'>('auto');
  const [isDetecting, setIsDetecting] = useState<boolean>(false);

  // Manual inputs
  const [manualInput, setManualInput] = useState<UserSpecInput>({
    deviceType: 'laptop',
    chipsetFamily: 'apple_silicon',
    ramGB: 16,
    vramGB: 8,
    hasWebGpu: true,
    primaryUseCase: 'chat',
    batteryPriority: 'balanced',
  });

  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);

  // Trigger Hardware Detection on mount
  useEffect(() => {
    runHardwareDetection();
  }, []);

  const runHardwareDetection = async () => {
    setIsDetecting(true);
    const hw = await detectSystemHardware();
    setHardware(hw);
    setIsDetecting(false);
    calculateRecommendations(hw, null);
  };

  // Recommender Engine Logic
  const calculateRecommendations = (
    hw: SystemHardwareInfo | null,
    manual: UserSpecInput | null
  ) => {
    const isAuto = activeTab === 'auto' && hw !== null;

    const availableRam = isAuto ? hw.ramGB : manual!.ramGB;
    const hasWebGpu = isAuto ? hw.webGpuSupported : manual!.hasWebGpu;
    const useCase = isAuto ? 'chat' : manual!.primaryUseCase;
    const isMobile = isAuto ? hw.isMobile : manual!.deviceType === 'mobile' || manual!.deviceType === 'iot';

    const results: RecommendationResult[] = ON_DEVICE_MODELS.map((model) => {
      let score = 70; // baseline score
      const matchReasons: { kr: string[]; en: string[] } = { kr: [], en: [] };
      const warnings: { kr: string[]; en: string[] } = { kr: [], en: [] };

      // RAM fit check
      const ramMargin = availableRam - model.recommendedRam;
      if (ramMargin >= 4) {
        score += 20;
        matchReasons.kr.push(`시스템 메모리(${availableRam}GB)가 충분하여 안정적으로 동작합니다.`);
        matchReasons.en.push(`Abundant RAM (${availableRam}GB) ensures stable high-performance execution.`);
      } else if (ramMargin >= 0) {
        score += 10;
        matchReasons.kr.push(`권장 메모리(${model.recommendedRam}GB) 조건에 부합합니다.`);
        matchReasons.en.push(`Meets recommended RAM specification (${model.recommendedRam}GB).`);
      } else if (availableRam >= model.minRam) {
        score -= 10;
        warnings.kr.push(`최소 메모리(${model.minRam}GB)는 충족하지만 다른 앱과 동시 실행 시 저하될 수 있습니다.`);
        warnings.en.push(`Meets min RAM (${model.minRam}GB) but multitasking may degrade speed.`);
      } else {
        score -= 40;
        warnings.kr.push(`메모리 부족(${availableRam}GB < 최소 ${model.minRam}GB). OOM 오류 가능성이 높습니다.`);
        warnings.en.push(`Insufficient memory (${availableRam}GB < min ${model.minRam}GB). High OOM risk.`);
      }

      // WebGPU acceleration check
      if (hasWebGpu) {
        score += 15;
        matchReasons.kr.push('WebGPU 가속을 지원하여 웹 브라우저에서 초고속 추론이 가능합니다.');
        matchReasons.en.push('WebGPU acceleration enabled for lightning-fast browser execution.');
      } else {
        score -= 15;
        warnings.kr.push('WebGPU 미지원으로 CPU Fallback 모드로 동작하여 속도가 감소합니다.');
        warnings.en.push('No WebGPU detected. Will run in slower CPU fallback mode.');
      }

      // Category matching
      if (
        (useCase === 'chat' && model.category === 'text') ||
        (useCase === 'vision' && model.category === 'vision') ||
        (useCase === 'speech' && model.category === 'audio') ||
        (useCase === 'image_gen' && model.category === 'image')
      ) {
        score += 15;
        matchReasons.kr.push(`주요 사용 목적(${useCase.toUpperCase()})과 정확히 일치합니다.`);
        matchReasons.en.push(`Exact match for primary intent (${useCase.toUpperCase()}).`);
      }

      // Quantization selection recommendation
      let recommendedQuant: 'INT4' | 'INT8' | 'FP16' = 'INT4';
      if (availableRam >= 16) {
        recommendedQuant = model.quantizations.includes('INT8') ? 'INT8' : 'INT4';
      } else {
        recommendedQuant = 'INT4';
      }

      // Estimate throughput
      const speed = hasWebGpu
        ? `${model.estimatedTokensPerSec.webgpu} ${model.category === 'vision' || model.category === 'image' ? 'FPS/Steps' : 'tokens/sec'}`
        : `${model.estimatedTokensPerSec.cpu} ${model.category === 'vision' || model.category === 'image' ? 'FPS/Steps' : 'tokens/sec'}`;

      const modelSize = model.sizeMB[recommendedQuant] || 1000;
      const ramUsagePercent = Math.min(100, Math.round((modelSize / 1024 / availableRam) * 100));

      const runnerEngine = model.primaryFramework;

      return {
        model,
        score: Math.max(0, Math.min(100, score)),
        recommendedQuant,
        estimatedPerformance: speed,
        ramUsagePercent,
        matchReasons,
        warnings,
        runnerEngine,
      };
    });

    results.sort((a, b) => b.score - a.score);
    setRecommendations(results);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateRecommendations(null, manualInput);
  };

  const downloadJsonReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      detectionMode: activeTab,
      hardwareInfo: hardware,
      manualConfig: activeTab === 'manual' ? manualInput : null,
      topRecommendation: recommendations[0]?.model.name,
      allRecommendations: recommendations.map((r) => ({
        modelName: r.model.name,
        score: r.score,
        quantization: r.recommendedQuant,
        estimatedSpeed: r.estimatedPerformance,
        ramFootprintPercent: `${r.ramUsagePercent}%`,
        reasons: r.matchReasons[language],
        warnings: r.warnings[language],
      })),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ondevice-ai-recommendation-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="recommender" className="py-16 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em]">
            03. RECOMMENDER & HARDWARE DIAGNOSTICS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            {t.title}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
            {t.subtitle}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-start">
          <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-sm">
            <button
              onClick={() => {
                setActiveTab('auto');
                if (hardware) calculateRecommendations(hardware, null);
              }}
              className={`flex items-center space-x-2 px-5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'auto'
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{t.tabAuto}</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('manual');
                calculateRecommendations(null, manualInput);
              }}
              className={`flex items-center space-x-2 px-5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'manual'
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{t.tabManual}</span>
            </button>
          </div>
        </div>

        {/* Mode A: Automatic Detector View */}
        {activeTab === 'auto' && (
          <div className="bg-slate-950 border border-slate-800 p-6 sm:p-8 rounded-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white uppercase flex items-center space-x-2">
                  <span>{t.detectedStatus}</span>
                  {isDetecting && <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === 'kr'
                    ? '현재 브라우저 환경에서 감지된 가용 메모리, GPU 가속 유무 및 논리 코어 수'
                    : 'Probed browser hardware features: Available Memory, WebGPU, and GPU Core vendor'}
                </p>
              </div>

              <button
                onClick={runHardwareDetection}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sm bg-slate-800 hover:bg-slate-700 text-xs font-bold uppercase text-slate-200 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
                <span>재진단</span>
              </button>
            </div>

            {hardware && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-sm bg-slate-900 border-l-2 border-indigo-500 space-y-1">
                  <div className="text-[10px] font-bold uppercase text-slate-400">{t.ramLabel}</div>
                  <div className="text-xl font-bold text-indigo-300">{hardware.ramGB} GB RAM</div>
                  <div className="text-[10px] text-slate-500">Navigator DeviceMemory</div>
                </div>

                <div className="p-4 rounded-sm bg-slate-900 border-l-2 border-emerald-500 space-y-1">
                  <div className="text-[10px] font-bold uppercase text-slate-400">{t.webGpuLabel}</div>
                  <div
                    className={`text-sm font-bold uppercase ${
                      hardware.webGpuSupported ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {hardware.webGpuSupported ? t.supported : t.unsupported}
                  </div>
                  <div className="text-[10px] text-slate-500">W3C WebGPU Probed</div>
                </div>

                <div className="p-4 rounded-sm bg-slate-900 border-l-2 border-purple-500 space-y-1">
                  <div className="text-[10px] font-bold uppercase text-slate-400">{t.gpuLabel}</div>
                  <div className="text-sm font-bold text-indigo-300 truncate">
                    {hardware.gpuVendor}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">{hardware.gpuRenderer}</div>
                </div>

                <div className="p-4 rounded-sm bg-slate-900 border-l-2 border-indigo-400 space-y-1">
                  <div className="text-[10px] font-bold uppercase text-slate-400">{t.coresLabel}</div>
                  <div className="text-xl font-bold text-indigo-300">{hardware.logicalCores} Cores</div>
                  <div className="text-[10px] text-slate-500">{hardware.platform}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mode B: Manual Specs Form */}
        {activeTab === 'manual' && (
          <form
            onSubmit={handleManualSubmit}
            className="bg-slate-950 border border-slate-800 p-6 sm:p-8 rounded-sm space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Form Factor */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-300">{t.selectDevice}</label>
                <select
                  value={manualInput.deviceType}
                  onChange={(e) =>
                    setManualInput({ ...manualInput, deviceType: e.target.value as any })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-sm px-3 py-2 text-xs text-white focus:border-indigo-400 outline-none"
                >
                  <option value="mobile">스마트폰 / 웨어러블 (Mobile)</option>
                  <option value="laptop">노트북 / 랩톱 (Laptop)</option>
                  <option value="desktop">데스크톱 PC (Desktop)</option>
                  <option value="iot">임베디드 IoT / 라즈베리 파이</option>
                </select>
              </div>

              {/* Chipset Family */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-300">{t.selectChipset}</label>
                <select
                  value={manualInput.chipsetFamily}
                  onChange={(e) =>
                    setManualInput({ ...manualInput, chipsetFamily: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-sm px-3 py-2 text-xs text-white focus:border-indigo-400 outline-none"
                >
                  <option value="apple_silicon">Apple Silicon (M1/M2/M3/M4 / A17/A18)</option>
                  <option value="snapdragon">Qualcomm Snapdragon (8 Gen 3/X Elite)</option>
                  <option value="intel_ultra">Intel Core Ultra / Lunar Lake</option>
                  <option value="amd_ryzen">AMD Ryzen AI (XDNA 2)</option>
                  <option value="nvidia_rtx">NVIDIA RTX Laptop / Desktop GPU</option>
                  <option value="generic">기타 일반 칩셋 / 통합 그래픽</option>
                </select>
              </div>

              {/* RAM Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase text-slate-300">
                  <span>{t.ramLabel}</span>
                  <span className="text-indigo-400 font-extrabold">{manualInput.ramGB} GB</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="64"
                  step="2"
                  value={manualInput.ramGB}
                  onChange={(e) =>
                    setManualInput({ ...manualInput, ramGB: parseInt(e.target.value) })
                  }
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* Primary Use Case */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-300">{t.selectUseCase}</label>
                <select
                  value={manualInput.primaryUseCase}
                  onChange={(e) =>
                    setManualInput({ ...manualInput, primaryUseCase: e.target.value as any })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-sm px-3 py-2 text-xs text-white focus:border-indigo-400 outline-none"
                >
                  <option value="chat">텍스트 대화 / 문장 요약 / 챗봇 (SLM)</option>
                  <option value="vision">실시간 영상 및 객체 인식 (Vision)</option>
                  <option value="speech">음성 받아쓰기 / 오프라인 STT (Whisper)</option>
                  <option value="image_gen">이미지 로컬 생성 (Diffusion)</option>
                  <option value="code">코드 자동완성 / 개발자 보조</option>
                </select>
              </div>

              {/* WebGPU Checkbox */}
              <div className="space-y-2 flex items-center pt-5">
                <label className="flex items-center space-x-2 text-xs font-bold uppercase text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={manualInput.hasWebGpu}
                    onChange={(e) =>
                      setManualInput({ ...manualInput, hasWebGpu: e.target.checked })
                    }
                    className="w-4 h-4 accent-indigo-500 rounded-sm"
                  />
                  <span>WebGPU 가속 사용 여부</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-sm bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              {t.calcBtn}
            </button>
          </form>
        )}

        {/* Results List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white uppercase flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>{t.resultTitle}</span>
            </h3>

            <button
              onClick={downloadJsonReport}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-sm bg-slate-800 hover:bg-slate-700 text-xs font-bold uppercase text-slate-200 transition-all cursor-pointer border border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t.downloadReport}</span>
            </button>
          </div>

          <div className="space-y-4">
            {recommendations.map((result, idx) => (
              <div
                key={result.model.id}
                className={`p-6 rounded-sm border transition-all ${
                  idx === 0
                    ? 'bg-slate-950 border-l-4 border-indigo-500 border-y-slate-800 border-r-slate-800 shadow-xl'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-9 h-9 rounded-sm font-black text-sm flex items-center justify-center ${
                        idx === 0
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      #{idx + 1}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white uppercase flex items-center space-x-2">
                        <span>{result.model.name}</span>
                        {idx === 0 && (
                          <span className="px-2 py-0.5 rounded-sm text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase tracking-wider">
                            TOP MATCH
                          </span>
                        )}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        {result.model.developer} • {result.model.parameters}
                      </p>
                    </div>
                  </div>

                  {/* Score & Throughput */}
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-[9px] font-bold uppercase text-slate-400">{t.scoreLabel}</div>
                      <div className="text-xl font-black text-indigo-400">{result.score}%</div>
                    </div>
                    <div className="text-right border-l border-slate-800 pl-4">
                      <div className="text-[9px] font-bold uppercase text-slate-400">{t.estimatedPerformance}</div>
                      <div className="text-sm font-bold text-emerald-400">{result.estimatedPerformance}</div>
                    </div>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {/* Matching Reasons */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-bold uppercase text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.matchReasons}</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {result.matchReasons[language].map((reason, rIdx) => (
                        <li key={rIdx} className="flex items-start space-x-1.5">
                          <span className="text-emerald-400">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Warnings or Limitations */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-bold uppercase text-amber-400 flex items-center space-x-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{t.warnings}</span>
                    </div>
                    {result.warnings[language].length > 0 ? (
                      <ul className="space-y-1 text-xs text-slate-300">
                        {result.warnings[language].map((warn, wIdx) => (
                          <li key={wIdx} className="flex items-start space-x-1.5">
                            <span className="text-amber-400">•</span>
                            <span>{warn}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-400">
                        {language === 'kr' ? '특이 주의사항 없음. 완전 최적 상태입니다.' : 'No critical bottlenecks identified.'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Spec Indicators & Engine */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                  <div className="flex items-center space-x-3">
                    <span>{t.recommendedQuant}: <strong className="text-white">{result.recommendedQuant}</strong></span>
                    <span>{t.ramUsage}: <strong className="text-indigo-300">{result.ramUsagePercent}%</strong></span>
                  </div>
                  <div className="text-[10px] font-mono text-indigo-300">
                    Engine: {result.runnerEngine}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
