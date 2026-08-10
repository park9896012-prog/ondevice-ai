export type Language = 'kr' | 'en';

export type ModelCategory = 'text' | 'vision' | 'audio' | 'image';

export interface ModelSpec {
  id: string;
  name: string;
  developer: string;
  category: ModelCategory;
  parameters: string; // e.g. "1.8B", "3.2B", "300M"
  recommendedRam: number; // in GB
  minRam: number; // in GB
  vramRequired: number; // in GB
  quantizations: Array<'INT4' | 'INT8' | 'FP16'>;
  defaultQuant: 'INT4' | 'INT8' | 'FP16';
  sizeMB: {
    INT4: number;
    INT8: number;
    FP16: number;
  };
  estimatedTokensPerSec: {
    npu: number;
    webgpu: number;
    cpu: number;
  };
  primaryFramework: string; // e.g. "WebLLM / Transformers.js"
  supportedFrameworks: string[];
  license: string;
  description: {
    kr: string;
    en: string;
  };
  pros: {
    kr: string[];
    en: string[];
  };
  cons: {
    kr: string[];
    en: string[];
  };
  targetDevices: {
    kr: string[];
    en: string[];
  };
  useCases: {
    kr: string[];
    en: string[];
  };
  codeSnippets: {
    web: string;
    android: string;
    ios: string;
    python: string;
  };
}

export interface SystemHardwareInfo {
  detected: boolean;
  ramGB: number;
  logicalCores: number;
  webGpuSupported: boolean;
  gpuVendor: string;
  gpuRenderer: string;
  platform: string;
  isMobile: boolean;
  estimatedNpuTops: number;
  recommendedMaxModelParams: string;
}

export interface UserSpecInput {
  deviceType: 'mobile' | 'laptop' | 'desktop' | 'iot';
  chipsetFamily: string; // 'apple_silicon' | 'snapdragon' | 'intel_ultra' | 'amd_ryzen' | 'nvidia_rtx' | 'generic'
  ramGB: number;
  vramGB: number;
  hasWebGpu: boolean;
  primaryUseCase: 'chat' | 'vision' | 'speech' | 'image_gen' | 'code' | 'iot_sensor';
  batteryPriority: 'performance' | 'balanced' | 'power_save';
}

export interface RecommendationResult {
  model: ModelSpec;
  score: number; // 0 to 100
  recommendedQuant: 'INT4' | 'INT8' | 'FP16';
  estimatedPerformance: string;
  ramUsagePercent: number;
  matchReasons: { kr: string[]; en: string[] };
  warnings: { kr: string[]; en: string[] };
  runnerEngine: string;
}

export interface DomainUseCase {
  id: string;
  title: { kr: string; en: string };
  iconName: string;
  shortDesc: { kr: string; en: string };
  fullDesc: { kr: string; en: string };
  benefits: { kr: string[]; en: string[] };
  suitableModels: string[];
  implementationSteps: {
    title: { kr: string; en: string };
    desc: { kr: string; en: string };
  }[];
}

export interface ChipsetBenchmark {
  name: string;
  category: 'Mobile' | 'PC / Laptop' | 'Edge / IoT';
  npuTops: number;
  releaseYear: number;
  keyFeature: string;
}
