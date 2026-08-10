import { SystemHardwareInfo } from '../types';

export async function detectSystemHardware(): Promise<SystemHardwareInfo> {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const logicalCores = navigator.hardwareConcurrency || 4;
  const ramGB = (navigator as any).deviceMemory || (isMobile ? 6 : 16);

  let webGpuSupported = false;
  let gpuVendor = 'Generic / Integrated';
  let gpuRenderer = 'Default Graphics Accelerator';
  let estimatedNpuTops = isMobile ? 15 : 30;

  // Check WebGPU availability
  if ('gpu' in navigator && (navigator as any).gpu) {
    try {
      const adapter = await (navigator as any).gpu.requestAdapter();
      if (adapter) {
        webGpuSupported = true;
        // Check for WebGPU info if available
        if (adapter.info) {
          gpuVendor = adapter.info.vendor || 'WebGPU Accelerator';
          gpuRenderer = adapter.info.architecture || adapter.info.device || 'Modern Hardware GPU';
        }
      }
    } catch (e) {
      console.warn('WebGPU check failed:', e);
    }
  }

  // WebGL Fallback detection for GPU strings
  if (gpuVendor === 'Generic / Integrated') {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const rendererStr = (gl as WebGLRenderingContext).getParameter(
            debugInfo.UNMASKED_RENDERER_WEBGL
          );
          if (rendererStr) {
            gpuRenderer = rendererStr;
            if (rendererStr.includes('Apple') || rendererStr.includes('M1') || rendererStr.includes('M2') || rendererStr.includes('M3') || rendererStr.includes('M4')) {
              gpuVendor = 'Apple Silicon';
              estimatedNpuTops = 38;
            } else if (rendererStr.includes('NVIDIA') || rendererStr.includes('RTX') || rendererStr.includes('GTX')) {
              gpuVendor = 'NVIDIA';
              estimatedNpuTops = 45;
            } else if (rendererStr.includes('Adreno') || rendererStr.includes('Snapdragon')) {
              gpuVendor = 'Qualcomm Snapdragon';
              estimatedNpuTops = 35;
            } else if (rendererStr.includes('Intel') || rendererStr.includes('Iris') || rendererStr.includes('Arc')) {
              gpuVendor = 'Intel Graphics / NPU';
              estimatedNpuTops = 25;
            } else if (rendererStr.includes('Mali') || rendererStr.includes('Exynos')) {
              gpuVendor = 'ARM Mali / Exynos';
              estimatedNpuTops = 20;
            }
          }
        }
      }
    } catch (e) {
      console.warn('WebGL detection failed:', e);
    }
  }

  let recommendedMaxModelParams = '1B - 3B (SLM)';
  if (ramGB >= 16 || estimatedNpuTops >= 35) {
    recommendedMaxModelParams = '3B - 8B (SLM / Vision / Diffusion)';
  } else if (ramGB < 8) {
    recommendedMaxModelParams = '100M - 2B (Lightweight Edge Model)';
  }

  return {
    detected: true,
    ramGB,
    logicalCores,
    webGpuSupported,
    gpuVendor,
    gpuRenderer,
    platform: navigator.platform || (isMobile ? 'Mobile OS' : 'Desktop OS'),
    isMobile,
    estimatedNpuTops,
    recommendedMaxModelParams
  };
}
