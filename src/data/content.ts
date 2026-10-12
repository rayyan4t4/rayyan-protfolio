export const PROFILE = {
  name: "Rayyan Khan",
  email: "rayanuet@gmail.com",
  github: "https://github.com/rayyan4t4",
  linkedin: "https://www.linkedin.com/in/rayyanstein",
  instagram: "https://www.instagram.com/rayyankhan.ai",
  location: "Mardan, Pakistan",
  availability: "Open to work",
  title: "Rayyan Khan | Machine Learning & AI Engineer, Pakistan",
  description:
    "Rayyan Khan is a Machine Learning Engineer in Mardan, Pakistan. Applied deep learning across speech, vision and text — currently going deep on generative AI and LLMs.",
};

export type FeaturedProject = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  stack: string[];
  architecture: string[];
  challenges: string[];
  results: string[];
  github?: string;
  live?: string;
  accent: string;
};

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    slug: "lahore-smog-forecast",
    title: "Lahore Smog Forecast",
    category: "Machine Learning · Time Series",
    tagline: "24-hour PM2.5 forecasting for one of the world's most polluted cities.",
    problem:
      "Lahore regularly ranks among the world's most polluted cities, yet residents had no accessible, localized short-term air-quality forecast to plan around.",
    solution:
      "A 2-layer LSTM trained on 4 years of hourly Lahore pollution and weather data, served through a Streamlit dashboard with 24-hour PM2.5 forecasts.",
    stack: ["Python", "PyTorch", "LSTM", "pandas", "Streamlit"],
    architecture: [
      "Hourly ingestion of PM2.5, temperature, humidity, wind and pressure",
      "Sequence windowing into 72-hour input contexts",
      "2-layer LSTM encoder → dense head, 24-step horizon",
      "Held-out evaluation on ~15k rows; Streamlit dashboard for live forecasts",
    ],
    challenges: [
      "Missing sensor readings and irregular gaps in the hourly record",
      "Seasonal smog regimes that shift the target distribution year to year",
      "Keeping inference light enough for free Streamlit hosting",
    ],
    results: [
      "24-hour PM2.5 forecasts from 4 years of hourly Lahore data",
      "Evaluated on ~15k held-out rows",
      "Live public dashboard with daily forecasts",
    ],
    live: "https://lahore-smog-forecast.streamlit.app",
    accent: "#B9F34C",
  },
  {
    slug: "portfolio-rag-chatbot",
    title: "Portfolio RAG Chatbot",
    category: "Generative AI · RAG",
    tagline: "A retrieval-augmented assistant that answers questions about my work.",
    problem:
      "A static portfolio can't answer a visitor's specific questions — recruiters want to ask, not scroll.",
    solution:
      "A RAG chatbot over a curated knowledge base of my projects and background: MiniLM embeddings, FAISS retrieval, and OpenRouter-hosted LLMs for grounded answers.",
    stack: ["Python", "MiniLM", "FAISS", "OpenRouter", "Streamlit"],
    architecture: [
      "Curated knowledge.md chunked per project and topic",
      "MiniLM embeddings indexed in FAISS",
      "Top-k retrieval with header-keyword boosting",
      "OpenRouter LLM generates answers strictly from retrieved context",
    ],
    challenges: [
      "Single-word queries (e.g. 'Projects') missing the right chunks — fixed with per-project chunks and keyword boosting",
      "Free-tier LLM reliability — model fallbacks and a retry path",
      "Keeping answers grounded and refusing to hallucinate qualifications",
    ],
    results: [
      "Answers questions about 10+ projects and background",
      "Source-grounded responses with fallback when info is missing",
      "Embedded across the portfolio as a floating assistant",
    ],
    github: "https://github.com/rayyan4t4/portfolio-rag-chat",
    live: "https://portfolio-rag-chat-5k6zrbaixyywuxah4nykew.streamlit.app",
    accent: "#B9F34C",
  },
  {
    slug: "conformer-speech-enhancement",
    title: "Conformer Speech Enhancement",
    category: "Deep Learning · Speech",
    tagline: "Single-channel noise suppression with a Conformer encoder.",
    problem:
      "Noisy recordings degrade downstream speech tasks, and classic enhancement methods smear the phase information speech needs.",
    solution:
      "A Conformer-based enhancer predicting complex ratio masks over both magnitude and phase, trained end-to-end on noisy/clean pairs.",
    stack: ["PyTorch", "torchaudio", "Conformer", "Python"],
    architecture: [
      "STFT front-end → complex spectrogram",
      "Conformer encoder (convolution + self-attention blocks)",
      "Complex ratio mask estimation and waveform reconstruction",
    ],
    challenges: [
      "Phase-aware masking without destabilizing training",
      "Fitting training onto free-tier GPU hardware",
      "Generalizing across noise types not seen in training",
    ],
    results: [
      "Evaluated with PESQ, STOI and SI-SDR",
      "Trains on free-tier hardware",
      "Open-source training pipeline",
    ],
    github: "https://github.com/rayyan4t4/Conformer-Speech-Enhancement",
    accent: "#B9F34C",
  },
  {
    slug: "fire-weapon-detection",
    title: "Fire & Weapon Detection",
    category: "Computer Vision · Object Detection",
    tagline: "Real-time fire and weapon detection on live CCTV footage.",
    problem:
      "No public dataset existed for fire and weapon detection in the CCTV conditions this team project targeted.",
    solution:
      "Built the dataset from scratch — ~8,000 frames annotated in CVAT — and trained a YOLO detector for live CCTV inference.",
    stack: ["YOLO", "OpenCV", "PyTorch", "CVAT"],
    architecture: [
      "CCTV frame collection across varied lighting and angles",
      "~8,000 frames annotated in CVAT with consistency checks",
      "YOLO training with class balancing and augmentation",
      "OpenCV inference pipeline for live streams",
    ],
    challenges: [
      "No existing dataset — collection and annotation from zero",
      "Class imbalance between fire and weapon instances",
      "Messy real-world CCTV: motion blur, low light, occlusions",
    ],
    results: [
      "0.89 mAP@0.5 on the held-out set",
      "~8,000 frames annotated in CVAT",
      "Team project — dataset, training and evaluation",
    ],
    accent: "#B9F34C",
  },
];

export type ArchiveProject = {
  title: string;
  description: string;
  stack: string[];
  github?: string;
  live?: string;
  wip?: boolean;
};

export const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    title: "Ask the Constitution",
    description:
      "Full-stack RAG app answering plain-language questions about Pakistan's constitution with article citations. FastAPI + ONNX MiniLM + FAISS over 768 chunks.",
    stack: ["FastAPI", "React", "FAISS", "RAG"],
    github: "https://github.com/rayyan4t4/ask-the-constitution-fullstack",
    live: "https://ask-constitution-web.vercel.app",
  },
  {
    title: "Roman Urdu Sentiment Analyzer",
    description:
      "Sentiment analysis for Roman Urdu text. TF-IDF + logistic regression on 33.6k labeled texts; test macro-F1 0.69 against a 0.22 majority baseline.",
    stack: ["scikit-learn", "Python", "Streamlit"],
    github: "https://github.com/rayyan4t4/roman-urdu-sentiment-analyzer",
    live: "https://roman-urdu-sentiment-analyzer-wgx8edlhcfylauqebaacbb.streamlit.app",
  },
  {
    title: "PDF AI Authorship Analyzer",
    description:
      "Batch-scores text PDFs with a 0–100 AI-authorship risk score from five signals. Runs fully locally — documents never leave the machine.",
    stack: ["Python", "Streamlit", "Transformers"],
    github: "https://github.com/rayyan4t4/PDF-AI-Authorship-Analyzer",
  },
  {
    title: "Veterinary RAG Assistant",
    description:
      "Retrieval-augmented decision-support assistant over veterinary knowledge.",
    stack: ["LangChain", "FAISS", "LLMs"],
    github: "https://github.com/rayyan4t4/veterinary-rag-assistant",
    wip: true,
  },
  {
    title: "LLM + RAG Experiments",
    description:
      "Hands-on notebooks: embeddings, vector stores, chunking strategies and retrieval evaluation.",
    stack: ["LlamaIndex", "ChromaDB"],
    github: "https://github.com/rayyan4t4/llm-rag",
  },
  {
    title: "Word-Ai",
    description:
      "AI task-pane add-in for Microsoft Word — write, edit and format documents with an assistant inside the editor.",
    stack: ["Python", "LLM APIs"],
    github: "https://github.com/rayyan4t4/Word-Ai",
  },
];

export const EXPERIENCE = [
  {
    period: "2026 — Present",
    role: "Machine Learning Team Lead",
    org: "ITSimplera Solutions",
    description:
      "Lead the ML team — setting technical direction for model work and reviewing what the team builds. Hands-on across client projects: data preparation, training, evaluation, and getting results into a usable state. Mentor juniors on PyTorch and code quality.",
  },
  {
    period: "Jul 2025",
    role: "Machine Learning Intern",
    org: "CodeClub, Peshawar",
    description:
      "Collected and organised real-world datasets for object detection and classification. Labelled data in CVAT, checked it for consistency, removed duplicates and balanced classes before training.",
  },
  {
    period: "2023 — 2027",
    role: "BS Computer Science",
    org: "UET Mardan",
    description:
      "Final-year student, CGPA 3.63/4.00. Dean's Appreciation Award, 2025.",
  },
];

export const CREDENTIALS = [
  "AI Agents 101 — Building AI Agents with MCP & Open-Source Inference",
  "Retrieval-Augmented Generation for Production — LangChain & LlamaIndex",
  "Programming Competition Award — AWKUM Garden Campus, 2025",
];

export const FAQS = [
  {
    q: "Who is Rayyan Khan?",
    a: "Rayyan Khan is a Machine Learning Engineer based in Mardan, Pakistan — a final-year Computer Science student at UET Mardan and the ML team lead at ITSimplera Solutions.",
  },
  {
    q: "What does Rayyan Khan work on?",
    a: "Applied deep learning across speech, vision and text: speech enhancement with Conformers, computer vision and object detection with YOLO, plus generative AI — LLMs, RAG systems and AI agents.",
  },
  {
    q: "Where is Rayyan Khan based?",
    a: "Mardan, Khyber Pakhtunkhwa, Pakistan. He works with teams and clients on machine learning and AI projects.",
  },
  {
    q: "How can I contact Rayyan Khan?",
    a: "By email at rayanuet@gmail.com, or through his GitHub and LinkedIn profiles linked on this page.",
  },
];

export const EXPERTISE_TABS = [
  {
    id: "ml",
    index: "01",
    title: "AI & Machine Learning",
    intro:
      "My home ground. Applied deep learning across speech, vision and text, now building upward into generative AI.",
    groups: [
      {
        heading: "Frameworks & libraries",
        items: ["Python", "PyTorch", "scikit-learn", "Hugging Face", "OpenCV", "YOLO", "NumPy", "pandas"],
      },
      {
        heading: "Capabilities",
        items: [
          "Computer vision & object detection",
          "Speech enhancement",
          "NLP & large language models",
          "RAG systems (FAISS, ChromaDB)",
          "LLM APIs & AI agents",
          "Model evaluation & deployment",
        ],
      },
    ],
    evidence: [
      { label: "Lahore Smog Forecast", href: "/work/lahore-smog-forecast" },
      { label: "Conformer Speech Enhancement", href: "/work/conformer-speech-enhancement" },
      { label: "Fire & Weapon Detection", href: "/work/fire-weapon-detection" },
    ],
  },
  {
    id: "fullstack",
    index: "02",
    title: "Full-Stack Engineering",
    intro:
      "Shipping complete products: from database schema to deployed interface.",
    groups: [
      {
        heading: "Stack",
        items: [
          "React", "Next.js", "TypeScript", "Node.js", "Python", "FastAPI", "PostgreSQL", "REST APIs",
        ],
      },
      {
        heading: "Capabilities",
        items: [
          "Responsive frontend development",
          "API design & authentication",
          "Database architecture",
          "Docker & containerized deploys",
          "CI/CD pipelines",
          "Vercel & Render deployments",
        ],
      },
    ],
    evidence: [{ label: "Ask the Constitution (full-stack)", href: "https://ask-constitution-web.vercel.app" }],
  },
  {
    id: "design",
    index: "03",
    title: "UI/UX & Creative Development",
    intro: "Interfaces that feel considered — designed and built by the same person.",
    groups: [
      {
        heading: "Practice",
        items: [
          "Responsive interface design",
          "Design systems",
          "Interaction design",
          "Motion design",
          "Accessibility",
          "Prototyping & component architecture",
        ],
      },
    ],
    evidence: [],
  },
];

export const SUGGESTED_QUESTIONS = [
  "What are Rayyan's best AI projects?",
  "What is his full-stack experience?",
  "Explain his RAG chatbot architecture.",
  "How can I collaborate with him?",
];

export const CHATBOT_URL =
  "https://portfolio-rag-chat-5k6zrbaixyywuxah4nykew.streamlit.app/?embed=true";
