"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ExternalLink, Github, Linkedin, Twitter, Instagram, Star, Zap, Terminal, Code2, Shield } from "lucide-react"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { motion, useScroll, useTransform } from "framer-motion"
import GlassNav from "@/components/GlassNav"
import LogoM from "@/components/LogoM"
import { BackgroundBeams } from "@/components/ui/background-beams"
import Link from "next/link"
import Footer from "@/components/Footer"
// import { FloatingParticles } from "@/components/ui/floating-particles"

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  // Experience timeline scroll progress
  const experienceRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: experienceRef,
    offset: ["start end", "end start"]
  })
  const timelineFillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  // Social icon hover preview state
  const [hoveredSocial, setHoveredSocial] = useState<null | "linkedin" | "github">(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll();
  const scrollRotate = useTransform(scrollY, [0, 1000], [0, 180]);
  // Modal state for project messages
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [activeCaseStudy, setActiveCaseStudy] = useState<any | null>(null)
  
  // GitHub Live contributions state
  const [githubData, setGithubData] = useState<{
    totalContributions: string;
    streak: number;
    languages: string;
    contributions: { date: string; level: number; text: string }[];
  } | null>(null)
  const [loadingGithub, setLoadingGithub] = useState(true)
  const [hoveredDay, setHoveredDay] = useState<any | null>(null)

  useEffect(() => {
    async function fetchGithub() {
      try {
        const res = await fetch("/api/github")
        if (res.ok) {
          const data = await res.json()
          setGithubData(data)
        }
      } catch (err) {
        console.error("Failed to load github contributions", err)
      } finally {
        setLoadingGithub(false)
      }
    }
    fetchGithub()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Enhanced parallax effect for hero background
      if (heroRef.current && parallaxRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 50
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 50

        parallaxRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.1)`
      }
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Skip link for accessibility */}
      <a href="#hero" className="skip-link" onClick={(e) => {
        e.preventDefault()
        document.getElementById('hero')?.focus()
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
      }}>
        Skip to main content
      </a>
      
      {/* Navigation */}
      <GlassNav />

      {/* Hero Section with Interactive Background and Floating Particles */}
      <section
        id="hero"
        ref={heroRef}
        className="relative overflow-hidden pt-[120px] md:pt-[192px] pb-16 md:pb-28 min-h-screen"
        tabIndex={-1}
      >
        {/* Official Aceternity UI AuroraBackground */}
        <AuroraBackground className="absolute inset-0 w-full h-full z-0 md:z-0" showRadialGradient={true} style={{ opacity: 1, pointerEvents: 'none' }}>
          <div></div>
        </AuroraBackground>
        {/* Content */}
        <div className="relative w-full px-4 md:px-8 z-10">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              className="flex flex-col md:flex-row items-start gap-8 justify-center px-4 md:px-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{
                visible: { transition: { staggerChildren: 0.25 } },
                hidden: {},
              }}
            >
              {/* Left Side - Profile Section */}
              <motion.div
                className="w-full md:w-[35%] space-y-6 md:space-y-8"
                variants={{
                  hidden: { opacity: 0, x: -60 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
                }}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 text-center md:text-left">
                  {/* Profile Photo with animated ring */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                    {/* Profile Image */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10 bg-white flex items-center justify-center">
                      <Image src="/profile.jpg" alt="Mohith Kumar Chadalawada" width={96} height={96} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Name and Title */}
                  <div>
                    <h3 className="text-[20px] md:text-[24px] font-bold text-black mb-1">Mohith Kumar Chadalawada</h3>
                    <p className="text-[14px] md:text-[16px] text-gray-600 font-bold">Software Engineer, Backend Developer</p>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex items-center justify-center md:justify-start space-x-3 mt-2">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/mohith-kumar-chadalawada-37a90b2a1/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                    className="w-9 h-9 md:w-10 md:h-10 bg-[#0077B5] rounded-full flex items-center justify-center hover:bg-[#005983] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0077B5]"
                    onMouseEnter={e => { setHoveredSocial("linkedin"); setCursorPos({ x: e.clientX, y: e.clientY }) }}
                    onMouseMove={e => setCursorPos({ x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 448 448" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340.7C24.09 107.3 0 83.2 0 53.6A53.6 53.6 0 0 1 53.6 0c29.6 0 53.6 24.09 53.6 53.6 0 29.6-24.09 53.7-53.6 53.7zM447.8 448h-92.4V302.4c0-34.7-12.4-58.4-43.3-58.4-23.6 0-37.6 15.9-43.7 31.3-2.3 5.6-2.8 13.4-2.8 21.2V448h-92.5s1.2-243.1 0-268.1h92.4v38c12.3-19 34.3-46.1 83.5-46.1 60.9 0 106.6 39.8 106.6 125.4V448z"/>
                    </svg>
                  </a>
                  {/* GitHub */}
                  <a
                    href="https://github.com/Mohith-c7" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                    className="w-9 h-9 md:w-10 md:h-10 bg-[#181717] rounded-full flex items-center justify-center hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-[#181717]"
                    onMouseEnter={e => { setHoveredSocial("github"); setCursorPos({ x: e.clientX, y: e.clientY }) }}
                    onMouseMove={e => setCursorPos({ x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0.297C5.373 0.297 0 5.67 0 12.297c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  </a>
                </div>
              </motion.div>

              {/* Right Side - Main Content */}
              <motion.div
                className="w-full md:w-[65%] space-y-6 md:space-y-8"
                variants={{
                  hidden: { opacity: 0, x: 60 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
                }}
              >
                {/* Main Heading */}
                <motion.div
                  className="space-y-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.18 } },
                    hidden: {},
                  }}
                >
                  <motion.h1
                    className="text-[32px] sm:text-[40px] md:text-[64px] lg:text-[72px] leading-[1.1] font-semibold text-black text-center md:text-left"
                    variants={{
                      hidden: { opacity: 0, y: 40, scale: 0.96 },
                      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
                    }}
                  >
                    Hi! I'm Mohith
                  </motion.h1>

                  <motion.div
                    className="flex flex-col md:flex-row md:flex-wrap items-center gap-2 md:gap-4 text-center md:text-left"
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
                    }}
                  >
                    <span className="text-[32px] sm:text-[40px] md:text-[64px] lg:text-[72px] leading-[1.05] md:leading-[1.1] font-bold text-black">a</span>
                    <motion.span
                      className="modern-badge px-4 py-2 md:px-6 md:py-3 text-[20px] sm:text-[24px] md:text-[40px] font-bold rounded-full shadow-xl cursor-pointer relative overflow-hidden border border-lime-300"
                      style={{ display: 'inline-block' }}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
                      }}
                      whileHover={{
                        scale: 1.04,
                        rotate: -3,
                        boxShadow: "0 8px 32px 0 #a3e63599, 0 2px 16px 0 #000",
                        background: "linear-gradient(90deg, #a3e635, #65a30d, #a3e635)",
                        transition: { type: "spring", stiffness: 220, damping: 16 }
                      }}
                    >
                      <span className="relative z-10">Software Engineer</span>
                      <span className="badge-shine" />
                    </motion.span>
                    <motion.h2
                      className="text-[32px] sm:text-[40px] md:text-[64px] lg:text-[72px] leading-[1.05] md:leading-[1.1] font-bold text-black"
                      variants={{
                        hidden: { opacity: 0, y: 40 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
                      }}
                    >
                      building scalable and production-ready software
                    </motion.h2>
                  </motion.div>
                </motion.div>

                {/* Description */}
                <motion.div
                  className="relative text-center md:text-left"
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
                  }}
                >
                  <p className="text-[16px] sm:text-[18px] md:text-[20px] text-gray-600 leading-relaxed max-w-[600px] font-bold mx-auto md:mx-0">
                    I love building systems and applications that make a difference. I'm passionate about clean architecture, performance optimization, and solving real-world engineering problems.
                  </p>
                  {/* Years Experience positioned absolutely */}
                  <div className="absolute left-[-59%] top-1 pl-4 hidden md:block">
                    <span className="text-[20px] text-gray-500 font-bold">(2024 - present)</span>
                  </div>
                  {/* Mobile version of years experience */}
                  <div className="block md:hidden mt-4">
                    <span className="text-[16px] text-gray-500 font-bold">(2024 - present)</span>
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  className="pt-6 md:pt-8 text-center md:text-left"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
                  }}
                >
                  <Button 
                    className="bg-lime-400 text-black hover:bg-lime-500 rounded-full px-8 py-4 md:px-10 md:py-5 text-[16px] md:text-[18px] font-bold h-auto group shadow-lg"
                    onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    See my code & systems
                    <ArrowRight className="ml-2 md:ml-3 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section id="about" className="bg-black text-white py-16 md:py-24 relative overflow-hidden">
        {/* Modern Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-20 left-20 w-96 h-96 bg-lime-400 rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-8"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 rounded-full blur-3xl opacity-5"></div>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(163,230,53,0.05)_0%,transparent_50%)]"></div>
        </div>

        <motion.div
          className="relative z-50 max-w-[1400px] mx-auto px-4 md:px-8"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="mb-12 px-4 md:px-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-3 h-3 rounded-full bg-lime-400 inline-block"></span>
              <span className="text-gray-500 text-[20px] font-medium">{`{01}`} — My Story</span>
            </div>
            <motion.h2
              className="text-[48px] md:text-[72px] font-bold leading-[1.05] mb-8 md:mb-12 mt-4 md:mt-8 text-white drop-shadow-[0_0_32px_rgba(163,230,53,0.5)]"
              initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Building reliable systems,<br />writing clean code
            </motion.h2>
            <motion.div
              className="space-y-4 md:space-y-8 text-[16px] md:text-[18px] leading-[1.8] text-gray-300 relative z-50"
              initial="hidden"
              whileInView="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.22 } },
                hidden: {},
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                <>I started my journey with a deep fascination for how software systems operate under the hood. As a developer, I quickly realized that writing code isn't just about syntax; it's about solving real-world <span className="text-lime-400 font-semibold">engineering challenges</span> and creating reliable applications that run efficiently.</>,
                <>As I built larger applications, I became increasingly interested in backend engineering—designing APIs, structuring databases, improving application performance, and building systems that remain maintainable as they grow. My focus shifted from just making things work to understanding <span className="text-lime-400 font-semibold">system design</span> and database optimizations.</>,
                <>Building projects from scratch taught me the value of <span className="text-white font-semibold">clean architecture,</span> testing, and modular coding patterns. I strive to design software with clear separation of concerns, making code bases easy to read, refactor, and collaborate on.</>,
                <>My design background serves as a strong asset for full-stack development, allowing me to bridge the gap between user needs and backend capabilities. I enjoy connecting intuitive user interfaces with robust server logic to build <span className="text-lime-400 font-semibold">cohesive web platforms</span>.</>
              ].map((content, idx) => (
                <motion.p
                  key={idx}
                  className="relative z-50 text-gray-300"
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
                  }}
                >
                  {content}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 bg-white text-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 px-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-3 h-3 rounded-full bg-lime-400 inline-block"></span>
              <span className="text-gray-500 text-[20px] font-medium">{`{02}`} — Featured projects</span>
            </div>
              <h2 className="text-[48px] md:text-[72px] font-bold leading-[1.05] mb-12 text-black">Building production-ready<br/>systems & applications</h2>
            <Button 
              className="bg-lime-400 text-black hover:bg-lime-500 rounded-full px-10 py-5 text-[18px] font-bold h-auto group shadow-lg mb-16"
              onClick={() => window.location.href = 'mailto:iammohithkumar@gmail.com'}
            >
              Let's build together
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 border-t-2 border-l-2 border-gray-300">
            {[
              {
                title: "VIT-AP University Portal",
                category: "Full Stack Engineering",
                date: "13/05/2025",
                desc: "Next.js university portal featuring automated CMS synchronization, Redis caching, and optimized content delivery.",
                image: "/vitapweb.png",
                github: "https://github.com/Mohith-c7/vitap-portal",
                live: "#",
                tech: ["Next.js", "Strapi CMS", "TailwindCSS"],
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
                title: "AVY: AI-Powered Vigilance System",
                category: "AI & Computer Vision",
                date: "28/12/2024",
                desc: "AI-powered surveillance platform using YOLOv8 for real-time object detection and automated monitoring.",
                image: "/avy.png",
                github: "https://github.com/Mohith-c7/AVY-AI-Safety",
                live: "#",
                tech: ["FastAPI", "Python", "OpenCV", "YOLOv8", "WebSockets", "Supabase"],
                architecture: "Multithreaded ingestion worker using socket streams and cloud storage replication.",
                problem: "Traditional CCTV monitoring requires constant human review and suffers from delayed response times during safety incidents.",
                solution: "Developed an autonomous pipeline that ingests RTSP streams, passes them through a YOLOv8 object-detection network, and broadcasts immediate alerts.",
                challenges: [
                  {
                    title: "Frame rate ingestion bottlenecks",
                    desc: "Main thread video decoding and model inference caused lag. Decoupled them into producer/consumer worker threads with thread-safe Queue, preserving 30 FPS processing."
                  },
                  {
                    title: "Sub-100ms alerting",
                    desc: "Designed and implemented FastAPI WebSocket channel to stream detected anomaly markers and frame URLs to clients in near real-time."
                  }
                ],
                lessons: "Decoupling CPU-heavy workloads (ML inference) from network ingestion threads is vital for real-time video processing."
              },
            ].map((project, index) => (
              <div
                key={index}
                className="flex flex-col justify-between border-b-2 border-r-2 border-gray-300 p-10 min-h-[420px] transition-colors duration-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setActiveCaseStudy(project)
                }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lime-400 font-bold text-[18px]">{'{'} {project.category} {'}'}</span>
                    <span className="text-gray-500 text-[16px]">{project.date}</span>
                  </div>
                  <h3 className="text-[36px] font-bold mb-1 text-black">{project.title}</h3>
                  <div className="text-gray-600 text-[18px] mb-4">{project.desc}</div>
                </div>
                <motion.div
                  className="overflow-hidden rounded-2xl mb-4"
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <img src={project.image} alt={project.title} className="w-full h-[200px] md:h-[320px] object-cover" />
                </motion.div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-l-2 border-r-2 border-gray-300">
            {[
              {
                title: "Rotaract Hub - Job Portal",
                category: "System Design / AI Matching",
                date: "18/03/2025",
                desc: "AI-assisted job recommendation platform using semantic search with pgvector embeddings.",
                image: "/rotaract.png",
                github: "https://github.com/Mohith-c7/Rotaract-Hub",
                live: "#",
                tech: ["Node.js", "Express", "PostgreSQL", "Prisma ORM", "pgvector", "OpenAI"],
                architecture: "Tiered MVC with database vector index optimization and prompt scoring pipelines.",
                problem: "Standard keyword job matching misses relevant candidates due to semantic differences in skill naming.",
                solution: "Integrated OpenAI's text-embedding-3-small to embed resumes and job descriptions. Queries are performed directly on PostgreSQL utilizing cosine distance indexes.",
                challenges: [
                  {
                    title: "Slow matching under scaling candidate records",
                    desc: "Resolved index bottlenecks by implementing HNSW (Hierarchical Navigable Small World) indexing in pgvector, cutting match latency down to 23ms."
                  }
                ],
                lessons: "Leveraging database-native vector extensions yields superior performance and simplicity compared to external vector stores for relational entities."
              },
              {
                title: "VTBIF Business Incubator",
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
              }
            ].map((project, index) => (
              <div 
                key={index}
                className="flex flex-col justify-between border-r-0 md:border-r-2 border-gray-300 p-6 md:p-10 min-h-[420px] transition-colors duration-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setActiveCaseStudy(project)
                }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lime-400 font-bold text-[18px]">{'{'} {project.category} {'}'}</span>
                    <span className="text-gray-500 text-[16px]">{project.date}</span>
                  </div>
                  <h3 className="text-[28px] font-bold mb-1 text-black">{project.title}</h3>
                  <div className="text-gray-600 text-[16px] mb-4">{project.desc}</div>
                </div>
                <motion.div
                  className="overflow-hidden rounded-2xl mb-4"
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <img src={project.image} alt={project.title} className="w-full h-[200px] md:h-[320px] object-cover" />
                </motion.div>
              </div>
            ))}
            {/* View all projects lime box */}
            <motion.div
              initial={{ borderRadius: 24 }}
              whileHover={{ borderRadius: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="w-full h-full flex items-center justify-center border-r-0 md:border-r-2 border-gray-300 min-h-[420px] bg-lime-400 cursor-pointer text-center group"
              onClick={() => {
                window.location.href = '/projects'
              }}
            >
              <span className="flex items-center gap-4 text-black text-[20px] font-medium max-w-full">
                View all projects
                <span className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-0 -rotate-45" />
                </span>
              </span>
            </motion.div>
          </div>
        </div>
      </section>
 
      {/* Tech Stack Section */}
      <section id="tech-stack" className="py-24 bg-white text-black border-t-2 border-gray-300">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-3 h-3 rounded-full bg-lime-400 inline-block"></span>
              <span className="text-gray-500 text-[20px] font-medium">{`{03}`} — Tech Stack</span>
            </div>
            <h2 className="text-[48px] md:text-[72px] font-bold leading-[1.05] text-black">
              Production-Proven Tooling
            </h2>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Languages",
                skills: ["Java", "Python", "TypeScript", "JavaScript", "SQL", "Go"]
              },
              {
                title: "Backend & Systems",
                skills: ["FastAPI", "Node.js", "Express", "REST APIs", "Socket.IO / WebSockets", "JWT / OAuth"]
              },
              {
                title: "Databases & Cache",
                skills: ["PostgreSQL", "Supabase", "MongoDB", "MySQL", "Prisma ORM", "Redis"]
              },
              {
                title: "Frontend & UI",
                skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Shadcn/UI", "Redux"]
              },
              {
                title: "Cloud & DevOps",
                skills: ["AWS", "Google Cloud", "Vercel", "Render", "Docker", "CI/CD"]
              },
              {
                title: "Developer Tools",
                skills: ["Git", "Linux", "Postman", "VS Code", "GitHub Actions", "Docker"]
              },
              {
                title: "AI Integration",
                skills: ["OpenAI API", "Claude / Anthropic", "LangChain", "Vector Embeddings", "Prompt Engineering"]
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                className="border-2 border-gray-300 p-8 rounded-3xl bg-gray-50 hover:bg-gray-100 hover:border-lime-400 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <h3 className="text-[24px] font-bold mb-6 text-black flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-black rounded-full group-hover:bg-lime-500 transition-colors"></span>
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-800 text-[14px] font-bold rounded-full shadow-sm hover:border-black transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 
      {/* GitHub Contribution Section */}
      <section id="github" className="py-24 bg-black text-white relative overflow-hidden border-t-2 border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0"></div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-3 h-3 rounded-full bg-lime-400 inline-block"></span>
                <span className="text-gray-500 text-[20px] font-medium">{`{04}`} — GitHub & Open Source</span>
              </div>
              <h2 className="text-[48px] md:text-[72px] font-bold leading-[1.05] text-white">
                GitHub Activity
              </h2>
            </div>
            <a 
              href="https://github.com/Mohith-c7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-6 lg:mt-0 flex items-center gap-3 text-lime-400 hover:text-white font-bold text-[18px] transition-colors focus:outline-none focus:underline group"
            >
              Follow on GitHub
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Stats Card */}
            <div className="border border-gray-800 bg-[#0c0c0c]/80 rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-[20px] font-bold text-gray-400 mb-6 flex items-center gap-2">
                  <Github className="w-5 h-5 text-lime-400" />
                  Activity Overview
                </h3>
                <div className="space-y-6">
                  <div>
                    <span className="block text-gray-500 text-[14px] font-semibold">CONTRIBUTIONS YTD</span>
                    <span className="text-[36px] font-bold text-white leading-none">
                      {loadingGithub ? "..." : githubData ? `${githubData.totalContributions} commits` : "1,194 commits"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-500 text-[14px] font-semibold">CURRENT STREAK</span>
                    <span className="text-[36px] font-bold text-lime-400 leading-none">
                      {loadingGithub ? "..." : githubData ? `${githubData.streak} days` : "5 days"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-500 text-[14px] font-semibold">TOP LANGUAGES</span>
                    <span className="text-[20px] font-bold text-white">
                      {loadingGithub ? "..." : githubData ? githubData.languages : "TypeScript, Python, SQL"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
 
            {/* Contribution Grid */}
            <div className="lg:col-span-2 border border-gray-800 bg-[#0c0c0c]/80 rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-[20px] font-bold text-gray-400 mb-6">Commit Grid History</h3>
                <div className="overflow-x-auto">
                  <div className="min-w-[580px] flex flex-col gap-[3px]">
                    
                    {/* Months Row */}
                    {!loadingGithub && githubData && githubData.contributions && (
                      <div className="grid grid-flow-col auto-cols-max gap-[3px] mb-2 text-[10px] text-gray-500 font-bold select-none h-4 relative">
                        {(() => {
                          const columns: any[][] = [];
                          const list = [...githubData.contributions].sort((a, b) => a.date.localeCompare(b.date));
                          for (let i = 0; i < list.length; i += 7) {
                            columns.push(list.slice(i, i + 7));
                          }
                          
                          let lastMonth = "";
                          return columns.map((col, colIdx) => {
                            const date = new Date(col[0].date);
                            const month = date.toLocaleString("en-US", { month: "short" });
                            const showLabel = month !== lastMonth;
                            if (showLabel) {
                              lastMonth = month;
                            }
                            return (
                              <div key={colIdx} className="w-[9px] relative h-4">
                                {showLabel && (
                                  <span className="absolute left-0 bottom-0 whitespace-nowrap">
                                    {month}
                                  </span>
                                )}
                              </div>
                            );
                          });
                        })()}
                      </div>
                    )}

                    <div className="grid grid-flow-col auto-cols-max gap-[3px]">
                      {loadingGithub ? (
                        Array.from({ length: 53 }).map((_, colIdx) => (
                          <div key={colIdx} className="grid grid-rows-7 gap-[3px]">
                            {Array.from({ length: 7 }).map((_, rowIdx) => (
                              <div
                                key={rowIdx}
                                className="w-[9px] h-[9px] rounded-[1px] bg-gray-900 animate-pulse"
                              />
                            ))}
                          </div>
                        ))
                      ) : githubData && githubData.contributions ? (
                        (() => {
                          const columns: any[][] = [];
                          const list = [...githubData.contributions].sort((a, b) => a.date.localeCompare(b.date));
                          for (let i = 0; i < list.length; i += 7) {
                            columns.push(list.slice(i, i + 7));
                          }
                          return columns.map((col, colIdx) => (
                            <div key={colIdx} className="grid grid-rows-7 gap-[3px]">
                              {col.map((day, rowIdx) => {
                                let color = "bg-gray-900";
                                if (day.level === 1) color = "bg-lime-950";
                                else if (day.level === 2) color = "bg-lime-800";
                                else if (day.level === 3) color = "bg-lime-500";
                                else if (day.level === 4) color = "bg-lime-300";
 
                                return (
                                  <div
                                    key={rowIdx}
                                    onMouseEnter={e => { setHoveredDay(day); setCursorPos({ x: e.clientX, y: e.clientY }) }}
                                    onMouseMove={e => setCursorPos({ x: e.clientX, y: e.clientY })}
                                    onMouseLeave={() => setHoveredDay(null)}
                                    className={`w-[9px] h-[9px] rounded-[1px] ${color} transition-colors hover:scale-125 duration-100 cursor-pointer`}
                                  />
                                );
                              })}
                            </div>
                          ));
                        })()
                      ) : (
                        Array.from({ length: 53 }).map((_, colIdx) => (
                          <div key={colIdx} className="grid grid-rows-7 gap-[3px]">
                            {Array.from({ length: 7 }).map((_, rowIdx) => {
                              const randVal = (colIdx * 7 + rowIdx) % 11;
                              let color = "bg-gray-900"; 
                              if (randVal === 1 || randVal === 5) color = "bg-lime-950"; 
                              else if (randVal === 2 || randVal === 7) color = "bg-lime-800"; 
                              else if (randVal === 3) color = "bg-lime-500"; 
                              else if (randVal === 9 && colIdx % 3 === 0) color = "bg-lime-300"; 
                              
                              return (
                                <div
                                  key={rowIdx}
                                  className={`w-[9px] h-[9px] rounded-[1px] ${color}`}
                                />
                              );
                            })}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6 text-gray-500 text-[13px] font-bold">
                <span>Learn more about my open source initiatives</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <div className="w-[8px] h-[8px] bg-gray-900 rounded-[1px]" />
                  <div className="w-[8px] h-[8px] bg-lime-950 rounded-[1px]" />
                  <div className="w-[8px] h-[8px] bg-lime-800 rounded-[1px]" />
                  <div className="w-[8px] h-[8px] bg-lime-500 rounded-[1px]" />
                  <div className="w-[8px] h-[8px] bg-lime-300 rounded-[1px]" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
 
          {/* Pinned Repositories Grid */}
          <h3 className="text-[24px] font-bold mb-8 text-white mt-12">Featured Repositories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "VertexPM",
                desc: "AI-Powered Collaborative Project Management Platform. Enterprise-grade Kanban platform featuring real-time Socket.IO collaboration and Fastify backend.",
                stars: 0,
                forks: 0,
                lang: "TypeScript",
                langColor: "bg-blue-600",
                link: "https://github.com/Mohith-c7/VertexPM.git"
              },
              {
                name: "CyFin",
                desc: "National Market Data Integrity Monitoring & Protection. Machine learning-powered platform utilizing statistical ensembles to safeguard automated trading.",
                stars: 1,
                forks: 1,
                lang: "Python",
                langColor: "bg-blue-500",
                link: "https://github.com/Mohith-c7/CyFin.git"
              },
              {
                name: "AutoAssign",
                desc: "AI-Powered Assignment Management Assistant. Chrome Extension with a Firebase backend that automatically detects and syncs deadlines from Gmail.",
                stars: 0,
                forks: 0,
                lang: "JavaScript",
                langColor: "bg-yellow-500",
                link: "https://github.com/Mohith-c7/AutoAssign.git"
              }
            ].map((repo, idx) => (
              <a
                key={idx}
                href={repo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-800 bg-[#0c0c0c]/80 rounded-3xl p-8 hover:border-lime-400 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <h4 className="text-[20px] font-bold text-white mb-3 group-hover:text-lime-400 transition-colors flex items-center gap-2.5">
                    <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h16V4H4zm3 3h4v2H7V7zm0 4h10v2H7v-2zm0 4h10v2H7v-2z"/>
                    </svg>
                    {repo.name}
                  </h4>
                  <p className="text-gray-400 text-[15px] leading-relaxed mb-6 font-medium">{repo.desc}</p>
                </div>
                <div className="flex items-center justify-between text-gray-500 text-[13px] font-bold">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${repo.langColor}`} />
                    <span>{repo.lang}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><Star className="w-4 h-4 text-gray-500" /> {repo.stars}</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5 0a1 1 0 00-1 1v3H3a1 1 0 000 2h1v9a1 1 0 001 1h7a1 1 0 001-1V6h1a1 1 0 000-2h-1V1a1 1 0 00-1-1H5zm1 2h5v2H6V2zm0 4h4v7H6V6z"/>
                      </svg>
                      {repo.forks}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
 
      {/* Experience Section */}
      <section id="experience" className="relative py-24 md:py-32 bg-black text-white overflow-x-hidden border-t border-gray-900">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8" ref={experienceRef}>
          <div className="mb-12 px-4 md:px-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-3 h-3 rounded-full bg-lime-400 inline-block"></span>
              <span className="text-gray-500 text-[18px] md:text-[20px] font-medium">{`{05}`} — Experience</span>
            </div>
            <h2 className="text-[48px] md:text-[72px] font-bold leading-[1.05] mb-16 md:mb-20 text-white">
              The Journey So Far : <br/>Systems & Scale
            </h2>
          </div>
          
          {/* Mobile Timeline Layout */}
          <div className="block md:hidden space-y-8 relative">
            {/* Constant gray line (full height) */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-700 z-0" style={{height: '100%'}}></div>
            {/* Animated white line (fills on scroll) */}
            <motion.div
              className="absolute left-6 top-0 w-0.5 bg-white z-10"
              style={{ height: timelineFillHeight }}
            />
 
            {/* Experience Item 0 - BluCypher */}
            <motion.div 
              className="relative z-10" 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, amount: 0.5 }} 
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 rounded-full bg-white border-4 border-cyan-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <Image src="/blucypher.jpg" alt="BluCypher" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 bg-gray-900 border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-[20px] font-bold text-white">BluCypher</h3>
                    <span className="text-[14px] text-lime-400 font-semibold">Apr 2026 - Present</span>
                  </div>
                  <h4 className="text-[18px] font-bold text-lime-400 mb-4">Software Engineer Intern</h4>
                  <ul className="text-[14px] text-gray-300 space-y-2 list-disc pl-4">
                    <li>Contributing to the development of ThreatWeaver, a unified AI-powered cybersecurity platform for security operations and threat management.</li>
                    <li>Designing and implementing scalable backend APIs and integrating modern databases to support platform features.</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Experience Item 1 - Cryovault Biotech */}
            <motion.div 
              className="relative z-10" 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, amount: 0.5 }} 
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 rounded-full bg-white border-4 border-blue-500 flex items-center justify-center flex-shrink-0">
                  <Image src="/clogo.avif" alt="Cryovault Biotech" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 bg-gray-900 border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-[20px] font-bold text-white">Cryovault Biotech India</h3>
                    <span className="text-[14px] text-lime-400 font-semibold">July 2025 - Present</span>
                  </div>
                  <h4 className="text-[18px] font-bold text-lime-400 mb-4">Product Engineer & Backend Developer</h4>
                  <ul className="text-[14px] text-gray-300 space-y-2 list-disc pl-4">
                    <li>Designed and developed the company's portal and internal CRM, owning the implementation from planning through deployment.</li>
                    <li>Implemented secure JWT user sessions and OAuth integrations in Next.js backend routes with PostgreSQL database layer.</li>
                    <li>Designed and deployed containerized Strapi headless CMS service via Docker, improving deployment consistency and maintainability.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
 
            {/* Experience Item 2 - VIT-AP */}
            <motion.div 
              className="relative z-10" 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, amount: 0.5 }} 
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            >
              <div className="flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 rounded-full bg-white border-4 border-pink-300 flex items-center justify-center flex-shrink-0">
                  <Image src="/vitap.png" alt="VIT-AP University" width={32} height={32} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="flex-1 bg-gray-900 border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-[20px] font-bold text-white">VIT-AP University</h3>
                    <span className="text-[14px] text-lime-400 font-semibold">Nov 2024 - Present</span>
                  </div>
                  <h4 className="text-[18px] font-bold text-lime-400 mb-4">Backend Engineer & Team Lead</h4>
                  <ul className="text-[14px] text-gray-300 space-y-2 list-disc pl-4">
                    <li>Coordinated development across frontend and backend student contributors, standardizing API specifications and staging workflows.</li>
                    <li>Redesigned and refactored the university information system, implementing Redis query caching to reduce average load latency from 4.2s to 1.1s.</li>
                    <li>Designed relational database schemas for academic course catalogs, improving search efficiency and resource discoverability.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
 
            {/* Experience Item 3 - SYV */}
            <motion.div 
              className="relative z-10" 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, amount: 0.5 }} 
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 rounded-full bg-white border-4 border-gray-700 flex items-center justify-center flex-shrink-0">
                  <Image src="/syv.jpeg" alt="SYV" width={32} height={32} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="flex-1 bg-gray-900 border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-[20px] font-bold text-white">Sri Yantra Vidya</h3>
                    <span className="text-[14px] text-lime-400 font-semibold">May 2025 - June 2025</span>
                  </div>
                  <h4 className="text-[18px] font-bold text-lime-400 mb-4">Full Stack Engineer Intern</h4>
                  <ul className="text-[14px] text-gray-300 space-y-2 list-disc pl-4">
                    <li>Built a responsive workforce management panel using Next.js, integrating backend REST API routes.</li>
                    <li>Implemented secure API authentication and role-based route guard middleware, ensuring strict data access controls for administrator records.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
 
          {/* Desktop Timeline Layout */}
          <div className="hidden md:block relative w-full min-h-[1200px]">
            {/* Timeline vertical line with scroll fill */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-1 bg-gray-700 rounded-full z-0 overflow-hidden"
              style={{ top: 40, bottom: 40 }}
            >
              <motion.div
                className="absolute left-0 top-0 w-full bg-white rounded-full"
                style={{ height: timelineFillHeight }}
              />
            </motion.div>
            <div className="flex flex-col gap-32 w-full z-10">
              {/* Experience Item 0 - BluCypher */}
              <motion.div
                className="flex items-center w-full min-h-[300px]"
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {/* Left: Card */}
                <div className="w-[45%] bg-black border border-gray-700 rounded-xl p-10 ml-0 relative">
                  <h3 className="text-[28px] font-bold mb-6">Software Engineer Intern</h3>
                  <ul className="text-gray-300 text-[20px] space-y-4 list-disc pl-6">
                    <li>Contributing to the development of ThreatWeaver, a unified AI-powered cybersecurity platform for security operations and threat management.</li>
                    <li>Designing and implementing scalable backend APIs and integrating modern databases to support platform features.</li>
                  </ul>
                </div>
                {/* Center: Timeline node */}
                <div className="flex flex-col items-center w-[10%] relative">
                  <div className="w-20 h-20 rounded-full bg-white border-4 border-cyan-500 flex items-center justify-center z-10 overflow-hidden">
                    <Image src="/blucypher.jpg" alt="BluCypher Logo" width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                </div>
                {/* Right: Company & Time */}
                <div className="w-[45%] flex flex-col items-start pl-10">
                  <span className="text-[28px] font-bold mb-2">BluCypher</span>
                  <span className="text-[20px] text-gray-400 mb-2">Apr 2026 - Present</span>
                </div>
              </motion.div>

              {/* Experience Item 1 - Cryovault Biotech */}
              <motion.div
                className="flex items-center w-full min-h-[300px]"
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              >
                {/* Left: Company & Time */}
                <div className="w-[45%] flex flex-col items-end pr-10">
                  <span className="text-[28px] font-bold mb-2">Cryovault Biotech India</span>
                  <span className="text-[20px] text-gray-400 mb-2">July 2025 - Present</span>
                </div>
                {/* Center: Timeline node */}
                <div className="flex flex-col items-center w-[10%] relative">
                  <div className="w-20 h-20 rounded-full bg-white border-4 border-blue-500 flex items-center justify-center z-10 overflow-hidden">
                    <Image src="/clogo.avif" alt="Cryovault Biotech" width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                </div>
                {/* Right: Card */}
                <div className="w-[45%] bg-black border border-gray-700 rounded-xl p-10 mr-0 relative">
                  <h3 className="text-[28px] font-bold mb-6">Product Engineer & Backend Developer</h3>
                  <ul className="text-gray-300 text-[20px] space-y-4 list-disc pl-6">
                    <li>Designed and developed the company's portal and internal CRM, owning the implementation from planning through deployment.</li>
                    <li>Implemented secure JWT user sessions and OAuth integrations in Next.js backend routes with PostgreSQL database layer.</li>
                    <li>Designed and deployed containerized Strapi headless CMS service via Docker, improving deployment consistency and maintainability.</li>
                  </ul>
                </div>
              </motion.div>
 
              {/* Experience Item 2 - VIT-AP */}
              <motion.div
                className="flex items-center w-full min-h-[300px]"
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              >
                {/* Left: Card */}
                <div className="w-[45%] bg-black border border-gray-700 rounded-xl p-10 ml-0 relative">
                  <h3 className="text-[28px] font-bold mb-6">Backend Engineer & Team Lead</h3>
                  <ul className="text-gray-300 text-[20px] space-y-4 list-disc pl-6">
                    <li>Coordinated development across frontend and backend student contributors, standardizing API specifications and staging workflows.</li>
                    <li>Redesigned and refactored the university information system, implementing Redis query caching to reduce average load latency from 4.2s to 1.1s.</li>
                    <li>Designed relational database schemas for academic course catalogs, improving search efficiency and resource discoverability.</li>
                  </ul>
                </div>
                {/* Center: Timeline node */}
                <div className="flex flex-col items-center w-[10%] relative">
                  <div className="w-20 h-20 rounded-full bg-white border-4 border-pink-300 flex items-center justify-center z-10 overflow-hidden">
                    <Image src="/vitap.png" alt="VIT-AP University Logo" width={64} height={64} className="w-full h-full rounded-full object-cover" />
                  </div>
                </div>
                {/* Right: Company & Time */}
                <div className="w-[45%] flex flex-col items-start pl-10">
                  <span className="text-[28px] font-bold mb-2">VIT-AP University</span>
                  <span className="text-[20px] text-gray-400 mb-2">Nov 2024 - Present</span>
                </div>
              </motion.div>
              
              {/* Experience Item 3 - SYV */}
              <motion.div
                className="flex items-center w-full min-h-[300px]"
                initial={{ opacity: 0, y: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              >
                <div className="w-[45%] flex flex-col items-end pr-10">
                  <span className="text-[28px] font-bold mb-2">Sri Yantra Vidya Intelligent Systems</span>
                  <span className="text-[20px] text-gray-400 mb-2">May 2025 - June 2025</span>
                </div>
                <div className="flex flex-col items-center w-[10%] relative">
                  <div className="w-20 h-20 rounded-full bg-white border-4 border-gray-700 flex items-center justify-center z-10">
                    <Image src="/syv.jpeg" alt="SYV" width={64} height={64} className="w-full h-full rounded-full object-cover" />
                  </div>
                </div>
                <div className="w-[45%] bg-black border border-gray-700 rounded-xl p-10 mr-0 relative">
                  <h3 className="text-[28px] font-bold mb-6">Full Stack Engineer Intern</h3>
                  <ul className="text-gray-300 text-[20px] space-y-4 list-disc pl-6">
                    <li>Built a responsive workforce management panel using Next.js, integrating backend REST API routes.</li>
                    <li>Implemented secure API authentication and role-based route guard middleware, ensuring strict data access controls for administrator records.</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Philosophy Section */}
      <section className="py-32 text-white relative overflow-hidden" style={{ background: "#0A0A0A" }}>
        <BackgroundBeams className="absolute inset-0 w-full h-full z-0" />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="mb-12 px-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-3 h-3 rounded-full bg-lime-400 inline-block"></span>
              <span className="text-gray-500 text-[20px] font-medium">{`{06}`} — Engineering Philosophy</span>
            </div>
            <h2 className="text-[48px] md:text-[72px] font-bold leading-[1.05] mb-[64px] text-white">How I Approach Software</h2>
          </div>
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="space-y-16">
              {[
                {
                  step: "01",
                  title: "Design",
                  desc: "I start by understanding the problem, identifying system boundaries, and designing APIs and database schemas that remain easy to extend.",
                },
                {
                  step: "02",
                  title: "Build",
                  desc: "I prioritize readable code, modular architecture, and maintainable implementations over unnecessary complexity.",
                },
                {
                  step: "03",
                  title: "Improve",
                  desc: "I continuously profile, optimize, and refactor applications to improve performance, scalability, and developer experience.",
                },
                {
                  step: "04",
                  title: "Learn",
                  desc: "I enjoy exploring distributed systems, cloud infrastructure, AI engineering, and modern backend technologies through projects and experimentation.",
                },
              ].map((process, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-12 group text-center md:text-left"
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.12 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-lime-400 text-black rounded-full flex items-center justify-center font-bold text-[16px] md:text-[20px] group-hover:scale-110 transition-transform">
                      {process.step}
                    </div>
                  </div>
                  <div className="space-y-4 pt-0 md:pt-2">
                    <h3 className="text-[24px] md:text-[28px] font-bold group-hover:text-lime-400 transition-colors leading-tight">
                      {process.title}
                    </h3>
                    <p className="text-gray-400 text-[16px] md:text-[18px] leading-relaxed max-w-[600px]">{process.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-24 bg-black">
        <div className="max-w-[1000px] mx-auto px-8 text-center">
          {/* Follow my journey card (social icons with hover preview) */}
          <div className="bg-lime-400 rounded-3xl p-8 md:p-12 text-black relative max-w-[600px] mx-auto">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Star className="w-8 h-8 md:w-10 md:h-10 text-lime-400" />
            </div>
            <h3 className="text-[24px] md:text-[28px] font-bold mb-3 md:mb-4">Follow my development</h3>
            <p className="text-[16px] md:text-[18px] mb-6 md:mb-8 opacity-80">Stay updated with my latest software builds, open-source work, and systems engineering updates.</p>
            {/* Social media links with enlarged, official logos */}
            <div className="flex justify-center gap-6 md:gap-8 mt-6 md:mt-8">
              {/* LinkedIn Official Logo */}
              <a
                href="https://www.linkedin.com/in/mohith-kumar-chadalawada-37a90b2a1/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-full bg-[#0077B5] shadow-md hover:shadow-lg transition-all w-14 h-14 md:w-16 md:h-16 flex items-center justify-center group hover:bg-[#005983] focus:outline-none focus:ring-2 focus:ring-[#0077B5]"
                onMouseEnter={e => { setHoveredSocial("linkedin"); setCursorPos({ x: e.clientX, y: e.clientY }) }}
                onMouseMove={e => setCursorPos({ x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <svg className="w-8 h-8 md:w-9 md:h-9" viewBox="0 0 448 448" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340.7C24.09 107.3 0 83.2 0 53.6A53.6 53.6 0 0 1 53.6 0c29.6 0 53.6 24.09 53.6 53.6 0 29.6-24.09 53.7-53.6 53.7zM447.8 448h-92.4V302.4c0-34.7-12.4-58.4-43.3-58.4-23.6 0-37.6 15.9-43.7 31.3-2.3 5.6-2.8 13.4-2.8 21.2V448h-92.5s1.2-243.1 0-268.1h92.4v38c12.3-19 34.3-46.1 83.5-46.1 60.9 0 106.6 39.8 106.6 125.4V448z"/>
                </svg>
              </a>
              {/* GitHub Official Logo */}
              <a
                href="https://github.com/Mohith-c7"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-full bg-[#181717] shadow-md hover:shadow-lg transition-all w-14 h-14 md:w-16 md:h-16 flex items-center justify-center group hover:bg-[#000] focus:outline-none focus:ring-2 focus:ring-[#181717]"
                onMouseEnter={e => { setHoveredSocial("github"); setCursorPos({ x: e.clientX, y: e.clientY }) }}
                onMouseMove={e => setCursorPos({ x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <svg className="w-8 h-8 md:w-9 md:h-9" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0.297C5.373 0.297 0 5.67 0 12.297c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating preview image on hover */}
      {hoveredSocial && (
        <img
          src={
            hoveredSocial === "linkedin"
              ? "/linkedinpre.png"
              : "/githubpre.png"
          }
          alt="Preview"
          style={{
            position: "fixed",
            left: cursorPos.x + 24,
            top: cursorPos.y + 24,
            width: 120,
            height: 72,
            pointerEvents: "none",
            zIndex: 1000,
            borderRadius: 12,
            boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
            background: "white",
            objectFit: "cover"
          }}
        />
      )}

      {/* GitHub Contributions Tooltip */}
      {hoveredDay && (
        <div
          className="fixed pointer-events-none z-[1000] bg-white text-black text-[13px] font-bold py-2 px-4 rounded-xl shadow-2xl border border-gray-200"
          style={{
            left: cursorPos.x + 16,
            top: cursorPos.y + 16,
          }}
        >
          {hoveredDay.text}
        </div>
      )}

      {/* Project Case Study Modal */}
      {activeCaseStudy && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 md:p-10 max-w-3xl w-full shadow-2xl relative border border-gray-200 my-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveCaseStudy(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-lime-400"
              aria-label="Close Case Study"
            >
              ✕
            </button>
 
            {/* Header */}
            <div className="mb-6">
              <span className="text-lime-500 font-bold text-[16px] block mb-2">{`{`} {activeCaseStudy.category} {`}`}</span>
              <h3 className="text-[32px] md:text-[40px] font-bold text-black leading-tight mb-2">
                {activeCaseStudy.title}
              </h3>
              <span className="text-gray-400 text-[14px]">{activeCaseStudy.date}</span>
            </div>
 
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-8">
              {activeCaseStudy.tech.map((t: string, idx: number) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-[13px] font-bold rounded-full">
                  {t}
                </span>
              ))}
            </div>
 
            {/* Content Sections */}
            <div className="space-y-8 text-left text-gray-700">
              <div>
                <h4 className="text-[18px] font-bold text-black mb-2 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-lime-500" />
                  System Architecture
                </h4>
                <p className="text-[15px] leading-relaxed text-gray-600 font-medium">{activeCaseStudy.architecture}</p>
              </div>
 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[18px] font-bold text-black mb-2">The Problem</h4>
                  <p className="text-[15px] leading-relaxed text-gray-600 font-medium">{activeCaseStudy.problem}</p>
                </div>
                <div>
                  <h4 className="text-[18px] font-bold text-black mb-2">The Solution</h4>
                  <p className="text-[15px] leading-relaxed text-gray-600 font-medium">{activeCaseStudy.solution}</p>
                </div>
              </div>
 
              <div>
                <h4 className="text-[18px] font-bold text-black mb-3">Key Engineering Challenges</h4>
                <div className="space-y-4">
                  {activeCaseStudy.challenges.map((challenge: any, idx: number) => (
                    <div key={idx} className="p-5 bg-gray-50 border border-gray-200 rounded-2xl">
                      <h5 className="font-bold text-black text-[15px] mb-1.5 flex items-center gap-2">
                        <span className="w-2 h-2 bg-lime-500 rounded-full" />
                        {challenge.title}
                      </h5>
                      <p className="text-[14px] text-gray-600 leading-relaxed font-medium">{challenge.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
 
              <div className="p-5 bg-lime-50/50 border border-lime-100 rounded-2xl">
                <h4 className="text-[16px] font-bold text-black mb-1.5 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-lime-600" />
                  Core Lesson Learned
                </h4>
                <p className="text-[14px] text-gray-700 leading-relaxed font-medium">{activeCaseStudy.lessons}</p>
              </div>
            </div>
 
            {/* Footer CTAs */}
            <div className="mt-8 pt-8 border-t border-gray-100 flex flex-wrap gap-4">
              <a
                href={activeCaseStudy.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-black text-white hover:bg-gray-900 px-6 py-3.5 rounded-full text-[15px] font-bold shadow-md transition-colors"
              >
                <Github className="w-4 h-4" />
                View Code Base
              </a>
              {activeCaseStudy.live !== "#" && (
                <a
                  href={activeCaseStudy.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-100 text-black hover:bg-gray-200 px-6 py-3.5 rounded-full text-[15px] font-bold transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Platform
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  )
}
