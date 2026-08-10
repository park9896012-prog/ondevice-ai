import React, { useState } from 'react';
import { Language, SystemHardwareInfo } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Sparkles, X, Send, Bot, Loader2 } from 'lucide-react';

interface AiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  hardware: SystemHardwareInfo | null;
}

export const AiAdvisorModal: React.FC<AiAdvisorModalProps> = ({
  isOpen,
  onClose,
  language,
  hardware,
}) => {
  const t = TRANSLATIONS[language].aiAdvisor;
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAskAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/advisor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          systemSpec: hardware,
          language,
        }),
      });

      const data = await res.json();
      if (data.result) {
        setResponse(data.result);
      } else {
        setResponse(data.error || 'Failed to get recommendation.');
      }
    } catch (err: any) {
      setResponse(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{t.modalTitle}</h3>
              <p className="text-[10px] text-slate-400">Powered by Gemini 3.6 Flash</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content / Q&A Area */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Quick preset questions */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold text-slate-400">자주 묻는 하드웨어 질문 예시:</div>
            <div className="flex flex-wrap gap-1.5">
              {[
                '16GB RAM 맥북에서 로컬 RAG용 최고의 SLM은?',
                '스마트폰에서 오프라인 Whisper 번역 속도 높이는 법',
                'WebGPU와 Ollama 중 어떤 인퍼런스 엔진이 더 빠른가요?'
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(q)}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Response Box */}
          {loading && (
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-3">
              <Loader2 className="w-6 h-6 text-cyan-400 animate-spin mx-auto" />
              <p className="text-xs text-slate-400">{t.loading}</p>
            </div>
          )}

          {response && (
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400">
                <Bot className="w-4 h-4" />
                <span>On-Device AI Hardware Expert Response</span>
              </div>
              <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {response}
              </div>
            </div>
          )}
        </div>

        {/* Modal Input Form */}
        <form onSubmit={handleAskAdvisor} className="p-4 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t.placeholder}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-400 outline-none placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center space-x-1.5 hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer shrink-0"
          >
            <span>{t.askBtn}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
