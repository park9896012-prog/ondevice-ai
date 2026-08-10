import { DomainUseCase } from '../types';

export const DOMAIN_USE_CASES: DomainUseCase[] = [
  {
    id: 'mobile-wearables',
    title: {
      kr: '모바일 및 스마트 웨어러블',
      en: 'Mobile & Smart Wearables'
    },
    iconName: 'Smartphone',
    shortDesc: {
      kr: '스마트폰, 스마트 워치, AR 글래스에서 네트워크 없이 작동하는 실시간 통역, 오디오 받아쓰기 및 보조 에이전트.',
      en: 'Real-time offline translation, audio dictation, and context-aware agents running directly on phones, watches, and AR glasses.'
    },
    fullDesc: {
      kr: '모바일 OS 내장 NPU와 통합 메모리를 활용하여, 비행기 모드나 오지에서도 즉시 반응하는 실시간 통번역, 사진 배경 사물 제거, 바이오 오디오 실시간 분석을 구현합니다.',
      en: 'Leverages mobile OS embedded NPUs and unified memory to provide instant offline voice translation, photo object erasure, and continuous biometric signal processing even in airplane mode.'
    },
    benefits: {
      kr: [
        '데이터 요금 및 인터넷 접속 불가 환경에서도 100% 작동',
        '음성 바이오메트릭 및 개인 대화의 클라우드 유출 영구 차단',
        '통신 딜레이(RTT 0ms) 없는 즉각적인 실시간 인터렉션'
      ],
      en: [
        '100% functional in offline areas or airplane mode without cell data fees',
        'Complete protection against voice biometric or personal chat cloud leaks',
        'Zero network latency (0ms RTT) for instantaneous real-time responsiveness'
      ]
    },
    suitableModels: ['gemini-nano', 'llama-3-2-1b-3b', 'whisper-tiny-base'],
    implementationSteps: [
      {
        title: { kr: '1단계: 하드웨어 가속 API 바인딩', en: 'Step 1: Hardware Acceleration API Binding' },
        desc: {
          kr: 'Android AICore 또는 Apple CoreML/MLX API를 앱에 포함하여 NPU 텐서 가속 엔진을 활성화합니다.',
          en: 'Link Android AICore or Apple CoreML/MLX SDKs into the mobile runtime to engage hardware NPU tensor acceleration.'
        }
      },
      {
        title: { kr: '2단계: 양자화(INT4/INT8) 모델 로딩', en: 'Step 2: Quantized (INT4/INT8) Weight Loading' },
        desc: {
          kr: '메모리 점유율을 1GB 내외로 줄이기 위해 INT4로 양자화된 Llama 3.2 1B 또는 Gemini Nano 가중치를 로컬 인메모리에 탑재합니다.',
          en: 'Load INT4-quantized weights (under 1GB) into local memory to ensure low memory footprint on background mobile tasks.'
        }
      },
      {
        title: { kr: '3단계: 오프라인 파이프라인 처리', en: 'Step 3: Offline Audio/Text Pipeline Processing' },
        desc: {
          kr: 'Whisper Tiny STT 엔진과 SLM을 연결하여 마이크 입력 즉시 자막 생성 및 행동 태스크를 즉시 실행합니다.',
          en: 'Connect Whisper Tiny STT directly to the SLM logic engine to process mic input into speech transcriptions and actionable triggers instantly.'
        }
      }
    ]
  },
  {
    id: 'smarthome-iot',
    title: {
      kr: '스마트홈 및 IoT 에지 기기',
      en: 'Smart Home & Edge IoT'
    },
    iconName: 'Home',
    shortDesc: {
      kr: '라즈베리 파이, 에지 CCTV, 월패드에서 클라우드 연결 없이 동작하는 로컬 음성 제어 및 영상 객체 탐지.',
      en: 'Local voice command processing and computer vision threat detection on Raspberry Pi, smart cameras, and wallpads without cloud dependency.'
    },
    fullDesc: {
      kr: '외부 서버가 마비되거나 인터넷이 끊겨도 가전제품을 제어할 수 있으며, 홈 모니터링 카메라는 침입자 식별만 로컬에서 처리하여 사생활 누출 위험을 근본적으로 제거합니다.',
      en: 'Ensures home automation remains fully functional during internet outages while smart security cameras analyze video locally, completely removing privacy risks.'
    },
    benefits: {
      kr: [
        '서버 유지비(Cloud API Billing) 월 0원 달성',
        '가족의 사생활 영상이 외부 서버로 전송되지 않음',
        '밀리초 단위의 초고속 가전 스위치 반응 속도'
      ],
      en: [
        '$0 recurring monthly cloud infrastructure cost',
        'Private home video feeds are never uploaded to third-party servers',
        'Millisecond response time for smart lighting and appliance control'
      ]
    },
    suitableModels: ['yolov11-nano', 'mobilenet-v4', 'whisper-tiny-base'],
    implementationSteps: [
      {
        title: { kr: '1단계: 임베디드 라이트웨이트 런타임 구성', en: 'Step 1: Embedded Lightweight Runtime Setup' },
        desc: {
          kr: 'NCNN 또는 ONNX Runtime C++ 지원 환경을 라즈베리 파이나 에지 보드에 설치합니다.',
          en: 'Deploy ONNX Runtime C++ or NCNN lightweight execution binary on Raspberry Pi or ARM Cortex edge board.'
        }
      },
      {
        title: { kr: '2단계: 비전 카메라인식 파이프라인 구축', en: 'Step 2: Local Vision Detection Pipeline' },
        desc: {
          kr: 'YOLOv11 Nano 모델을 INT8 양자화하여 카메라 비디오 스트림에서 초당 30프레임 이상으로 사람과 동물을 식별합니다.',
          en: 'Deploy INT8 YOLOv11 Nano to detect human and pet bounding boxes directly on the RTSP video stream at 30+ FPS.'
        }
      },
      {
        title: { kr: '3단계: 로컬 VAD & 음성 명령 매핑', en: 'Step 3: Local VAD & Command Triggering' },
        desc: {
          kr: 'Silero VAD로 음성을 감지한 후 Whisper Tiny 모델을 통해 "조명 켜줘" 등의 명령어를 로컬 MQTT로 즉시 브로드캐스팅합니다.',
          en: 'Detect speech via Silero VAD and transcribe locally using Whisper Tiny to broadcast local MQTT triggers.'
        }
      }
    ]
  },
  {
    id: 'automotive-robotics',
    title: {
      kr: '자율주행 및 로보틱스',
      en: 'Automotive & Robotics'
    },
    iconName: 'Car',
    shortDesc: {
      kr: '통신 지연이 용납되지 않는 차량용 NPU 및 로봇 제어기에서의 비전 장애물 실시간 회피 및 음성 비서.',
      en: 'Zero-latency vision obstacle detection and intelligent cockpit assistant running directly on vehicle NPUs and robot controllers.'
    },
    fullDesc: {
      kr: '터널, 지하 주차장 등 통신 음영 지역에서도 100% 신뢰할 수 있는 장애물 추적과 탑승자 음성 명령을 5ms 이하의 지연시간으로 가공합니다.',
      en: 'Delivers 100% fail-safe obstacle detection and driver conversational AI in tunnels or connectivity dead zones with sub-5ms decision cycles.'
    },
    benefits: {
      kr: [
        '통신 단절 시에도 차량 안전 기능 100% 유지',
        '5ms 미만의 인라인 비전 분석으로 초고속 충돌 방지',
        '운전자 졸음 감지 및 시선 추적 로컬 비전 처리'
      ],
      en: [
        '100% active safety system operational integrity during cell network drops',
        'Sub-5ms inline vision inference for immediate collision avoidance',
        'Private driver drowsiness and attentiveness tracking on local cockpit cameras'
      ]
    },
    suitableModels: ['yolov11-nano', 'gemma-2-2b', 'mobilenet-v4'],
    implementationSteps: [
      {
        title: { kr: '1단계: 차량용 오토모티브 NPU 컴파일', en: 'Step 1: Automotive NPU Quantized Compilation' },
        desc: {
          kr: 'OpenVINO 또는 TensorRT-Edge 컴파일러로 비전 가중치를 최적화합니다.',
          en: 'Compile vision weights using TensorRT-Edge or OpenVINO targeting embedded vehicle NPUs.'
        }
      },
      {
        title: { kr: '2단계: 멀티 센서 퓨전 로컬 파이프라인', en: 'Step 2: Multi-Sensor Local Fusion Pipeline' },
        desc: {
          kr: '라이다/카메라 입력값을 YOLOv11 및 MobileNetV4로 병렬 연산하여 3D 바운딩 박스를 추출합니다.',
          en: 'Feed radar and camera feeds into YOLOv11 and MobileNetV4 in parallel to output 3D bounding coordinates.'
        }
      }
    ]
  },
  {
    id: 'healthcare-privacy',
    title: {
      kr: '의료 및 개인정보보호',
      en: 'Healthcare & Data Privacy'
    },
    iconName: 'ShieldCheck',
    shortDesc: {
      kr: '환자 차트 분석, 로컬 생체 신호 모니터링, 법적 민감 정보(HIPAA/GDPR) 완전 보호.',
      en: 'On-device electronic health record analysis, real-time vitals monitoring, and 100% compliance with strict privacy regulations.'
    },
    fullDesc: {
      kr: '의료 데이터 및 생체 정보는 법적으로 외부 클라우드로 유출되면 심각한 규제 위반입니다. 온디바이스 AI를 활용하여 병원 내 단말기 및 웨어러블 진단기에서 민감 정보를 안전하게 분석합니다.',
      en: 'Medical history and real-time biometric feeds are subject to strict data protection laws. On-device AI enables hospitals and health wearables to process patient data locally with zero cloud breach vectors.'
    },
    benefits: {
      kr: [
        'HIPAA, GDPR, 개인정보보호법 100% 완벽 준수',
        '의료 단말기 및 청진기/심전도 기기에서 로컬 진단 보조',
        '네트워크 해킹 시에도 환자 의료 기록 누출 불가능'
      ],
      en: [
        '100% compliance with HIPAA, GDPR, and medical privacy laws',
        'Real-time local diagnostic assistance directly on stethoscopes and ECG monitors',
        'Impossible to leak patient medical records even during network breach'
      ]
    },
    suitableModels: ['gemma-2-2b', 'llama-3-2-1b-3b', 'whisper-tiny-base'],
    implementationSteps: [
      {
        title: { kr: '1단계: 에어갭(Air-gapped) 인프라 세팅', en: 'Step 1: Air-Gapped Local Infrastructure Setup' },
        desc: {
          kr: '외부 인터넷과 격리된 패블릿 및 의료 태블릿에 로컬 런타임을 배포합니다.',
          en: 'Deploy local runtimes to air-gapped clinical tablets completely isolated from external internet access.'
        }
      },
      {
        title: { kr: '2단계: 로컬 튜닝 SLM 차트 요약', en: 'Step 2: Fine-Tuned Local SLM Chart Summarization' },
        desc: {
          kr: '의학 전문 용어로 파인튜닝된 Gemma 2B 모델로 의사 소견서 및 진단 기록을 로컬에서 차트화합니다.',
          en: 'Utilize a medical-specialized Gemma 2B model to automatically generate structured patient clinical notes locally.'
        }
      }
    ]
  },
  {
    id: 'pc-productivity',
    title: {
      kr: 'PC 및 데스크톱 생산성',
      en: 'PC & Enterprise Productivity'
    },
    iconName: 'Cpu',
    shortDesc: {
      kr: 'Copilot+ PC, Apple Silicon Mac에서 동작하는 오프라인 코드 자동완성, 로컬 RAG 문서 검색 및 이미지 생성.',
      en: 'Offline code completion, local RAG enterprise document search, and real-time image synthesis on Apple Silicon Macs and Copilot+ PCs.'
    },
    fullDesc: {
      kr: '기업 내부 기밀 소스 코드나 비밀 계약서 문서를 외부 서버로 전송하지 않고, 사용자의 PC GPU/NPU를 활용해 0.1초 만에 최적의 코드나 관련 구절을 검색합니다.',
      en: 'Empowers developers and enterprise staff to perform instant semantic search over confidential source code and legal contracts on local GPUs with zero cloud exposure.'
    },
    benefits: {
      kr: [
        '기업 기밀 코드 및 지적 재산권(IP) 유출 위험 0%',
        '개발자 IDE에서 네트워크 연결 없이 실시간 코드 자동 완성',
        'Copilot+ PC NPU (40+ TOPS) 및 Apple M-Series 통합 메모리 최대 활용'
      ],
      en: [
        '0% risk of leaking enterprise trade secret source code or IP',
        'Real-time inline code completion in developer IDEs during flight or offline',
        'Unlocks maximum throughput on Copilot+ PC NPUs (40+ TOPS) and Apple M-series'
      ]
    },
    suitableModels: ['gemma-2-2b', 'llama-3-2-1b-3b', 'mobilediffusion-sd-turbo'],
    implementationSteps: [
      {
        title: { kr: '1단계: Ollama / WebLLM 백엔드 바인딩', en: 'Step 1: Ollama / WebLLM Engine Binding' },
        desc: {
          kr: '데스크톱 애플리케이션(Electron, VS Code 확장 프로그램)에 Ollama 또는 WebGPU 엔진을 연동합니다.',
          en: 'Embed Ollama or WebGPU runtime directly into desktop apps or VS Code extension hosts.'
        }
      },
      {
        title: { kr: '2단계: 로컬 임베딩 & 벡터 DB RAG 구축', en: 'Step 2: Local Vector Database RAG Pipeline' },
        desc: {
          kr: '로컬 PDF/소스코드를 로컬 임베딩 모델로 벡터화하여 SQLite-vss나 DuckDB에 보관 후 SLM과 연동합니다.',
          en: 'Index local files into a local SQLite-vss vector store and pass relevant chunks to Llama 3.2 or Gemma.'
        }
      }
    ]
  }
];
