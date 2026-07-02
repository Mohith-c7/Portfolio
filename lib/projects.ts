export interface ProjectChallenge {
  title: string;
  desc: string;
}

export interface Project {
  title: string;
  category: string;
  date: string;
  desc: string;
  image: string;
  github: string;
  live: string;
  tech: string[];
  architecture: string;
  problem: string;
  solution: string;
  challenges: ProjectChallenge[];
  lessons: string;
}

export const projectsData: Project[] = [
  {
    title: "VertexPM",
    category: "AI Kanban & Collaboration",
    date: "15/04/2026",
    desc: "Enterprise-grade Kanban platform featuring real-time Socket.IO collaboration, AI task generation, and Fastify backend.",
    image: "/placeholder.jpg",
    github: "https://github.com/Mohith-c7/VertexPM.git",
    live: "#",
    tech: ["Next.js", "Fastify", "PostgreSQL", "Prisma", "Socket.IO", "TypeScript", "AI"],
    architecture: "Decoupled architecture utilizing Fastify event loop, Socket.IO WebSockets, and database synchronization.",
    problem: "Traditional project boards lack real-time collaborative sync and dynamic context-aware task breakdown tools.",
    solution: "Built a real-time Kanban board with Socket.IO event listeners and integrated OpenAI for automated task breakdown cards.",
    challenges: [
      {
        title: "WebSocket synchronization conflicts",
        desc: "Simultaneous user edits caused state overrides. Resolved by implementing operational transformation (OT) logic and database locks on active cards."
      }
    ],
    lessons: "Enforcing atomic updates on shared websocket rooms is critical to avoid race conditions in collaborative interfaces."
  },
  {
    title: "FieldForce CRM",
    category: "Mobile CRM & Geolocation",
    date: "12/12/2025",
    desc: "High-performance field operations app with real-time location tracking, offline synchronization, and automated scheduling.",
    image: "/placeholder.jpg",
    github: "https://github.com/Mohith-c7",
    live: "#",
    tech: ["React Native", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    architecture: "React Native mobile app with a multithreaded FastAPI location ingestion service and offline-first client storage.",
    problem: "Field agents lose network connectivity in remote zones, leading to data loss and inaccurate geolocation audits.",
    solution: "Implemented SQLite-based offline sync queuing on the mobile app, automatically flushing telemetry when cellular networks restore.",
    challenges: [
      {
        title: "Battery drain during continuous GPS polling",
        desc: "Continuous GPS updates drained batteries in 3 hours. Resolved by introducing accelerometer-triggered dynamic sleep intervals, reducing drain by 65%."
      }
    ],
    lessons: "Leveraging hardware sensors to control background threads is key for high-performance utility mobile products."
  },
  {
    title: "VIT-AP Website",
    category: "Full Stack & Caching",
    date: "13/05/2025",
    desc: "Next.js university portal featuring automated CMS synchronization, Redis caching, and optimized content delivery.",
    image: "/vitapweb.png",
    github: "https://github.com/Mohith-c7/vitap-portal",
    live: "#",
    tech: ["Next.js", "Strapi CMS", "Redis", "PostgreSQL", "Docker", "Nginx"],
    architecture: "Decoupled Server-Client with Redis middleware and static revalidation (ISR).",
    problem: "The legacy university website experienced slow loads (>4s) during high academic enrollment events and was difficult for non-technical staff to update.",
    solution: "Decoupled content management with Strapi Headless CMS. Built a Next.js front-end that leverages Incremental Static Regeneration (ISR) via webhook triggers.",
    challenges: [
      {
        title: "Latency under concurrent database queries",
        desc: "During enrollment, database calls spiked. Solved by implementing Redis cache layer on key endpoints, reducing read latency from 450ms to 12ms."
      },
      {
        title: "Data synchronization",
        desc: "Ensured static pages update instantly when CMS data changes by triggering on-demand API revalidation inside Next.js."
      }
    ],
    lessons: "Caching database queries at the network edge is critical for high-concurrency event handling."
  },
  {
    title: "CryoVault Customer Portal",
    category: "Healthcare Systems & Auth",
    date: "18/09/2025",
    desc: "Secure document management and billing portal for CryoVault stem cell banking customers with unified OAuth access.",
    image: "/syv.png",
    github: "https://github.com/Mohith-c7",
    live: "#",
    tech: ["Next.js", "Node.js", "PostgreSQL", "JWT / OAuth", "AWS S3"],
    architecture: "Next.js application with secure serverless file-processing routes and relational PostgreSQL database storage.",
    problem: "Confidential patient files and billing receipts were sent via email, creating compliance issues and security vulnerabilities.",
    solution: "Built a unified patient portal with military-grade JWT access controls and automated encrypted uploads to private S3 buckets.",
    challenges: [
      {
        title: "Secure file validation and sharing",
        desc: "Prevented file access leaks by implementing S3 pre-signed URLs with a 5-minute expiry window, validated strictly against user database privileges."
      }
    ],
    lessons: "Always utilize ephemeral cloud access keys validated server-side to secure confidential patient materials."
  },
  {
    title: "VTBIF Website",
    category: "Authentication & Storage",
    date: "28/04/2025",
    desc: "Secure document management and metric tracking portal for startup incubator validation.",
    image: "/vtbif.png",
    github: "https://github.com/Mohith-c7/vtbif-portal",
    live: "#",
    tech: ["Next.js", "NextAuth.js", "MongoDB", "Mongoose", "AWS S3", "Tailwind CSS"],
    architecture: "Serverless Next.js API routing with MongoDB Atlas database storage.",
    problem: "Incubators handle highly confidential intellectual property and business plans, needing granular, secure, role-based document access controls.",
    solution: "Configured NextAuth.js JWT authentication paired with Next.js middleware and AWS S3 secure private buckets.",
    challenges: [
      {
        title: "Secure cloud document uploads",
        desc: "Prevented direct exposure of AWS S3 API keys by generating temporary pre-signed upload URLs from serverless routes, validating roles prior to grant."
      }
    ],
    lessons: "Client-side uploads should never interact directly with long-lived cloud keys; serverless token generation provides absolute security."
  },
  {
    title: "CyFin",
    category: "Cybersecurity & Machine Learning",
    date: "22/03/2026",
    desc: "Machine learning-powered cybersecurity platform that monitors financial market data in real time and detects manipulated market feeds.",
    image: "/placeholder.jpg",
    github: "https://github.com/Mohith-c7/CyFin.git",
    live: "#",
    tech: ["Python", "Scikit-learn", "Streamlit", "SQLite", "Pandas", "Plotly", "Machine Learning"],
    architecture: "Pipeline-based data ingestion using Isolation Forest and Statistical Ensemble algorithms.",
    problem: "Algorithmic trading systems are vulnerable to corrupted or spoofed market data feeds, which can trigger flash crashes.",
    solution: "Created a real-time monitoring engine using a statistical ensemble to calculate a trust score for incoming ticks and flag spoofing patterns.",
    challenges: [
      {
        title: "High-throughput anomaly detection latency",
        desc: "Processing thousands of updates per second caused latency spikes. Solved by vectorizing input streams in Pandas and parallelizing the forest estimator execution."
      }
    ],
    lessons: "Vectorizing statistical computations yields significant performance gains for real-time streaming detection."
  },
  {
    title: "Sensei",
    category: "Analytics & Scoring Platforms",
    date: "14/10/2024",
    desc: "Dynamic ranking and analytics dashboard for evaluating institutional faculty performance using multi-variable weighting algorithms.",
    image: "/placeholder.jpg",
    github: "https://github.com/Mohith-c7",
    live: "#",
    tech: ["Next.js", "Firebase", "Firestore", "Tailwind CSS", "Recharts"],
    architecture: "React-based front-end with Firestore real-time listener subscriptions and statistical weighting engines.",
    problem: "Manual evaluation processes are prone to biases and lack live performance analytics for administrative decision-making.",
    solution: "Designed a dynamic ranker that automates variable scoring across peer reviews, publication counts, and student feedback.",
    challenges: [
      {
        title: "Real-time query billing spikes",
        desc: "Frequent re-renders triggered excessive Firestore reads. Solved by wrapping data layers in context providers and caching queries locally."
      }
    ],
    lessons: "Minimizing direct database reads through local state caching is vital for Firestore cost management."
  },
  {
    title: "AutoAssign AI",
    category: "Productivity & Chrome Extensions",
    date: "10/01/2026",
    desc: "Chrome Extension with a Firebase backend that automatically detects assignment deadlines from Gmail and synchronizes them with Firestore.",
    image: "/placeholder.jpg",
    github: "https://github.com/Mohith-c7/AutoAssign.git",
    live: "#",
    tech: ["React", "Vite", "Firebase", "Firestore", "Chrome Extension", "TypeScript", "Tailwind CSS"],
    architecture: "Chrome Extension (Manifest V3) running on background workers coupled with Google OAuth authentication and Firebase triggers.",
    problem: "Students miss homework deadlines because dates are buried inside email notifications and disparate academic systems.",
    solution: "Built a lightweight browser extension that parses incoming academic emails and pushes discovered dates directly to a central student dashboard.",
    challenges: [
      {
        title: "Regular expression matching errors",
        desc: "Different email formats caused deadline parsing failures. Resolved by feeding email snippets to a lightweight LLM endpoint for parsing."
      }
    ],
    lessons: "AI-based structured text extraction offers far higher reliability than rigid regular expressions for parsing unstructured emails."
  }
];
