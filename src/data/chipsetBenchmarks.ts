import { ChipsetBenchmark } from '../types';

export const CHIPSET_BENCHMARKS: ChipsetBenchmark[] = [
  {
    name: 'AMD Ryzen AI 9 HX 370 (XDNA 2)',
    category: 'PC / Laptop',
    npuTops: 50,
    releaseYear: 2024,
    keyFeature: 'Copilot+ PC Ready, 50 TOPS NPU, Block FP16 HW support'
  },
  {
    name: 'Intel Core Ultra 200V (Lunar Lake NPU 4)',
    category: 'PC / Laptop',
    npuTops: 48,
    releaseYear: 2024,
    keyFeature: 'Copilot+ PC, 48 TOPS NPU, Ultra Low Power'
  },
  {
    name: 'Qualcomm Snapdragon X Elite (Hexagon)',
    category: 'PC / Laptop',
    npuTops: 45,
    releaseYear: 2024,
    keyFeature: 'Copilot+ PC Flagship, 45 TOPS NPU, 45W Max TDP'
  },
  {
    name: 'Apple M4 / M4 Pro / M4 Max',
    category: 'PC / Laptop',
    npuTops: 38,
    releaseYear: 2024,
    keyFeature: 'Unified Memory Architecture up to 128GB, 38 TOPS Neural Engine'
  },
  {
    name: 'Apple A18 Pro (iPhone 16 Pro)',
    category: 'Mobile',
    npuTops: 35,
    releaseYear: 2024,
    keyFeature: 'Apple Intelligence Hardware Engine, 16-Core Neural Engine'
  },
  {
    name: 'Qualcomm Snapdragon 8 Gen 3 / Gen 4',
    category: 'Mobile',
    npuTops: 45,
    releaseYear: 2024,
    keyFeature: 'Hexagon NPU, Real-time Multimodal LLM & Diffusion on Phone'
  },
  {
    name: 'Google Tensor G4 (Pixel 9)',
    category: 'Mobile',
    npuTops: 30,
    releaseYear: 2024,
    keyFeature: 'Gemini Nano Built-in Acceleration, TPU-v4 Mobile Variant'
  },
  {
    name: 'Samsung Exynos 2400',
    category: 'Mobile',
    npuTops: 28,
    releaseYear: 2024,
    keyFeature: 'Galaxy AI Engine, 14.7x NPU performance gain over predecessor'
  },
  {
    name: 'Raspberry Pi 5 + Hailo-8L AI Hat',
    category: 'Edge / IoT',
    npuTops: 13,
    releaseYear: 2024,
    keyFeature: '$70 Low-cost Edge Vision & Object Detection Accelerator'
  }
];
