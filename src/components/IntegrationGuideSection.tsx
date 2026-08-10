import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Code, Copy, Check, Terminal, Globe, Smartphone, Apple, Laptop } from 'lucide-react';

interface IntegrationGuideSectionProps {
  language: Language;
}

export const IntegrationGuideSection: React.FC<IntegrationGuideSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].developer;
  const [platform, setPlatform] = useState<'web' | 'android' | 'ios' | 'python'>('web');
  const [copied, setCopied] = useState(false);

  const codeGuides = {
    web: {
      title: 'Web Application (JavaScript / TypeScript + WebGPU)',
      dependencies: 'npm install @mlc-ai/web-llm @huggingface/transformers',
      description: {
        kr: '크롬/에지 브라우저에서 WebGPU 및 Transformers.js를 사용하여 설치 없이 인브라우저 오프라인 SLM / Vision 모델 구동.',
        en: 'Run in-browser offline SLM and vision models using WebGPU and Transformers.js without any native binary installation.'
      },
      code: `import { CreateMLCEngine } from "@mlc-ai/web-llm";

async function initLocalAI() {
  // 1. WebGPU capability check
  if (!("gpu" in navigator)) {
    throw new Error("WebGPU is not supported in this browser.");
  }

  // 2. Initialize WebLLM engine with quantized Llama 3.2 1B
  const engine = await CreateMLCEngine("Llama-3.2-1B-Instruct-q4f16_1-MLC", {
    initProgressCallback: (progress) => {
      console.log(\`Model Loading: \${Math.round(progress.progress * 100)}% - \${progress.text}\`);
    }
  });

  // 3. Generate response locally on device GPU
  const response = await engine.chat.completions.create({
    messages: [{ role: "user", content: "Summarize On-Device AI benefits" }],
    temperature: 0.7,
    max_tokens: 150
  });

  console.log("Local Response:", response.choices[0].message.content);
}

initLocalAI();`
    },
    android: {
      title: 'Android Native Application (Kotlin + MediaPipe Tasks / AICore)',
      dependencies: 'implementation("com.google.mediapipe:tasks-genai:0.10.14")',
      description: {
        kr: '안드로이드 NPU 가속 엔진(MediaPipe LLM Inference 및 AICore)을 활용한 온디바이스 AI 생성 파이프라인.',
        en: 'Native Android pipeline utilizing MediaPipe LLM Inference and AICore for hardware NPU accelerated local inference.'
      },
      code: `package com.example.ondeviceai

import android.content.Context
import com.google.mediapipe.tasks.genai.llminference.LlmInference

class OnDeviceAiManager(private val context: Context) {
    private var llmInference: LlmInference? = null

    fun initializeModel(modelPath: String) {
        val options = LlmInference.LlmInferenceOptions.builder()
            .setModelPath(modelPath)
            .setMaxTokens(512)
            .setTopK(40)
            .setTemperature(0.7f)
            .build()

        llmInference = LlmInference.createFromOptions(context, options)
    }

    fun generateLocalResponse(prompt: String): String {
        return llmInference?.generateResponse(prompt) ?: "Model not ready"
    }
}`
    },
    ios: {
      title: 'iOS Native Application (Swift + MLX Swift / CoreML)',
      dependencies: '.package(url: "https://github.com/ml-explore/mlx-swift-examples", branch: "main")',
      description: {
        kr: '애플 실리콘 통합 메모리(Unified Memory) 및 Neural Engine을 최대 구동하는 MLX Swift local pipeline.',
        en: 'MLX Swift local pipeline exploiting Apple Silicon unified memory and Neural Engine acceleration.'
      },
      code: `import Foundation
import MLX
import MLXLMCommon

class LocalAIEngine {
    private var container: ModelContainer?

    func loadModel() async throws {
        // Load quantized Gemma 2B or Llama 3.2 on iOS Neural Engine
        self.container = try await LLMModelFactory.shared.loadContainer(
            configuration: ModelConfiguration.llama3_2_1b
        )
    }

    func generate(prompt: String) async throws -> String {
        guard let container = self.container else { return "Model uninitialized" }
        let result = try await container.generate(prompt: prompt)
        return result
    }
}`
    },
    python: {
      title: 'Desktop & Edge Server (Python + Ollama / llama.cpp)',
      dependencies: 'pip install requests transformers torch onnxruntime',
      description: {
        kr: '파이썬 기반로컬 API 서버(Ollama/llama.cpp) 및 Hugging Face ONNX Runtime 인퍼런스 구축.',
        en: 'Python desktop/edge runtime integrating local REST APIs (Ollama/llama.cpp) and ONNX Runtime.'
      },
      code: `import requests
import json

def query_local_ollama(prompt: str, model_name: str = "llama3.2:1b"):
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": model_name,
        "prompt": prompt,
        "stream": False
    }
    
    try:
        response = requests.post(url, json=payload, timeout=30)
        response.raise_for_status()
        data = response.json()
        return data.get("response", "")
    except Exception as e:
        return f"Local Ollama server error: {e}"

if __name__ == "__main__":
    result = query_local_ollama("Explain zero-latency edge AI")
    print("Local AI Output:", result)`
    }
  };

  const currentGuide = codeGuides[platform];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentGuide.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="developer" className="py-16 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em]">
            05. INTEGRATION GUIDE & SDK EXAMPLES
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            {t.title}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
            {t.subtitle}
          </p>
        </div>

        {/* Platform Picker Tabs */}
        <div className="flex justify-start">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-950 border border-slate-800 p-1 rounded-sm w-full max-w-2xl">
            <button
              onClick={() => setPlatform('web')}
              className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-sm text-xs font-bold uppercase transition-all cursor-pointer ${
                platform === 'web'
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Web (JS/TS)</span>
            </button>
            <button
              onClick={() => setPlatform('android')}
              className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-sm text-xs font-bold uppercase transition-all cursor-pointer ${
                platform === 'android'
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android</span>
            </button>
            <button
              onClick={() => setPlatform('ios')}
              className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-sm text-xs font-bold uppercase transition-all cursor-pointer ${
                platform === 'ios'
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Apple className="w-3.5 h-3.5" />
              <span>iOS</span>
            </button>
            <button
              onClick={() => setPlatform('python')}
              className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-sm text-xs font-bold uppercase transition-all cursor-pointer ${
                platform === 'python'
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Python</span>
            </button>
          </div>
        </div>

        {/* Code Box Component */}
        <div className="bg-slate-950 border border-slate-800 rounded-sm shadow-xl space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white uppercase">{currentGuide.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{currentGuide.description[language]}</p>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sm bg-slate-800 hover:bg-slate-700 text-xs font-bold uppercase text-slate-200 transition-all cursor-pointer border border-slate-700 w-fit"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{t.copyCode}</span>
                </>
              )}
            </button>
          </div>

          {/* Dependencies Box */}
          <div className="p-3 rounded-sm bg-slate-900 border border-slate-800 flex items-center space-x-2 text-xs font-mono text-indigo-300">
            <Terminal className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="truncate">{currentGuide.dependencies}</span>
          </div>

          {/* Code Block */}
          <pre className="p-4 bg-slate-900 rounded-sm border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre leading-relaxed">
            {currentGuide.code}
          </pre>
        </div>
      </div>
    </section>
  );
};
