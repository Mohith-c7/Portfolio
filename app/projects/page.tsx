'use client'
import React, { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import GlassNav from "@/components/GlassNav"
import Footer from "@/components/Footer"
import { Github, ExternalLink, Terminal, Zap } from "lucide-react"

import { projectsData } from "@/lib/projects"

export default function ProjectsPage() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<any | null>(null)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <GlassNav />
      <section className="pt-[192px] pb-28 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-8">
          <h1 className="text-[72px] font-bold leading-[1.05] mb-20 text-black">All Projects</h1>
          <div className="flex flex-col divide-y divide-gray-200">
            {projectsData.map((project, idx) => (
              <motion.div
                key={idx}
                className={`flex flex-col md:flex-row items-center group transition-all duration-300 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} py-12`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Text */}
                <div className="w-full md:w-1/2 px-6 md:px-12">
                  <span className="text-lime-500 font-bold text-[16px] block mb-2">{`{`} {project.category} {`}`}</span>
                  <h2 className="text-[36px] font-bold mb-4 text-black group-hover:text-lime-500 transition-colors duration-300">{project.title}</h2>
                  <p className="text-[20px] text-gray-600 mb-6 font-medium leading-relaxed">{project.desc}</p>
                  <Button 
                    className="bg-lime-400 text-black hover:bg-lime-500 rounded-full px-8 py-4 text-[16px] font-bold h-auto group-hover:scale-105 transition-transform"
                    onClick={() => setActiveCaseStudy(project)}
                  >
                    View System Case Study
                  </Button>
                </div>
                {/* Image */}
                <motion.div
                  className="w-full md:w-1/2 flex justify-center items-center overflow-hidden rounded-3xl z-10 transition-transform duration-300 cursor-pointer"
                  onClick={() => setActiveCaseStudy(project)}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={480}
                    height={320}
                    className="w-full h-[240px] md:h-[320px] object-cover rounded-3xl transition-shadow duration-300 hover:scale-105 duration-500"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
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