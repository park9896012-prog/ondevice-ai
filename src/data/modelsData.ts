import { ModelSpec } from '../types';

export const ON_DEVICE_MODELS: ModelSpec[] = [
  {
    id: 'gemini-nano',
    name: 'Gemini Nano',
    developer: 'Google',
    category: 'text',
    parameters: '1.8B / 3.25B',
    recommendedRam: 6,
    minRam: 4,
    vramRequired: 2,
    quantizations: ['INT4'],
    defaultQuant: 'INT4',
    sizeMB: { INT4: 1200, INT8: 2100, FP16: 3800 },
    estimatedTokensPerSec: { npu: 45, webgpu: 30, cpu: 12 },
    primaryFramework: 'Android AICore / Chrome Built-in AI Prompt API',
    supportedFrameworks: ['Android AICore', 'Chrome Prompt API', 'MediaPipe Tasks'],
    license: 'Proprietary (On-Device OS API)',
    description: {
      kr: '스마트폰 및 Chrome 브라우저에 기기 내장형으로 최적화된 구글의 초경량 온디바이스 언어 모델. 요약, 답장 추천, Proofreading에 특화.',
      en: "Google's ultra-lightweight on-device language model built natively into Android and Chrome. Specialized for summarization, smart replies, and proofreading."
    },
    pros: {
      kr: [
        'Android OS 및 Chrome 브라우저 내장으로 별도 모델 다운로드 불필요',
        'NPU 하드웨어 가속 최적화로 전력 소비 최소화',
        '사용자 데이터가 기기를 벗어나지 않아 완벽한 프라이버시보장'
      ],
      en: [
        'Built directly into Android OS and Chrome, requiring no manual model download',
        'Hardware-accelerated on NPUs for minimal battery consumption',
        'Zero data leaves the device, guaranteeing total user privacy'
      ]
    },
    cons: {
      kr: [
        '복잡한 코딩이나 긴 추론(Reasoning) 과제에는 한계 존재',
        '지원되는 최신 스마트폰(Pixel 8/9, Galaxy S24 등) 또는 최신 Chrome 지원 제한'
      ],
      en: [
        'Limited reasoning capacity for complex coding or deep multi-step logic',
        'Requires supported hardware (Pixel 8/9, Galaxy S24+, recent Chrome builds)'
      ]
    },
    targetDevices: {
      kr: ['안드로이드 플래그십 스마트폰', 'Chromebook 및 Chrome 브라우저 사용자'],
      en: ['Android Flagship Smartphones', 'Chromebooks and Chrome Web Browser']
    },
    useCases: {
      kr: ['오프라인 실시간 메시지 요약', '스마트 답장 생성', '문법 교정 및 오프라인 번역'],
      en: ['Offline Real-time Message Summarization', 'Smart Reply Generation', 'Grammar Correction & Offline Translation']
    },
    codeSnippets: {
      web: `// Chrome Built-in AI Prompt API (Origin Trial / Web Standard)
if ('ai' in window && 'languageModel' in (window as any).ai) {
  const session = await (window as any).ai.languageModel.create();
  const result = await session.prompt("Summarize this article locally...");
  console.log(result);
}`,
      android: `// Android AICore Client API (Kotlin)
val generativeModel = GenerativeModel(
    modelName = "gemini-nano",
    apiKey = "" // On-Device AICore handles auth locally
)
val response = generativeModel.generateContent("요약해줘: $text")`,
      ios: `// Gemini Nano iOS integration via MediaPipe Tasks LLM Inference
import MediaPipeTasksGenAI

let options = LlmInferenceOptions(modelPath: "gemini_nano.bin")
let llm = try LlmInference(options: options)
let response = try llm.generate(prompt: "Summarize this text")`,
      python: `# MediaPipe LLM Inference Python API
import mediapipe as mp
from mediapipe.tasks.python.genai import llm_inference

options = llm_inference.LlmInferenceOptions(model_path="gemini_nano_int4.bin")
with llm_inference.LlmInference.create_from_options(options) as llm:
    output = llm.generate("Local AI query")
    print(output)`
    }
  },
  {
    id: 'llama-3-2-1b-3b',
    name: 'Llama 3.2 (1B & 3B)',
    developer: 'Meta',
    category: 'text',
    parameters: '1.2B / 3.21B',
    recommendedRam: 8,
    minRam: 4,
    vramRequired: 3,
    quantizations: ['INT4', 'INT8', 'FP16'],
    defaultQuant: 'INT4',
    sizeMB: { INT4: 850, INT8: 1600, FP16: 3200 },
    estimatedTokensPerSec: { npu: 52, webgpu: 38, cpu: 18 },
    primaryFramework: 'WebLLM / Ollama / ExecuTorch',
    supportedFrameworks: ['WebLLM (WebGPU)', 'Ollama', 'ExecuTorch', 'llama.cpp', 'MLX'],
    license: 'Llama 3.2 Community License',
    description: {
      kr: 'Meta의 대표적인 에지 단말용 초경량 open-weights 모델. 1B 모델은 모바일 RAM 2GB 이하에서도 동작 가능하며 고성능 추론 지원.',
      en: "Meta's flagship edge open-weights model. The 1B variant runs in under 2GB RAM on mobile devices while maintaining high performance."
    },
    pros: {
      kr: [
        '1B 모델 기준 850MB 미만의 극단적인 경량화 (INT4)',
        '웹 브라우저 WebGPU(WebLLM)에서 추가 설치 없이 초당 30+ 토큰 출력 가능',
        '다국어 및 명령 이행 능력 우수'
      ],
      en: [
        'Extremely lightweight under 850MB in INT4 quantization',
        'Runs directly in web browsers via WebGPU at 30+ tokens/sec without installation',
        'Excellent multilingual instruction-following capability'
      ]
    },
    cons: {
      kr: [
        '1B 버전은 초장문 컨텍스트 처리 시 정보 유실 가능성',
        '복잡한 도메인 수학 문제 추론 능력 제한'
      ],
      en: [
        '1B parameter limit may lose precision on ultra-long context windows',
        'Sub-optimal performance on highly complex mathematical proofs'
      ]
    },
    targetDevices: {
      kr: ['모바일 앱(iOS/Android)', '웹 브라우저 WebGPU 애플리케이션', '라즈베리파이 5 / IoT 스마트기기'],
      en: ['Mobile Apps (iOS/Android)', 'WebGPU Web Applications', 'Raspberry Pi 5 / Edge IoT']
    },
    useCases: {
      kr: ['오프라인 에이전트 다이얼로그', '로컬 RAG 문서 검색', '스마트 홈 기기 제어'],
      en: ['Offline Agent Dialogue', 'Local RAG Document Search', 'Smart Home Device Control']
    },
    codeSnippets: {
      web: `import { CreateMLCEngine } from "@mlc-ai/web-llm";

// WebLLM in browser via WebGPU
const selectedModel = "Llama-3.2-1B-Instruct-q4f16_1-MLC";
const engine = await CreateMLCEngine(selectedModel, {
  initProgressCallback: (progress) => console.log(progress.text)
});

const reply = await engine.chat.completions.create({
  messages: [{ role: "user", content: "Explain On-Device AI in 2 sentences." }]
});
console.log(reply.choices[0].message.content);`,
      android: `// ExecuTorch for Android (C++ / JNI wrapper)
val runner = LlamaModule(context, "llama3_2_1b_instruct.pt2")
val response = runner.generate("Tell me a quick tip")`,
      ios: `// MLX Swift for Apple Silicon
import MLXLMCommon

let model = try await LLMModelFactory.shared.loadContainer(
    configuration: ModelConfiguration.llama3_2_1b
)
let result = try await model.generate(prompt: "Hello from local iOS")`,
      python: `# Ollama local API in Python
import requests

response = requests.post("http://localhost:11434/api/generate", json={
    "model": "llama3.2:1b",
    "prompt": "Explain local AI benefits",
    "stream": False
})
print(response.json()["response"])`
    }
  },
  {
    id: 'gemma-2-2b',
    name: 'Gemma 2 (2B)',
    developer: 'Google DeepMind',
    category: 'text',
    parameters: '2.6B',
    recommendedRam: 6,
    minRam: 4,
    vramRequired: 2.5,
    quantizations: ['INT4', 'INT8', 'FP16'],
    defaultQuant: 'INT4',
    sizeMB: { INT4: 1500, INT8: 2700, FP16: 5200 },
    estimatedTokensPerSec: { npu: 48, webgpu: 35, cpu: 16 },
    primaryFramework: 'Transformers.js / MediaPipe / Ollama',
    supportedFrameworks: ['Transformers.js (ONNX WebGPU)', 'MediaPipe Tasks', 'Ollama', 'MLX'],
    license: 'Gemma Open Terms',
    description: {
      kr: '구글 딥마인드의 오픈 웨이트 Gemma 2 시리즈의 2B 파라미터 모델. Knowledge Distillation 기술로 7B 급 모델에 육박하는 뛰어난 한국어 및 추론 성능 제공.',
      en: 'Google DeepMind open-weights 2B model distilled from larger Gemini architecture, offering performance rivalling 7B models in a tiny footprint.'
    },
    pros: {
      kr: [
        '소형 파라미터 대비 압도적인 한국어 및 추론 성능',
        'Transformers.js (ONNX WebGPU)로 웹 브라우저에서 즉시 실행 가능',
        '안전성 가이드라인 강화로 오답 및 환각(Hallucination) 감소'
      ],
      en: [
        'Outstanding Korean language fluency and reasoning relative to parameter size',
        'Runs seamlessly in web browsers via Transformers.js & WebGPU',
        'Strong safety alignment with lower hallucination rate'
      ]
    },
    cons: {
      kr: [
        '1B 이하 모델에 비해 모바일 배터리 소모량이 소폭 높음',
        '최소 4GB 이상의 시스템 메모리 권장'
      ],
      en: [
        'Higher battery usage compared to sub-1B models',
        'Requires minimum 4GB free RAM for smooth operation'
      ]
    },
    targetDevices: {
      kr: ['노트북 및 PC 웹앱', '안드로이드 및 iOS 고성능 스마트폰', '에지 서버'],
      en: ['Laptops and PC Web Applications', 'High-end Smartphones', 'Edge Servers']
    },
    useCases: {
      kr: ['오프라인 챗봇', '개인 문서 요약 및 구조화', '코드 자동 완성 보조'],
      en: ['Offline Conversational Chatbot', 'Personal Document Structuring', 'Code Autocomplete Helper']
    },
    codeSnippets: {
      web: `import { pipeline } from '@huggingface/transformers';

// WebGPU Hugging Face Transformers.js
const generator = await pipeline('text-generation', 'onnx-community/gemma-2-2b-it-GGUF', {
  device: 'webgpu'
});

const output = await generator('온디바이스 AI의 장점은?', { max_new_tokens: 100 });
console.log(output[0].generated_text);`,
      android: `// MediaPipe Tasks GenAI
val options = LlmInferenceOptions.builder()
    .setModelPath("/data/local/tmp/gemma-2-2b-it-gpu-int4.bin")
    .setTopK(40)
    .build()
val llm = LlmInference.createFromOptions(context, options)`,
      ios: `// MLX Swift
let container = try await LLMModelFactory.shared.loadContainer(configuration: .gemma2_2b)
let output = try await container.generate(prompt: "Describe edge AI")`,
      python: `from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("google/gemma-2-2b-it", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("google/gemma-2-2b-it")
inputs = tokenizer("Hello Gemma!", return_tensors="pt").to("cuda")
print(tokenizer.decode(model.generate(**inputs)[0]))`
    }
  },
  {
    id: 'mobilenet-v4',
    name: 'MobileNetV4',
    developer: 'Google',
    category: 'vision',
    parameters: '3.8M - 32M',
    recommendedRam: 2,
    minRam: 1,
    vramRequired: 0.5,
    quantizations: ['INT8', 'FP16'],
    defaultQuant: 'INT8',
    sizeMB: { INT4: 8, INT8: 15, FP16: 30 },
    estimatedTokensPerSec: { npu: 120, webgpu: 90, cpu: 45 }, // FPS
    primaryFramework: 'MediaPipe / TensorFlow Lite / ONNX Web',
    supportedFrameworks: ['TensorFlow Lite', 'MediaPipe', 'ONNX Runtime Web', 'CoreML'],
    license: 'Apache 2.0',
    description: {
      kr: '모바일 및 모바일 NPU 가속에 최적화된 Universal 객체 인식 및 이미지 분류 모델. 초당 100+ 프레임의 놀라운 속도 자랑.',
      en: 'Universal image classification & feature extraction architecture optimized specifically for mobile hardware and NPU vector units.'
    },
    pros: {
      kr: [
        '15MB 미만의 극도로 작은 용량과 밀리초(ms) 단위의 응답 속도',
        '모바일 NPU 및 GPU 환경에서 전력 효율 극대화',
        '웹캠 및 실시간 카메라 스트림 분석에 최적화'
      ],
      en: [
        'Tiny footprint under 15MB with sub-millisecond classification latency',
        'Exceptional battery efficiency on mobile NPUs and GPUs',
        'Ideal for continuous real-time webcam video stream processing'
      ]
    },
    cons: {
      kr: [
        '단순 분류 모델로 복잡한 생성형 멀티모달 대화 불가능',
        '바운딩 박스 객체 검출(Detection)을 원할 경우 SSD 헤드 추가 필요'
      ],
      en: [
        'Pure classification model; cannot generate conversational text responses',
        'Requires object detection head (e.g. SSDLite) for bounding box coordinates'
      ]
    },
    targetDevices: {
      kr: ['저전력 IoT 카메라', '모바일 앱', '웹 기반 실시간 비전 필터'],
      en: ['Low-power IoT Security Cameras', 'Mobile Apps', 'Web Real-time Video Processors']
    },
    useCases: {
      kr: ['실시간 사물 식별', '품질 검사 및 오프라인 모니터링', '제스처 및 얼굴 인식 보조'],
      en: ['Real-time Object Identification', 'Offline Industrial Quality Inspection', 'Gesture & Face Detection Auxiliary']
    },
    codeSnippets: {
      web: `import { ImageClassifier, FilesetResolver } from "@mediapipe/tasks-vision";

const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm");
const classifier = await ImageClassifier.createFromOptions(vision, {
  baseOptions: { modelAssetPath: "mobilenet_v4.tflite" },
  runningMode: "IMAGE"
});

const result = classifier.classify(imageElement);
console.log(result.classifications[0].categories[0].categoryName);`,
      android: `// Android TensorFlow Lite
val tflite = Interpreter(loadModelFile("mobilenet_v4_int8.tflite"))
tflite.run(inputBitmapBuffer, outputLabelsBuffer)`,
      ios: `// iOS CoreML Image Classification
import CoreML
import Vision

let model = try VNCoreMLModel(for: MobileNetV4().model)
let request = VNCoreMLRequest(model: model) { req, err in
    print(req.results?.first)
}`,
      python: `import onnxruntime as ort
import numpy as np

session = ort.InferenceSession("mobilenetv4.onnx", providers=['CPUExecutionProvider'])
outputs = session.run(None, {"input": np.random.randn(1, 3, 224, 224).astype(np.float32)})`
    }
  },
  {
    id: 'yolov11-nano',
    name: 'YOLOv11 Nano (Detect)',
    developer: 'Ultralytics',
    category: 'vision',
    parameters: '2.6M',
    recommendedRam: 2,
    minRam: 1,
    vramRequired: 0.8,
    quantizations: ['INT8', 'FP16'],
    defaultQuant: 'INT8',
    sizeMB: { INT4: 3, INT8: 6, FP16: 12 },
    estimatedTokensPerSec: { npu: 140, webgpu: 85, cpu: 35 }, // FPS
    primaryFramework: 'ONNX Runtime Web / CoreML / NCNN',
    supportedFrameworks: ['ONNX Runtime Web', 'CoreML', 'TFLite', 'OpenVINO', 'NCNN'],
    license: 'AGPL-3.0 / Commercial Option',
    description: {
      kr: '실시간 객체 검출(Object Detection)의 최신 종결자 YOLOv11의 초경량 Nano 모델. 단 6MB로 바운딩 박스 및 80여개 클래스 실시간 탐지.',
      en: 'The state-of-the-art YOLOv11 object detection model in a ultra-lightweight 6MB Nano variant, running at 100+ FPS on edge devices.'
    },
    pros: {
      kr: [
        '초당 100 FPS 이상의 압도적인 바운딩 박스 추적 속도',
        'ONNX Runtime WebGPU로 웹 브라우저에서 직접 웹캠 객체 추적 가능',
        '메모리 점유율 100MB 이하'
      ],
      en: [
        'Over 100 FPS real-time bounding box tracking performance',
        'Runs directly on webcam feeds in web browsers via ONNX WebGPU',
        'RAM consumption under 100MB'
      ]
    },
    cons: {
      kr: [
        '가려진 작은 객체 탐지율은 대형 모델 대비 다소 낮음',
        '상업적 이용 시 라이선스 검토 필요 (AGPL-3.0)'
      ],
      en: [
        'Slightly lower recall on distant or heavily occluded micro-objects',
        'AGPL-3.0 license requires open sourcing or commercial license'
      ]
    },
    targetDevices: {
      kr: ['드론 및 모빌리티 카메라', 'CCTV 로컬 AI 분석기', '모바일 검출 앱'],
      en: ['Drones and Mobility Vision', 'Local CCTV AI Analyzers', 'Mobile Detection Apps']
    },
    useCases: {
      kr: ['자율주행 장애물 실시간 인식', '매장 객두 계산 및 인원 측정', '안전모 및 위험지역 실시간 감시'],
      en: ['Autonomous Driving Obstacle Avoidance', 'Store Traffic Counting', 'PPE / Safety Helmet Enforcement']
    },
    codeSnippets: {
      web: `import * as ort from 'onnxruntime-web/webgpu';

const session = await ort.InferenceSession.create('yolov11n.onnx', {
  executionProviders: ['webgpu']
});
const tensor = new ort.Tensor('float32', processedImageArray, [1, 3, 640, 640]);
const results = await session.run({ images: tensor });
console.log("Detections raw array:", results);`,
      android: `// Ultralytics YOLOv11 TFLite
val yolo = YoloDetector(context, "yolov11n_float16.tflite")
val boxes = yolo.detect(bitmap)`,
      ios: `// YOLOv11 CoreML
let model = try yolov11n(configuration: MLModelConfiguration())
let output = try model.prediction(image: pixelBuffer)`,
      python: `from ultralytics import YOLO

model = YOLO("yolo11n.pt")
results = model.predict(source=0, show=True) # Real-time webcam`
    }
  },
  {
    id: 'whisper-tiny-base',
    name: 'Whisper (Tiny & Base)',
    developer: 'OpenAI',
    category: 'audio',
    parameters: '39M / 74M',
    recommendedRam: 2,
    minRam: 1,
    vramRequired: 0.8,
    quantizations: ['INT8', 'FP16'],
    defaultQuant: 'INT8',
    sizeMB: { INT4: 25, INT8: 40, FP16: 150 },
    estimatedTokensPerSec: { npu: 80, webgpu: 60, cpu: 25 },
    primaryFramework: 'Transformers.js / whisper.cpp',
    supportedFrameworks: ['Transformers.js (ONNX WebGPU)', 'whisper.cpp', 'CoreML', 'TFLite'],
    license: 'MIT',
    description: {
      kr: '다국어 음성 인식(STT) 세계 표준 Whisper의 초경량 온디바이스 모델. 네트워크 없이 마이크 음성을 실시간 텍스트로 변환.',
      en: "OpenAI's industry-standard Whisper automatic speech recognition model converted for zero-latency local speech-to-text in browsers and apps."
    },
    pros: {
      kr: [
        '인터넷 연결 없이 100% 오프라인 다국어 음성 받아쓰기 가능',
        '소음이 섞인 환경에서도 우수한 음성 받아쓰기 정확도',
        'MIT 자유 라이선스로 상용 서비스 탑재 용이'
      ],
      en: [
        '100% offline multilingual speech transcription without cloud API costs',
        'Robust transcription accuracy even in noisy acoustic environments',
        'MIT open-source license allows unrestricted commercial integration'
      ]
    },
    cons: {
      kr: [
        'Tiny 버전은 극심한 사투리/방언 인식률 약화 가능성',
        '긴 정적 구간에서 가끔 유령 텍스트 반복 출력 현상'
      ],
      en: [
        'Tiny model shows lower accuracy on heavy accents or dialects',
        'Occasional repetition loop during long silent audio segments'
      ]
    },
    targetDevices: {
      kr: ['스마트 워치 및 오디오 웨어러블', '모바일 음성 메모 앱', '웹 기반 회의록 작성기'],
      en: ['Smartwatches & Audio Wearables', 'Mobile Voice Recorders', 'Web Meeting Transcribers']
    },
    useCases: {
      kr: ['오프라인 음성 메모 생성', '실시간 자막 생성기', '음성 명령어 제어'],
      en: ['Offline Voice Note Dictation', 'Real-time Live Subtitles', 'Voice Command Interfaces']
    },
    codeSnippets: {
      web: `import { pipeline } from '@huggingface/transformers';

// Transformers.js WebGPU Whisper
const transcriber = await pipeline('automatic-speech-recognition', 'onnx-community/whisper-tiny', {
  device: 'webgpu'
});

const result = await transcriber(audioBlob);
console.log("Transcribed Text:", result.text);`,
      android: `// whisper.cpp Android via JNI
val whisper = WhisperContext.createContextFromFile("whisper-tiny-q8_0.bin")
val text = whisper.transcribe(pcmAudioData)`,
      ios: `// whisper.cpp Swift
import whisper

let context = whisper_init_from_file("whisper-tiny.bin")
whisper_full(context, params, pcmData, pcmLength)
let text = String(cString: whisper_full_get_segment_text(context, 0))`,
      python: `import whisper

model = whisper.load_model("tiny")
result = model.transcribe("sample.wav")
print(result["text"])`
    }
  },
  {
    id: 'mobilediffusion-sd-turbo',
    name: 'MobileDiffusion / SD Turbo',
    developer: 'Google / Stability AI',
    category: 'image',
    parameters: '520M / 1.1B',
    recommendedRam: 8,
    minRam: 6,
    vramRequired: 4,
    quantizations: ['INT4', 'INT8', 'FP16'],
    defaultQuant: 'INT4',
    sizeMB: { INT4: 1200, INT8: 2200, FP16: 4500 },
    estimatedTokensPerSec: { npu: 4, webgpu: 2.5, cpu: 0.3 }, // Images per sec
    primaryFramework: 'WebGPU (ONNX/Stable Diffusion Web) / MediaPipe',
    supportedFrameworks: ['WebGPU ONNX Runtime', 'MediaPipe Image Generation', 'CoreML', 'MLX'],
    license: 'Stability AI Community / Google Research',
    description: {
      kr: '단 1~4 단계의 추론(Steps)만으로 512x512 고품질 이미지를 생성하는 에지 디퓨전 모델. 모바일 및 PC GPU에서 초당 1~3장 실시간 이미지 생성.',
      en: 'Ultra-fast sub-second image diffusion model generating 512x512 images in just 1 to 4 steps locally on desktop and mobile GPUs.'
    },
    pros: {
      kr: [
        '기존 디퓨전(50 step) 대비 10배 이상 빠르고 적은 전력 소모',
        '프롬프트 입력과 동시에 실시간 인프레임 이미지 렌더링 지원',
        '서버 비용 없이 무제한 로컬 이미지 생성'
      ],
      en: [
        '10x faster than traditional 50-step diffusion with dramatic power savings',
        'Real-time live frame rendering as user types prompts',
        'Unlimited local image creation with zero server hosting costs'
      ]
    },
    cons: {
      kr: [
        '최소 4GB 이상의 GPU VRAM 요구',
        '복잡한 문자/텍스트 렌더링 표시는 다소 미흡'
      ],
      en: [
        'Requires minimum 4GB dedicated GPU VRAM for fluid execution',
        'Fine text / typography rendering inside images remains challenging'
      ]
    },
    targetDevices: {
      kr: ['NVIDIA/Apple Silicon PC', '고성능 모바일 기기', '웹 크리에이티브 도구'],
      en: ['Apple Silicon & NVIDIA PCs', 'High-end Smartphones', 'Web Creative Tools']
    },
    useCases: {
      kr: ['실시간 드로잉 보조', '오프라인 콘셉트 아트 아바타 생성', '게임 자원 동적 생성'],
      en: ['Real-time Canvas Drawing Assistant', 'Offline Concept Art Avatar Generator', 'Dynamic In-Game Texture Synthesis']
    },
    codeSnippets: {
      web: `// WebGPU Diffusion via Hugging Face Transformers.js / ONNX
import { AutoPipelineForText2Image } from '@huggingface/transformers';

const pipe = await AutoPipelineForText2Image.from_pretrained('Xenova/sd-turbo-webgpu', {
  device: 'webgpu'
});
const image = await pipe('A glowing cyberpunk camera lens, vector art', { num_inference_steps: 1 });
document.body.appendChild(image);`,
      android: `// MediaPipe Image Generator
val options = ImageGeneratorOptions.builder()
    .setModelPath("mobilediffusion.tflite")
    .build()
val generator = ImageGenerator.createFromOptions(context, options)
val image = generator.generate("A futuristic city sunset")`,
      ios: `// CoreML Stable Diffusion Swift
import StableDiffusion

let pipeline = try StableDiffusionPipeline(resourcesAt: modelURL)
let image = try pipeline.generateImages(prompt: "Cyberpunk dragon", stepCount: 2)`,
      python: `from diffusers import AutoPipelineForText2Image
import torch

pipe = AutoPipelineForText2Image.from_pretrained("stabilityai/sd-turbo", torch_dtype=torch.float16)
pipe.to("cuda")
image = pipe(prompt="A minimalist camera lens", num_inference_steps=1).images[0]
image.save("out.png")`
    }
  }
];
